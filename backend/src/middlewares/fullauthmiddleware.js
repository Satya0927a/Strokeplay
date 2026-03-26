const Usermodel = require("../models/Usermodel")

const fullauthmiddleware = async(req, res, next) => {
  try {
    const userid = req.user.userid
    const fetchuser = await Usermodel.findOne({ userId: userid })
    if (!fetchuser) {
      return res.status(403).send({
        success: false,
        message: "login is incomplete retry from the main website"
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = fullauthmiddleware