import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import sessionController from '../../../../controllers/sessionController'

const router = express.Router()

router.get('/:traineeId/:date', verifyToken, sessionController.getSessionByDate)

router.post('/', verifyToken, sessionController.insertSession)

export default router
