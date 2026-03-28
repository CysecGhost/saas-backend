export declare const getRevenue: (orgId: string, startDate?: Date, endDate?: Date) => Promise<{
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
}>;
export declare const getDailyRevenueTrend: (orgId: string, startDate?: Date, endDate?: Date) => Promise<{
    date: Date;
    revenue: number;
    orders: number;
}[]>;
export declare const getTopSellingProducts: (orgId: string, startDate?: Date, endDate?: Date) => Promise<{
    id: string;
    name: string;
    totalSold: number;
}[]>;
//# sourceMappingURL=analyticsService.d.ts.map