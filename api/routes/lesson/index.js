import express from 'express'
import Authenticate from '../middlewares/Authenticate'
// import { getLessons } from '../../../services/trainerService'

const router = express.Router()

router.route('/').get(Authenticate, async (req, res, next) => {
  /*
      GET /api/lessons
      트레이너의 모든 레슨들을 전송해주는 라우터
    */
  try {
    const lessons = await getLessons(req.user._id)
    res.json(lessons)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

export default router
