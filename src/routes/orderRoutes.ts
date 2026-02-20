import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus, cancelOrder, completeOrder} from "../controllers/orderController.js";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, getOrdersQuerySchema, orderIdParamSchema, orderStatusSchema } from "../schemas/orderSchema.js";


const router = Router();

router.post("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(createOrderSchema), createOrder);
router.get("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(getOrdersQuerySchema), getOrders);
router.get("/:id", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), getOrderById);
router.patch("/:id/status", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), validate(orderStatusSchema), updateOrderStatus);
router.patch("/:id/cancel", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), cancelOrder);
router.patch("/:id/completed", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), completeOrder);

export default router;