/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import isAuth from '../../../middlewares/verifyToken'
import inbodyRouter from './inbody'
import sessionRouter from './session'
import setRouter from './set'


// /api/trainee router

const router = express.Router()


// /api/trainee
router.get('/', isAuth, traineeController.readMyTrainees)
router.get('/:traineeId', isAuth, traineeController.readOneTrainee)
router.post('/', isAuth, traineeController.createTrainee)
router.put('/', isAuth, traineeController.updateTrainee)
router.delete('/', isAuth, traineeController.deleteTrainee)

// /api/trainee/inbody
router.use('/inbody', inbodyRouter)

// /api/trainee/session
router.use('/session', sessionRouter)

// /api/trainee/set
router.use('/set', setRouter)

export default router
