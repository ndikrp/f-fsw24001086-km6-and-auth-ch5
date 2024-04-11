const carRepository = require('../repository/carRepository')
const userRepository = require('../repository/userRepository')
const imageRepository = require('../repository/imageRepository')

const formatCarData = async (car) => {
    const [img, creator, updater] = await Promise.all([
        imageRepository.find(car.image_id),
        userRepository.findByAttributes(car.createdByUser, ['id', 'name']),
        userRepository.findByAttributes(car.lastUpdatedByUser, ['id', 'name'])
    ])
    return {
        id: car.id,
        name: car.name,
        size: car.size,
        rent_per_day: car.rent_per_day,
        image: img,
        createdBy: creator,
        createdAt: car.createdAt,
        updatedBy: updater,
        updatedAt: car.updatedAt
    }
}

const formatDeletedCar = async (car) => {
    const [img, creator, deleter] = await Promise.all([
        imageRepository.find(car.image_id),
        userRepository.findByAttributes(car.createdByUser, ['id', 'name']),
        userRepository.findByAttributes(car.deletedByUser, ['id', 'name'])
    ])
    return {
        id: car.id,
        name: car.name,
        size: car.size,
        rent_per_day: car.rent_per_day,
        image: img,
        createdBy: creator,
        createdAt: car.createdAt,
        deletedBy: deleter,
        deletedAt: car.deletedAt
    }
}

module.exports = {
    create(requestBody) {
        return carRepository.create(requestBody)
    },
    update(id, user, requestBody) {
        return carRepository.update(id, {
            ...requestBody,
            lastUpdatedByUser: user.id
        })
    },
    async delete(id, user) {
        return Promise.all([
            carRepository.delete(id),
            carRepository.update(id, { deletedByUser: user.id })
        ])
    },
    async permanentDelete(id) {
        return carRepository.permanentDelete(id)
    },
    async listDeleted() {
        try {
            const cars = await carRepository.findAll()
            const filteredCars = cars.filter(car => car.deletedAt !== null)
            const formattedCar = await Promise.all(filteredCars.map(car => formatDeletedCar(car)))
            const carCount = formattedCar.length

            return {
                data: formattedCar,
                count: carCount
            }
        } catch (err) {
            throw err.message
        }
    },
    async list() {
        try {
            const cars = await carRepository.findAll();
            const filteredCars = cars.filter(car => car.deletedAt === null)
            const formattedCar = await Promise.all(filteredCars.map(car => formatCarData(car)))
            const carCount = formattedCar.length;

            return {
                data: formattedCar,
                count: carCount
            }
        } catch (err) {
            throw err.message
        }
    }
}