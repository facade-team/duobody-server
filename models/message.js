import mongoose from 'mongoose'
import moment from 'moment'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

// 메신저 내용
const messageSchema = new Schema({
  // 보내는 사람
  from: {
    type: ObjectId,
    required: true,
  },
  // 받는 사람
  to: {
    type: ObjectId,
    required: true,
  },

  // 채팅룸 참조
  chatRoomId: {
    type: ObjectId,
    required: true,
    ref: 'Chatroom',
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: moment(),
    required: true,
  },
})

export default mongoose.model('Message', messageSchema)
