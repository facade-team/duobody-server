import express from 'express'
import controller from './controller'
import authMiddleWare from '../../middlewares/auth'

const router = express.Router()

router.post('/register', controller.register)

router.post('/login', controller.login)

router.use('/check', authMiddleWare)
router.get('/check', controller.check)

export default router