import moment from 'moment'

const stringToDate = (dateString) => {
  const y = dateString.substr(0, 4)
  const m = dateString.substr(4, 2)
  const d = dateString.substr(6, 2)

  return moment(`${y}-${m}-${d}`, 'YYYY-MM-DD').valueOf()
}

const stringToTomorrowDate = (dateString) => {
  return moment(dateString, 'YYYY-MM-DD').add(1, 'days').valueOf()
}

const monthToDate = (month) => {
  const y = month.substr(0, 4)
  const m = month.substr(4, 2)

  return moment(`${y}-${m}-01`, 'YYYY-MM-DD').valueOf()
}

const nextMonthToDate = (month) => {
  return moment(month).add(1, 'months').valueOf()
}

const getDate = (date) => {
  const result = ('0' + date.getDate()).slice(-2)

  return result
}

const dateToString = (date) => {
  const format = 'YYYY-MM-DD'

  return moment(date).format(format)
}

const getTime = (time) => {
  const format = 'HH : mm'

  return moment(time).format(format)
}
export {
  stringToDate,
  stringToTomorrowDate,
  monthToDate,
  nextMonthToDate,
  getDate,
  dateToString,
  getTime,
}
