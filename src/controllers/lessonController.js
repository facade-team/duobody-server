import config from '../config'
import resUtil from '../utils/resUtil'
import lessonService from '../services/lessonService'
import sessionService from '../services/sessionService'
import setService from '../services/setService'
import {
  stringToDate,
  monthToDate,
  nextMonthToDate,
  getDate,
  dateToString,
} from '../utils/date'
import mongoose from 'mongoose'

const { CODE, MSG } = config

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
      const result = []

      lessonDate.forEach((object) => {
        result.push({ _id: object._id, date: getDate(object.start) })
      })

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      console.log(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_LESSON)
    }
  },

  getLessonDate: async (req, res) => {
    try {
      const { traineeId } = req.params

      const lessonDate = await lessonService.getLessonDate(traineeId)

      const result = []

      lessonDate.forEach((lesson) => {
        const date = dateToString(lesson.start)

        result.push({ _id: lesson._id, date: date })
      })

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_LESSON)
    }
  },

  getLessonByDate: async (req, res) => {
    if (!req.params.traineeId || !req.params.date) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.FAIL_READ_LESSON)
    }

    try {
      const { traineeId } = req.params
      let { date } = req.params

      date = stringToDate(date)

      const result = await lessonService.getLessonByDate(traineeId, date)

      if (!result[0]) {
        return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, null)
      }

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      console.log(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_LESSON)
    }
  },

  getLessonById: async (req, res) => {
    if (!req.params.lessonId) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.FAIL_READ_LESSON)
    }

    try {
      const { lessonId } = req.params

      const result = await lessonService.getLessonById(lessonId)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      console.log(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_LESSON)
    }
  },

  insertLesson: async (req, res) => {
    if (!req.body.traineeId || !req.body.start || !req.body.end) {
      return resUtil.fail(res, CODE.BAD_REQUEST, MSG.NULL_VALUE)
    }

    try {
      const trainerId = req.decoded._id
      const { traineeId, start, end } = req.body
      const sessions = req.body.session
      const sessionIds = []

      const lesson = await lessonService.insertLesson(
        trainerId,
        traineeId,
        start,
        end
      )
      const lessonId = lesson._id

      await Promise.all(
        //req.session 배열 순회
        sessions.map(async (sessionObject) => {
          const sessionId = new mongoose.Types.ObjectId()
          sessionIds.push(sessionId)
          await Promise.all(
            //req.session.sets 순회
            sessionObject.sets.map((setObject) => {
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
          ).then((values) => {
            const { part, field } = sessionObject
            return new Promise((resolve) => {
              //session 생성
              const sessionResult = sessionService.insertSesssion(
                sessionId,
                lessonId,
                {
                  part,
                  field,
                }
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
      ).then(async () => {
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
        res,
        CODE.CREATED,
        MSG.SUCCESS_CREATE_LESSON,
        result
      )
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, error.CODE, error.MSG)
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
        return resUtil.fail(res, CODE.BAD_REQUEST, MSG.OUT_OF_VALUE)
      }

      const result = await lessonService.deleteLesson(lessonId)

      const { sessions } = result

      let promises = sessions.map((sessionId) => {
        return new Promise((resolve) => {
          const session = sessionService.deleteSession(sessionId)
          resolve(session)
        })
      })

      let sets = []
      await Promise.all(promises).then((values) => {
        values.forEach((setObject) => {
          setObject.sets.forEach((setId) => {
            sets.push(setId)
          })
        })
      })

      promises = sets.map((setId) => {
        return new Promise((resolve) => {
          const set = setService.deleteSet(setId)
          resolve(set)
        })
      })

      await Promise.all(promises)

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_DELETE_LESSON, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(
        res,
        CODE.INTERNAL_SERVER_ERROR,
        MSG.FAIL_DELETE_LESSON
      )
    }
  },
}
