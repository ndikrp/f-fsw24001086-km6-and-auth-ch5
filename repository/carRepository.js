const { Car } = require('../database/models')

module.exports = {
    create(createArgs) {
        return Car.create(createArgs)
    },
    update(id, updateArgs) {
        return Car.update(updateArgs, {
            where: { id, },
            paranoid: false
        })
    },
    find(id) {
        return Car.findByPk(id, {
            paranoid: false
        })
    },
    findAll() {
        return Car.findAll({
            paranoid: false
        })
    },
    getTotalCar() {
        return Car.count()
    },
    delete(id) {
        return Car.destroy({ where: { id } })
    },
    permanentDelete(id) {
        return Car.destroy({ where: { id }, force: true })
    },
    restore(id) {
        return Car.restore({ where: { id } })
    }
}