const express = require("express");
const EventRouter = express.Router();
const { EventModel } = require("../Models/Event.model");
const { UserRouter } = require("./User.Route");
const { UserModel } = require("../Models/User.model");
const { checkExpired } = require("../Middlewears/checkEvent");



//for posting an event  

EventRouter.post("/:id",async(req,res)=>{
    const {name,category,description,membersLimit} = req.body;
    const {id}= req.params
    try {
        const newEvent = new EventModel({name,category,description,membersLimit,organiser:id});
        await newEvent.save();
        res.status(201).send({event:newEvent})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

// for getting all events except his events 

EventRouter.get("/all/:id",async(req,res)=>{
    const {id} = req.params
    try {
        let events = await EventModel.find({organiser:{$ne:id}});
        res.status(200).send(events)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// for getting all events created by a particular user

EventRouter.get("/own/:id",async(req,res)=>{
    const {id} = req.params
    try {
        let events = await EventModel.find({organiser:{$eq:id}});
        res.status(200).send(events)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

// for getting all events which  user has applied

EventRouter.get("/applied/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        let appliedEvents = await EventModel.find({receivedRequest:{$in:id}});
        res.status(200).send(appliedEvents)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// for getting all events which  user has applied and get selected

EventRouter.get("/selected/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        let appliedEvents = await EventModel.find({playingMembers:{$in:id}});
        res.status(200).send(appliedEvents)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// for sending request to play 

EventRouter.patch("request/:id",async(req,res)=>{
    const {id} = req.params;
    const {eventId} = req.body;

    try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
    
    const event = await EventModel.findById(eventId);
    if(event.playingMembers.length < membersLimit){
        await EventModel.findByIdAndUpdate(eventId,{$push:{receivedRequest:id}})
        res.status(200).send("successfully joined the game")
    }else{
        res.status(401).send("You cannot join the game because players are full.")
    }
    } catch (error) {
        res.status(400).send(error)
    }
})

// for cancelling incoming requests like for event organiser 

EventRouter.patch("request/:id",async(req,res)=>{
    const {id} = req.params;
    const {eventId} = req.body;

    try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
        await EventModel.findByIdAndUpdate(eventId,{$pull:{receivedRequest:id}});
        res.status(200).send("cancel user's request")
    } catch (error) {
        res.status(400).send(error)
    }
})


// for accepting incoming requests like for event organiser 

EventRouter.patch("request/:id",async(req,res)=>{
    const {id} = req.params;
    const {eventId} = req.body;

    try {
    // first we will find the event id and then check its member's limit if its under range then we send the request otherwise no
        await EventModel.findByIdAndUpdate(eventId,{$pull:{receivedRequest:id}});
        await EventModel.findByIdAndUpdate(eventId,{$push:{playingMembers:id}});

        res.status(200).send("accepted player's request")
    } catch (error) {
        res.status(400).send(error)
    }
})


// for searching and filtering 

EventRouter.get('/search', async(req, res) => {
    const name = req.query.name;
    const category = req.query.category;
  
    let query = {};
  
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
  
    if (category) {
      query.category = category;
    }
  
    let response = await EventModel.find(query)
    res.status(200).send(response)
  });

// checking expired ones events

EventRouter.get("/get",checkExpired, async(req,res)=>{
    try {
        const event = await EventModel.find();
        res.status(200).send(event)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = { EventRouter };
