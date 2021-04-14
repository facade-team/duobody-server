import session from '../models/session'

export default {
  findById: async (sessionId) => {
    try {
      const result = await session.findById(sessionId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getSessionByDate: async (traineeId, date) => {
    try {
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)

      const sessionInfo = await session
        .find()
        .where('traineeId')
        .equals(traineeId)
        .where('date')
        .gte(date)
        .where('date')
        .lt(endDate)

      return sessionInfo
    } catch (error) {
      throw new Error(error)
    }
  },

  getSessionById: async (_id) => {
    try {
      const result = await session.findById(_id)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  insertSesssion: async (_id, lessonId, part, field) => {
    try {
      const result = await session.create({
        _id,
        lessonId,
        part,
        field,
      })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  pushSet: async (sessionId, setId) => {
    try {
      const result = await session.findByIdAndUpdate(
        sessionId,
        {
          $push: {
            sets: setId,
          },
        },
        { new: true }
      )

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  deleteSession: async (sessionId) => {
    try {
      const result = await session.findByIdAndDelete(sessionId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  deleteSessionByLessionId: async (lessonId) => {
    try {
      const result = await session.deleteMany({
        lessonId,
      })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },
}
