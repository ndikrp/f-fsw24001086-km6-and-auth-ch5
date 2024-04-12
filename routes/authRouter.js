const router = require('express').Router()
const Auth = require('../controllers/authController')
const User = require('../controllers/userController')

// Login (No Auth)
router.post('/login',
    Auth.login)
// Register (No Auth)
router.post('/register',
    User.registerMember)
// Register New Admin Acc (Super Admin Only)
router.post('/register/admin',
    Auth.authorizeSuper,
    User.registerAdmin)
// List of Users (Require Admin/Superadmin Auth Token)
router.get('/users',
    Auth.authorizeAdmin,
    User.list)
// My Profile Details (Require Member/Admin/Superadmin Auth Token)
router.get('/myprofile',
    Auth.authorizeMember,
    User.myProfile)


module.exports = router