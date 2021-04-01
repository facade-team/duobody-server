import express from 'express'
import Authenticate from '../middlewares/Authenticate'
import {
  getLatestInbody,
  insertInbody,
  updateInbody,
  deleteInbody,
} from '../../../services/trainerService'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('hello')
})

router.get('/trainee', (req, res, next) => {
  res.send('/trainee')
})

// /api/trainee/:traineeId/myinbody
router.get('/trainee/:traineeId', Authenticate, async (req, res, next) => {
  /*
  GET /api/inbodies/trainee/:traineeId/
  가장 최근의 인바디 정보를 가져오는 라우터
  */
  try {
    const trainerId = req.user._id
    const traineeId = req.params.traineeId
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
      POST /api/inbodies/
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
    const traineeId = req.body.traineeId
    const result = await insertInbody(trainerId, traineeId, req.body)

    //입력값을 리턴할 필요가 있는지 잘 모르겠음
    return res.json(result)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.patch('/:inbodyId', Authenticate, async (req, res, next) => {
  try {
    /*
      PATCH /api/inbodies/:inbodyId
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
      DELETE /api/inbodies/:inbodyId
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
