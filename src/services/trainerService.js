/* eslint-disable class-methods-use-this */

import inbody from '../models/inbody'

async function getLatestInbody(trainerId, traineeId) {
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
  } catch (err) {
    throw new Error(err)
  }
}

async function insertInbody(trainerId, traineeId, inbodyInfo) {
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
  } catch (err) {
    throw new Error(err)
  }
}

async function updateInbody(_id, inbodyInfo) {
  try {
    const { weight, bmi, fat, skeletalMuscle, date } = inbodyInfo

    const result = await inbody.findByIdAndUpdate(
      _id,
      { $set: { weight, bmi, fat, skeletalMuscle, date } },
      { new: true }
    )

    return result
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteInbody(_id) {
  try {
    const result = await inbody.findByIdAndDelete(_id)

    return result
  } catch (err) {
    throw new Error(err)
  }
}

async function getInbodyDate(traineeId) {
  try {
    const date = await inbody
      .find()
      .where('traineeId')
      .equals(traineeId)
      .sort('-date')
      .select('date')

    return date
  } catch (err) {
    throw new Error(err)
  }
}

async function getInbodyInfoByDate(id, traineeId, startDate, endDate) {
  /*
  endDate가 있으면 startDate ~ endDate까지의 인바디 정보를 리턴
  endDate가 없으면 startDate에 해당하는 인바디 정보를 리턴
  */
  try {
    if (endDate) {
      // 기간을 설정하여 인바디 정보를 요청할 때
      endDate.setDate(endDate.getDate() + 1)
    } else {
      // 날짜를 지정하여 인바디 정보를 요청할 때
      endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 1)
    }

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
  } catch (err) {
    throw new Error(err)
  }
}

export {
  getLatestInbody,
  insertInbody,
  updateInbody,
  deleteInbody,
  getInbodyInfoByDate,
  getInbodyDate,
}
