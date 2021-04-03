import config from '../config'
import resUtil from '../utils/resUtil'
import sessionService from '../services/sessionService'
import stringToDate from '../services/utils/date'

const { CODE, MSG } = config

export default {
  getSessionByDate: async (req, res) => {
    const { traineeId } = req.params
    let { date } = req.params

    date = stringToDate(date)

    const sessions = sessionService.getSessionByDate(traineeId, date)
  },
}
