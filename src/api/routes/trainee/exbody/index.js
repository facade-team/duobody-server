import express from 'express'
import verifyToken from '../../../../middlewares/verifyToken'
import uploadExbody from '../../../../middlewares/fileUpload'
import exbodyController from '../../../../controllers/exbodyController'

const router = express.Router()

router.get('/:traineeId', verifyToken, exbodyController.readExbody) // exbody 불러오기

router.post(
  '/:traineeId/before',
  verifyToken,
  uploadExbody,
  exbodyController.pushExbodyBefore
) // exbody before push

router.post(
  '/:traineeId/after',
  verifyToken,
  uploadExbody,
  exbodyController.pushExbodyAfter
) // exbody after push

export default router
