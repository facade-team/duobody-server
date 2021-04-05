import mongoose from 'mongoose'
import config from '../config'
import resUitl from '../utils/resUtil'
import messengerService from '../services/messengerService'

const { CODE, MSG } = config

export default {
  createChatRoom: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const { traineeId } = req.body
      const chatRoom = await messengerService.findOurChatRoom(
        trainerId,
        traineeId
      )
      console.log(chatRoom) // null
      // trainerId 와 traineeId 로 생성된 chat room 이 없으면 먼저 room 생성

      // trainer 와 trainee 도큐먼트에 room id 값 필드 생성
      // message 도큐먼트 생성

      // chatRoom 도큐먼트의 messages 배열에 message id 값 push
    } catch (error) {}
  },
  getAllChatRooms: async (req, res) => {},
  getChatRoom: async (req, res) => {},
  sendMessage: async (req, res) => {},
}
