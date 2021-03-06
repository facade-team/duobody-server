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

  const handleOpen = () => logger.info('π§‘ Connected to DB')
  const handleError = (error) =>
    logger.error(`β Error on DB Connection: ${error}`)

  db.once('open', handleOpen) // open μ΄λ²€νΈκ° λ°μν  λ νλ²λ§ μ€ν
  db.on('error', handleError)
}

export default mongoLoader
