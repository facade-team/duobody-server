import mongoose from 'mongoose'
import crypto from 'crypto'

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema

//트레이너
const trainerSchema = new Schema({
  //이름
  name: {
    type: String,
    required: true,
    trim: true,
  },

  //비밀번호
  password: {
    type: String,
    required: true,
    trim: true,
  },

  //아이디
  userid: {
    type: String,
    required: true,
    trim: true,
  },

  //시크릿 코드
  secret: {
    type: String,
    default: null,
  },
})

trainerSchema.statics.findOneByUserId = function (userid) {
  return this.findOne({
    userid,
  }).exec()
}

trainerSchema.statics.create = function (name, password, userid) {
  const encrypted = crypto
    .createHmac('sha1', process.env.SECRET)
    .update(password)
    .digest('base64')
  
  const trainer = new this({
    name,
    password: encrypted,
    userid,
  })

  console.log(`userid is :${userid}`)
  return trainer.save()
}

trainerSchema.statics.verify = function (assword) {
  const encrypted = crypto
    .createHmac('sha1', process.env.SECRET)
    .update(password)
    .digest('base64')
  
  return this.password === encrypted
}

export default mongoose.model('Trainer', trainerSchema)