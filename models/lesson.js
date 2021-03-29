import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const lessonSchema = new Schema({
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
    required: true,
  },

  //세션 참조 배열
  sessions: [
    {
      type: ObjectId,
      required: true,
      ref: 'Session',
    },
  ],

  //시작시간
  start: {
    type: Date,
  },

  //종료시간
  end: {
    type: Date,
  },
})

export default mongoose.model('Lesson', lessonSchema)
