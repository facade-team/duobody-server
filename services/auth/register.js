import Trainer from '../../models/trainer'
import { generateSecret, sendSecretMail } from '../utils/util'

const register = async (req, res) => {
  // 클라이언트로부터 이름, 비밀번호, 아이디를 받는다
  const { name, password, trainerId } = req.body
  let secret = ''
  // 아이디가 존재하면 에러 메세지를, 그렇지 않으면 새로운 Trainer을 생성한다.
  const create = async (trainer) => {
    if (trainer) {
      throw new Error('Trainer Id exists')
    }
    try {
      // 시크릿 코드를 생성한 후 secret 변수를 업데이트 한다
      secret = generateSecret()
      // trainer 생성
      await Trainer.create(name, password, trainerId, secret)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  /* 
    < requestSecret 로직 >
    #1. 아이디 중복 여부 확인
    #2. 시크릿 코드 생성 후 새로운 계정 생성 
    #3. 시크릿 코드를 메일로 발송
    */
  try {
    // #1
    const trainer = await Trainer.findOneByUserId(trainerId)

    // #2
    const createErr = create(trainer)
    if (createErr) {
      return res.status(403).json({
        error: 403,
        message: createErr,
      })
    }

    // #3
    const sendSecretMailErr = sendSecretMail(name, secret)
    if (sendSecretMailErr) {
      return res.status(403).json({
        error: 403,
        message: sendSecretMail.message,
      })
    }

    return res.json({
      message: 'Send successfully',
    })
  } catch (err) {
    console.log(err)
    return res.status(err.status).json({
      error: err.code,
      message: err.message,
    })
  }

  // test below
}

export default register
