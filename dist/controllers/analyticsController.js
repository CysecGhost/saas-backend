import z from "zod";
import { getRevenueQuery, getTopProductsQuery } from "../schemas/analyticsSchema.js";
import * as analyticsService from "../services/analyticsService.js";
import asyncHandler from "express-async-handler";
export const getRevenue = asyncHandler(async (req, res) => {
    const orgId = req.org?.id;
    const query = req.validated?.query;
    const { startDate, endDate } = query;
    const { totalRevenue, totalOrders, averageOrderValue } = await analyticsService.getRevenue(orgId, startDate, endDate);
    res.json({ totalRevenue, totalOrders, averageOrderValue });
});
export const getDailyRevenueTrend = asyncHandler(async (req, res) => {
    const orgId = req.org?.id;
    const query = req.validated?.query;
    const { startDate, endDate } = query;
    const trend = await analyticsService.getDailyRevenueTrend(orgId, startDate, endDate);
    res.json({ trend });
});
export const getTopSellingProducts = asyncHandler(async (req, res) => {
    const orgId = req.org?.id;
    const query = req.validated?.query;
    const { startDate, endDate } = query;
    const topSellingProducts = await analyticsService.getTopSellingProducts(orgId, startDate, endDate);
    res.json({ topSellingProducts });
});
//# sourceMappingURL=analyticsController.js.map