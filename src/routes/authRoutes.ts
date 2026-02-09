import { Router } from "express";
import type { Request, Response } from "express";
import { register, login, refresh, logout } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import orgMiddleware from "../middlewares/orgMiddleware.js";
import { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Example protected route
router.get("/profile", authMiddleware, orgMiddleware, requireRole(["ADMIN", "MANAGER"]), (req: Request, res: Response) => {
    // TS knows req.user exists (you may augment Express.Request)
    res.json({ message: `Hello user ${req.user?.id} in organization ${req.org?.id} with role ${req.org?.role}` });
});

export default router;