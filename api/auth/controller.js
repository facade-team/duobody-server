import jwt from 'jsonwebtoken'
import User from '../../models/userModel'

export default {
    register : (req, res) => {
    const { name, password } = req.body
    console.log('temp')
	let newUser = null

	const create = (user) => {
		if (user) {
			throw new Error('name exists')
		}
		else {
			return User.create(name, password)
		}
	}

	const count = (user) => {
		newUser = user
		return User.count({}).exec()
	}

	const assign = (count) => {
		if (count === 1) {
			return newUser.assignAdmin()
		}
		else {
			return Promise.resolve(false)
		}
	}

	const respond = (isAdmin) => {
		res.json({
			message: 'Registered successfully',
			admin: isAdmin ? true : false
		})
	}

	const onError = (error) => {
		res.status(409).json({
			message : error.message
		})
	}

	User.findOneByName(name)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)
    },
    login : (req, res) => {
        const { name, password } = req.body
        const secret = process.env.SECRET

        const check = (user) => {
            if (!user) {
                throw new Error('User does not exist')
            }
            else {
                if (user.verify(password)) {
                    const p = new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                _id: user._id,
                                name: user.name,
                                admin : user.admin
                            },
                            secret,
                            {
                                expiresIn: '90d',
                                issuer: 'duobody',
                                subject: 'userInfo',
                            }, (err, token) => {
                                if (err) reject(err)
                                resolve(token)
                            }
                        )
                    })
                    return p
                }
                else {
                    throw new Error('Login failed')
                }
            }
        }

        const respond = (token) => {
            res.json({
                message: 'logged in successfully',
                token
            })
        }
        
        const onError = (err) => {
            res.status(403).json({
                message : error.message
            })
        }

        User.findOneByName(name).
            then(check)
            .then(respond)
            .catch(onError)
    },
    check : (req, res) => {
        res.json({
            success: true,
            info: req.decoded
        })
    }
}