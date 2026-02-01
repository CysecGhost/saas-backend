import jwt from "jsonwebtoken";

export const signAccessToken = (payload: string) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
});

export const signRefreshToken = (payload: string) => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
});

export const verifyAccessToken = (token: string) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

export const verifyRefreshToken = (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);