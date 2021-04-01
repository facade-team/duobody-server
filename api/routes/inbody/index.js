import express from 'express'
import { createTestAccount } from 'nodemailer'
import Authenticate from '../../../middlewares/Authenticate'
import {
  getLatestInbody,
  insertInbody,
  updateInbody,
  deleteInbody,
  getInbodyDate,
  getInbodyInfoByDate,
} from '../../../services/trainerService'
import { stringToDate } from '../../../services/date'

const router = express.Router()

router.get(
  '/trainee/:traineeId/date/:startDate/:endDate',
  Authenticate,
  async (req, res, next) => {
    try {
      const trainerId = req.user._id
      const { traineeId } = req.params
      let { startDate, endDate } = req.params

      startDate = stringToDate(startDate)
      endDate = stringToDate(endDate)

      const result = await getInbodyInfoByDate(
        trainerId,
        traineeId,
        startDate,
        endDate
      )

      res.json(result)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
)
router.get(
  '/trainee/:traineeId/date/:startDate',
  Authenticate,
  async (req, res, next) => {
    try {
      const trainerId = req.user._id
      const { traineeId } = req.params
      let { startDate } = req.params

      startDate = stringToDate(startDate)
      const result = await getInbodyInfoByDate(trainerId, traineeId, startDate)

      res.json(result)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
)

router.get('/trainee/:traineeId/date', Authenticate, async (req, res, next) => {
  try {
    const { traineeId } = req.params
    const date = await getInbodyDate(traineeId)

    console.log(date)
    res.json(date)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// /api/trainee/:traineeId/myinbody
router.get('/trainee/:traineeId', Authenticate, async (req, res, next) => {
  /*
  GET /api/inbody/trainee/:traineeId/
  가장 최근의 인바디 정보를 가져오는 라우터
  */
  try {
    const trainerId = req.user._id
    const { traineeId } = req.params
    const inbody = await getLatestInbody(trainerId, traineeId)

    return res.json(inbody)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/', Authenticate, async (req, res, next) => {
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

    // 입력값을 리턴할 필요가 있는지 잘 모르겠음
    return res.json(result)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.patch('/:inbodyId', Authenticate, async (req, res, next) => {
  try {
    /*
      PATCH /api/inbody/:inbodyId
      body: {
      }
    */

    const _id = req.params.inbodyId
    const result = await updateInbody(_id, req.body)

    return res.json(result)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:inbodyId', Authenticate, async (req, res, next) => {
  try {
    /*
      DELETE /api/inbody/:inbodyId
    */

    const _id = req.params.inbodyId
    const result = await deleteInbody(_id)
    console.log(result)
    res.json(result)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

export default router
