import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  // 이런식으로 trainerId 뽑아낼 수 있음
  console.log(req.decoded.trainerId)

  res.json({
    success: true,
    info: req.decoded,
  })
})

export default router
