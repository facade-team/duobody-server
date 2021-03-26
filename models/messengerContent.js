import mongoose from 'mongoose';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

//메신저 내용
const messengerContentSchema = new Schema({
  //회원 참조
  uid: {
    type: ObjectId,
    required: true,
    ref: 'Trainee'
  },

  //트레이너 참조
  tid: {
    type: ObjectId,
    required: true,
    ref: 'Trainer'
  },

  //메신저 참조
  mid: {
    type: ObjectId,
    required: true,
    ref: 'Messenger',
  },

  content: {
    type: String,
    required: true,
  },
})

export default mongoose.Model('MessengerContent', messengerContentSchema)