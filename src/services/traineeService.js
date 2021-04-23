import mongoose from 'mongoose'
import Trainee from '../models/trainee'
import Trainer from '../models/trainer'

const { Error } = mongoose

export default {
  checkTrainee: async (phoneNumber) => {
    try {
      const trainee = await Trainee.findOne({ phoneNumber })
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
  createTrainee: async (
    name,
    phoneNumber,
    address,
    age,
    height,
    note,
    purpose
  ) => {
    try {
      const trainee = await Trainee.create({
        name,
        phoneNumber,
        address,
        age,
        height,
        note,
        purpose,
      })
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
  connectTrainerAndTrainee: async (trainerId, traineeId) => {
    try {
      const trainer = await Trainer.findById(trainerId)
      const trainee = await Trainee.findById(traineeId)
      trainer.traineeIds.push(trainee.id)
      await trainer.save()
      trainee.trainerId = trainer.id
      await trainee.save()
    } catch (error) {
      throw new Error(error)
    }
  },
  readMyTrainees: async (trainerId) => {
    try {
      const traineeList = await Trainee.find({ trainerId })
      return traineeList
    } catch (error) {
      throw new Error(error)
    }
  },
  readOneTrainee: async (traineeId) => {
    try {
      const trainee = await Trainee.findById(traineeId)
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
  updateTrainee: async (
    traineeId,
    name,
    phoneNumber,
    address,
    age,
    height,
    note,
    purpose
  ) => {
    try {
      const trainee = await Trainee.findByIdAndUpdate(
        traineeId,
        {
          name,
          phoneNumber,
          address,
          age,
          height,
          note,
          purpose,
        },
        { new: true }
      )
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
  updateNoteAndPurpose: async (traineeId, note, purpose) => {
    try {
      const trainee = await Trainee.findByIdAndUpdate(
        traineeId,
        {
          note,
          purpose,
        },
        { new: true }
      )
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
  getMyTrainerId: async (traineeId) => {
    try {
      const trainee = await Trainee.findById(mongoose.Types.ObjectId(traineeId))
      if (!trainee) {
        return
      }
      const { trainerId } = trainee
      return trainerId
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteTrainne: async (trainerId, traineeId) => {
    // parameter 로 넘어오는 trainerId, traineeId 둘 다 string 이여서 ObjectId 타입으로 변환해줘야한다.
    try {
      const trainee = await Trainee.findByIdAndDelete(
        mongoose.Types.ObjectId(traineeId)
      )
      const trainer = await Trainer.findById(mongoose.Types.ObjectId(trainerId))
      const traineeList = trainer.traineeIds
      const idx = traineeList.indexOf(mongoose.Types.ObjectId(traineeId))
      // 해당 idx 값이 없으면 바로 리턴으로 끝냄
      if (idx === -1) return
      traineeList.splice(idx, 1) // traineeList 에서 해당 traineeID 의 index 를 제거
      await trainer.save()
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
}
