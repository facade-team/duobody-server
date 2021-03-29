import express from 'express'
import auth from './auth/authRouter'
import lesson from './lesson/index'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('This is Home!')
})

// Auth
router.use('/auth', auth)

// Lesson
router.use('/lessons', lesson)

export default router
