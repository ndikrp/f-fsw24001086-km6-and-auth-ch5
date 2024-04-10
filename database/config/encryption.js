const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    SIGNATURE_KEY: process.env.JWT_SECRET,
    SALT: 10
}