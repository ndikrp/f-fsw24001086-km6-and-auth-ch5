const router = require('express').Router()
const Car = require('../controllers/carController')
const Auth = require('../controllers/authController')

router.get('/', 
    Auth.authorizeMember,
    Car.list)


module.exports = router