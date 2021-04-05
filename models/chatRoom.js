import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const chatRoomSchema = new Schema({
  trainerId: {
    type: ObjectId,
    ref: 'Trainer',
  },
  traineeId: {
    type: ObjectId,
    ref: 'Trainee',
  },
  messages: [
    {
      type: ObjectId,
      ref: 'Message',
    },
  ],
})

export default mongoose.model('Chatroom', chatRoomSchema)
