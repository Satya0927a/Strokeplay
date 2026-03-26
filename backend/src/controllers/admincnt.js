const { clerkClient } = require('@clerk/express')
const authmiddleware = require('../middlewares/clerkauthmiddleware')
const planmodel = require('../models/Planmodel')
const poolmodel = require('../models/Poolmodel')

const adminrouter = require('express').Router()

adminrouter.get('/', async (req, res, next) => {
  res.send("welcome it seems like you are a admin")
})
adminrouter.get('/users', async (req, res, next) => {
  try {
    const users = await clerkClient.users.getUserList({
      limit: 50, // pagination (max 100)
    });
    const formattedUsers = users.data.map((u) => {
      const joinedDate = new Date(u.createdAt);

      return {
        id: u.id,
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
        email: u.emailAddresses[0]?.emailAddress || null,
        status: u.banned ? "banned" : "active",
        joined: joinedDate.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        }), // 👉 "Jan 2025"
      };
    });

    res.json({
      success: true,
      data: formattedUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
})
adminrouter.post('/plan', async (req, res, next) => {
  try {
    const { planname, description, duration, price, dashboard, charity, pooldraw } = req.body
    if (!planname || !description || !duration || !price || !dashboard || !charity || !pooldraw) {
      return res.status(400).send({
        success: false,
        message: "invlaid inputs"
      })
    }
    const newplan = new planmodel({
      planname: planname,
      description: description,
      duration: duration,
      price: price,
      access: {
        dashboard: dashboard,
        charity: charity,
        pooldraw: pooldraw
      }
    })
    await newplan.save()
    res.status(201).send({
      success: true,
      message: "created the new plan"
    })
  } catch (error) {
    next(error)
  }
})

adminrouter.post('/pool', async (req, res, next) => {
  try {
    const { date } = req.body
    const dateobj = new Date(date)
    const newpool = new poolmodel({
      resultdate: date
    })
    await newpool.save()
    res.status(201).send({
      success: true,
      message: "created the new pool"
    })
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.status(403).send({
        success: false,
        message: "a pool on this date already exists"
      })
    }
    next(error)
  }
})
adminrouter.get("/draws",async(req,res,next)=>{
  try {
    const activepool = await poolmodel.findOne({status:"active"}).select("-_id -__v")
    const poolhistory = await poolmodel.find({}).limit(10).select("-_id -__v")
    const formatteddata = poolhistory.map(item=>{
      return {
        pool:item.amount,
        month:new Date(item.resultdate).toLocaleDateString('en-IN',{
          month:"long"
        }),
        status:item.status
      }

    })
    res.send({
      success:true,
      data:{
        activepool:{
          amount:activepool.amount,
          resultdate: new Date(activepool.resultdate).toLocaleDateString("en-IN",{
            day:"numeric",
            month:"long"
          }),
          status:activepool.status
        },
        poolhistory:formatteddata
      }
    })
  } catch (error) {
    next(error)
  }
})
module.exports = adminrouter