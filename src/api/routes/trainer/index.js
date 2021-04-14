import express from 'express'
import verifyToken from '../../../middlewares/verifyToken'
import trainerController from '../../../controllers/trainerController'

const router = express.Router()

router.get(
  '/lesson/month/:month',
  verifyToken,
  trainerController.getTrainerLessonDateByMonth
)

router.get(
  '/lesson/date/:date',
  verifyToken,
  trainerController.getTrainerLessonByDate
)

export default router
