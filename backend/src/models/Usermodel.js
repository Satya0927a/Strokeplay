const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
})

const Usermodel = new mongoose.model("user",userSchema)
module.exports = Usermodel