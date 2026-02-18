import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, getOrdersQuerySchema } from "../schemas/orderSchema.js";


const router = Router();

router.post("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(createOrderSchema), createOrder);
router.get("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(getOrdersQuerySchema), getOrders);

export default router;