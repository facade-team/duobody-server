import Trainer from '../../models/trainer'
import { generateToken } from '../utils/util'

const login = async (req, res) => {
  const { userid, password } = req.body

  const check = (trainer) => {
    if (trainer.verify(password)) {
      const token = generateToken(userid)
      return token
    }

    throw new Error('Login Failed')
  }

  try {
    const trainer = await Trainer.findOneByUserId(userid)
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
