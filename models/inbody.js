import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const inbodySchema = new Schema({
  //trainer 참조
  trainerId: {
    type: ObjectId,
    required: true,
    ref: 'Trainer',
  },

  //trainee 참조
  traineeId: {
    type: ObjectId,
    required: true,
    ref: 'Trainee',
  },
  //몸무게
  weight: {
    type: Number,
  },

  //bmi
  bmi: {
    type: Number,
  },

  //체지방
  fat: {
    type: Number,
  },

  //골격근량
  skeletalMuscle: {
    type: Number,
  },

  //날짜
  date: {
    type: Date,
  },
})

export default mongoose.model('Inbody', inbodySchema)
