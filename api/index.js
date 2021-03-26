import express from 'express'
import userRouter from './routes/userRouter'
import auth from './routes/auth'

//test!
import requestSecret from "../services/auth/requestSecret"

const router = express.Router()

router.use('/users', userRouter)

router.get('/', (req, res) => {
  res.send('This is Home!')
})

router.use('/auth', auth)

/*test!*/
router.post('/test', requestSecret)
/*test!*/

export default router