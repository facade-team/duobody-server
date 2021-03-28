import express from 'express'
import auth from './auth/authRouter'
import trainer from './trainer/trainerRouter'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('This is Home!')
})

// /api/auth
router.use('/auth', auth)

// /api/trainer
router.use('/trainer', trainer)

export default router
