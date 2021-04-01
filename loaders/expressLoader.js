import express from 'express'
import cookieParser from 'cookie-parser'
<<<<<<< HEAD
import express from 'express'
=======
import cors from 'cors'
>>>>>>> 3fea66a2d3d5d28dcfb2347dd6a11bff1a09cd3c
import morgan from 'morgan'
import cors from 'cors'
import api from '../api/routes'

const expressLoader = (app) => {
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors())

  app.use('/api', api)
}

export default expressLoader
