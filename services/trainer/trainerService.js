import Trainer from '../../models/trainer'

/* to do
createMyTrainee
getMyTrainee
UpdateMyTrainee
DeleteMyTrainee
*/

export const createMyTrainee = (req, res) => {
  console.log(req.user)
  res.json({ message: 'create' })
}
