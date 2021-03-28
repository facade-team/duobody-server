import express from 'express'
import auth from './auth/authRouter'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('This is Home!')
})

// Auth
router.use('/auth', auth)

export default router
