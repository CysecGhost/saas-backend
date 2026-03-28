import type { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const validate: <T extends ZodType>(schema: T) => (req: Request, _: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map