import mongoose from 'mongoose';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

//메신저
const messengerSchema = new Schema({
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

  //메신저내용 참조 배열
  messengerContents: [
    {
      type: ObjectId,
      required: true,
      ref: 'MessengerContent'
    }
  ],
})

export default mongoose.Model('Messenger', messengerSchema)