import 'express';
import { Role } from '../../generated/prisma';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            },
            org?: {
                id: string;
                role: Role;
            },
            validated?: {
                body?: unknown;
                query?: unknown;
                params?: unknown;
            },
        }
    }
}