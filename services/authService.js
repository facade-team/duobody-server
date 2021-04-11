import crypto from 'crypto'
import Trainer from '../models/trainer'

export default {
  create: async (name, password, trainerId, secret) => {
    const encrypted = crypto
      .createHmac('sha1', process.env.SECRET)
      .update(password)
      .digest('base64')

    try {
      const trainer = await Trainer.create({
        name,
        password: encrypted,
        trainerId,
        secret,
        isConfirmed: false,
      })
      return trainer
    } catch (error) {
      throw new Error(error)
    }
  },
  verify: (password, trainer) => {
    const encrypted = crypto
      .createHmac('sha1', process.env.SECRET)
      .update(password)
      .digest('base64')

    return trainer.password === encrypted
  },
}
