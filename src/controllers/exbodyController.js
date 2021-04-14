import config from '../config'
import resUtil from '../utils/resUtil'
import exbodyService from '../services/exbodyService'
import traineeService from '../services/traineeService'

const { CODE, MSG } = config

export default {
  readExbody: async (req, res) => {
    try {
      const { traineeId } = req.params
      const trainee = await traineeService.readOneTrainee(traineeId)
      const exbodies = {
        exbodyBefore: trainee.exbodyBefore,
        exbodyAfter: trainee.exbodyAfter,
      }
      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_EXBODY, exbodies)
    } catch (error) {
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_EXBODY)
    }
  },
  pushExbodyBefore: async (req, res) => {
    try {
      const { traineeId } = req.params
      const { location } = req.file
      // s3의 path 값을 DB에 저장
      const result = await exbodyService.pushExbody(
        'before',
        traineeId,
        location
      )
      return resUtil.success(
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_EXBODYBEFORE,
        result
      )
    } catch (error) {
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_EXBODYBEFORE
      )
    }
  },
  pushExbodyAfter: async (req, res) => {
    try {
      const { traineeId } = req.params
      const { location } = req.file
      // s3의 path 값을 DB에 저장
      const result = await exbodyService.pushExbody(
        'after',
        traineeId,
        location
      )
      return resUtil.success(
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_EXBODYAFTER,
        result
      )
    } catch (error) {
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_EXBODYAFTER
      )
    }
  },
}
