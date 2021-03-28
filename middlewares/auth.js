import jwt from 'jsonwebtoken'

const authMiddleWare = (req, res, next) => {
  // 여기에서 클라이언트의 header 중 'x-access-token'으로 저장된 토큰을 받아오거나, url쿼리에 직접 담긴 토큰을 받아옴 ㅇㅇ
  const token = req.headers['x-access-token'] || req.qurey.token

  // 토큰이 없다? 그러면 인증 어림도 없지
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    })
  }

  // 프로미스 하나 생성 -> jwt.verify를 통해 토큰을 시크릿키(process.env.SECRET)로 해독해서 decoded 된 값을 콜백 function에 넘겨줘
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })

  // 에러가 발생하면 중단
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message,
    })
  }

  // 위에서 정의한 메소드들 여기서 프로미스로 쭈욱 이어서 쓰는것임
  // 프로미스 만든 걸루 검증을 해보고 -> 해독이 제대로 됐다? 그러면 콜백에 넘겨주고, 중간에 오류가 발생했으면 onError 함수 실행
  p.then((decoded) => {
    req.decoded = decoded
    console.log(decoded)
    next()
  }).catch(onError)
}

export default authMiddleWare
