import express from 'express'
import auth from './auth/authRouter'
import inbody from './inbody/index'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('This is Home!')
})

// Auth
router.use('/auth', auth)

// Inbody Info
router.use('/inbodies', inbody)

router.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send(JSON.stringify(err))
})
export default router
