import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  })
})

export default router
