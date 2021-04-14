import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import path from 'path'
import config from '../config'

const s3 = new aws.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_ACCESS_KEY_SECRET,
  region: config.REGION,
})

const exbodyS3Storage = multerS3({
  s3,
  acl: 'public-read',
  bucket: 'duobody-server/exbody',
  key(req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, `${req.params.traineeId}_${Date.now()}${extension}`)
  },
})

const multerExbody = multer({ storage: exbodyS3Storage })

const uploadExbody = multerExbody.single('exbodyImage')
// form 에서 exbodyImage 필드의 파일을 1개 받아서 req.file 에 파일의 정보를 저장한다.

export default uploadExbody
