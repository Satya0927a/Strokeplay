const jwt = require('jsonwebtoken')
const {clerkClient} = require('@clerk/express')
const authmiddleware = async(req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      return res.status(401).send({
        success: false,
        message: "token not found"
      })
    }
    const token = authorization.replace("Bearer ", "")
    const options = { algorithms: ['RS256'] }
    const payload = jwt.verify(token, process.env.SECRET_KEY,options)
    req.user = {
      userid:payload.sub
    }
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = authmiddleware