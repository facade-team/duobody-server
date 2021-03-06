import dotenv from 'dotenv'

dotenv.config()

export default {
  // TODO: 배포용 db서버 나오면 바꾸기
  PRODUCTION: process.env.PRODUCTION,
  MONGO_URL: process.env.PRODUCTION
    ? process.env.MONGO_PROD_URL
    : process.env.MONGO_DEV_URL,
  PORT: process.env.PORT,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_ACCESS_KEY_SECRET: process.env.AWS_ACCESS_KEY_SECRET,
  REGION: process.env.REGION,
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
    DB_ERROR: 'DB Error',
    SERVER_ERROR: 'Server Error',
    ERROR_404: '404 Error',

    // Trainee
    EXIST_TRAINEE: '이미 존재하는 Trainee입니다',
    NOT_EXIST_TRAINEE: '존재하지 않는 Trainee입니다.',
    WRONG_TRAINEE_ID: '잘못된 Trainee ID 입니다.',
    EXIST_PHONENUMBER: '이미 존재하는 휴대폰 번호입니다.',
    SUCCESS_CREATE_TRAINEE: 'Trainee 생성에 성공하였습니다',
    SUCCESS_READ_TRAINEE: 'Trainee 조회에 성공하였습니다',
    SUCCESS_UPDATE_TRAINEE: 'Trainee 수정에 성공하였습니다',
    SUCCESS_DELETE_TRAINEE: 'Trainee 삭제에 성공하였습니다',
    FAIL_CREATE_TRAINEE: 'Trainee 생성에 실패하였습니다',
    FAIL_READ_TRAINEE: 'Trainee 조회에 실패하였습니다',
    FAIL_UPDATE_TRAINEE: 'Trainee 수정에 실패하였습니다',
    FAIL_DELETE_TRAINEE: 'Trainee 삭제에 실패하였습니다',

    // Trainer Auth
    SUCCESS_CREATE_TRAINER: 'Trainer 생성에 성공하였습니다',
    SUCCESS_CONFIRM_SECRET: 'Trainer Secret Code 인증에 성공하였습니다',
    FAIL_CREATE_TRAINER: 'Trainer 생성에 실패하였습니다',
    EXIST_TRAINER: '이미 존재하는 Trainer입니다',
    NOT_EXIST_TRAINER: '존재하는 Trainer가 아닙니다',
    ALLREADY_CONFIRMED: '이미 승인되었습니다',
    FAIL_CONFIRM_SECRET: 'Trainer Secret Code 인증에 실패하였습니다',
    WRONG_SECRET: '잘못된 비밀번호를 입력했습니다',
    WRONG_SECRET_CODE: '잘못된 인증코드를 입력했습니다',
    FAIL_VERIFY: '인증에 실패하였습니다',
    SUCCESS_LOGIN: '로그인에 성공하였습니다',
    FAIL_LOGIN: '로그인에 실패하였습니다',
    SUCCESS_READ_INBODY: 'Inbody 조회에 성공하였습니다',
    SUCCESS_CREATE_INBODY: 'Inbody 생성에 성공하였습니다',
    SUCCESS_UPDATE_INBODY: 'Inbody 수정에 성공하였습니다',
    SUCCESS_DELETE_INBODY: 'Inbody 삭제에 성공하였습니다',
    FAIL_CREATE_INBODY: 'Inbody 생성에 실패하였습니다',
    FAIL_READ_INBODY: 'Inbody 조회에 실패하였습니다',
    FAIL_UPDATE_INBODY: 'Inbody 수정에 실패하였습니다',
    FAIL_DELETE_INBODY: 'Inbody 삭제에 실패하였습니다',

    // Messenger
    SUCCESS_CREATE_CHATROOM: '채팅방 생성에 성공하였습니다.',
    FAIL_CREATE_CHATROOM: '채팅방 생성에 실패하였습니다.',
    SUCCESS_READ_ALL_CHATROOMS: '모든 채팅방 조회에 성공하였습니다.',
    FAIL_READ_ALL_CHATROOMS: '모든 채팅방 조회에 실패하였습니다.',
    SUCCESS_READ_CHATROOMINFO: '채팅방 정보 조회에 성공하였습니다.',
    FAIL_READ_CHATROOMINFO: '채팅방 정보 조회에 실패하였습니다.',
    SUCCESS_SEND_MESSAGE: '메시지 전송에 성공하였습니다.',
    FAIL_SEND_MESSAGE: '메시지 전송에 실패하였습니다.',

    // Lesson, Session, Set
    SUCCESS_READ_LESSON: 'Lesson 조회에 성공하였습니다',
    SUCCESS_CREATE_LESSON: 'Lesson 생성에 성공하였습니다',
    SUCCESS_UPDATE_LESSON: 'Lesson 수정에 성공하였습니다',
    SUCCESS_DELETE_LESSON: 'Lesson 삭제에 성공하였습니다',
    FAIL_CREATE_LESSON: 'Lesson 생성에 실패하였습니다',
    FAIL_READ_LESSON: 'Lesson 조회에 실패하였습니다',
    FAIL_UPDATE_LESSON: 'Lesson 수정에 실패하였습니다',
    FAIL_DELETE_LESSON: 'Lesson 삭제에 실패하였습니다',
    SUCCESS_READ_SESSION: 'Session 조회에 성공하였습니다',
    SUCCESS_CREATE_SESSION: 'Session 생성에 성공하였습니다',
    SUCCESS_UPDATE_SESSION: 'Session 수정에 성공하였습니다',
    SUCCESS_DELETE_SESSIOn: 'Session 삭제에 성공하였습니다',
    FAIL_CREATE_SESSION: 'Session 생성에 실패하였습니다',
    FAIL_READ_SESSION: 'Session 조회에 실패하였습니다',
    FAIL_UPDATE_SESSION: 'Session 수정에 실패하였습니다',
    FAIL_DELETE_SESSION: 'Session 삭제에 실패하였습니다',
    LESSON_EXIST_AT_THE_TIME: '해당 시간에 세션이 이미 있습니다',

    // Exbody
    SUCCESS_CREATE_EXBODYBEFORE: 'Exbody before 생성에 성공하였습니다.',
    SUCCESS_CREATE_EXBODYAFTER: 'Exbody after 생성에 성공하였습니다.',
    SUCCESS_READ_EXBODY: 'Exbody 조회에 성공하였습니다.',
    FAIL_CREATE_EXBODYBEFORE: 'Exbody before 생성에 실패하였습니다.',
    FAIL_CREATE_EXBODYAFTER: 'Exbody after 생성에 실패하였습니다.',
    FAIL_READ_EXBODY: 'Exbody 조회에 실패하였습니다.',
  },
}
