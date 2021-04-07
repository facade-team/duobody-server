const stringToDate = (dateString) => {
  const y = dateString.substr(0, 4)
  const m = dateString.substr(4, 2)
  const d = dateString.substr(6, 2)

  return new Date(Number(y), Number(m) - 1, Number(d), 0, 0, 0)
}

const monthToDate = (month) => {
  const y = month.substr(0, 4)
  const m = month.substr(4, 2)

  return new Date(Number(y), Number(m - 1), 1, 0, 0, 0)
}

const getDate = (date) => {
  const result = ('0' + date.getDate()).slice(-2)

  return result
}

const dateToString = (date, delimiter) => {
  const yy = date.getFullYear()
  const mm = ('0' + (date.getMonth() + 1)).slice(-2)
  const dd = ('0' + date.getDate()).slice(-2)

  return yy + delimiter + mm + delimiter + dd
}
export { stringToDate, monthToDate, getDate, dateToString }
