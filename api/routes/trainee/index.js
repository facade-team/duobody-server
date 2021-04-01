/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import isAuth from '../../../middlewares/fakeAuth'

// /api/trainer router

const router = express.Router()

router.post('/myTrainee', isAuth, traineeController.createTrainee)

export default router
