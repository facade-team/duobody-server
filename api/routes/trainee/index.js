/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import verifyToken from '../../../middlewares/verifyToken'
import inbodyRouter from './inbody'
import lessonRouter from './lesson'

const router = express.Router()

// /api/trainee/inbody
router.use('/inbody', inbodyRouter)

router.use('/lesson', lessonRouter)

/*---------------------------
  /api/trainee router
--------------------------- */
router.get('/', verifyToken, traineeController.readMyTrainees)
router.get('/:traineeId', verifyToken, traineeController.readOneTrainee)
router.post('/', verifyToken, traineeController.createTrainee)
router.put('/', verifyToken, traineeController.updateTrainee)
router.delete('/', verifyToken, traineeController.deleteTrainee)

export default router
