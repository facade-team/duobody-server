import jwt from 'jsonwebtoken'

const authMiddleWare = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.qurey.token

    if (!token) {
        return res.status(403).json({
            success: false,
            message : 'not logged in'
        })
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message : error.message
        })
    }

    p.then((decoded) => {
        req.decoded = decoded
        next()
    }).catch(onError)
}

export default authMiddleWare