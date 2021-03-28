import Trainer from '../../models/trainer'

const confirmSecret = async (req, res) => {
  const { trainerId, secret } = req.body
  try {
    // trainer 조회
    const trainer = await Trainer.findOne({ trainerId })
    // 실제 db에 저장된 secret 코드
    const realSecret = trainer.secret

    if (secret === realSecret) {
      try {
        // secret 코드 인증 성공
        await trainer.updateOne({ isConfirmed: true })
        res.json({
          message: 'Verified successfully',
        })
      } catch (err) {
        res.json({
          message: err,
        })
      }
    } else {
      res.status(400).json({
        message: 'Wrong secret code',
      })
    }
  } catch (err) {
    res.json({
      message: err,
    })
  }
}

export default confirmSecret
