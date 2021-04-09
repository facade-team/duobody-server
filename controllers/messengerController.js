/* eslint-disable no-underscore-dangle */
import config from '../config'
import resUtil from '../utils/resUtil'
import messengerService from '../services/messengerService'

const { CODE, MSG } = config

export default {
  createChatRoom: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const { traineeId } = req.body
      let chatRoom = await messengerService.findOurChatRoom(
        trainerId,
        traineeId
      )
      console.log(chatRoom) // null
      // trainerId 와 traineeId 로 생성된 chat room 이 없으면 먼저 room 생성
      if (!chatRoom) {
        chatRoom = await messengerService.createChatRoom(trainerId, traineeId)
      }
      // trainer 와 trainee 도큐먼트에 room id 값 insert
      await messengerService.insertChatRoomId(trainerId, traineeId)

      return resUtil.success(
        res,
        CODE.OK,
        MSG.SUCCESS_CREATE_CHATROOM,
        chatRoom
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_CHATROOM
      )
    }
  },
  // 트레이너의 모든 채팅방 조회
  getAllChatRooms: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      // trainer _id 로 chat room 리스트 불러오기
      const chatRoomList = await messengerService.getChatRoomList(trainerId)

      return resUtil.success(
        res,
        CODE.OK,
        MSG.SUCCESS_READ_ALL_CHATROOMS,
        chatRoomList
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_ALL_CHATROOMS
      )
    }
  },
  getChatRoomInfo: async (req, res) => {
    try {
      const { chatRoomId } = req.params
      const chatRoomInfo = await messengerService.getChatRoomInfo(chatRoomId)
      return resUtil.success(
        res,
        CODE.OK,
        MSG.SUCCESS_READ_CHATROOMINFO,
        chatRoomInfo
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_CHATROOMINFO
      )
    }
  },
  // 일단은 trainer 만 message 를 보낼 수 있음
  sendMessage: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const { chatRoomId } = req.params
      const { content } = req.body
      const result = await messengerService.sendMessage(
        chatRoomId,
        trainerId,
        content
      )
      return resUtil.success(
        res,
        CODE.CREATED,
        MSG.SUCCESS_SEND_MESSAGE,
        result
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_SEND_MESSAGE
      )
    }
  },
}
