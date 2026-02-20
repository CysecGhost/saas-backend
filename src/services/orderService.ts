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

        // Create a map for easy lookup 
        const productMap = new Map(products.map(p => [p.id, p]));

        // Validate all products exist
        if (products.length !== productIds.length) {
            throw new AppError("One or more products not found", 404);
        };

        // Calculate total
        let total = 0;

        const orderItemsData = items.map((item) => {
            const product = productMap.get(item.productId)!;

            // Check stock
            if (item.quantity > product.stock) {
                throw new AppError("Not enough stock", 400);
            };

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

        // Decrement stock
        await Promise.all(items.map(async (item) => {
            const product = productMap.get(item.productId)!;

            const result = await tx.product.updateMany({
                where: {
                    orgId,
                    id: product.id,
                    stock: { gte: item.quantity },
                },
                data: {
                    stock: { decrement: item.quantity}
                }
            });

            if (result.count === 0) {
                throw new AppError("Not enough stock", 400);
            };
        }));

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
        include: {
            items: true,
        },
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

export const getOrderById = async (orgId: string, id:string) => {
    const order = await prisma.order.findUnique({
        where: {
            id_orgId: {
                id,
                orgId,
            }
        },
        include: {
            items: true,
        },
    });

    if (!order) {
        throw new AppError("Order not found", 404);
    };

    return  { order };
};

export const updateOrderStatus = async (orgId: string, id:string, status: Status) => {
    const where = {
        id_orgId: {
            id,
            orgId,
        }
    };

    const order = await prisma.order.findUnique({
        where,
    });

    if (!order) {
        throw new AppError("Order not found", 404);
    };

    if (order.status !== "PENDING") {
        throw new AppError("Order is not pending; status cannot be changed", 409);
    };

    const updatedOrder = await prisma.order.update({
        where,
        data: {
            status,
        },
    });

    return { updatedOrder };
};

export const cancelOrder = async (orgId: string, id:string) => {
    return await prisma.$transaction(async (tx) => {
        const where = {
            id_orgId: {
                id,
                orgId,
            },
        };

        const order = await tx.order.findUnique({
            where,
            include: {
                items: true,
            },
        });

        if (!order) {
            throw new AppError("Order not found", 404);
        };

        // Only pending orders can be cancelled
        if (order.status !== "PENDING") {
            throw new AppError("Order is not pending; status cannot be changed", 409);
        };

        // Cancel order
        const result = await tx.order.updateMany({
            where: {
                orgId,
                id,
                status: "PENDING",
            },
            data: {
                status: "CANCELLED",
            },
        });

        if (result.count === 0) {
            throw new AppError("Order is not pending; status cannot be changed", 409);
        };

        // Restore stock
        const items = order.items;

        await Promise.all(items.map(item => {
            return tx.product.update({
                where: {
                    id_orgId: {
                        orgId,
                        id: item.productId,
                    },
                },
                data: {
                    stock: { increment: item.quantity },
                },
            });
        }));

        const updatedOrder = await tx.order.findUnique({
            where,
            include: {
                items: true,
            },
        });

        return { updatedOrder };
    });
};