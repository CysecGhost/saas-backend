import type { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import AppError from "../lib/AppError";


export const validate = <T extends ZodType>(schema: T) => (req: Request, _: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        
        if (parsed) req.validated = parsed; // Attach validated data to req.validated

        next();

    } catch (err) {
        next(new AppError("Validation Failed", 400))
    }
}
