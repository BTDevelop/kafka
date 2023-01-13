const jwt = require ("jsonwebtoken")

exports.authenticateToken = (req, res, next) => {

  const token = req.headers["authorization"].split(" ")[1]

  if (token) {
    jwt.verify(token, "1234567", (err, decodedToken) => {
      if (err) {
        res.status(400).json({ err })
      } else {
        next()
      }
    });
  } else {
    res.json({
      succeeded: false,
      error: "No token.",
    })
  }
}
