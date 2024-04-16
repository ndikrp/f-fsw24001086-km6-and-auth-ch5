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
            carService.create({
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
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter');

            const id = req.params.id;

            // Fetch the car data before the update
            const oldCar = await carService.get(id);

            if (!oldCar) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'Car not found'
                });
            }

            const missingFields = [];
            if (!req.body.name) missingFields.push('name');
            if (!req.body.size) missingFields.push('size');
            if (!req.body.rent_per_day) missingFields.push('rent_per_day');

            if (missingFields.length > 0) {
                return res.status(422).json({
                    status: 'Error',
                    message: `Missing required fields: ${missingFields.join(', ')}`
                });
            }
            carService.update(req.params.id, req.user, req.body)
                .then(async () => {
                    const newCar = await carService.get(id);
                    res.status(200).json({
                        status: 'Success!',
                        message: 'Car updated',
                        data: {
                            old_data: {
                                id: oldCar.id,
                                name: oldCar.name,
                                size: oldCar.size,
                                rent_per_day: oldCar.rent_per_day
                            },
                            new_data: {
                                id: newCar.id,
                                name: newCar.name,
                                size: newCar.size,
                                rent_per_day: newCar.rent_per_day
                            }
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: 'Error',
                        message: err.message
                    });
                });
        } catch (err) {
            res.status(422).json({
                status: 'Failed',
                message: err.message
            });
        }
    },

    async delete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter');
            const id = req.params.id;
            const deletedCar = await carService.get(id);
            if (!deletedCar) {
                return res.status(404).json({
                    status: 'Error',
                    message: 'Car not found'
                });
            }
            carService.delete(id, req.user)
                .then(() => {
                    res.status(200).json({
                        status: 'Success!',
                        message: 'Car deleted',
                        deleted_data: {
                            id: deletedCar.id,
                            name: deletedCar.name,
                            size: deletedCar.size,
                            rent_per_day: deletedCar.rent_per_day
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: 'Error',
                        message: err.message
                    });
                });
        } catch (err) {
            res.status(500).json({
                status: 'Error',
                message: err.message
            });
        }
    },
    async permanentDelete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error("Invalid parameter");
            const id = req.params.id;
            const car = await carService.forceGet(id)

            if (!car) {
                res.status(404).json({
                    status: "failed",
                    message: "Archived car data not found"
                })
            } else {
                carService.permanentDelete(id)
                    .then((result) => {
                        console.log(result)
                        res.status(200).json({
                            status: "success",
                            message: "Destroy car data successfully",
                            data: {
                                id: car.id,
                                name: car.name,
                                size: car.size,
                                rent_per_day: car.rent_per_day
                            }
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status: "error",
                            message: err.message,
                        });
                    });
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                message: err.message,
            });
        }
    },
    async forceShow(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error("Invalid parameter");
            const id = req.params.id;
            const car = await carService.forceGet(id)
            if (!car) {
                res.status(404).json({
                    status: "failed",
                    message: "Archived car data not found"
                })
            } else {
                carService
                    .forceGet(id)
                    .then((car) => {
                        res.status(200).json({
                            status: "success",
                            message: "Get archived car data successfully",
                            data: car,
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status: "error",
                            message: err.message,
                        });
                    });
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                message: err.message,
            });
        }
    },
    async restore(req, res) {
        try {
            if (isNaN(req.params.id)) throw new Error('Invalid Parameter')
            const id = req.params.id
            const car = await carService.forceGet(id)

            if (!car) {
                res.status(404).json({
                    status: 'Error',
                    message: 'Car not found'
                })
            } else {
                carService.restore(id, req.user)
                    .then(() => {
                        res.status(200).json({
                            status: 'Success!',
                            message: 'Car restored',
                            restored_data: {
                                id: car.id,
                                name: car.name,
                                size: car.size,
                                rent_per_day: car.rent_per_day
                            }
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
    },
}