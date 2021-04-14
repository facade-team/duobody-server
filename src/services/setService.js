import set from '../models/set'

export default {
  findById: async (setId) => {
    try {
      const result = set.findById(setId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  insertSet: async (sessionId, setNumber, weight, rep, minutes) => {
    try {
      const result = set.create({
        sessionId,
        set: setNumber,
        weight,
        minutes,
        rep,
      })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  deleteSet: async (setId) => {
    try {
      const result = set.findByIdAndDelete(setId)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  deleteSetBySessionId: async (sessionId) => {
    try {
      await set.deleteMany({ sessionId })
    } catch (error) {
      throw new Error(error)
    }
  },
}
