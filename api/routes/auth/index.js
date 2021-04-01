import express from 'express'
import confirmSecret from '../../../services/auth/confirmSecret'
import login from '../../../services/auth/login'
import register from '../../../services/auth/register'

// /api/auth router

const router = express.Router()

router.post('/register', register)

router.post('/confirmsecret', confirmSecret)

router.post('/login', login)

export default router
