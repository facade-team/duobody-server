/* eslint-disable import/no-named-as-default */
import express from 'express'
import traineeController from '../../../controllers/traineeController'
import verifyToken from '../../../middlewares/verifyToken'

const router = express.Router()

/*---------------------------
  /api/trainee router
--------------------------- */
router.get('/', verifyToken, traineeController.readMyTrainees)
router.get('/:traineeId', verifyToken, traineeController.readOneTrainee)
router.post('/', verifyToken, traineeController.createTrainee)
router.put('/', verifyToken, traineeController.updateTrainee)
router.delete('/', verifyToken, traineeController.deleteTrainee)
export default router
