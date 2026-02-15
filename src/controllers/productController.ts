import type { Request, Response } from "express";
import * as productService from "../services/productService";
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler (async (req: Request, res: Response) => {
    const { name, price } = req.body;
    const orgId = req.org?.id!;

    const { product } = await productService.createProduct(name, price, orgId);

    res.status(201).json({ product });
});

export const getProducts = asyncHandler (async (req: Request, res: Response) => {
    const orgId = req.org?.id!;

    const { products } = await productService.getProducts(orgId);

    res.json({ products });
});

export const getProductById = asyncHandler (async (req: Request, res: Response) => {
    const { id }: any = req.params;
    const orgId = req.org?.id!;

    const { product } = await productService.getProductById(id, orgId);

    res.json({ product });
});

export const updateProduct = asyncHandler (async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { name, price } = req.body;
    const orgId = req.org?.id!;

    const { product } = await productService.updateProduct(id, name, price, orgId);

    res.json({ product });
});

export const deleteProduct = asyncHandler (async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const orgId = req.org?.id!;

    const { product } = await productService.deleteProduct(id, orgId);

    res.json({ product });
});
