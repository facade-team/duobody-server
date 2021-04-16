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
  register: async (req, res) => {
    const { name, password, trainerId } = req.body
    try {
      const trainer = await Trainer.findOne({ trainerId })
      if (trainer) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.EXIST_TRAINER)
      }
      const secret = generateSecret()
      const createdTrainer = await authService.create(
        name,
        password,
        trainerId,
        secret
      )
      sendSecretMail(name, secret)
      return resUtil.success(
        req,
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_TRAINER,
        createdTrainer.id
      )
    } catch (err) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_TRAINER
      )
    }
  },
  confirmSecret: async (req, res) => {
    const { trainerId, secret } = req.body
    try {
      const trainer = await Trainer.findOne({ trainerId })
      // FIXME 이미 확인되었을 때 bad request 띄워줘야함
      if (!trainer) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.NOT_EXIST_TRAINER)
      }

      if (trainer.isConfirmed) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.ALLREADY_CONFIRMED)
      }

      const realSecret = trainer.secret
      if (realSecret === secret) {
        await trainer.updateOne({ isConfirmed: true })
        return resUtil.success(
          req,
          res,
          CODE.CREATED,
          MSG.SUCCESS_CONFIRM_SECRET,
          trainer.id
        )
      }
      return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.WRONG_SECRET_CODE)
    } catch (err) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_TRAINER
      )
    }
  },
  login: async (req, res) => {
    const { trainerId, password } = req.body
    try {
      const trainer = await Trainer.findOne({ trainerId })
      if (!trainer) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.NOT_EXIST_TRAINER)
      }
      if (!trainer.isConfirmed) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.FAIL_VERIFY)
      }
      if (!authService.verify(password, trainer)) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.WRONG_SECRET)
      }
      const token = await generateToken(trainer.id, trainerId)

      return res.json({
        success: true,
        statusCode: CODE.CREATED,
        msg: MSG.SUCCESS_LOGIN,
        data: trainer.id,
        token,
      })
    } catch (err) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_TRAINER
      )
    }
  },
}
