import express from 'express'
import check from './test/check'
import auth from './auth/authRouter'
import verifyTokenMiddleware from '../../middlewares/verifyToken'
// import authMiddleWare from '../../middlewares/auth'

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.decoded.userid)
  res.json({
    message: 'this is home!',
    info: req.decoded,
  })
})

// Auth
router.use('/auth', auth)

// middleWare Test!
router.use('/test', verifyTokenMiddleware)
router.use('/test', check)

export default router
