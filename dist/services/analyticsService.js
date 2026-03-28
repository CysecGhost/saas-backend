import z from "zod";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
export const getRevenue = async (orgId, startDate, endDate) => {
    const createdAtFilter = startDate || endDate
        ? {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
        }
        : undefined;
    const where = {
        orgId,
        status: "COMPLETED",
        ...(createdAtFilter && { createdAt: createdAtFilter })
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
export const getDailyRevenueTrend = async (orgId, startDate, endDate) => {
    const conditions = [Prisma.sql `o."orgId" = ${orgId}`, Prisma.sql `o.status = 'COMPLETED'`];
    if (startDate) {
        conditions.push(Prisma.sql `o."createdAt" >= ${startDate}`);
    }
    ;
    if (endDate) {
        conditions.push(Prisma.sql `o."createdAt" <= ${endDate}`);
    }
    ;
    const trend = await prisma.$queryRaw `
    SELECT
        DATE_TRUNC('day', "createdAt") as date,
        SUM(total)::float as revenue,
        COUNT(*)::int as orders
    FROM "Order" o
    WHERE
        ${Prisma.join(conditions, " AND ")}
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY date ASC
    `;
    return trend;
};
export const getTopSellingProducts = async (orgId, startDate, endDate) => {
    const conditions = [Prisma.sql `o."orgId" = ${orgId}`, Prisma.sql `o.status = 'COMPLETED'`];
    if (startDate) {
        conditions.push(Prisma.sql `o."createdAt" >= ${startDate}`);
    }
    ;
    if (endDate) {
        conditions.push(Prisma.sql `o."createdAt" <= ${endDate}`);
    }
    ;
    const topSellingProducts = await prisma.$queryRaw `
    SELECT
        p.id,
        p.name,
        SUM(oi.quantity)::int as totalSold
    FROM "OrderItem" oi
    JOIN "Order" o ON oi."orderId" = o.id
    JOIN "Product" p ON oi."productId" = p.id
    WHERE
        ${Prisma.join(conditions, " AND ")}
    GROUP BY p.id, p.name
    ORDER BY totalSold DESC
    LIMIT 5 
    `;
    return topSellingProducts;
};
//# sourceMappingURL=analyticsService.js.map