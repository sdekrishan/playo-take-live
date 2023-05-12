const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username:{
    type:String,
    lowercase:true,
    required:true,
    unique:true,
    minLength:3
},
password:{
    type:String,
    required:true,
    minLength:4
},
events:[
    {type:mongoose.Schema.Types.ObjectId,ref:"event"}
]
});

const UserModel = mongoose.model("user",userSchema);


module.exports= {UserModel};
