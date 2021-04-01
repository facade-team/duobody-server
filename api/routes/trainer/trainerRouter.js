/* eslint-disable import/no-named-as-default */
import express from 'express'
import trainerController from '../../../controllers/trainerController'
import isAuth from '../../../middlewares/fakeAuth'

// /api/trainer router

const router = express.Router()

router.post('/myTrainee', isAuth, trainerController.createTrainee)

export default router
