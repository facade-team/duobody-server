/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import isAuth from '../../../middlewares/fakeAuth'

// /api/trainee router

const router = express.Router()

// /api/trainee
router.get('/', isAuth, traineeController.readAllTrainees)
router.get('/:traineeId', isAuth, traineeController.readOneTrainee)
router.post('/', isAuth, traineeController.createTrainee)
router.put('/', isAuth, traineeController.updateTrainee)
router.delete('/', isAuth, traineeController.deleteTrainee)
export default router
