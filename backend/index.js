const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
const { EventRouter } = require("./Routes/Event.route.js");
const {UserRouter} = require("./Routes/User.route.js");
const { authentication } = require("./Middlewears/authMiddlewear.js");
const { checkExpired } = require("./Middlewears/checkEvent.js");

app.use(express.json());
app.use(cors({ origin: true }));

app.use("/",UserRouter);

app.use(authentication);
app.use(checkExpired)
app.use("/event",EventRouter)
const port = process.env.PORT || 5000

app.listen(port,()=>{
    mongoose.connect(
        process.env.MONGO_DB,
      )
      .then(()=>console.log(`server has been connected to ${port}`))
      .catch(e=>console.log(e));
})

