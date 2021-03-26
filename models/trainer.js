import mongoose from 'mongoose'

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
})

export default mongoose.Model('Trainer', trainerSchema)