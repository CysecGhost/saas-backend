import z from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                productId: z.cuid("Invalid product id"),
                quantity: z.coerce.number().int().positive("Quantity must be atleast 1"),
            })
        ).min(1, "Order must contain atleast one item")
    })
})