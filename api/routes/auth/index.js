import express from 'express'
import controller from './controller'
import authMiddleWare from '../../../middlewares/auth'

const router = express.Router()

router.post('/register', controller.register)

router.post('/login', controller.login)

//토큰을 검증하는 route는 /api/auth/check임. 중간에 미들웨어에서 검증하고 /check는 그냥 검증 됐다는 res만 넘겨줌
//실제 구현에서는 /check를 쓸일은 없을거같고. 미들웨어만 주구장창 쓸듯. 
router.use('/check', authMiddleWare)
router.get('/check', controller.check)

export default router