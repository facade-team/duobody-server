import Trainer from '../../models/trainer'
import { generateToken } from '../utils/util'

const login = async (req, res) => {
  const { trainerId, password } = req.body

  const check = (trainer) => {
    if (!trainer.isConfirmed) {
      throw new Error('Not verified')
    }
    if (trainer.verify(password)) {
      const token = generateToken(trainerId)
      return token
    }

    throw new Error('Login Failed')
  }

  try {
    const trainer = await Trainer.findOneByUserId(trainerId)
    if (!trainer) {
      throw new Error('User does not exist')
    } else {
      const token = check(trainer)
      res.json({
        message: 'logged in successfully',
        token,
      })
    }
  } catch (err) {
    res.json({
      message: err,
    })
  }
}

export default login
