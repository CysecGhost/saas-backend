import { Router } from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, getOrdersQuerySchema, orderIdParamSchema } from "../schemas/orderSchema.js";


const router = Router();

router.post("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(createOrderSchema), createOrder);
router.get("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(getOrdersQuerySchema), getOrders);
router.get("/:id", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), getOrderById);

export default router;