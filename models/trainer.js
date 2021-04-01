import mongoose from 'mongoose'
import crypto from 'crypto'

const { Schema } = mongoose
const {
  Types: { ObjectId },
} = Schema

// 트레이너
const trainerSchema = new Schema({
  // 이름
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // 비밀번호
  password: {
    type: String,
    required: true,
    trim: true,
  },

  // 아이디
  trainerId: {
    type: String,
    required: true,
    trim: true,
  },

  // 시크릿 코드
  secret: {
    type: String,
    required: true,
  },

  // 인증 확인
  isConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },

  // trainee 참조목록
  traineeIds: [
    {
      type: ObjectId,
      ref: 'Trainee',
    },
  ],
})

trainerSchema.statics.findOneByUserId = function (trainerId) {
  return this.findOne({
    trainerId,
  }).exec()
}

trainerSchema.statics.findOneByUserIdAndUpdate = function (trainerId, secret) {
  try {
    this.findOneAndUpdate(
      { trainerId },
      { $set: { secret } },
      { returnNewDocument: true }
    )
  } catch (err) {
    console.log(err)
  }
}

// 기존 몽구스 모델함수를 오버라이딩 하는 것은 안좋아보임
trainerSchema.statics.create = function (name, password, trainerId, secret) {
  const encrypted = crypto
    .createHmac('sha1', process.env.SECRET)
    .update(password)
    .digest('base64')

  const trainer = new this({
    name,
    password: encrypted,
    trainerId,
    secret,
    isConfirmed: false,
  })
  return trainer.save()
}

trainerSchema.methods.verify = function (password) {
  const encrypted = crypto
    .createHmac('sha1', process.env.SECRET)
    .update(password)
    .digest('base64')

  return this.password === encrypted
}

export default mongoose.model('Trainer', trainerSchema)
