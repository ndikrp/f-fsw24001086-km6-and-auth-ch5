const router = require('express').Router()
const Auth = require('../controllers/authController')
const User = require('../controllers/userController')

// Register (No Auth)
router.post('/register',
    User.registerMember)
// Login (No Auth)
router.post('/login',
    Auth.login)
// Register New Admin Acc (Super Admin Only)
router.post('/register/admin',
    Auth.authorizeSuper,
    User.registerAdmin)
// My Profile Details (Require Member/Admin/Superadmin Auth Token)
router.get('/myprofile',
    Auth.authorizeMember,
    User.myProfile)
// List of Users (Require Admin/Superadmin Auth Token)
router.get('/users',
    Auth.authorizeAdmin,
    User.list)


module.exports = router