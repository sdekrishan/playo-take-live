const { EventModel } = require("../Models/Event.model");


const checkExpired = async(req,res,next)=>{
    const currentTime = new Date();
    console.log('currentTime',currentTime.getTime());
    console.log('currentTime',currentTime.getDate());
    try {
        (await EventModel.find({})).forEach(async(event) => {
            console.log('inside',event.timing.getTime())

            if(event.timing.getDate() <= currentTime.getDate() && event.timing.getTime() <= currentTime.getTime()){
                console.log('event date',event.timing)
               await EventModel.updateOne({_id:event._id},{$set:{isExpired:true}},{$set:{receivedRequests:[]}})
             }
        })
        next()
    } catch (error) {
        console.log(error);
        
    }

}

module.exports = {checkExpired}