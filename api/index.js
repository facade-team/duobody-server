import express from 'express'
import userRouter from './routes/userRouter'
import auth from './routes/auth'

//test!
import requestSecret from "../services/auth/requestSecret"
import register from "../services/auth/register"

const router = express.Router()

router.use('/users', userRouter)

router.get('/', (req, res) => {
  res.send('This is Home!')
})

router.use('/auth', auth)

/*test!*/
router.post('/test/requestsecret', requestSecret)
//router.post('/test2/register', register)
/*test!*/

export default router