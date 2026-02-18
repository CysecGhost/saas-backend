import { Router } from "express";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema, productIdParamSchema, getProductsQuerySchema } from "../schemas/productSchema.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.post("/", orgMiddleware, requireRole(["ADMIN"]), validate(createProductSchema), createProduct);
router.get("/", orgMiddleware, validate(getProductsQuerySchema), getProducts);
router.get("/:id", orgMiddleware, validate(productIdParamSchema), getProductById);
router.patch("/:id", orgMiddleware, requireRole(["ADMIN"]), validate(productIdParamSchema), validate(updateProductSchema), updateProduct);
router.delete("/:id", orgMiddleware, requireRole(["ADMIN"]), validate(productIdParamSchema), deleteProduct);

export default router;