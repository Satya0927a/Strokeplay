const donationmodel = require('../models/donationmodel')
const planmodel = require('../models/Planmodel')
const poolmodel = require('../models/Poolmodel')
const subscriptionmodel = require('../models/Subscriptionmodel')

const subscriptionrouter = require('express').Router()

subscriptionrouter.get('/', async (req, res, next) => {
  try {
    const userid = req.user.userid
    const subs = await subscriptionmodel.findOne({ userId: userid }).select("-_id -__v -userId")
    if (!subs) {
      return res.status(404).send({
        success: false,
        message: "no subscription found for user"
      })
    }
    res.send({
      success: true,
      message: "fetched the subscription data",
      data: subs
    })
  } catch (error) {
    next(error)
  }
})
subscriptionrouter.post('/renew/:planId', async (req, res, next) => {
  try {
    const userid = req.user.userid
    const planId = req.params.planId
    const plan = await planmodel.findById(planId)
    if (!plan) {
      return res.status(404).send({
        success: false,
        message: "plan not found"
      })
    }
    const subs = await subscriptionmodel.findOne({ userId: userid })
    if (!subs) {
      return res.status(404).send({
        success: false,
        message: "subscription not found for user"
      })
    }
    subs.planId = planId
    if (!subs.expiryAt) {
      console.log(11111111111111);
      
      subs.expiryAt = Date.now() + plan.duration * 24 * 60 * 60 * 1000
    }
    else {
      subs.expiryAt = Date.parse(subs.expiryAt) + plan.duration * 24 * 60 * 60 * 1000
    }
    subs.status = "active"
    await subs.save()
    //update the pool
    const recentpool = await poolmodel.findOne({status:"active"})
    recentpool.amount += parseInt((0.1* plan.price).toFixed(2))
    await recentpool.save()
    //update the donated amount to charity
    const userdonation = await donationmodel.findOne({userId:userid})
    if(!userdonation){
      const newdonation = new donationmodel({
        userId:userid,
        donatedamount: parseInt((0.2*plan.price).toFixed(2))
      })
      await newdonation.save()
    }
    else{
      userdonation.donatedamount += parseInt((0.2*plan.price).toFixed(2))
      await userdonation.save()
    }
    res.status(200).send({
      success:true,
      message:"successfully updated the subscription",
      data:{
        planId:subs.planId,
        expiryAt:subs.expiryAt.toLocaleDateString("en-IN",{
          day:"numeric",
          month:"short",
          year:"numeric"
        }),
        status:subs.status
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = subscriptionrouter