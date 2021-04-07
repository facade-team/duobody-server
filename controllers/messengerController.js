import mongoose from 'mongoose'
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
  getAllChatRooms: async (req, res) => {},
  getChatRoom: async (req, res) => {},
  sendMessage: async (req, res) => {},
}
