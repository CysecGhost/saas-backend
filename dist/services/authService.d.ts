export declare const registerUser: (email: string, password: string) => Promise<{
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const refreshAccessToken: (token: string) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const logoutUser: (token: string) => Promise<{
    id: string;
    tokenHash: string;
    expiresAt: Date;
    revoked: boolean;
    userId: string;
}>;
//# sourceMappingURL=authService.d.ts.map