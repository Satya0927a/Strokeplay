const donationmodel = require('../models/donationmodel')
const poolmodel = require('../models/Poolmodel')
const scoremodel = require('../models/scoremodel')

const dashrouter = require('express').Router()

dashrouter.get('/score', async (req, res, next) => {
  try {
    const userid = req.user.userid
    const scores = await scoremodel.find({ userId: userid }).select('-_id -__v -userId')
    res.send({
      success: true,
      message: "fetched",
      data: scores.map(item => {
        return {
          ...item._doc,
          date: new Date(item._doc.date).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        }
      })
    })
  } catch (error) {
    next(error)
  }
})
dashrouter.post('/score', async (req, res, next) => {
  try {
    const userid = req.user.userid
    const { course, score, date, holes } = req.body
    if (!course || !score || !date || !holes) {
      return res.status(400).send({
        success: false,
        message: "invalid inputs"
      })
    }
    const dateobj = new Date(date)
    const newscore = new scoremodel({
      userId: userid,
      course: course,
      score: score,
      date: dateobj,
      holes: holes
    })
    await newscore.save()
    res.status(201).send({
      success: true,
      message: "added the new score to the dashboard",
      data: {
        course: newscore.course,
        score: newscore.score,
        holes: newscore.holes,
        date: new Date(newscore.date).toLocaleDateString("en-IN", {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }
    })
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.status(403).send({
        success: false,
        message: "a score is already logged for that day"
      })
    }
    next(error)
  }
})

dashrouter.get("/overview", async (req, res, next) => {
  const userid = req.user.userid
  //?recent 5 scores
  const top5scores = await scoremodel.find({ userId: userid }).sort({ date: -1 }).limit(5).select("-_id -__v -userId")
  const top5scores_formated = top5scores.map(item => {
    return {
      ...item._doc,
      date: new Date(item._doc.date).toLocaleDateString("en-IN", {
        month: "short",
        day: 'numeric',
        year: 'numeric'
      })
    }
  })
  //?best score till date
  const bestscore = await scoremodel.find({ userId: userid }).sort({ score: -1 }).limit(1).select("-_id -__v -userId")
  var score
  if (bestscore.length == 0) {
    score = 0
  } else {
    score = bestscore[0].score
  }
  //?current pool amount
  const pool = await poolmodel.findOne({ status: "active" }).select("-_id -__v")
  //?donated amount
  const donation = await donationmodel.findOne({ userId: userid }).select("-_id -__v -userId")
  var donated;
  if (!donation) {
    donated = 0
  }
  else {
    donated = donation.donatedamount
  }
  //?total rounds count
  const now = new Date();
  // Start of current month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Start of next month
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const roundsCount = await scoremodel.countDocuments({
    userId: userid, // optional if filtering per user
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth
    }
  });
  res.send({
    success: true,
    message: "fetched",
    data: {
      recentrounds: top5scores_formated,
      pool: pool,
      donated: donated,
      bestscore: score,
      rounds:roundsCount
    }
  })
})

module.exports = dashrouter