import express from 'express'
import messengerContoller from '../../../controllers/messengerController'
import verifyToken from '../../../middlewares/verifyToken'

const router = express.Router()

/*---------------------------
  /api/messenger router
--------------------------- */

router.post('/', verifyToken, messengerContoller.createChatRoom) // chat room 생성
router.get('/', verifyToken, messengerContoller.getAllChatRooms) // chat room list 조회
router.get('/:chatRoomId', verifyToken, messengerContoller.getChatRoomInfo) // chat room 입장 후, 정보 불러오기
router.post('/:chatRoomId', verifyToken, messengerContoller.sendMessage) // message 보내기

export default router
