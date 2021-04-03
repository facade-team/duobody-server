import express from 'express'
import Authenticate from '../../../middlewares/Authenticate'
import inbodyController from '../../../controllers/inbodyController'

const router = express.Router()

router.get(
  '/trainee/:traineeId/date/:startDate/:endDate',
  Authenticate,
  inbodyController.getInbodyInfoByDateTerm
)
router.get(
  '/trainee/:traineeId/date/:startDate',
  Authenticate,
  inbodyController.getInbodyInfoByDate
)

router.get(
  '/trainee/:traineeId/date',
  Authenticate,
  inbodyController.getInbodyDate
)

router.get(
  '/trainee/:traineeId',
  Authenticate,
  inbodyController.getLatestInbody
)

router.post('/', Authenticate, inbodyController.insertInbody)

router.put('/:inbodyId', Authenticate, inbodyController.updateInbody)

router.delete('/:inbodyId', Authenticate, inbodyController.deleteInbody)

export default router
