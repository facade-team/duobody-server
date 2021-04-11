import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

const lessonSchema = new Schema({
  // trainee 참조
  traineeId: {
    type: ObjectId,
    required: true,
    ref: 'Trainee',
  },

  trainerId: {
    type: ObjectId,
    required: true,
  },

  // 시작시간
  start: {
    type: Date,
  },

  // 종료시간
  end: {
    type: Date,
  },

  // 세션 참조 배열
  sessions: [
    {
      type: ObjectId,
      required: true,
      ref: 'Session',
    },
  ],
})

export default mongoose.model('Lesson', lessonSchema)
