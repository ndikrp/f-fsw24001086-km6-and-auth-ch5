const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    name: process.env.SUPER_ADMIN_NAME,
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD
}