import express from 'express'
import check from './test/check'
import auth from './auth/authRouter'
import verifyTokenMiddleware from '../../middlewares/verifyToken'
import trainer from './trainer/trainerRouter'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'this is home!',
  })
})

// /api/auth
router.use('/auth', auth)

// middleWare Test!
// router.use('/test', verifyTokenMiddleware)
router.use('/test', check)

// /api/trainer
router.use('/trainer', trainer)

export default router
