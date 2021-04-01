export default {
  stringToDate: (dateString) => {
    const y = dateString.substr(0, 4)
    const m = dateString.substr(4, 2)
    const d = dateString.substr(6, 2)

    return new Date(Number(y), Number(m) - 1, Number(d) + 1, 0, 0, 0)
  },
}
