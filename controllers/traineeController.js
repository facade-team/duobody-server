import config from '../config'
import resUtil from '../utils/resUtil'
import traineeService from '../services/traineeService'

const { CODE, MSG } = config

export default {
  createTrainee: async (req, res) => {
    const trainerId = req.user._id // 나중에 token verify 해주는 미들웨어 생기면 그때 수정
    const { name, phoneNumber, address, age, height } = req.body
    // 모든 값이 null 이 아닌지 확인 -> 하나라도 null 이면 안 됨
    if (!name || !phoneNumber || !address || !age || !height) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }
    try {
      // 중복회원인지 검사 -> phoneNumber 로 판단
      const checkTrainee = await trainerService.checkTrainee(phoneNumber)
      // 중복회원이면 바로 res 리턴
      if (checkTrainee)
        return resUtil.fail(res, CODE.NOT_ACCEPTABLE, MSG.EXIST_TRAINEE)
      // 중복회원이 아니면 trainee 를 create 함
      const newTrainee = await trainerService.createTrainee(
        name,
        phoneNumber,
        address,
        age,
        height
      )
      // trainer 와 trainee 를 서로 연결시킴 ( id참조 )
      await trainerService.connectTrainerAndTrainee(trainerId, newTrainee.id)

      return resUtil.success(
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_TRAINEE,
        newTrainee.id
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_TRAINEE
      )
    }
  },
  readAllTrainees: async (req, res) => {
    // DB에서 모든 trainee 불러옴
    try {
      const traineeList = await trainerService.readAllTrainees()
      return resUtil.success(
        res,
        CODE.OK,
        MSG.SUCCESS_READ_TRAINEE,
        traineeList
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_TRAINEE
      )
    }
  },
  readOneTrainee: async (req, res) => {
    const {
      params: { traineeId },
    } = req
    try {
      const trainee = await trainerService.readOneTrainee(traineeId)
      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_TRAINEE, trainee)
    } catch (error) {
      console.log(error)
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.OUT_OF_VALUE)
    }
  },
  // request : name, phoneNumber, address, age, height, traineeId
  updateTrainee: async (req, res) => {
    const trainerId = req.user._id // 나중에 token verify 해주는 미들웨어 생기면 그때 수정
    // form 데이터 값 받아오고 에러핸들링
    const { name, phoneNumber, address, age, height, traineeId } = req.body
    if (!name || !phoneNumber || !address || !age || !height) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }
    // 자신의 trainee 인지 확인
    // console.log('1', typeof trainerId) // string
    // console.log('2', typeof (await traineeService.getMyTrainerId(traineeId))) // object
    try {
      if (
        trainerId !==
        (await traineeService.getMyTrainerId(traineeId)).toString()
      ) {
        return resUtil.fail(res, CODE.BAD_REQUEST, MSG.FAIL_READ_TRAINEE)
      }
      const trainee = await traineeService.updateTrainee(
        traineeId,
        name,
        phoneNumber,
        address,
        age,
        height
      )
      return resUtil.success(
        res,
        CODE.CREATED,
        MSG.SUCCESS_UPDATE_TRAINEE,
        trainee
      )
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_UPDATE_TRAINEE
      )
    }
  },
  deleteTrainee: async (req, res) => {
    const trainerId = req.user._id // 나중에 token verify 해주는 미들웨어 생기면 그때 수정
    const { traineeId } = req.body

    try {
      // 자신의 trainee 가 맞는지 확인
      if (
        trainerId !==
        (await traineeService.getMyTrainerId(traineeId)).toString()
      ) {
        return resUtil.fail(res, CODE.BAD_REQUEST, MSG.FAIL_READ_TRAINEE)
      }
      await traineeService.deleteTrainne(traineeId)
      return resUtil.success(res, CODE.OK, MSG.SUCCESS_DELETE_TRAINEE)
    } catch (error) {
      console.log(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_DELETE_TRAINEE
      )
    }
  },
}
