import Trainer from '../../models/trainer'
import { sendSecretMail, generateSecret } from '../utils/util'

const requestSecret = (req, res) => {
  const { name, password, userid } = req.body

  const check = (userid) => {
    if (userid) {
      throw new Error('user id exists')
    }
    else {
      console.log('go!')
      return true
    }
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
    .then(check)
    .then(generateSecret)
    .then(sendSecretMail)
    .then(respond)
    .catch(onError)
}

export default requestSecret