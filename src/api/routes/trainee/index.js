/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import verifyToken from '../../../middlewares/verifyToken'
import inbodyRouter from './inbody'
import lessonRouter from './lesson'
import exbodyRouter from './exbody'

const router = express.Router()

router.use('/', inbodyRouter)

router.use('/', lessonRouter)

router.use('/exbody', exbodyRouter)

/*---------------------------
  /api/trainee router
--------------------------- */
router.get('/', verifyToken, traineeController.readMyTrainees)
router.get('/:traineeId', verifyToken, traineeController.readOneTrainee)
router.post('/', verifyToken, traineeController.createTrainee)
router.put('/', verifyToken, traineeController.updateTrainee)
router.delete('/', verifyToken, traineeController.deleteTrainee)

export default router
