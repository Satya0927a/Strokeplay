const errohandler = (err, req, res, next) => {
  console.log(err);
  if (err.name == "TokenExpiredError") {
    res.status(401).send({
      success: false,
      message: "Token expired"
    })
  }
  else if (err.name == "MongoServerError") {
    res.status(403).send({
      success: false,
      message: "User already exists"
    })
  }
  else {
    res.status(500).send({
      success: false,
      message: "server error"
    })
  }
}

module.exports = errohandler