import type { Request, Response } from "express";
import z from "zod";
import * as productService from "../services/productService.js";
import { getProductsQuerySchema } from "../schemas/productSchema.js";
import asyncHandler from "express-async-handler";

// Infer the type of the query parameters for getProducts from the Zod schema
type getProductsQuery = z.infer<typeof getProductsQuerySchema>["query"];

export const createProduct = asyncHandler (async (req: Request, res: Response) => {
    const { name, price, stock } = req.body;
    const orgId = req.org?.id!;

    const { product } = await productService.createProduct(orgId, name, price, stock);

    res.status(201).json({ product });
});

export const getProducts = asyncHandler (async (req: Request, res: Response) => {
    const orgId = req.org?.id!;
    const query = req.validated?.query as getProductsQuery;
    const { page, limit, search, sort, order } = query;
    const skip = (page - 1) * limit;

    const { products, pagination } = await productService.getProducts(orgId, page, limit, skip, search, sort, order);

    res.json({ products, pagination });
});

export const getProductById = asyncHandler (async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const orgId = req.org?.id!;

    const { product } = await productService.getProductById(id, orgId);

    res.json({ product });
});

export const updateProduct = asyncHandler (async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { name, price, stock } = req.body;
    const orgId = req.org?.id!;

    const { product } = await productService.updateProduct(id, orgId, name, price, stock);

    res.json({ product });
});

export const deleteProduct = asyncHandler (async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const orgId = req.org?.id!;

    const { product } = await productService.deleteProduct(id, orgId);

    res.json({ product });
});
