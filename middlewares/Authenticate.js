import trainer from '../models/trainer'

export default async function (req, res, next) {
  try {
    const user = await trainer.findById('60604fd043e0af282f3be4ad')
    req.user = user
    next()
  } catch (err) {
    console.error(err)
    next(err)
  }
}
