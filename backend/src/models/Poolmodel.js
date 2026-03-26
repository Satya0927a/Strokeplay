const mongoose = require('mongoose')

const poolschema = new mongoose.Schema({
  amount:{
    type:Number,
    default:0
  },
  resultdate:{
    type:Date,
    required:true,
    unique:true
  },
  status:{
    type:String,
    enum:['active','deactive'],
    default:'active'
  }
})

const poolmodel = new mongoose.model('pool',poolschema)
module.exports = poolmodel