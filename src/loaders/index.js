import expressLoader from './expressLoader'
import mongoLoader from './mongoLoader'

const loaders = (app) => {
  mongoLoader()
  expressLoader(app)
}

export default loaders
