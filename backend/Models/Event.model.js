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
    type:Date,
    default: Date.now
    // required: true,
  },
  organiser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  membersLimit: {
    type: Number,
    min:2,
    required: true,
  },
  isExpired:{
    type:Boolean,
    default:false
  },
  otherReq: {
    type: String,
    default:""
  },
  playingMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default:[]
    },
  ],
  receivedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default:[]
    },
  ],
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default:[]
    },
  ],
},{timeStamps:true});

const EventModel = mongoose.model("event", eventSchema);

module.exports = { EventModel };
