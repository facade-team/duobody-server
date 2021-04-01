import Trainee from '../../models/trainee'
import Trainer from '../../models/trainer'

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
      throw error
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
      throw error
    }
  },
}
