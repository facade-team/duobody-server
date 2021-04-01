import config from '../config'
import {
  generateSecret,
  generateToken,
  sendSecretMail,
} from '../utils/authUtil'

import Trainer from '../models/trainer'
import authService from '../services/authService'
import resUtil from '../utils/resUtil'

const { CODE, MSG } = config

export default {
  register: (req, res) => {
    // test below
    const { name, password, trainerId } = req.body
    let secret = ''

    const create = (trainer) => {
      if (trainer) {
        throw new Error(`${MSG.EXIST_TRAINER}`)
      }
      secret = generateSecret()
      return authService.create(name, password, trainerId, secret)
    }
    const execSendSecretMail = (trainer) => {
      sendSecretMail(name, secret)
      return Promise.resolve(trainer)
    }

    Trainer.findOne({ trainerId })
      .then(create)
      .then(execSendSecretMail)
      .then((trainer) => {
        resUtil.success(
          res,
          CODE.CREATED,
          MSG.SUCCESS_CREATE_TRAINER,
          trainer.id
        )
      })
      .catch((err) => {
        console.log(err)
        return resUtil.fail(
          res,
          CODE.INTERNAL_SERVER_ERROR,
          MSG.FAIL_CREATE_TRAINER
        )
      })
  },
  confirmSecret: async (req, res) => {
    const { trainerId, secret } = req.body
    let newTrainer = ''
    const checkIfExists = (trainer) => {
      if (!trainer) {
        throw new Error(`${MSG.NOT_EXIST_TRAINER}`)
      }
      return trainer
    }

    const checkSecret = (trainer) => {
      const realSecret = trainer.secret

      const p = new Promise((resolve, reject) => {
        if (realSecret === secret) {
          newTrainer = trainer
          resolve(trainer.updateOne({ isConfirmed: true }))
        } else {
          const err = new Error(`${MSG.WRONG_SECRET}`)
          reject(err)
        }
      })

      return p
    }

    Trainer.findOne({ trainerId })
      .then(checkIfExists)
      .then(checkSecret)
      .then(() => {
        resUtil.success(
          res,
          CODE.CREATED,
          MSG.SUCCESS_CONFIRM_SECRET,
          newTrainer.id
        )
      })
      .catch((err) => {
        console.log(err)
        return resUtil.fail(
          res,
          CODE.INTERNAL_SERVER_ERROR,
          MSG.FAIL_CONFIRM_SECRET
        )
      })
  },
  login: (req, res) => {
    const { trainerId, password } = req.body
    let newTrainer = ''

    const checkIfExists = (trainer) => {
      if (!trainer) {
        throw new Error(`${MSG.NOT_EXIST_TRAINER}`)
      } else {
        newTrainer = trainer
        return trainer
      }
    }

    const verifyPassword = (trainer) => {
      const p = new Promise((resolve, reject) => {
        if (trainer.isConfirmed) {
          if (authService.verify(password, trainer)) {
            resolve(generateToken(trainer._id, trainerId))
          } else {
            const err = new Error(`${MSG.WRONG_SECRET}`)
            reject(err)
          }
        } else {
          const err = new Error(`${MSG.FAIL_VERIFY}`)
          reject(err)
        }
      })
      return p
    }

    const passValues = (token) => {
      return Promise.resolve(token, newTrainer)
    }

    Trainer.findOne({ trainerId })
      .then(checkIfExists)
      .then(verifyPassword)
      .then(passValues)
      .then((token) => {
        console.log(newTrainer)
        res.json({
          success: true,
          statusCode: CODE.CREATED,
          msg: MSG.SUCCESS_LOGIN,
          data: newTrainer.id,
          token,
        })
      })
      .catch((err) => {
        console.log(err)
        return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_LOGIN)
      })
  },
}
