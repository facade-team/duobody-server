import winston from 'winston'
import moment from 'moment'
import util from 'util'
import winstonDaily from 'winston-daily-rotate-file'
import config from '..'

const logDir = config.PRODUCTION ? 'logs/dist' : 'logs/src'

const { combine, timestamp, printf } = winston.format

const _timestamp = winston.format(function (info, opts) {
  const prefix = util.format(
    '[%s] [%s]',
    moment().format('YYYY-MM-DD HH:mm:ss').trim(),
    info.level.toUpperCase()
  )
  if (info.splat) {
    info.message = util.format(
      '%s %s',
      prefix,
      util.format(info.message, ...info.splat)
    )
  } else {
    info.message = util.format('%s %s', prefix, info.message)
  }
  return info
})

const logFormat = printf((info) => {
  if (info.stack) {
    return `${info.level} - ${info.message}\n${info.stack}`
  }
  return `${info.level} - ${info.message}`
})

// FIXME: production 모드일때 시간이 제대로 안뜨는 문제가 있음
const options = {
  info: {
    level: 'info',
    dirname: `${logDir}/info`,
    filename: `%DATE%.log`, // 로그파일을 남길 경로
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 30,
    colorize: false,
    format: combine(_timestamp(), logFormat),
  },
  error: {
    level: 'error',
    dirname: `${logDir}/error`,
    filename: `%DATE%.error.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 30,
    colorize: false,
    format: combine(_timestamp(), logFormat),
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:MM:SS',
      }),
      logFormat
    ),
  },
}

const logger = new winston.createLogger({
  transports: [new winstonDaily(options.info), new winstonDaily(options.error)],
})

if (!config.PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  )
  process.on('uncaughtException', (error) => {
    console.log(error)
    process.exit(1)
  })
}

export { logger }
