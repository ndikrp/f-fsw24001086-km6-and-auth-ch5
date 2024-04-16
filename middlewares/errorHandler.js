module.exports = {
    errorHandler(err, req, res, next) {
        res.status(err.status || 500).json({
            status: "error",
            message: err.message || err
        });
    },
    onLost(req, res) {
        res.status(404).json({
            status: "failed",
            message: "Route not found!",
        });
    },
};
