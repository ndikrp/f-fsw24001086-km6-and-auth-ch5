const router = require('express').Router()
const Car = require('../controllers/')
const Auth = require('../controllers/authController')

router.get('/api/v1/cars', 
    Auth.authorizeMember,
    Car.list)


module.exports = router