/* eslint-disable class-methods-use-this */
import lesson from '../models/lesson'
import inbody from '../models/inbody'

// async function getLessons(id) {
//   try {
//     const lessons = await lesson.find({ trainerId: id })

//     return lessons
//   } catch (err) {
//     console.error(err)
//     next(err)
//   }
// }

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
    console.error(err)

    return err
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
    console.error(err)

    return err
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
    console.error(err)

    return err
  }
}

async function deleteInbody(_id) {
  try {
    const result = await inbody.findByIdAndDelete(_id)

    return result
  } catch (err) {
    console.error(err)

    return err
  }
}

async function getInbodyInfoByDate(id, traineeid, date) {}

export { getLatestInbody, insertInbody, updateInbody, deleteInbody }
