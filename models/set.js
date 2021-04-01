import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const setSchema = new Schema({
  //세션 참조
  sid: {
    type: ObjectId,
    required: true,
    ref: 'Session',
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
