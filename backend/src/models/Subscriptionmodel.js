const mongoose = require('mongoose')
const subscriptionschema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  planId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"plan",
    default:null
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  expiryAt:{
    type:Date,
    default:null
  },
  status:{
    type:String,
    enum:['active','cancelled'],
    default:'active'
  }
})

const subscriptionmodel = new mongoose.model('subscription',subscriptionschema)
module.exports = subscriptionmodel