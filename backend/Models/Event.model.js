const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "football",
      "cricket",
      "badminton",
      "tennis",
      "athletics",
      "boxing",
      "basketball",
      "baseball",
      "hockey",
      "golf",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timing: {
    date:{
        type:Date,
    },
    start: {
      type: Date,
    },
    
    // required: true,
  },
  membersLimit: {
    type: Number,
    min:2,
    required: true,
  },
  organiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true
  },
  otherReq: {
    type: Array,
  },
  playingMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  receivedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
},{timeStamps:true});

const EventModel = mongoose.model("event", eventSchema);

module.exports = { EventModel };
