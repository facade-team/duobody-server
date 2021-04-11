/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose'
import ChatRoom from '../models/chatRoom'
import Message from '../models/message'
import Trainer from '../models/trainer'
import Trainee from '../models/trainee'

const { Error } = mongoose

export default {
  findOurChatRoom: async (trainerId, traineeId) => {
    try {
      traineeId = mongoose.Types.ObjectId(traineeId)
      const chatRoom = await ChatRoom.findOne({ trainerId, traineeId })
      return chatRoom
    } catch (error) {
      throw new Error(error)
    }
  },
  createChatRoom: async (trainerId, traineeId) => {
    try {
      traineeId = mongoose.Types.ObjectId(traineeId)
      const chatRoom = await ChatRoom.create({ trainerId, traineeId })
      return chatRoom
    } catch (error) {
      throw new Error(error)
    }
  },
  insertChatRoomId: async (trainerId, traineeId, chatRoom) => {
    try {
      traineeId = mongoose.Types.ObjectId(traineeId)
      const trainer = await Trainer.findByIdAndUpdate(
        trainerId,
        { $push: { chatRoomIds: chatRoom._id } },
        { new: true }
      )

      const trainee = await Trainee.findByIdAndUpdate(
        traineeId,
        { chatRoomId: chatRoom._id },
        { new: true }
      )

      return { trainer, trainee }
    } catch (error) {
      throw new Error(error)
    }
  },
  getChatRoomList: async (trainerId) => {
    try {
      const chatRoomList = await Trainer.findById(trainerId, {
        chatRoomIds: 1,
        _id: 0,
      }).populate({
        path: 'chatRoomIds',
        populate: { path: 'trainerId traineeId', select: 'name' },
      })
      return chatRoomList
    } catch (error) {
      throw new Error(error)
    }
  },
  getChatRoomInfo: async (chatRoomId) => {
    try {
      chatRoomId = mongoose.Types.ObjectId(chatRoomId)
      const chatRoomInfo = await ChatRoom.findById(chatRoomId).populate({
        path: 'trainerId traineeId messages',
        select: 'name createdAt content',
      })
      return chatRoomInfo
    } catch (error) {
      throw new Error(error)
    }
  },
  sendMessage: async (chatRoomId, trainerId, content) => {
    try {
      chatRoomId = mongoose.Types.ObjectId(chatRoomId)
      // trainer 가 속한 chatRoom 이 맞는지 검사
      const chatRoom = await ChatRoom.findOne({ _id: chatRoomId, trainerId })
      // trainer 가 속한 chatRoom 이 아니면 에러 throw
      if (!chatRoom) throw new Error()
      // console.log(chatRoom)
      const message = await Message.create({
        from: chatRoom.trainerId,
        to: chatRoom.traineeId,
        chatRoomId: chatRoom._id,
        content,
      })
      // 최근 메시지가 배열의 앞에 삽임됨.
      chatRoom.messages.unshift(message._id)
      await chatRoom.save()
      return message
    } catch (error) {
      throw new Error(error)
    }
  },
}
