const errorHandler = (err, req, res, next) => {
    console.error(err); // add this
    const status = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Internal Server Error";
    res.status(status).json({ message });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map