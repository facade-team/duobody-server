import lesson from '../models/lesson'
import config from '../config'

const { MSG, CODE } = config

export default {
  findById: async (lessonId) => {
    try {
      const result = await lesson.findById(lessonId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getLessons: async (traineeId) => {
    try {
      const result = await lesson.find({ traineeId }, { _id: 1 })

      return result
    } catch (error) {
      throw new Error()
    }
  },

  // 날짜 정보만 추출
  getLessonMonthDate: async (traineeId, thisMonth, nextMonth) => {
    try {
      const result = await lesson
        .find(
          {
            traineeId,
          },
          {
            start: 1,
          }
        )
        .where('start')
        .gte(thisMonth)
        .where('end')
        .lt(nextMonth)
        .sort('-start')

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  //trainee의 모든 레슨날짜
  getLessonDate: async (traineeId) => {
    try {
      const result = await lesson.find({ traineeId }, { start: 1 })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  //날짜로 trainee의 레슨 조회
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
      const result = await lesson
        .findById(_id)
        .populate({
          path: 'sessions',
          populate: {
            path: 'sets',
            options: { sort: { set: 1 } },
          },
        })
        .lean()

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getTrainerLessonDateByMonth: async (trainerId, thisMonth, nextMonth) => {
    try {
      const result = await lesson
        .find({}, { start: true })
        .where('trainerId')
        .equals(trainerId)
        .where('start')
        .gte(thisMonth)
        .where('end')
        .lt(nextMonth)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getTrainerLessonByDate: async (trainerId, today, tomorrow) => {
    try {
      const result = await lesson
        .find({}, { traineeId: true, name: true, start: true, end: true })
        .where('trainerId')
        .equals(trainerId)
        .where('start')
        .gte(today)
        .where('end')
        .lt(tomorrow)
        .populate({
          path: 'traineeId',
          // select: ',
        })
        .sort('start')

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getAllTrainerLesson: async (trainerId) => {
    try {
      const result = await lesson
        .find({ trainerId }, { start: true })
        .sort('start')

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  insertLesson: async (trainerId, traineeId, startTime, endTime) => {
    try {
      const check = await lesson.find({
        $or: [
          {
            $and: [{ start: { $lte: startTime } }, { end: { $gt: startTime } }],
          },
          {
            $and: [{ start: { $lt: endTime } }, { end: { $gte: endTime } }],
          },
        ],
      })
      if (check.length) {
        return null
      }

      const result = await lesson.create({
        trainerId,
        traineeId,
        start: startTime,
        end: endTime,
      })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  pushSession: async (lessonId, sessionIds) => {
    try {
      const result = await lesson.findByIdAndUpdate(
        lessonId,
        {
          $push: {
            sessions: sessionIds,
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
