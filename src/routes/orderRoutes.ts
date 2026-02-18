import { Router } from "express";
import { createOrder } from "../controllers/orderController.js";
import orgMiddleware from "../middlewares/orgMiddleware.js";
import { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema } from "../schemas/orderSchema.js";


const router = Router();

router.post("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(createOrderSchema), createOrder);

export default router;