import type { Request, Response } from "express";
import z from "zod";
import * as orderService from "../services/orderService.js";
import { createOrderSchema, getOrdersQuerySchema, orderIdParamSchema } from "../schemas/orderSchema.js";
import asyncHandler from "express-async-handler";

// Infer the type of the parameters from the Zod schema
type createOrderBody = z.infer<typeof createOrderSchema>["body"];
type getOrdersQuery = z.infer<typeof getOrdersQuerySchema>["query"];
type orderIdParam = z.infer<typeof orderIdParamSchema>["params"];

export const createOrder = asyncHandler (async (req: Request, res: Response) => {
    const orgId = req.org?.id!;
    const body = req.validated?.body as createOrderBody;
    const { items } = body;

    const { order } = await orderService.createOrder(orgId, items)

    res.status(201).json({ order });
});

export const getOrders = asyncHandler (async (req: Request, res: Response) => {
    const orgId = req.org?.id!;
    const query = req.validated?.query as getOrdersQuery;
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const { orders, pagination } = await orderService.getOrders(orgId, page, limit, skip, status);

    res.json({ orders, pagination });
});

export const getOrderById = asyncHandler (async (req: Request, res: Response) => {
    const orgId = req.org?.id!;
    const params = req.validated?.params as orderIdParam;
    const { id } = params;

    const { order } = await orderService.getOrderById(orgId, id);

    res.json({ order });
});