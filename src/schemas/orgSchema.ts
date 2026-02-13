import { z } from "zod";
import { Role } from "../../generated/prisma";

export const createOrgSchema = z.object({
    body: z.object({
        name: z.string().min(1),
    }),
});

export const inviteUserSchema = z.object({
    body: z.object({
        email: z.email(),
        role: z.enum(Role),
    }),
});