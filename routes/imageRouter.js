const router = require('express').Router()
const Auth = require('../controllers/authController')
const Image = require('../controllers/imageController')
const upload = require('../middlewares/multer')
const err = require('../middlewares/ErrorHandler')


router.post('/',
    Auth.authorizeAdmin,
    upload.single('image'),
    Image.upload)

router.get('/:id',
    Auth.authorizeMember,
    Image.show)

router.delete('/:id',
    Auth.authorizeAdmin,
    Image.delete)

router.use(err.errorHandler)
router.use(err.onLost)

module.exports = router