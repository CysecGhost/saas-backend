import jwt from "jsonwebtoken";
type TokenPayload = {
    userId: string;
};
export declare const signAccessToken: (payload: TokenPayload) => string;
export declare const signRefreshToken: (payload: TokenPayload) => string;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map