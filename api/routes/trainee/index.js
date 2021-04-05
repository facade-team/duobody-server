/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import isAuth from '../../../middlewares/fakeAuth'
import inbodyRouter from './inbody'
import lessonRouter from './lesson'
import sessionRouter from './session'
import setRouter from './set'

// /api/trainee router

const router = express.Router()

// /api/trainee/inbody
router.use('/inbody', inbodyRouter)

router.use('/lesson', lessonRouter)

// /api/trainee/session
router.use('/session', sessionRouter)

// /api/trainee/set
router.use('/set', setRouter)

// /api/trainee
router.get('/', isAuth, traineeController.readAllTrainees)
router.get('/:traineeId', isAuth, traineeController.readOneTrainee)
router.post('/', isAuth, traineeController.createTrainee)
router.put('/', isAuth, traineeController.updateTrainee)
router.delete('/:traineeId', isAuth, traineeController.deleteTrainee)
export default router
