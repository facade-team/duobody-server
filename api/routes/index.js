/* eslint-disable import/no-named-as-default */
import express from 'express'
import check from './test/check'
import authRouter from './auth'
import verifyTokenMiddleware from '../../middlewares/verifyToken'
import traineeRouter from './trainee'
import messengerRouter from './messenger'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'this is home!',
  })
})

// /api/auth
router.use('/auth', authRouter)

// middleWare Test!
router.use('/test', verifyTokenMiddleware)
router.use('/test', check)

// /api/trainee
router.use('/trainee', traineeRouter)

router.use('/messenger', messengerRouter)

router.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json(err)
})

export default router
