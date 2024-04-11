const { User } = require('../database/models')

module.exports = {
    create(createArgs) {
        return User.create(createArgs)
    },
    delete(id) {
        return User.destroy({ where: { id } })
    },
    find(id) {
        return User.findByPk(id)
    },
    findAll() {
        return User.findAll()
    },
    findByEmail(email) {
        return User.findOne({ where: { email } })
    },
    findByAttributes(id, attributes) {
        return User.findByPk(id, { attributes })
    },
    getTotalUser(){
        return User.count()
    }
}