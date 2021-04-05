import express from 'express'
import messengerContoller from '../../../controllers/messengerController'
import verifyToken from '../../../middlewares/verifyToken'

const router = express.Router()

/*---------------------------
  /api/messenger router
--------------------------- */

router.get('/', verifyToken, messengerContoller.getAllChatRooms) // chat room list 조회
router.post('/', verifyToken, messengerContoller.createChatRoom) // chat room 생성
router.get('/:chatRoomId', verifyToken, messengerContoller.getChatRoom) // chat room 입장
router.post('/:chatRoomId', verifyToken, messengerContoller.sendMessage) // message 보내기

export default router