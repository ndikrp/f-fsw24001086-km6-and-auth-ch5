const router = require('express').Router()
const Auth = require('../controllers/authController')
const Image = require('../controllers/imageController')
const upload = require('../middlewares/multer')

router.post('/',
    Auth.authorizeAdmin,
    upload.single('image'),
    Image.upload)

router.delete('/:id',
    Auth.authorizeAdmin,
    Image.delete)
    
module.exports = router