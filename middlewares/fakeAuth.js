// isAuth() : 인증 확인 후, req 에 user 객체를 저장해주는 미들웨어
const isAuth = (req, res, next) => {
  req.user = {
    _id: '60604fd043e0af282f3be4ad',
    isConfirmed: true,
    name: 'Choi Hyeon Soo',
    password: 'dzbklWfHKiJDZeuwXJpIvTgowok=',
    trainerId: 'chs98105@naver.com',
    secret: '896387',
    __v: { $numberInt: '0' },
  }

  next()
}

export default isAuth
