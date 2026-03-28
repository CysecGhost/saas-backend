import z from "zod";
import * as productService from "../services/productService.js";
import { getProductsQuerySchema } from "../schemas/productSchema.js";
import asyncHandler from "express-async-handler";
export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, stock } = req.body;
    const orgId = req.org?.id;
    const { product } = await productService.createProduct(orgId, name, price, stock);
    res.status(201).json({ product });
});
export const getProducts = asyncHandler(async (req, res) => {
    const orgId = req.org?.id;
    const query = req.validated?.query;
    const { page, limit, search, sort, order } = query;
    const skip = (page - 1) * limit;
    const { products, pagination } = await productService.getProducts(orgId, page, limit, skip, search, sort, order);
    res.json({ products, pagination });
});
export const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const orgId = req.org?.id;
    const { product } = await productService.getProductById(id, orgId);
    res.json({ product });
});
export const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, price, stock } = req.body;
    const orgId = req.org?.id;
    const { product } = await productService.updateProduct(id, orgId, name, price, stock);
    res.json({ product });
});
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const orgId = req.org?.id;
    const { product } = await productService.deleteProduct(id, orgId);
    res.json({ product });
});
//# sourceMappingURL=productController.js.map