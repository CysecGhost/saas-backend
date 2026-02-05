import { Router } from "express";
import type { Request, Response } from "express";
import { register, login, refresh, logout } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Example protected route
router.get("/profile", authMiddleware, (req: Request, res: Response) => {
    // TS knows req.user exists (you may augment Express.Request)
    res.json({ message: `Hello user ${req.user?.id}` });
});

export default router;