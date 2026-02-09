import { prisma } from "../src/lib/prisma.js";

async function main() {
    // const org = await prisma.organization.create({
    //     data: {
    //         name: "Evil Corp",
    //     }
    // })
    // console.log("Org created: ", org)

    // const user = await prisma.user.create({
    //     data: {
    //         email: "Elliot@gmail.com",
    //         password: "hashedPassword123"
    //     }
    // })
    // console.log("User created: ", user)

    // const membership = await prisma.membership.create({
    //     data: {
    //         userId: 'db451cdc-10b5-48c4-b1cb-64f9dc94bccf',
    //         orgId: 'b05de8dd-e044-4d26-ba11-2b20be510c43',
    //         role: "ADMIN",
    //     }
    // })
    // console.log("Membership created: ", membership)

    // const token = await prisma.refreshToken.create({
    //     data: {
    //         tokenHash: "hashed_Refresh_Token_123",
    //         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //         userId: user.id
    //     }
    // })
    // console.log("Refresh Token created: ", token)

    // const org = await prisma.organization.findMany({});
    // console.log("org: ", org);

    // const memberships = await prisma.membership.findMany({
    //     include: {
    //         user: true,
    //         org: true,
    //     }
    // });
    // console.log("Memberships: ", memberships);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});