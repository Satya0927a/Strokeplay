const mongoose = require('mongoose')

const Planschema = new mongoose.Schema({
  planname:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  duration:{
    type: Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  access:{
    dashboard:{
      type:Boolean,
      required:true
    },
    charity:{
      type:Boolean,
      required:true
    },
    pooldraw:{
      type:Boolean,
      required:true
    },
  }
})

const planmodel = new mongoose.model('plan',Planschema)
module.exports = planmodel