const { Image } = require('../database/models')

module.exports = {
    create(createArgs) {
        return Image.create(createArgs)
    },
    find(id) {
        return Image.findByPk(id)
    },
    delete(id) {
        return Image.destroy({ where: { id } })
    }
}