const router = require('express').Router()
const Auth = require('../controllers/authController')
const User = require('../controllers/userController')

router.post('/api/v1/register',
    User.registerMember)
router.post('/api/v1/login',
    Auth.login)
router.post('/api/v1/register/admin',
    Auth.authorizeAdmin,
    User.registerAdmin)

router.get('/api/v1/myprofile',
    Auth.authorizeMember,
    User.myProfile)
router.get('/api/v1/users',
    Auth.authorizeAdmin,
    User.list)


module.exports = router