import { z } from "zod";
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        price: z.ZodCoercedNumber<unknown>;
        stock: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        stock: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const productIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodCUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getProductsQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        search: z.ZodOptional<z.ZodString>;
        sort: z.ZodOptional<z.ZodEnum<{
            createdAt: "createdAt";
            name: "name";
            price: "price";
        }>>;
        order: z.ZodOptional<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=productSchema.d.ts.map