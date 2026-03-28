import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/hash.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../lib/jwt.js";
import AppError from "../lib/AppError.js";
import bcrypt from "bcrypt";
export const registerUser = async (email, password) => {
    const hashed = await hashPassword(password);
    return prisma.user.create({
        data: {
            email,
            password: hashed
        },
    });
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new AppError("User not found", 404);
    const valid = await verifyPassword(password, user.password);
    if (!valid)
        throw new AppError("Invalid credentials", 401);
    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });
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
export const refreshAccessToken = async (token) => {
    const payload = verifyRefreshToken(token);
    // fetch all refresh tokens of user
    const storedTokens = await prisma.refreshToken.findMany({
        where: {
            userId: payload.userId,
            revoked: false,
        },
    });
    if (!storedTokens.length) {
        throw new AppError("Refresh token invalid", 401);
    }
    ;
    let matchedToken = null;
    // fetch the token the user sent
    for (const t of storedTokens) {
        if (await bcrypt.compare(token, t.tokenHash)) {
            matchedToken = t;
            break;
        }
    }
    ;
    // Revoke all tokens on token reuse attempt
    if (!matchedToken) {
        await prisma.refreshToken.updateMany({
            where: {
                userId: payload.userId,
            },
            data: {
                revoked: true,
            },
        });
        throw new AppError("Refresh token reuse detected", 401);
    }
    ;
    // revoke current token
    await prisma.refreshToken.update({
        where: {
            id: matchedToken.id,
        },
        data: {
            revoked: true,
        },
    });
    // issue new access token and refresh token
    const accessToken = signAccessToken({ userId: matchedToken.userId });
    const refreshToken = signRefreshToken({ userId: matchedToken.userId });
    const tokenHash = await bcrypt.hash(refreshToken, 12);
    // store new refresh token in db
    await prisma.refreshToken.create({
        data: {
            tokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: matchedToken.userId,
        },
    });
    return { accessToken, refreshToken };
};
export const logoutUser = async (token) => {
    const payload = verifyRefreshToken(token);
    const storedTokens = await prisma.refreshToken.findMany({
        where: {
            userId: payload.userId,
            revoked: false,
        },
    });
    if (!storedTokens.length) {
        throw new AppError("Refresh token invalid", 401);
    }
    let matchedToken = null;
    for (const t of storedTokens) {
        if (await bcrypt.compare(token, t.tokenHash)) {
            matchedToken = t;
            break;
        }
    }
    ;
    if (!matchedToken) {
        throw new AppError("Refresh token invalid", 401);
    }
    const revoked = await prisma.refreshToken.update({
        where: {
            id: matchedToken.id,
        },
        data: {
            revoked: true,
        },
    });
    return revoked;
};
//# sourceMappingURL=authService.js.map