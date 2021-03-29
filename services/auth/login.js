import Trainer from '../../models/trainer'
import { generateToken } from '../utils/util'

const login = (req, res) => {
  const { trainerId, password } = req.body

  const checkIfExists = (trainer) => {
    if (!trainer) {
      throw new Error('Trainer does not exist')
    } else {
      return trainer
    }
  }

  const verifyPassword = (trainer) => {
    const p = new Promise((resolve, reject) => {
      if (trainer.isConfirmed) {
        if (trainer.verify(password)) {
          resolve(generateToken(trainer._id, trainerId))
        } else {
          const err = new Error('Wrong password')
          reject(err)
        }
      } else {
        const err = new Error('Not verified')
        reject(err)
      }
    })
    return p
  }

  const respond = (token) => {
    res.json({
      message: 'Verified successfully.',
      token,
    })
  }

  const onError = (error) => {
    res.status(409).json({
      error: 409,
      message: error.message,
    })
  }

  Trainer.findOne({ trainerId })
    .then(checkIfExists)
    .then(verifyPassword)
    .then(respond)
    .catch(onError)
}

export default login
