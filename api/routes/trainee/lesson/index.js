import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import lessonController from '../../../../controllers/lessonController'

const router = express.Router()

//해당 달에 있는 lesson날짜 조회
router.get(
  '/:traineeId/lesson/month/:month',
  verifyToken,
  lessonController.getLessonMonthDate
)

//날짜로 lesson 조회
router.get(
  '/:traineeId/lesson/date/:date',
  verifyToken,
  lessonController.getLessonByDate
)

//trainee의 모든 레슨 날짜 조회
router.get(
  '/:traineeId/lesson/date',
  verifyToken,
  lessonController.getLessonDate
)

//lessonid로 lesson조회
router.get(
  '/:traineeId/lesson/:lessonId',
  verifyToken,
  lessonController.getLessonById
)

router.post('/lesson', verifyToken, lessonController.insertLesson)

router.delete(
  '/:traineeId/lesson/:lessonId',
  verifyToken,
  lessonController.deleteLesson
)

export default router
