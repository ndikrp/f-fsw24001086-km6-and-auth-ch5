const carService = require('../services/carService')

module.exports = {
    list(req, res) {
        carService.list()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: 'Success!',
                    message: 'List of cars',
                    data,
                    meta: { total: count }
                })
                console.log(data)
            })
            .catch((err) => {
                res.status(500).json({
                    status: 'Error',
                    message: err.message
                })
            })
    },
    deletedList(req, res) {
        carService.listDeleted()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: 'Success!',
                    message: 'List of deleted cars',
                    data,
                    meta: { total: count }
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: 'Error',
                    message: err.message
                })
            })
    },

    async show(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter')
            const id = req.params.id
            const car = await carService.get(id)
            if (!car) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Car not found'
                })
            } else {
                carService.get(id)
                    .then((car) => {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Car found',
                            data: car
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status: 'Error',
                            message: err.message
                        })
                    })
            }
        } catch (error) {
            res.status(422).json({
                status: 'Failed',
                message: error.message
            })
        }
    },
    async create(req, res) {
        if (!req.body.name || !req.body.size || !req.body.rent_per_day) {
            const missingFields = []
            if (!req.body.name) missingFields.push('name')
            if (!req.body.size) missingFields.push('size')
            if (!req.body.rent_per_day) missingFields.push('rent_per_day')
            return res.status(422).json({
                status: 'Error',
                message: `Missing required fields: ${missingFields.join(', ')}`
            })
        } else {
            carService
                .create({
                    ...req.body,
                    createdByUser: req.user.id,
                    lastUpdatedByUser: req.user.id
                })
                .then((car) => {
                    res.status(201).json({
                        status: 'Success!',
                        message: 'Car created',
                        data: {
                            id: car.id,
                            name: car.name,
                            size: car.size,
                            rent_per_day: car.rent_per_day,
                            image_id: car.image_id
                        }
                    })
                })
        }
    },

    async update(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter')
            const id = req.params.id
            const car = await carService.get(id)
            if (!car) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Car not found'
                })
            } else {
                const allowedUpdate = ['name', 'size', 'rent_per_day', 'image_id']
                for (const key of Object.keys(req.body)) {
                    if (!allowedUpdate.includes(key)) {
                        res.status(422).json({
                            status: 'Error',
                            message: `Invalid field: ${key}`
                        })
                        return
                    }
                }
                carService.update(req.params.id, req.user, req.body)
                    .then((car) => {
                        res.status(200).json({
                            status: 'Success!',
                            message: 'Car updated',
                        })
                    })
                    .catch((err) => {
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

    async delete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter')
            const id = req.params.id
            const car = await carService.get(id)
            if (!car) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Car not found'
                })
            } else {
                carService.delete(id, req.user)
                    .then(() => {
                        res.status(200).json({
                            status: 'Success!',
                            message: 'Car deleted'
                        })
                    }) 
                    .catch((err) => {
                        res.status(500).json({
                            status: 'Error',
                            message: err.message
                        })
                    })
            }
        } catch (err) {
            res.status(500).json({
                status: 'Error',
                message: err.message
            })
        }
    }
}