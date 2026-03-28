import { z } from "zod";
export declare const createOrgSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const inviteUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodEmail;
        role: z.ZodEnum<{
            ADMIN: "ADMIN";
            MANAGER: "MANAGER";
            MEMBER: "MEMBER";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=orgSchema.d.ts.map