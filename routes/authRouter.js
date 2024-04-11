const router = require('express').Router()
const Auth = require('../controllers/authController')
const User = require('../controllers/userController')

// Register (No Auth)
router.post('/api/v1/register',
    User.registerMember)
// Login (No Auth)
router.post('/api/v1/login',
    Auth.login)
// Register New Admin Acc (Super Admin Only)
router.post('/api/v1/register/admin',
    Auth.authorizeSuper,
    User.registerAdmin)
// My Profile Details (Require Member/Admin/Superadmin Auth Token)
router.get('/api/v1/myprofile',
    Auth.authorizeMember,
    User.myProfile)
// List of Users (Require Admin/Superadmin Auth Token)
router.get('/api/v1/users',
    Auth.authorizeAdmin,
    User.list)


module.exports = router