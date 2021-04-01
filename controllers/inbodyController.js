import config from '../config'
import resUtil from '../utils/resUtil'
import inbodyService from '../services/inbodyService'
import stringToDate from '../services/utils/date'

const { CODE, MSG } = config

export default {
  getInbodyInfoByDateTerm: async (req, res) => {
    try {
      const trainerId = req.user._id
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

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_INBODY)
    }
  },

  getInbodyInfoByDate: async (req, res) => {
    try {
      const trainerId = req.user._id
      const { traineeId } = req.params
      let { startDate } = req.params

      startDate = stringToDate(startDate)
      const result = await getInbodyInfoByDate(trainerId, traineeId, startDate)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_INBODY)
    }
  },

  getLatestInbody: async (req, res) => {
    /*
    GET /api/inbody/trainee/:traineeId/
    가장 최근의 인바디 정보를 가져오는 라우터
    */
    try {
      const trainerId = req.user._id
      const { traineeId } = req.params
      const result = await getLatestInbody(trainerId, traineeId)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_INBODY)
    }
  },

  getInbodyDate: async (req, res) => {
    try {
      const { traineeId } = req.params
      const result = await getInbodyDate(traineeId)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_INBODY, result)
    } catch (err) {
      console.error(err)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_INBODY)
    }
  },

  insertInbody: async (req, res) => {
    try {
      /*
        POST /api/inbody/
        body: {
          traineeId(hidden)
          weight,
          bmi,
          fat,
          skeletalMuscle,
          date
        }
      */

      const trainerId = req.user._id
      const { traineeId } = req.body
      const result = await insertInbody(trainerId, traineeId, req.body)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_CREATE_INBODY, result)
    } catch (err) {
      console.error(err)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_INBODY
      )
    }
  },

  updateInbody: async (req, res) => {
    try {
      /*
        PATCH /api/inbody/:inbodyId
        body: {
        }
      */

      const _id = req.params.inbodyId
      const result = await updateInbody(_id, req.body)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_UPDATE_INBODY, result)
    } catch (err) {
      console.error(err)
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
      const result = await deleteInbody(_id)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_DELETE_INBODY, result)
    } catch (err) {
      console.error(err)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_DELETE_INBODY
      )
    }
  },
}
