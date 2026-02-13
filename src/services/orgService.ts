import { prisma } from "../lib/prisma.js";
import { Role } from "../../generated/prisma/index.js";
import AppError from "../lib/AppError.js";

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

export const inviteUser = async (orgId: string, email: string, role: Role) => {
    return prisma.$transaction( async (tx) => {
        // Find user
        const user = await tx.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        };

        // Check existing membership
        const existing = await tx.membership.findUnique({
            where: {
                userId_orgId: {
                    userId: user.id,
                    orgId,
                },
            },
        });

        if (existing) {
            throw new AppError("User already in organization", 400);
        };

        // create membership
        const membership = await tx.membership.create({
            data: {
                userId: user.id,
                orgId,
                role,
            },
        });

        return { membership };
    });
};