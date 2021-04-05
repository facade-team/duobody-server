import mongoose from 'mongoose'

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
  chatRommId: {
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
    default: new Date(),
    required: true,
  },
})

export default mongoose.Model('Message', messageSchema)
