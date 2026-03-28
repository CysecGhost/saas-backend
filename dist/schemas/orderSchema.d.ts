import z from "zod";
export declare const createOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodCUID;
            quantity: z.ZodCoercedNumber<unknown>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrdersQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        status: z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            COMPLETED: "COMPLETED";
            CANCELLED: "CANCELLED";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const orderIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodCUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const orderStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            PENDING: "PENDING";
            COMPLETED: "COMPLETED";
            CANCELLED: "CANCELLED";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=orderSchema.d.ts.map