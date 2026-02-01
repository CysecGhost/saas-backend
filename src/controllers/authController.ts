import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await authService.loginUser(email, password);
    res.json(tokens);
};
