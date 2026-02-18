import type { Request, Response } from "express";
import z from "zod";
import * as orderService from "../services/orderService.js";
import { createOrderSchema } from "../schemas/orderSchema.js";
import asyncHandler from "express-async-handler";

// Infer the type of the query parameters for getProducts from the Zod schema
type createOrderBody = z.infer<typeof createOrderSchema>["body"];

export const createOrder = asyncHandler (async (req: Request, res: Response) => {
    const orgId = req.org?.id!;
    const body = req.validated?.body as createOrderBody;
    const { items } = body;

    const { order } = await orderService.createOrder(orgId, items)

    res.status(201).json({ order });
});