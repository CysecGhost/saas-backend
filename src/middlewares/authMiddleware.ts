import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/jwt.js';

type AccessTokenPayload = {
    userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"})
    };

    const token = header?.split(" ")[1];
    
    try {
        const payload = verifyAccessToken(token!) as AccessTokenPayload;
        req.user = { id: payload.userId };
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid or expired token"});
    }
}

export default authMiddleware;