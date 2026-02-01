import { prisma } from "../src/lib/prisma";

async function main() {
    const org = await prisma.organization.create({
        data: {
            name: "Evil Corp",
        }
    })
    console.log("Org created: ", org)

    const user = await prisma.user.create({
        data: {
            email: "Elliot@gmail.com",
            password: "hashedPassword123"
        }
    })
    console.log("User created: ", user)

    const membership = await prisma.membership.create({
        data: {
            userId: user.id,
            orgId: org.id,
            role: "ADMIN",
        }
    })
    console.log("Membership created: ", membership)

    const token = await prisma.refreshToken.create({
        data: {
            tokenHash: "hashed_Refresh_Token_123",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: user.id
        }
    })
    console.log("Refresh Token created: ", token)

}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});