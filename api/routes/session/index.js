import express from 'express'
import Authenticate from '../middlewares/Authenticate'
// import { getDate } from '../../../services/sessionService'

const router = express.Router()

router.get('/', Authenticate, async (req, res, next) => {})

export default router
