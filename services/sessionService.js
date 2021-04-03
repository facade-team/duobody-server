import session from '../models/session'

export default {
  getSessionByDate: async (traineeId, date) {
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
      //// TODO: 여기서부터!
    } catch (error) {
      throw new Error(error)
    }
  },
}
