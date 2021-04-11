import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import lessonController from '../../../../controllers/lessonController'

const router = express.Router()

router.get(
  '/:traineeId/month/:month',
  verifyToken,
  lessonController.getLessonDate
)

router.get(
  '/:traineeId/date/:date',
  verifyToken,
  lessonController.getLessonByDate
)

router.get('/:traineeId/:lessonId', verifyToken, lessonController.getLessonById)

router.post('/', verifyToken, lessonController.insertLesson)

router.delete('/:lessonId', verifyToken, lessonController.deleteLesson)

export default router
