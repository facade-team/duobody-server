import express from 'express'
import registerTest from '../../../services/auth/register_test'

const router = express.Router()

router.get('/', (req, res) => {
  // 이런식으로 trainerId 뽑아낼 수 있음
  console.log(req.decoded.trainerId)

  res.json({
    success: true,
    info: req.decoded,
  })
})

router.post('/registertest', registerTest)

export default router
