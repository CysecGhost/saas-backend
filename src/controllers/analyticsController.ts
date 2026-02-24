import type { Request, Response } from "express";
import z from "zod";
import { getRevenueQuery } from "../schemas/analyticsSchema.js";
import * as analyticsService from "../services/analyticsService.js";
import asyncHandler from "express-async-handler";

// Infer the type of the query parameters from the Zod schema
type GetRevenueQuery = z.infer<typeof getRevenueQuery>["query"];

export const getRevenue = asyncHandler(async (req: Request, res: Response) => {
    const orgId = req.org?.id!;
    const query = req.validated?.query as GetRevenueQuery;
    const { startDate, endDate } = query;

    const { totalRevenue, totalOrders, averageOrderValue} = await analyticsService.getRevenue(orgId, startDate, endDate);

    res.json({ totalRevenue, totalOrders, averageOrderValue });
});

export const getDailyRevenueTrend = asyncHandler(async (req: Request, res: Response) => {
    const orgId = req.org?.id!;

    const trend = await analyticsService.getDailyRevenueTrend(orgId);

    res.json({ trend });
});


export const getTopSellingProducts = asyncHandler(async (req: Request, res: Response) => {
    const orgId = req.org?.id!;

    const topSellingProducts = await analyticsService.getTopSellingProducts(orgId);

    res.json({ topSellingProducts });
});
