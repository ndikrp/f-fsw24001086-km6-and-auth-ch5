const router = require('express').Router()

const Auth = require('./authRouter')
const Car = require('./carRouter')
const Image = require('./imageRouter')

router.use('/api/v1/auth', Auth)
router.use('/api/v1/cars', Car)
router.use('/api/v1/images', Image)

module.exports = router