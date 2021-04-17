import config from '../config'
import resUtil from '../utils/resUtil'
import lessonService from '../services/lessonService'
import sessionService from '../services/sessionService'
import setService from '../services/setService'
import traineeService from '../services/traineeService'
import {
  stringToDate,
  monthToDate,
  nextMonthToDate,
  getDate,
  dateToString,
} from '../utils/date'
import mongoose from 'mongoose'

const { CODE, MSG } = config

const deleteOneLesson = async (lessonId) => {
  const result = await lessonService.deleteLesson(lessonId)

  const { sessions } = result

  await sessionService.deleteSessionByLessionId(lessonId)

  let promises = sessions.map((sessionId) => {
    return new Promise((resolve) => {
      setService.deleteSetBySessionId(sessionId)
      resolve()
    })
  })

  await Promise.all(promises)

  return result
}

export default {
  getLessonMonthDate: async (req, res) => {
    try {
      const { traineeId, month } = req.params

      const thisMonth = monthToDate(month)
      const nextMonth = nextMonthToDate(month)

      let lessonDate = await lessonService.getLessonMonthDate(
        traineeId,
        thisMonth,
        nextMonth
      )

      if (!lessonDate.length) {
        return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON)
      }

      const result = []

      lessonDate.forEach((object) => {
        result.push({ _id: object._id, date: getDate(object.start) })
      })

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_LESSON,
        error.stack
      )
    }
  },

  getLessonDate: async (req, res) => {
    try {
      const { traineeId } = req.params

      const lessonDate = await lessonService.getLessonDate(traineeId)

      if (!lessonDate.length) {
        return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON)
      }
      const result = []

      lessonDate.forEach((lesson) => {
        const date = dateToString(lesson.start)

        result.push({ _id: lesson._id, date: date })
      })

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_LESSON,
        error.stack
      )
    }
  },

  getLessonByDate: async (req, res) => {
    if (!req.params.traineeId || !req.params.date) {
      return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.FAIL_READ_LESSON)
    }

    try {
      const { traineeId } = req.params
      let { date } = req.params

      date = stringToDate(date)

      const result = await lessonService.getLessonByDate(traineeId, date)

      if (!result.length) {
        return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON, null)
      }

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_LESSON,
        error.stack
      )
    }
  },

  getLessonById: async (req, res) => {
    if (!req.params.lessonId) {
      return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.FAIL_READ_LESSON)
    }

    try {
      const { lessonId } = req.params

      const result = await lessonService.getLessonById(lessonId)

      return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_READ_LESSON,
        error.stack
      )
    }
  },

  insertLesson: async (req, res) => {
    if (!req.body.traineeId || !req.body.start || !req.body.end) {
      return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }

    try {
      const trainerId = req.decoded._id
      const { traineeId, start, end } = req.body
      const sessions = req.body.session
      const sessionIds = []

      // realTrainerId: trainee 의 DB 에 저장된 trainerId 값
      const realTrainerId = await traineeService.getMyTrainerId(traineeId)
      // realTrainerId 에 null 이 들어왔다는 것은 request 로 보낸 traineeId 값이 잘못됐다는 것
      if (!realTrainerId) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.WRONG_TRAINEE_ID)
      }
      // trainee DB의 trainerId 와 접속한 트레이너의 Id 값이 맞지 않음
      if (trainerId !== realTrainerId.toString()) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.WRONG_TRAINEE_ID)
      }

      const lesson = await lessonService.insertLesson(
        trainerId,
        traineeId,
        start,
        end
      )

      if (lesson == null) {
        return resUtil.fail(
          req,
          res,
          CODE.BAD_REQUEST,
          MSG.LESSON_EXIST_AT_THE_TIME
        )
      }

      const lessonId = lesson._id

      if (!sessions) {
        return resUtil.success(
          req,
          res,
          CODE.CREATED,
          MSG.SUCCESS_CREATE_LEASSON,
          lesson
        )
      }
      //req.session 배열 순회
      const sessionPromises = sessions.map(async (sessionObject) => {
        const sessionId = new mongoose.Types.ObjectId()
        sessionIds.push(sessionId)

        //req.session.sets 순회
        let setPromises = sessionObject.sets.map((setObject) => {
          return new Promise((resolve) => {
            const { set, weight, rep, minutes } = setObject
            //set 생성
            const setResult = setService.insertSet(
              sessionId,
              set,
              weight,
              rep,
              minutes
            )

            resolve(setResult)
          })
        })

        await Promise.all(setPromises).then((values) => {
          const { part, field } = sessionObject
          return new Promise((resolve) => {
            //session 생성
            const sessionResult = sessionService.insertSesssion(
              sessionId,
              lessonId,
              part,
              field
            )
            if (sessionResult) resolve(sessionResult)
          }).then(async () => {
            await Promise.all(
              // 생성된 session배열 순회
              values.map((setObject) => {
                return new Promise((resolve) => {
                  //생성한 session의 sets에 setId정보 push
                  const sessionResult = sessionService.pushSet(
                    sessionId,
                    setObject._id
                  )

                  if (sessionResult) {
                    resolve(sessionResult)
                  }
                })
              })
            )
          })
        })
      })

      await Promise.all(sessionPromises).then(async () => {
        //sessionId 배열 순회
        let promises = sessionIds.map((sessionId) => {
          return new Promise((resolve) => {
            // 생성된 lesson의 sessions에 sessionId push
            const lessonResult = lessonService.pushSession(lessonId, sessionId)

            resolve(lessonResult)
          })
        })

        await Promise.all(promises)
      })

      const result = await lessonService.getLessonById(lessonId)

      return resUtil.success(
        req,
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_LESSON,
        result
      )
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_CREATE_LESSON,
        error.stack
      )
    }
  },

  deleteLesson: async (req, res) => {
    if (!req.params.lessonId) {
      return resUtil.fail(req, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }
    try {
      const { lessonId } = req.params

      const checkExist = await lessonService.findById(lessonId)

      if (!checkExist) {
        return resUtil.fail(req, res, CODE.BAD_REQUEST, MSG.OUT_OF_VALUE)
      }

      const result = await deleteOneLesson(lessonId)

      return resUtil.success(
        req,
        res,
        CODE.OK,
        MSG.SUCCESS_DELETE_LESSON,
        result
      )
    } catch (error) {
      return resUtil.fail(
        req,
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_DELETE_LESSON,
        error.stack
      )
    }
  },

  deleteOneLesson,
}
