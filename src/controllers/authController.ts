import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const {accessToken, refreshToken} = await authService.loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth/refresh",
    });

    res.json({ accessToken });
};

export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" })
    }
    
    const accessToken = await authService.refreshAccessToken(token);

    res.json({ accessToken });
}

export const logout = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" })
    }

    await authService.logoutUser(token);

    res.clearCookie("refreshToken", {
        path: "/auth/refresh",
    });

    res.json({ message: "Logged out successfully" });
}