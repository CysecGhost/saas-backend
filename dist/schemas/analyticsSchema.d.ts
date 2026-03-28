import z from "zod";
export declare const getRevenueQuery: z.ZodObject<{
    query: z.ZodPipe<z.ZodObject<{
        startDate: z.ZodOptional<z.ZodISODateTime>;
        endDate: z.ZodOptional<z.ZodISODateTime>;
    }, z.core.$strip>, z.ZodTransform<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }, {
        startDate?: string | undefined;
        endDate?: string | undefined;
    }>>;
}, z.core.$strip>;
export declare const getTopProductsQuery: z.ZodObject<{
    query: z.ZodPipe<z.ZodObject<{
        startDate: z.ZodOptional<z.ZodISODateTime>;
        endDate: z.ZodOptional<z.ZodISODateTime>;
    }, z.core.$strip>, z.ZodTransform<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }, {
        startDate?: string | undefined;
        endDate?: string | undefined;
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=analyticsSchema.d.ts.map