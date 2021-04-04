import config from '../config'
import resUtil from '../utils/resUtil'
import sessionService from '../services/sessionService'
import stringToDate from '../utils/date'

const { CODE, MSG } = config

export default {
  getSessionByDate: async (req, res) => {
    if (!req.params.traineeId || !req.params.date) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.FAIL_READ_SESSION)
    }

    try {
      const { traineeId } = req.params
      let { date } = req.params

      date = stringToDate(date)

      const result = await sessionService.getSessionByDate(traineeId, date)

      if (!result[0]) {
        return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_SESSION, null)
      }

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_SESSION, result)
    } catch (error) {
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_SESSION
      )
    }
  },

  insertSession: async (req, res) => {
    if (!req.body.traineeId || !req.body.date) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }
    try {
      const { traineeId, date } = req.body.traineeId

      const result = sessionService.insertSession(traineeId, date)

      return resUtil.success(
        req,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_SESSION,
        result
      )
    } catch (error) {
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_SESSION
      )
    }
  },
}
