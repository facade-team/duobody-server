/* eslint-disable import/extensions */
/* eslint-disable global-require */
import express from 'express'
import config from './config'
import { logger } from './config/winston'
import 'regenerator-runtime/runtime.js'

function startServer() {
  const app = express()

  require('./loaders').default(app)

  app.listen(config.PORT, () => {
    logger.info(`👌Express Server Running on PORT ${config.PORT}`)
  })
}

startServer()
