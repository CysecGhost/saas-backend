import type { Request, Response } from "express";
import * as authService from "../services/authService.js";
import AppError from "../lib/AppError.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res.status(201).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const { accessToken, refreshToken } = await authService.loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
        path: "/auth/refresh",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ accessToken });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        throw new AppError("No refresh token", 401);
    }
    
    const { accessToken, refreshToken} = await authService.refreshAccessToken(token);

    res.cookie("refreshToken", refreshToken, {
        path: "/auth/refresh",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        throw new AppError("No refresh token", 401);
    }

    await authService.logoutUser(token);

    res.clearCookie("refreshToken", {
        path: "/auth/refresh",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
    });

    res.json({ message: "Logged out successfully" });
});