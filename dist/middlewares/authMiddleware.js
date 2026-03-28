import { verifyAccessToken } from '../lib/jwt.js';
import AppError from '../lib/AppError.js';
const authMiddleware = (req, _, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }
    ;
    const token = header.split(" ")[1];
    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.userId };
        next();
    }
    catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map