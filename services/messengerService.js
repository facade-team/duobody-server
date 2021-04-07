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
}
