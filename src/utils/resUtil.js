import { logger } from '../config/winston'

// respond 를 보낼 때, 파라미터만 넘겨주면 respond 를 자동으로 만들어주는 유틸함수

export default {
  success: (req, res, statusCode, msg, data = null) => {
    let message
    if (req.decoded) {
      if (req.errorStack) {
        message = `${req.method} ${req.originalUrl} ${statusCode} (requester: ${req.decoded._id})\nmessage: ${msg}\n${req.errorStack}\n`
      } else {
        message = `${req.method} ${req.originalUrl} ${statusCode} (requester: ${req.decoded._id})\nmessage: ${msg}\n`
      }
    } else {
      if (req.errorStack) {
        message = `${req.method} ${req.originalUrl} ${statusCode} \nmessage: ${msg}\n${req.errorStack}\n`
      } else {
        message = `${req.method} ${req.originalUrl} ${statusCode} \nmessage: ${msg}\n`
      }
    }

    logger.info(message)
    // data 는 defulat parameter 를 null 로 설정 (parameter 가 안 들어와도 됨)
    return res.status(statusCode).json({
      success: true,
      statusCode,
      msg,
      data,
    })
  },
  fail: (req, res, statusCode, msg, errorStack) => {
    let message
    if (req.decoded) {
      if (errorStack) {
        message = `${req.method} ${req.originalUrl} ${statusCode} (requester: ${req.decoded._id})\nmessage: ${msg}\n${errorStack}\n`
      } else {
        message = `${req.method} ${req.originalUrl} ${statusCode} (requester: ${req.decoded._id})\nmessage: ${msg}\n`
      }
    } else {
      if (errorStack) {
        message = `${req.method} ${req.originalUrl} ${statusCode} \nmessage: ${msg}\n${errorStack}\n`
      } else {
        message = `${req.method} ${req.originalUrl} ${statusCode} \nmessage: ${msg}\n`
      }
    }

    logger.error(message)
    return res.status(statusCode).json({
      success: false,
      statusCode,
      msg,
    })
  },
}
