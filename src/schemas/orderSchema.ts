import z from "zod";
import { Status } from "../../generated/prisma";

export const createOrderSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                productId: z.cuid("Invalid product id"),
                quantity: z.coerce.number().int().positive("Quantity must be atleast 1"),
            })
        ).min(1, "Order must contain atleast one item")
    })
});

export const getOrdersQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().positive().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10),
        status: z.enum(Status).optional(),
    }),
});

export const orderIdParamSchema = z.object({
  params: z.object({
    id: z.cuid("Invalid order id"),
  }),
});

export const orderStatusSchema = z.object({
    body: z.object({
        status: z.enum(Status),
    }),
});