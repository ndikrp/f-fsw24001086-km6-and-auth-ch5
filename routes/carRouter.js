const router = require('express').Router()
const Car = require('../controllers/carController')
const Auth = require('../controllers/authController')

router.get('/',
    Auth.authorizeMember,
    Car.list)
router.get('/:id',
    Auth.authorizeMember,
    Car.show)
router.get('/deleted/data',
    Auth.authorizeSuper,
    Car.listDeleted)
router.get('/deleted/:id',
    Auth.authorizeSuper,
    Car.forceShow)
router.get('/deleted/:id/restore',
    Auth.authorizeSuper,
    Car.restore)
router.post('/',
    Auth.authorizeAdmin,
    Car.create)
router.put('/:id',
    Auth.authorizeAdmin,
    Car.update)
router.delete('/:id',
    Auth.authorizeSuper,
    Car.delete)
router.delete('/deleted/:id/force',
    Auth.authorizeSuper,
    Car.permanentDelete)

module.exports = router