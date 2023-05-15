const { EventModel } = require("../Models/Event.model");

const checkExpired = async (req, res, next) => {
  const currentTime = new Date();
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
