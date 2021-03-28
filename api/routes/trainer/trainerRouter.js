import express from 'express'
import isAuth from '../../../middlewares/fakeAuth'
import { createMyTrainee } from '../../../services/trainer/trainerService'

// /api/trainer router

const router = express.Router()

router.get('/myTrainee', isAuth, createMyTrainee)

export default router
