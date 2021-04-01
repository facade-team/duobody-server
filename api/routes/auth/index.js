import express from 'express'
import authController from '../../../controllers/authController'

// /api/auth router

const router = express.Router()

router.post('/register', authController.register)

router.post('/confirmsecret', authController.confirmSecret)

router.post('/login', authController.login)

export default router
