const mongoose = require('mongoose')

const donationschema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  donatedamount:{
    type:Number,
    default:0
  }
})

const donationmodel = new mongoose.model('donation',donationschema)
module.exports = donationmodel