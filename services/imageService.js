const imageRepository = require('../repository/imageRepository')
const { cloudinary, config } = require('../lib/cloudinary')

module.exports = {
    async uploadImage(file) {
        const public_id = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const result = await cloudinary.uploader
            .upload(file, {
                height: 160, width: 270, crop: 'fit',
                folder: config.dir, public_id: public_id
            })
        return imageRepository.create({
            public_id, url: result.url
        })
    },
    async deleteImage(id) {
        const img = await imageRepository.find(id)
        cloudinary.uploader.destroy(`${config.dir}/${img.public_id}`)
        return imageRepository.delete(id)
    },
    get(id) {
        return imageRepository.find(id)
    }
}