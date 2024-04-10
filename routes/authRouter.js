const router = require('express').Router()
const auth = require('../controllers/authController')

router.post('/api/v1/login', auth.login)

module.exports = router