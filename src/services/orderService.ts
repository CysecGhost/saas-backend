import z from "zod";
import { prisma } from "../lib/prisma.js";
import { createOrderSchema } from "../schemas/orderSchema.js";
import { Status } from "../../generated/prisma/index.js";
import AppError from "../lib/AppError.js";

// Infer the type of the parameters from the Zod schema
type createOrderBody = z.infer<typeof createOrderSchema>["body"]["items"];

export const createOrder = async (orgId: string, items: createOrderBody) => {
    return await prisma.$transaction(async (tx) => {
        const productIds = items.map(item => item.productId);

        const uniqueIds = new Set(productIds);

        if (uniqueIds.size !== productIds.length) {
            throw new AppError("Duplicate products found in order", 400);
        };

        // Fetch products
        const products = await tx.product.findMany({
            where: {
                orgId,
                id: { in: productIds}
            },
        });

        // Validate all products exist
        if (products.length !== productIds.length) {
            throw new AppError("One or more products not found", 404);
        };

        // Calculate total
        let total = 0;

        const orderItemsData = items.map((item) => {
            const product = products.find(p => p.id === item.productId)!;

            total += product.price * item.quantity;

            return {
                productId: product.id,
                quantity: item.quantity,
                price: product.price, // snapshot
            };
        });

        // Create order
        const order = await tx.order.create({
            data: {
                orgId,
                total,
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: true,
            },
        });

        return { order };
    });
};

export const getOrders = async (orgId: string, page: number, limit: number, skip: number, status?: Status) => {
    const where = {
        orgId,
        ...(status && {
            status,
        }),
    };

    const orders = await prisma.order.findMany({
        where,
        skip,
        take: limit,
    });

    const total = await prisma.order.count({
        where,
    });

    const totalPages = Math.ceil(total / limit);

    return {
        orders,
        pagination: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};