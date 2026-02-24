import z from "zod";

export const getRevenueQuery = z.object({
    query: z.object({
        startDate: z.iso.datetime().optional(),
        endDate: z.iso.datetime().optional(),
    }).transform((data) => ({
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
    })).refine((data) => {
        if (data.startDate && data.endDate) {
            return data.startDate <= data.endDate;
        };
        return true;
    },
    {
        message: "startDate must be before or equal to endDate",
    }),
});