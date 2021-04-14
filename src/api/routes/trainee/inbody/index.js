import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import inbodyController from '../../../../controllers/inbodyController'

const router = express.Router()

//날짜 구간 인바디 검색
router.get(
  '/:traineeId/inbody/date/:startDate/:endDate',
  verifyToken,
  inbodyController.getInbodyInfoByDateTerm
)

router.get(
  '/:traineeId/inbody/date/:date',
  verifyToken,
  inbodyController.getInbodyInfoByDate
)

//trainee의 최신 인바디 정보
router.get(
  '/:traineeId/inbody/latest',
  verifyToken,
  inbodyController.getLatestInbody
)

//trainee의 모든 인바디 날짜 정보
router.get('/:traineeId/inbody', verifyToken, inbodyController.getInbodyDate)

router.post('/inbody', verifyToken, inbodyController.insertInbody)

router.put('/inbody', verifyToken, inbodyController.updateInbody)

router.delete(
  '/:traineeId/inbody/:inbodyId',
  verifyToken,
  inbodyController.deleteInbody
)

export default router
