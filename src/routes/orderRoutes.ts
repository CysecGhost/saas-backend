import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus} from "../controllers/orderController.js";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, getOrdersQuerySchema, orderIdParamSchema, updateOrderStatusSchema } from "../schemas/orderSchema.js";


const router = Router();

router.post("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(createOrderSchema), createOrder);
router.get("/", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(getOrdersQuerySchema), getOrders);
router.get("/:id", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), getOrderById);
router.patch("/:id", orgMiddleware, requireRole(["ADMIN", "MANAGER"]), validate(orderIdParamSchema), validate(updateOrderStatusSchema), updateOrderStatus);

export default router;