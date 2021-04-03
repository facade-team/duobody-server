import express from 'express'
import check from './test/check'
import auth from './auth/authRouter'
import verifyTokenMiddleware from '../../middlewares/verifyToken'
import trainer from './trainer/trainerRouter'
import inbodyRouter from './inbody'
import sessionRouter from './session'
import setRouter from './set'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'this is home!',
  })
})

// /api/auth
router.use('/auth', auth)

// middleWare Test!
router.use('/test', verifyTokenMiddleware)
router.use('/test', check)

// /api/trainer
router.use('/trainer', trainer)

// /api/inbody
router.use('/inbody', inbodyRouter)

// /api/session
router.use('/session', sessionRouter)

// /api/set
router.use('/set', setRouter)

router.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json(err)
})

export default router
