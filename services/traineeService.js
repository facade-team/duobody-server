import { Error } from 'mongoose'
import Trainee from '../models/trainee'
import Trainer from '../models/trainer'

export default {
  checkTrainee: async (phoneNumber) => {
    try {
      const trainee = await Trainee.findOne({ phoneNumber })
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
  createTrainee: async (name, phoneNumber, address, age, height) => {
    try {
      const trainee = await Trainee.create({
        name,
        phoneNumber,
        address,
        age,
        height,
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
  readAllTrainees: async () => {
    try {
      const traineeList = await Trainee.find({})
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
  updateTrainee: async (traineeId, name, phoneNumber, address, age, height) => {
    try {
      const trainee = await Trainee.findByIdAndUpdate(
        traineeId,
        {
          name,
          phoneNumber,
          address,
          age,
          height,
        },
        { new: true }
      )
      return trainee
    } catch (error) {
      throw new Error(error)
    }
  },
}
