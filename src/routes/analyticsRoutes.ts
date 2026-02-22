import { Router } from "express";
import { getRevenue, getDailyRevenueTrend } from "../controllers/analyticsController.js";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";
import { getRevenueQuery } from "../schemas/analyticsSchema.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

// Placeholder for analytics routes
router.get("/revenue", orgMiddleware, requireRole(["ADMIN"]), validate(getRevenueQuery), getRevenue);
router.get("/revenue/daily", orgMiddleware, requireRole(["ADMIN"]), getDailyRevenueTrend);

export default router;