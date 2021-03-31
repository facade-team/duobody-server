import express from 'express'
import auth from './auth/authRouter'
import inbodyRouter from './inbody'
import sessionRouter from './session'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('This is Home!')
})

// Auth
router.use('/auth', auth)

// Inbody Info
router.use('/inbody', inbodyRouter)

router.use('/session', sessionRouter)

router.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send(JSON.stringify(err))
})
export default router
