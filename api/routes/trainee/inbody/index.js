import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import inbodyController from '../../../../controllers/inbodyController'

const router = express.Router()

router.get(
  '/:traineeId/date/:startDate/:endDate',
  verifyToken,
  inbodyController.getInbodyInfoByDateTerm
)

router.get(
  '/:traineeId/date/:startDate',
  verifyToken,
  inbodyController.getInbodyInfoByDate
)

router.get('/:traineeId/date', verifyToken, inbodyController.getInbodyDate)

router.get('/:traineeId', verifyToken, inbodyController.getLatestInbody)

router.post('/', verifyToken, inbodyController.insertInbody)

router.put('/', verifyToken, inbodyController.updateInbody)

router.delete('/:inbodyId', verifyToken, inbodyController.deleteInbody)

export default router
