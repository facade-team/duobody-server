import Trainer from '../../models/trainer'
import { generateSecret, sendSecretMail } from '../utils/util'

const register = async (req, res) => {
  // 클라이언트로부터 이름, 비밀번호, 아이디를 받는다
  const { name, password, trainerId } = req.body

  let secret = ''

  // 아이디가 존재하면 에러 메세지를, 그렇지 않으면 새로운 Trainer을 생성한다.
  const create = async (trainer) => {
    if (trainer) {
      try {
        // to do
        // 에러 내용을 바로 res.json 으로 보내고 싶었는데, 맨 아래에서 res 를 보내서 중복으로 못보냄
        // 일단 급한대로 이렇게 넘어가는데 이부분 클리어 해야할듯
        throw Error('이미 존재하는 사용자입니다')
      } catch (error) {
        console.log(error)
      }
    } else {
      // 시크릿 코드를 생성한 후 secret 변수를 업데이트 한다
      secret = generateSecret()

      // trainer 생성
      await Trainer.create(name, password, trainerId, secret)
    }
  }

  /* 
    < requestSecret 로직 >
    #1. 아이디 중복 여부 확인
    #2. 시크릿 코드 생성 후 새로운 계정 생성 
    #3. 시크릿 코드를 메일로 발송
    */

  // #1
  const trainer = await Trainer.findOneByUserId(trainerId)

  // #2
  create(trainer)

  // #3
  sendSecretMail(name, secret)

  res.json({
    message: 'Send successfully',
  })
}

export default register
