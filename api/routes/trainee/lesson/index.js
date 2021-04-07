import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import lessonController from '../../../../controllers/lessonController'

const router = express.Router()

router.get('/:traineeId/:date', verifyToken, lessonController.getLessonByDate)

router.post('/', verifyToken, lessonController.insertLesson)

router.delete('/:lessonId', verifyToken, lessonController.deleteLesson)

export default router
