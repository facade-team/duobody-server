import lesson from '../models/lesson'
import config from '../config'

const { MSG, CODE } = config

export default {
  findById: async (lessonId) => {
    try {
      const result = lesson.findById(lessonId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getLessonByDate: async (traineeId, date) => {
    try {
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)

      const result = await lesson
        .find()
        .where('traineeId')
        .equals(traineeId)
        .where('start')
        .gte(date)
        .where('end')
        .lt(endDate)
        .populate({
          path: 'sessions',
          populate: {
            path: 'sets',
            options: { sort: { set: 1 } },
          },
        })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getLessonById: async (_id) => {
    try {
      const result = await lesson.findById(_id).populate({
        path: 'sessions',
        populate: {
          path: 'sets',
          options: { sort: { set: 1 } },
        },
      })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  insertLesson: async (traineeId, start, end) => {
    try {
      const result = await lesson.create({
        traineeId,
        start,
        end,
      })

      return result
    } catch (error) {
      error.MSG = MSG.DB_ERROR
      error.CODE = CODE.INTERNAL_SERVER_ERROR
      throw new Error(error)
    }
  },

  pushSession: async (lessonId, sessionId) => {
    try {
      const result = await lesson.findByIdAndUpdate(
        lessonId,
        {
          $push: {
            sessions: sessionId,
          },
        },
        { new: true }
      )

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  deleteLesson: async (lessonId) => {
    try {
      const result = await lesson.findByIdAndDelete(lessonId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },
}
