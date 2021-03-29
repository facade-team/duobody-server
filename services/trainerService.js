/* eslint-disable class-methods-use-this */
import lesson from '../models/lesson'

async function getLessons(id) {
  const lessons = await lesson.find({ trainerId: id })
  return lessons
}

async function insertLesson(id, lessonDto) {}

async function getExbody(id, traineeid) {}

export { getLessons }
