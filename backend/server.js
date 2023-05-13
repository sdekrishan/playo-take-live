const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
const {connection} = require("./Config/db.js");
const { UserRouter } = require("./Routes/User.Route.js");
const { EventRouter } = require("./Routes/Event.route.js");

// mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/",UserRouter);
app.use("/event",EventRouter)



app.listen(process.env.PORT || 5000,async()=>{
    try {
        await connection;
        console.log(`server has been connected to ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
//   mongoose.connect(
//     process.env.MONGO_DB,
//   )
//   .then(()=>console.log(`server has been connected to ${process.env.PORT}`))
//   .catch(e=>console.log(e));
})

