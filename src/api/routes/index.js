/* eslint-disable import/no-named-as-default */
import express from 'express'
import config from '../../config'
import authRouter from './auth'
import traineeRouter from './trainee'
import messengerRouter from './messenger'
import trainerRouter from './trainer'
import resUtil from '../../utils/resUtil'

const router = express.Router()

const { CODE, MSG } = config

// /api/auth
router.use('/auth', authRouter)

// /api/trainee
router.use('/trainee', traineeRouter)

router.use('/messenger', messengerRouter)

router.use('/trainer', trainerRouter)

router.use((req, res, next) => {
  return resUtil.fail(res, CODE.NOT_FOUND, MSG.ERROR_404)
})

router.use((err, req, res, next) => {
  return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.SERVER_ERROR)
})

export default router
