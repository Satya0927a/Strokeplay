const subscriptionmodel = require('../models/Subscriptionmodel')
const Usermodel = require('../models/Usermodel')

const userrouter = require('express').Router()

userrouter.post('/signup',async(req,res,next)=>{
  try {
    const userid = req.user.userid
    const newuser = new Usermodel({
      userId:userid
    })
    const newsubscription = new subscriptionmodel({
      userId:userid
    })
    await newuser.save()
    await newsubscription.save()
    res.status(201).send({
      success:true,
      message:"created the account",
      data:{
        role:newuser.role,
        plan:newsubscription.planId
      }
    })
  } catch (error) {
    next(error)
  }
})

userrouter.get('/user',async(req,res,next)=>{
  try {
    const userid = req.user.userid
    const user = await Usermodel.findOne({
      userId:userid
    })
    if(!user){
      return res.status(404).send({
        success:false,
        message:"user not found"
      })
    }
    const subs = await subscriptionmodel.findOne({
      userId:userid
    })
    if(!subs){
      return res.status(404).send({
        success:false,
        message:"subscription not found of the user"
      })
    }
    res.send({
      success:true,
      message:"fetched user data",
      data:{
        plan:subs.planId,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = userrouter