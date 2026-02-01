import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/hash.js";
import { signAccessToken, signRefreshToken } from "../lib/jwt.js";
import bcrypt from "bcrypt";

export const registerUser = async (email: string, password: string) => {
    const hashed = await hashPassword(password);

    return prisma.user.create({
        data: {
            email,
            password: hashed
        },
    });
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) throw new Error("User not found");

    const valid =  await verifyPassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = signAccessToken( { userId: user.id } );
    const refreshToken = signRefreshToken( { userId: user.id } )

    const tokenHash = await bcrypt.hash(refreshToken, 12);

    await prisma.refreshToken.create({
        data: {
            tokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: user.id,
        },
    });

    return { accessToken, refreshToken };
};