/* eslint-disable import/no-named-as-default */
import express from 'express'
import authRouter from './auth'
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

// /api/trainee
router.use('/trainee', traineeRouter)

router.use('/messenger', messengerRouter)

router.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json(err)
})

export default router
