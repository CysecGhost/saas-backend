import z from "zod";

export const getRevenueQuery = z.object({
    query: z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
    }),
});