const mongoose = require('mongoose')

const scoreschema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    index:true
  },
  course:{
    type:String,
    required:true
  },
  score:{
    type:Number,
    required:true
  },
  holes:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    required:true,
  }
})

const scoremodel = new mongoose.model('score',scoreschema)
module.exports = scoremodel