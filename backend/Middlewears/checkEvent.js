const { EventModel } = require("../Models/Event.model");

//this middlewear helps us to check the event is expired or not

const checkExpired = async (req, res, next) => {
  const currentTime = new Date();

  // now the idea is that go through each document and compare its timing with current time if current time is greater 
  // then obviously event is expired and on basis of that we will the the isExpired status
  try {
    (await EventModel.find({})).forEach(async (event) => {
      if (
        event.timing.getDate() <= currentTime.getDate() &&
        event.timing.getTime() <= currentTime.getTime()
      ) {
        await EventModel.updateOne(
          { _id: event._id },
          { $set: { isExpired: true } },
          { $set: { receivedRequests: [] } }
        );
      }
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkExpired };
