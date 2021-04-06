/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import isAuth from '../../../middlewares/fakeAuth'
import inbodyRouter from './inbody'
import lessonRouter from './lesson'

// /api/trainee router

const router = express.Router()

// /api/trainee/inbody
router.use('/inbody', inbodyRouter)

router.use('/lesson', lessonRouter)

// /api/trainee
router.get('/', isAuth, traineeController.readMyTrainees)
router.get('/:traineeId', isAuth, traineeController.readOneTrainee)
router.post('/', isAuth, traineeController.createTrainee)
router.put('/', isAuth, traineeController.updateTrainee)
router.delete('/:traineeId', isAuth, traineeController.deleteTrainee)
export default router
