import jwt, { type JwtPayload } from "jsonwebtoken";

type TokenPayload = {
    userId: string;
}

export const signAccessToken = (payload: TokenPayload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
});

export const signRefreshToken = (payload: TokenPayload) => jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
});

export const verifyAccessToken = (token: string) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

export const verifyRefreshToken = (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);