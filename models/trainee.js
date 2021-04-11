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

  // 나이
  age: {
    type: Number,
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

  // 목표하고 특이사항 필드는 trainee 생성 시에 받지말고,
  // 나중에 etc 탭에서 따로 받을거임

  // 특이사항
  note: {
    type: String,
  },

  // 목표
  purpose: {
    type: String,
  },

  chatRoomId: {
    type: ObjectId,
    ref: 'ChatRoom',
  },
})

export default mongoose.model('Trainee', traineeSchema)
