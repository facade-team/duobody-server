import dotenv from 'dotenv'

dotenv.config()

export default {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  CODE: {
    // https://developer.mozilla.org/ko/docs/Web/HTTP/Status 를 읽어볼 것

    // 2XX
    OK: 200, // 요청으로 req.body 에 데이터가 전송되었을 때
    CREATED: 201, // POST, PUT 요청으로 새로운 리소스가 생성되었을 때

    // 4XX
    BAD_REQUEST: 400, // 잘못된 요청으로 인하여, 서버가 요청을 이해할 수 없을 때
    UNAUTHORIZED: 401, // 인증이 필요한 요청인데, 비인증 상태일때
    FORBIDDEN: 403, // 클라이언트의 권한이 맞지 않을 때 ( 401 과 다른점은 클라이언트는 인증된 상태임 )
    NOT_FOUND: 404, // 클라이언트가 요청한 리소스를 서버에서 찾을 수 없을 때 ( API endpoint 는 적절하게 들어왔으나 서버의 리소스가 없음 )
    NOT_ACCEPTABLE: 406, // 서버로 받아들일 수 없는 요청이 올 때

    // 5XX
    INTERNAL_SERVER_ERROR: 500, // 클라이언트 요청에 대한 처리방법을 서버가 모를 때
    SERVICE_UNAVAILABLE: 503, // 서버 유지보수 등으로 서버가 멈췄을 때의 응답코드
  },
  MSG: {
    // 입력 값 처리
    NULL_VALUE: '필수입력 정보가 없습니다.',
    OUT_OF_VALUE: '파라미터 값이 잘못되었습니다.',
    INVALID_PARAMETER_TYPE: '파라미터 타입이 잘못되었습니다.',

    // Trainee
    EXIST_TRAINEE: '이미 존재하는 유저입니다',
    SUCCESS_CREATE_TRAINEE: 'Trainee 생성에 성공하였습니다',
    SUCCESS_READ_TRAINEE: 'Trainee 조회에 성공하였습니다',
    SUCCESS_UPDATE_TRAINEE: 'Trainee 수정에 성공하였습니다',
    SUCCESS_DELETE_TRAINEE: 'Trainee 삭제에 성공하였습니다',
    FAIL_CREATE_TRAINEE: 'Trainee 생성에 실패하였습니다',
    FAIL_READ_TRAINEE: 'Trainee 조회에 실패하였습니다',
    FAIL_UPDATE_TRAINEE: 'Trainee 수정에 실패하였습니다',
    FAIL_DELETE_TRAINEE: 'Trainee 삭제에 실패하였습니다',
    SUCCESS_CREATE_INBODY: 'Inbody 생성에 성공하였습니다',
    SUCCESS_READ_INBODY: 'Inbody 조회에 성공하였습니다',
    SUCCESS_UPDATE_INBODY: 'Inbody 수정에 성공하였습니다',
    SUCCESS_DELETE_INBODY: 'Inbody 삭제에 성공하였습니다',
    FAIL_CREATE_INBODY: 'Inbody 생성에 실패하였습니다',
    FAIL_READ_INBODY: 'Inbody 조회에 실패하였습니다',
    FAIL_UPDATE_INBODY: 'Inbody 수정에 실패하였습니다',
    FAIL_DELETE_INBODY: 'Inbody 삭제에 실패하였습니다',
  },
}
