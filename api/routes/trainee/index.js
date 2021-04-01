/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import isAuth from '../../../middlewares/fakeAuth'

// /api/trainee router

const router = express.Router()

// /api/trainee
router.post('/', isAuth, traineeController.createTrainee)
router.get('/', isAuth, traineeController.readAllTrainees)
router.get('/:traineeId', isAuth, traineeController.readOneTrainee)
router.put('/', isAuth, traineeController.updateTrainee)

export default router
