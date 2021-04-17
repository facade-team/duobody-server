import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
import config from '..'

const logDir = config.PRODUCTION ? 'dist/logs/' : 'src/logs'

const { combine, timestamp, printf } = winston.format

const logFormat = printf((info) => {
  if (info.stack) {
    return `${info.timestamp} ${info.level} - ${info.message}\n${info.stack}`
  }
  return `${info.timestamp} ${info.level} - ${info.message}`
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
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:MM:SS',
      }),
      logFormat
    ),
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
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:MM:SS',
      }),
      logFormat
    ),
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
