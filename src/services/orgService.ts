import { prisma } from "../lib/prisma.js";
import { Role } from "../../generated/prisma/index.js";

export const createOrg = async (userId: string, name: string) => {
    return prisma.$transaction(async (tx) => {
        const org = await tx.organization.create({
        data: {
            name,
        },
    });

    const membership = await tx.membership.create({
        data: {
            userId,
            orgId: org.id,
            role: Role.ADMIN,
        },
    });
    
    return { membership };
    });
};

export const getOrgs = async (userId: string) => {
    const memberships = await prisma.membership.findMany({
        where: {
            userId,
        },
        select: {
            role: true,
            orgId: true,
            org: {
                select: {
                    name: true,
                },
            },
        },
    });

    const orgs = memberships.map((m) => ({
        orgId: m.orgId,
        name: m.org.name,
        role: m.role,
    }));

    return { orgs };
};