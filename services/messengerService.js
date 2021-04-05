/* eslint-disable no-param-reassign */
import mongoose from 'mongoose'
import ChatRoom from '../models/chatRoom'
import Message from '../models/message'

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
}
