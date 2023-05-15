const express = require("express");
const EventRouter = express.Router();
const { EventModel } = require("../Models/Event.model");


//for posting an event

EventRouter.post("/:id", async (req, res) => {
  const { name, category, description, membersLimit, otherReq, timing } = req.body;
  const { id } = req.params;
  try {
    const newEvent = new EventModel({
      name,
      category,
      description,
      membersLimit,
      organiser: id,
      timing,
      otherReq
    });
    await newEvent.save();
    return res.status(201).send({ event: newEvent });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// for getting all events except his events it will be shown on home page

EventRouter.get("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let events = await EventModel.find({$and:[{ organiser: { $ne: id } },{receivedRequests:{$ne:id}}, {playingMembers:{$ne:id}}]}).populate(
      "playingMembers"
    );
    return res.status(200).send(events);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// for getting all events created by a particular user this will be shown on profile section

EventRouter.get("/own/:id",async (req, res) => {
  const { id } = req.params;

  try {
    let events = await EventModel.find({ organiser: { $eq: id } }).populate("receivedRequests").populate("playingMembers");
    return res.status(200).send(events);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// for getting all events which  user has applied/requested

EventRouter.get("/applied/:id", async (req, res) => {
  const { id } = req.params;

  //we check in every document that userId is present in any document's received request or not if yes then it will be our applied event
  try {
    let appliedEvents = await EventModel.find({ receivedRequests: { $in: id } });
    return res.status(200).send(appliedEvents);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// for getting all events which  user has applied and get selected

EventRouter.get("/selected/:id", async (req, res) => {
  const { id } = req.params;

  // we check in every document that userId is present in any document's playing request or not if yes then it will be our event in that user has selected
  try {
    let appliedEvents = await EventModel.find({ playingMembers: { $in: id } });
    return res.status(200).send(appliedEvents);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// for sending request to play

EventRouter.patch("/request/:id", async (req, res) => {
  const { id } = req.params;
  const { eventId } = req.body;
  try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
    const event = await EventModel.findById(eventId);

    if (event.playingMembers.length < event.membersLimit) {
      await EventModel.findByIdAndUpdate(eventId, {
        $push: { receivedRequests: id },
      });
      return res.status(200).send("successfully joined the game");
    } else {
      return res
        .status(401)
        .send("You cannot join the game because players are full.");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

// for cancelling/rejecting incoming requests like for event organiser

EventRouter.patch("/cancel/:id", async (req, res) => {
  const { id } = req.params;
  const { eventId } = req.body;

  try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
    await EventModel.findByIdAndUpdate(eventId, {
      $pull: { receivedRequests: id },
    });
    return res.status(200).send("cancel user's request");
  } catch (error) {
    return res.status(400).send(error);
  }
});

// for accepting incoming requests like for event organiser

EventRouter.patch("/accept/:id", async (req, res) => {
  const { id } = req.params;
  const { eventId } = req.body;

  try {
    // first we will find the event related to organiser now organiser wants to accept request so we have to send the user's id into the playing memvber's array
    // and remove the user's id from the rec request array so that it will not shown in  requests
    await EventModel.findByIdAndUpdate(eventId, {
      $pull: { receivedRequests: id },
    });
    await EventModel.findByIdAndUpdate(eventId, {
      $push: { playingMembers: id },
    });

    return res.status(200).send("accepted player's request");
  } catch (error) {
    return res.status(400).send(error);
  }
});

// for searching and filtering

EventRouter.get("/search/:id", async (req, res) => {
  const name = req.query.name;
  const category = req.query.category;
  const {id }= req.params
  let query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (category) {
    query.category = category;
  }
  console.log(query);

  let response = await EventModel.find({$and:[{ organiser: { $ne:id} },{receivedRequests:{$ne:id}}, {playingMembers:{$ne:id}},query]});
  return res.status(200).send(response);
});


// get single route

EventRouter.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id).populate("receivedRequests").populate("playingMembers").populate("organiser");
    return res.status(200).send(event);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = { EventRouter };
