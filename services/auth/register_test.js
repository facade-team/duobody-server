import Trainer from '../../models/trainer'
import { generateSecret, sendSecretMail } from '../utils/util'

const registerTest = (req, res) => {
  // test below
  const { name, password, trainerId } = req.body
  let secret = ''

  const create = (trainer) => {
    if (trainer) {
      throw new Error('TrainerId exists')
    } else {
      secret = generateSecret()
      return Trainer.create(name, password, trainerId, secret)
    }
  }

  const execSendSecretMail = () => {
    sendSecretMail(name, secret)
    return Promise.resolve(true)
  }

  const respond = () => {
    res.json({
      message: 'Registered successfully. Please verify the secret code.',
    })
  }

  const onError = (error) => {
    res.status(409).json({
      error: 409,
      message: error.message,
    })
  }

  Trainer.findOneByUserId(trainerId)
    .then(create)
    .then(execSendSecretMail)
    .then(respond)
    .catch(onError)
}

export default registerTest
