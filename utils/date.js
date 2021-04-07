const stringToDate = (dateString) => {
  const y = dateString.substr(0, 4)
  const m = dateString.substr(4, 2)
  const d = dateString.substr(6, 2)

  return new Date(Number(y), Number(m) - 1, Number(d) + 1, 0, 0, 0)
}

const monthToDate = (month) => {
  const date = new Date()

  date.setMonth(month - 1)
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)

  return date
}

const getDate = (date) => {
  const result = ('0' + date.getDate()).slice(-2)

  return result
}
export { stringToDate, monthToDate, getDate }
