import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const setSchema = new Schema({
  //세션 참조
  sessionId: {
    type: ObjectId,
    required: true,
    ref: 'Session',
  },

  set: {
    type: Number,
    required: true,
  },

  //무게
  weight: {
    type: Number,
    required: true,
  },

  //횟수
  rep: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Set', setSchema)
