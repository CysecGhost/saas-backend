import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import AppError from "../lib/AppError.js";
import { Role } from "../../generated/prisma/index.js";

const orgMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new AppError("Unauthorized", 401));
    };

    const orgId = req.headers["x-org-id"] as string;

    if (!orgId) {
        return next(new AppError("Organization required", 400));
    };

    const membership = await prisma.membership.findUnique({
        where: {
            userId_orgId: {
                userId: req.user.id,
                orgId,
            },
        },
    });

    if (!membership) {
        return next(new AppError("Forbidden", 403));
    };

    req.org = {
        id: orgId,
        role: membership.role,
    };

    next();
};

export const requireRole = (roles: Role[]) => (req: Request, _: Response, next: NextFunction) => {
    if (!req.org) {
        return next(new AppError("Organization context missing", 500));
    }

    if (!roles.includes(req.org.role)) {
        return next(new AppError("Insufficient permissions", 403));
    }

    next();
};

export default orgMiddleware;