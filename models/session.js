import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const sessionSchema = new Schema({
  //trainee 참조
  traineeId: {
    type: ObjectId,
    required: true
  }

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
      ref: 'Set',
    },
  ],
})

export default mongoose.model('Session', sessionSchema)
