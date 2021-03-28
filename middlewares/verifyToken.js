import jwt from 'jsonwebtoken'

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    })
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: err.message,
      })
    }
    req.decoded = decoded
    next()
  })
}

export default verifyTokenMiddleware
