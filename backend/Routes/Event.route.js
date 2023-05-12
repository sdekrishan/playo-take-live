const express = require("express");
const EventRouter = express.Router();
const { EventModel } = require("../Models/Event.model");

// for getting all events except his events 

EventRouter.get("/all",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = { EventModel };
