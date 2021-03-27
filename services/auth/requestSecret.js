import Trainer from '../../models/trainer'
import { generateSecret, sendSecretMail } from '../utils/util'

const requestSecret = async (req, res) => {
  // 클라이언트로부터 이름, 비밀번호, 아이디를 받는다
  const { name, password, userid } = req.body

  let newUser = null
  let secret = ''

  // newUser 변수를 업데이트한다
  const updateNewUser = (user) => {
    newUser = user
  }

  // 아이디가 존재하면 에러 메세지를, 그렇지 않으면 새로운 Trainer을 생성한다.
  const create = async (user) => {
    if (user) {
      throw new Error('이미 존재하는 ID입니다.')
    } else {
      try {
        // 시크릿 코드를 생성한 후 secret 변수를 업데이트 한다
        secret = generateSecret()

        // trainer 생성
        newUser = await Trainer.create(name, password, userid, secret)
        updateNewUser(newUser)
      } catch (err) {
        console.log(err)
      }
    }
  }

  /* 
  < requestSecret 로직 >
  #1. 아이디 중복 여부 확인
  #2. 시크릿 코드 생성 후 새로운 계정 생성 
  #3. 시크릿 코드를 메일로 발송
  */

  // #1
  const user = await Trainer.findOneByUserId(userid)

  // #2
  create(user)

  // #3
  sendSecretMail(name, secret)

  await res.json({
    message: 'Send successfully',
  })
}

export default requestSecret
