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

      let result = []

      lessons.forEach((lesson) => {
        const date = dateToString(lesson.start)
        result.push({ _id: lesson._id, date: date })
      })

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_LESSON)
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

      const result = []

      lessons.forEach((lesson) => {
        const startTime = getTime(lesson.start)
        const endTime = getTime(lesson.end)
        result.push({ _id: lesson._id, start: startTime, end: endTime })
      })

      return resUtil.success(res, CODE.OK, MSG.SUCCESS_READ_LESSON, result)
    } catch (error) {
      console.error(error)
      return resUtil.fail(res, CODE.INTERNAL_SERVER_ERROR, MSG.FAIL_READ_LESSON)
    }
  },
}
