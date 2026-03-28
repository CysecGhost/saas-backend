import AppError from "../lib/AppError";
export const validate = (schema) => (req, _, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (parsed)
            req.validated = parsed; // Attach validated data to req.validated
        next();
    }
    catch (err) {
        next(new AppError("Validation Failed", 400));
    }
};
//# sourceMappingURL=validate.js.map