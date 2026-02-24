import z from "zod";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import AppError from "../lib/AppError.js";

export const getRevenue = async (orgId: string, startDate?: Date, endDate?: Date) => {
    const createdAtFilter: Prisma.DateTimeFilter | undefined = 
        startDate || endDate 
        ? {
            ...(startDate && { gte: startDate}),
            ...(endDate && { lte: endDate}),
        } 
        : undefined;

    const where: Prisma.OrderWhereInput = {
        orgId,
        status: "COMPLETED",
        ...(createdAtFilter && { createdAt: createdAtFilter})
    };

    const result = await prisma.order.aggregate({
        where,
        _sum: {
            total: true,
        },
        _count: true,
        _avg: {
            total: true,
        },
    });

    return {
        totalRevenue: result._sum.total ?? 0,
        totalOrders: result._count,
        averageOrderValue: result._avg.total ?? 0,
    };
};

export const getDailyRevenueTrend = async (orgId: string) => {
    const trend = await prisma.$queryRaw<{ date: Date, revenue: number, orders: number}[]
    >`
    Select
        DATE("createdAt") as date,
        SUM(total) as revenue,
        COUNT(*) as orders
    FROM "Order"
    WHERE
        "orgId" = ${orgId}
        AND "status" = 'COMPLETED'
    GROUP BY DATE("createdAt")
    ORDER BY date ASC
    `;

    return trend;
};

export const getTopSellingProducts = async (orgId: string) => {
    const topSellingProducts = await prisma.$queryRaw<{ id: string, name: string, totalSold: number }[]
    >`
    SELECT
        p.id,
        p.name,
        SUM(oi.quantity) as totalSold
    FROM "OrderItem" oi
    JOIN "Order" o ON oi."orderId" = o.id
    JOIN "Product" p ON oi."productId" = p.id
    WHERE
        o."orgId" = ${orgId}
        AND o."status" = 'COMPLETED'
    GROUP BY p.id, p.name
    ORDER BY totalSold DESC
    LIMIT 5 
    `;

    return topSellingProducts;
};