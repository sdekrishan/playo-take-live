const express = require("express");
const EventRouter = express.Router();
const { EventModel } = require("../Models/Event.model");
const { checkExpired } = require("../Middlewears/checkEvent");

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
    res.status(201).send({ event: newEvent });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// for getting all events except his events

EventRouter.get("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let events = await EventModel.find({$and:[{ organiser: { $ne: id } },{receivedRequests:{$ne:id}}, {playingMembers:{$ne:id}}]}).populate(
      "playingMembers"
    );
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// for getting all events created by a particular user

EventRouter.get("/own/:id",async (req, res) => {
  const { id } = req.params;
  try {
    let events = await EventModel.find({ organiser: { $eq: id } }).populate("receivedRequests").populate("playingMembers");
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// for getting all events which  user has applied/rqeuested

EventRouter.get("/applied/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let appliedEvents = await EventModel.find({ receivedRequests: { $in: id } });
    res.status(200).send(appliedEvents);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// for getting all events which  user has applied and get selected

EventRouter.get("/selected/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let appliedEvents = await EventModel.find({ playingMembers: { $in: id } });
    res.status(200).send(appliedEvents);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
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
      res.status(200).send("successfully joined the game");
    } else {
      res
        .status(401)
        .send("You cannot join the game because players are full.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// for cancelling incoming requests like for event organiser

EventRouter.patch("/cancel/:id", async (req, res) => {
  const { id } = req.params;
  const { eventId } = req.body;

  try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
    await EventModel.findByIdAndUpdate(eventId, {
      $pull: { receivedRequests: id },
    });
    res.status(200).send("cancel user's request");
  } catch (error) {
    res.status(400).send(error);
  }
});

// for accepting incoming requests like for event organiser

EventRouter.patch("/accept/:id", async (req, res) => {
  const { id } = req.params;
  const { eventId } = req.body;

  try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
    await EventModel.findByIdAndUpdate(eventId, {
      $pull: { receivedRequests: id },
    });
    await EventModel.findByIdAndUpdate(eventId, {
      $push: { playingMembers: id },
    });

    res.status(200).send("accepted player's request");
  } catch (error) {
    res.status(400).send(error);
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
  res.status(200).send(response);
});


// get single route

EventRouter.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id).populate("receivedRequests").populate("playingMembers").populate("organiser");
    res.status(200).send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = { EventRouter };
