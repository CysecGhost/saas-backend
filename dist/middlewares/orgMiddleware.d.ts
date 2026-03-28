import type { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma/index.js";
declare const orgMiddleware: (req: Request, _: Response, next: NextFunction) => Promise<void>;
export declare const requireRole: (roles: Role[]) => (req: Request, _: Response, next: NextFunction) => void;
export default orgMiddleware;
//# sourceMappingURL=orgMiddleware.d.ts.map