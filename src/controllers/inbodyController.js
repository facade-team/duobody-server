import config from '../config'
import resUtil from '../utils/resUtil'
import inbodyService from '../services/inbodyService'
import traineeService from '../services/traineeService'
import { stringToDate } from '../utils/date'

const { CODE, MSG } = config

export default {
  getInbodyInfoByDateTerm: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const { traineeId } = req.params
      let { startDate, endDate } = req.params

      startDate = stringToDate(startDate)
      endDate = stringToDate(endDate)

      const result = await inbodyService.getInbodyInfoByDate(
        trainerId,
        traineeId,
        startDate,
        endDate
      )

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_INBODY
      )
    }
  },

  getInbodyInfoByDate: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const { traineeId } = req.params
      let { date } = req.params

      date = stringToDate(date)
      const result = await inbodyService.getInbodyInfoByDate(
        trainerId,
        traineeId,
        date
      )

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_INBODY
      )
    }
  },

  getLatestInbody: async (req, res) => {
    /*
    GET /api/inbody/trainee/:traineeId/
    가장 최근의 인바디 정보를 가져오는 라우터
    */

    try {
      const trainerId = req.decoded._id
      const { traineeId } = req.params

      if (!(await traineeService.readOneTrainee(traineeId))) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.FAIL_READ_INBODY)
      }

      const result = await inbodyService.getLatestInbody(trainerId, traineeId)

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_INBODY,
        error.stack
      )
    }
  },

  getInbodyDate: async (req, res) => {
    try {
      const { traineeId } = req.params
      const result = await inbodyService.getInbodyDate(traineeId)

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (err) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_INBODY
      )
    }
  },

  insertInbody: async (req, res) => {
    if (
      !req.body.date ||
      !req.body.traineeId ||
      !req.body.weight ||
      !req.body.bmi ||
      !req.body.fat ||
      !req.body.skeletalMuscle
    ) {
      return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }

    try {
      const trainerId = req.decoded._id
      const { traineeId } = req.body

      if (!(await traineeService.readOneTrainee(traineeId))) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.FAIL_READ_INBODY)
      }

      const result = await inbodyService.insertInbody(
        trainerId,
        traineeId,
        req.body
      )

      return resUtil.success(
        req,
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_INBODY,
        result
      )
    } catch (err) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_INBODY
      )
    }
  },

  updateInbody: async (req, res) => {
    if (
      !req.body.date ||
      !req.body.inbodyId ||
      !req.body.weight ||
      !req.body.bmi ||
      !req.body.fat ||
      !req.body.skeletalMuscle
    ) {
      return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }

    try {
      const result = await inbodyService.updateInbody(req.body)

      return resUtil.success(
        res,
        CODE.CREATED,
        MSG.SUCCESS_UPDATE_INBODY,
        result
      )
    } catch (err) {
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_UPDATE_INBODY
      )
    }
  },

  deleteInbody: async (req, res) => {
    try {
      /*
        DELETE /api/inbody/:inbodyId
      */

      const _id = req.params.inbodyId
      const result = await inbodyService.deleteInbody(_id)

      return resUtil.success(
        req,
        res,
        CODE.OK,
        MSG.SUCCESS_DELETE_INBODY,
        result
      )
    } catch (err) {
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_DELETE_INBODY
      )
    }
  },
}
