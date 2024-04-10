const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../service/userService')
const encryptPass = require('../database/config/encryption')

function checkPassword(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, result) => {
            if (!!err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

async function authorize(req, res, next, allowedRoles) {
    try {
        const bearerToken = req.headers.authorization
        const token = bearerToken.split(' ')[1]
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userService.get(tokenPayload.id)
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = {
    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(422).json({
                status: 'error',
                message: 'Email and password are required'
            })
        } else {
            const email = req.body.email
            const password = req.body.password
            const user = await userService.getByEmail(email)

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Email not found / Not Registered'
                })
            }
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Password is incorrect'
                })
            }
            const token = createToken({ 
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt 
            })
            return res.status(200).json({
                status: 'success',
                message: 'Login Success',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token
                }
            })
        }
    }
}