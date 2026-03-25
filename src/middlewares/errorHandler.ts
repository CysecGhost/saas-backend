import type { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err) // add this
    const status = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Internal Server Error";
    res.status(status).json({ message });
};

export default errorHandler;