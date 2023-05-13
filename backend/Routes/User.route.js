const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.model");


UserRouter.post("/register", async (req, res) => {
    let { username, password } = req.body;
    try {
      let checkUser =await UserModel.find({username})
      if(checkUser.length === 0){
          const newUser = new UserModel({username,password})
          await newUser.save();
          res.status(200).send({msg:"User has been created.", user:newUser})
        }else{
          return res.status(400).send("user already exist")
      }
    } 
    catch (error) {
      console.log(error)
      return res.status(400).send(error);
    }
  });
  
  //for login 
  
  UserRouter.post("/login",async(req, res)=>{
    const {username,password} = req.body;
    try {
      const user = await UserModel.find({username,password});
      console.log(user);
      if(user.length>0){
          const token = jwt.sign({username,id:user[0]._id},process.env.KEY);
          return res.status(200).send({msg:"login successful",token,details:{username,id:user[0]._id}});
      }
      else{
        return res.status(400).send("Please fill correct credentials.")
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  })

  module.exports = {UserRouter};