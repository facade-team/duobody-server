import config from '../config'
import resUtil from '../utils/resUtil'
import lessonService from '../services/lessonService'
import {
  dateToString,
  monthToDate,
  nextMonthToDate,
  stringToDate,
  stringToTomorrowDate,
  getTime,
} from '../utils/date'

const { CODE, MSG } = config
export default {
  getAllTrainerLesson: async (req, res) => {
    try {
      const trainerId = req.decoded._id

      const lessons = await lessonService.getAllTrainerLesson(trainerId)

      let result = []

      lessons.forEach((lesson) => {
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

  getTrainerLessonDateByMonth: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const month = req.params.month

      const thisMonth = monthToDate(month)
      const nextMonth = nextMonthToDate(thisMonth)

      const lessons = await lessonService.getTrainerLessonDateByMonth(
        trainerId,
        thisMonth,
        nextMonth
      )

      if (!lessons.length) {
        return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON)
      }

      let result = []

      lessons.forEach((lesson) => {
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

  getTrainerLessonByDate: async (req, res) => {
    try {
      const trainerId = req.decoded._id
      const date = req.params.date

      const today = stringToDate(date)
      const tomorrow = stringToTomorrowDate(date)

      const lessons = await lessonService.getTrainerLessonByDate(
        trainerId,
        today,
        tomorrow
      )

      if (!lessons.length) {
        return resUtil.success(req, res, CODE.OK, MSG.SUCCESS_READ_LESSON)
      }

      const result = []

      lessons.forEach((lesson) => {
        const startTime = getTime(lesson.start)
        const endTime = getTime(lesson.end)
        result.push({
          _id: lesson._id,
          name: lesson.traineeId.name,
          start: startTime,
          end: endTime,
          time: `${startTime} - ${endTime}`,
          traineeId: lesson.traineeId._id,
        })
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
}
