import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import api from '../api/routes'

const expressLoader = (app) => {
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors())

  app.use('/api', api)
}

export default expressLoader
