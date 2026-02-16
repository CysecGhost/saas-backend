import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Product name is required"),
    price: z.coerce.number().positive("Price must be greater than 0"),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).optional(),
    price: z.coerce.number().positive().optional(),
  }).refine(
    (data) => data.name !== undefined || data.price !== undefined,
    { message: "At least one field must be provided" }
  ),
});

export const productIdParamSchema = z.object({
  params: z.object({
    id: z.cuid("Invalid product id"),
  }),
});

export const getProductsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().trim().optional(),
    sort: z.enum(["name", "price", "createdAt"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
  }),
});