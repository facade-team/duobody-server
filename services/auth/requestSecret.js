import Trainer from '../../models/trainer'
import { sendSecretMail, generateSecret } from '../utils/util'

const requestSecret = (req, res) => {
  const { name, password, userid } = req.body

  let newUser = null
  const create = (user) => {
    if (user) {
      throw new Error('user id exists')
    }
    else {
      newUser = Trainer.create(name, password, userid)
      return newUser
    }
  }

  const setNewUser = (user) => {
    newUser = user
    return Promise.resolve(true)
  }

  const updateSecretCode = (secret) => {
    console.log(secret)
    return Trainer.findOneAndUpdate({userid}, {secret}, {new: true})
  }

  const respond = () => {
    res.json({
      message: 'Send successfully'
    })
  }

  const onError = (error) => {
    res.status(409).json({
      message : error.message
    })
  }

  Trainer.findOneByUserId(userid)
    .then(create)
    .then(setNewUser)
    .then(generateSecret)
    .then(sendSecretMail)
    .then(updateSecretCode)
    .then(respond)
    .catch(onError)
}

export default requestSecret