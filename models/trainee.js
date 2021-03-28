import mongoose from 'mongoose'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

// 회원
const traineeSchema = new Schema({
  // 트레이너 참조
  trainerId: {
    type: ObjectId,
    required: true,
    ref: 'Trainer',
  },

  // 이름
  name: {
    type: String,
    required: true,
  },

  // 주소
  address: {
    type: String,
  },

  // 키
  height: {
    type: Number,
  },

  // 생일
  birth: {
    type: Date,
  },

  // 핸드폰 번호
  phoneNumber: {
    type: String,
  },

  // exbody before
  exbodyBefore: {
    type: String,
  },

  // exbody after
  exbodyAfter: {
    type: String,
  },

  // 특이사항
  note: {
    type: String,
  },

  // 목표
  purpose: {
    type: String,
  },
})

export default mongoose.Model('Trainee', traineeSchema)
