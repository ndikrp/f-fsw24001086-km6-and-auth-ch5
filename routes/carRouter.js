const router = require('express').Router()
const Car = require('../controllers/carController')
const Auth = require('../controllers/authController')

router.get('/', 
    Auth.authorizeMember,
    Car.list)
router.get('/:id', 
    Auth.authorizeMember,
    Car.show)
router.post('/',
    Auth.authorizeAdmin,
    Car.create)
router.put('/:id',
    Auth.authorizeAdmin,
    Car.update)
router.delete('/:id',
    Auth.authorizeSuper,
    Car.delete)

module.exports = router