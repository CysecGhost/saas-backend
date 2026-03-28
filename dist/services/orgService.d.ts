import { Role } from "../../generated/prisma/index.js";
export declare const createOrg: (userId: string, name: string) => Promise<{
    membership: {
        id: string;
        userId: string;
        role: import("../../generated/prisma/index.js").$Enums.Role;
        orgId: string;
    };
}>;
export declare const getOrgs: (userId: string) => Promise<{
    orgs: {
        orgId: string;
        name: string;
        role: import("../../generated/prisma/index.js").$Enums.Role;
    }[];
}>;
export declare const inviteUser: (orgId: string, email: string, role: Role) => Promise<{
    membership: {
        id: string;
        userId: string;
        role: import("../../generated/prisma/index.js").$Enums.Role;
        orgId: string;
    };
}>;
//# sourceMappingURL=orgService.d.ts.map