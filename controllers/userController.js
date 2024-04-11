require('dotenv').config()
const bcrypt = require('bcrypt')
const userService = require('../services/userService')

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, result) => {
            if (!!err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

async function register(req, res, role) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        return res.status(422).json({
            status: 'Error',
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    } else {
        const userAlreadyExists = await userService.getByEmail(email);
        if (userAlreadyExists) {
            return res.status(409).json({
                status: 'Error',
                message: 'Email already in use'
            });
        } else {
            const encryptedPassword = await encryptPassword(password);
            userService.create({
                name,
                email,
                password: encryptedPassword,
                role
            }).then(user => {
                return res.status(201).json({
                    status: 'Success!',
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                })
            }).catch(err => {
                return res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            })
        }
    }
}

module.exports = {
    async registerMember(req, res) {
        register(req, res, 'member')
    },

    async registerAdmin(req, res) {
        register(req, res, 'admin')
    },

    async myProfile(req, res) {
        const user = await userService.get(req.user.id)
        return res.status(200).json({
            status: 'Success!',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    },

    async list(req, res) {
        userService.list()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: 'Success!',
                    message: 'List of users',
                    data,
                    meta: { total: count }
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: 'Error',
                    message: err.message
                })
            })
    }
}