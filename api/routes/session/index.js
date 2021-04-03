import express from 'express'
import Authenticate from '../../../middlewares/Authenticate'
import sessionController from '../../../controllers/sessionController'

const router = express.Router()

router.get(':traineeId/:date', Authenticate, sessionController.getSessionByDate)

export default router
