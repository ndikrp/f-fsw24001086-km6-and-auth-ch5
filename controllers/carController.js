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
}