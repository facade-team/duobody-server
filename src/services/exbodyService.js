import mongoose from 'mongoose'
import Trainee from '../models/trainee'
import Trainer from '../models/trainer'

const { Error } = mongoose

export default {
  pushExbody: async (option, traineeId, location) => {
    try {
      const trainee = await Trainee.findById(mongoose.Types.ObjectId(traineeId))
      if (option === 'before') {
        trainee.exbodyBefore = location
      } else {
        // option === 'after'
        trainee.exbodyAfter = location
      }
      await trainee.save()
      return location
    } catch (error) {
      throw new Error(error)
    }
  },
}
