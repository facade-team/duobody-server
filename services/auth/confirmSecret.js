import Trainer from '../../models/trainer'

const confirmSecret = async (req, res) => {
  const { trainerId, secret } = req.body

  const checkIfExists = (trainer) => {
    if (!trainer) {
      throw new Error('Trainer does not exist')
    } else {
      return trainer
    }
  }

  const checkSecret = (trainer) => {
    const realSecret = trainer.secret

    const p = new Promise((resolve, reject) => {
      if (realSecret === secret) {
        resolve(trainer.updateOne({ isConfirmed: true }))
      } else {
        const err = new Error('Wrong secret')
        reject(err)
      }
    })

    return p
  }

  const respond = () => {
    res.json({
      message: 'Verified successfully.',
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
    .then(checkSecret)
    .then(respond)
    .catch(onError)
}

export default confirmSecret
