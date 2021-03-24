import express from 'express'
import userRouter from './routes/userRouter'
import auth from './auth'

const router = express.Router()

router.use('/users', userRouter)

router.get('/', (req, res) => {
  res.send('This is Home!')
})

router.use('/auth', auth)

export default router