import express from 'express'
import userRouter from './routes/userRouter'
import auth from './routes/auth'

// test!
import requestSecret from '../services/auth/requestSecret'
import confirmSecret from '../services/auth/confirmSecret'
import login from '../services/auth/login'

const router = express.Router()

router.use('/users', userRouter)

router.get('/', (req, res) => {
  res.send('This is Home!')
})

router.use('/auth', auth)

/* test! */
router.post('/test/requestsecret', requestSecret)
router.post('/test/confirmsecret', confirmSecret)
router.post('/test/login', login)
/* test! */

export default router
