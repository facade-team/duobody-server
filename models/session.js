import mongoose from 'mongoose'

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema

const sessionSchema = new Schema({
  //레슨 참조
  lid: {
    type: ObjectId,
    required: true,
    ref: 'Lesson'
  },

  //부위
  part: {
    type: String,
    required: true,
  },

  //운동종류
  field: {
    type: String,
    required: true,
  },

  //세트 참조 배열
  sets: [
    {
      type: ObjectId,
      required: true,
      ref: 'Set'
    }
  ]
})

export default mongoose.Model('Session', sessionSchema)