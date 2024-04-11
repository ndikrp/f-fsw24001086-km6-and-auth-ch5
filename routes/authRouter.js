const router = require('express').Router()
const Auth = require('../controllers/authController')
const User = require('../controllers/userController')

router.post('/api/v1/register', User.registerMember)
router.post('/api/v1/login', Auth.login)



module.exports = router