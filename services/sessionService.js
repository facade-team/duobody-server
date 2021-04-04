import session from '../models/session'

export default {
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

  insertSesssion: async (traineeId, date) => {
    try {
    } catch (error) {
      throw new Error(error)
    }
  },
}
