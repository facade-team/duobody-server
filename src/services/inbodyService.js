/* eslint-disable class-methods-use-this */
import inbody from '../models/inbody'

export default {
  getLatestInbody: async (trainerId, traineeId) => {
    try {
      const inbodyInfo = await inbody
        .find()
        .where('trainerId')
        .equals(trainerId)
        .where('traineeId')
        .equals(traineeId)
        .sort('-date')
        .limit(1)
        .select({
          weight: 1,
          bmi: 1,
          fat: 1,
          skeletalMuscle: 1,
          date: 1,
        })

      return inbodyInfo[0]
    } catch (error) {
      throw new Error(error)
    }
  },

  insertInbody: async (trainerId, traineeId, inbodyInfo) => {
    try {
      const { weight, bmi, fat, skeletalMuscle, date } = inbodyInfo

      const result = await inbody.create({
        trainerId,
        traineeId,
        weight,
        bmi,
        fat,
        skeletalMuscle,
        date,
      })

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  updateInbody: async (inbodyInfo) => {
    try {
      const { inbodyId, weight, bmi, fat, skeletalMuscle, date } = inbodyInfo

      const result = await inbody.findByIdAndUpdate(
        inbodyId,
        { $set: { weight, bmi, fat, skeletalMuscle, date } },
        { new: true }
      )

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  deleteInbody: async (_id) => {
    try {
      const result = await inbody.findByIdAndDelete(_id)

      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  getInbodyDate: async function getInbodyDate(traineeId) {
    try {
      const date = await inbody
        .find()
        .where('traineeId')
        .equals(traineeId)
        .sort('-date')
        .select('date')

      return date
    } catch (error) {
      throw new Error(error)
    }
  },

  getInbodyInfoByDate: async (id, traineeId, startDate, endDate) => {
    /*
  endDate가 있으면 startDate ~ endDate까지의 인바디 정보를 리턴
  endDate가 없으면 startDate에 해당하는 인바디 정보를 리턴
  */
    try {
      const result = await inbody
        .find()
        .where('trainerId')
        .equals(id)
        .where('traineeId')
        .equals(traineeId)
        .where('date')
        .gte(startDate)
        .where('date')
        .lt(endDate)
        .sort('date')

      return result
    } catch (error) {
      throw new Error(error)
    }
  },
}
