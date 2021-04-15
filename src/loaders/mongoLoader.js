import mongoose from 'mongoose'
import config from '../config'
import { logger } from '../config/winston'

const mongoLoader = () => {
  mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  const db = mongoose.connection

  const handleOpen = () => logger.info('🧡 Connected to DB')
  const handleError = (error) =>
    logger.error(`❌ Error on DB Connection: ${error}`)

  db.once('open', handleOpen) // open 이벤트가 발생할 때 한번만 실행
  db.on('error', handleError)
}

export default mongoLoader
