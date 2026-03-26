const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const Usermodel = require("./models/Usermodel");
const userrouter = require("./controllers/usercnt");
const adminrouter = require("./controllers/admincnt");
const errohandler = require("./middlewares/errorhandler");
const authmiddleware = require("./middlewares/clerkauthmiddleware");
const admincheck = require("./middlewares/admincheck,js");
const fullauthmiddleware = require("./middlewares/fullauthmiddleware");
const subscriptionrouter = require("./controllers/subscnt");
const dashrouter = require("./controllers/dashcnt");
const app = express()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN
}))
if(mongoose.connect(process.env.MONGO_URI)){
  console.log('connected to the database');
}
else{
  console.log("coudlnt connect to the database");
}
app.get("/",(req,res)=>{
  res.send("welcome to the backend of the stokeplay")
})

app.use("/auth",authmiddleware,userrouter)
app.use('/user/subs',authmiddleware,fullauthmiddleware,subscriptionrouter)
app.use('/user/dash',authmiddleware,fullauthmiddleware,dashrouter)
app.use('/admin',authmiddleware,fullauthmiddleware,admincheck,adminrouter)
app.use(errohandler)

module.exports = app