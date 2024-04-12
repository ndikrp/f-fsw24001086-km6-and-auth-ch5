const router = require('express').Router()

const Auth = require('./authRouter')
const Car = require('./carRouter')

router.use('/api/v1/auth', Auth)
router.use('/api/v1/cars', Car)

module.exports = router