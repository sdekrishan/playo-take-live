const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
const {connection} = require("./Config/db.js");
const { EventRouter } = require("./Routes/Event.route.js");
const {UserRouter} = require("./Routes/User.route.js")
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
})

