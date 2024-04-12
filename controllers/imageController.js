const imageService = require('../services/imageService')

module.exports = {
    upload(req, res) {
        const fileBase64 = req.file.buffer.toString('base64')
        const file = `data:${req.file.mimetype};base64,${fileBase64}`
        imageService.uploadImage(file)
            .then(result => {
                res.status(200).json({
                    status: 'Success!',
                    message: 'Image uploaded successfully!',
                    data: {
                        id: result.id,
                        url: result.url,
                        public_id: result.public_id
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 'Error',
                    message: err.message
                })
            })
    },

    async delete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter')
            const img = await imageService.get(req.params.id)

            if (!img) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Image not found'
                })
            } else {
                imageService.deleteImage(req.params.id)
                    .then(() => {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Image deleted successfully'
                        })
                    })
                    .catch(err => {
                        console.error(err)
                        res.status(500).json({
                            status: 'Error',
                            message: err.message
                        })
                    })
            }

        } catch (err) {
            res.status(422).json({
                status: 'Failed',
                message: err.message
            })
        }
    },

    async show(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter')
            const img = await imageService.get(req.params.id)
            if (!img) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Image not found'
                })
            } else {
                res.status(200).json({
                    status: 'Success',
                    message: 'Image found',
                    data: {
                        id: img.id,
                        url: img.url,
                        public_id: img.public_id
                    }
                })
            }
        } catch (err) {
            res.status(422).json({
                status: 'Failed',
                message: err.message
            })
        }
    }
}