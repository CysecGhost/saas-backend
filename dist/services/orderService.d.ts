import z from "zod";
import { createOrderSchema } from "../schemas/orderSchema.js";
import { Status } from "../../generated/prisma/index.js";
type createOrderBody = z.infer<typeof createOrderSchema>["body"]["items"];
export declare const createOrder: (orgId: string, items: createOrderBody) => Promise<{
    order: {
        items: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        status: import("../../generated/prisma/index.js").$Enums.Status;
        total: number;
    };
}>;
export declare const getOrders: (orgId: string, page: number, limit: number, skip: number, status?: Status) => Promise<{
    orders: ({
        items: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        status: import("../../generated/prisma/index.js").$Enums.Status;
        total: number;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getOrderById: (orgId: string, id: string) => Promise<{
    order: {
        items: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        status: import("../../generated/prisma/index.js").$Enums.Status;
        total: number;
    };
}>;
export declare const updateOrderStatus: (orgId: string, id: string, status: Status) => Promise<{
    updatedOrder: {
        id: string;
        createdAt: Date;
        orgId: string;
        status: import("../../generated/prisma/index.js").$Enums.Status;
        total: number;
    };
}>;
export declare const cancelOrder: (orgId: string, id: string) => Promise<{
    updatedOrder: ({
        items: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        status: import("../../generated/prisma/index.js").$Enums.Status;
        total: number;
    }) | null;
}>;
export declare const completeOrder: (orgId: string, id: string) => Promise<{
    updatedOrder: ({
        items: {
            id: string;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        status: import("../../generated/prisma/index.js").$Enums.Status;
        total: number;
    }) | null;
}>;
export {};
//# sourceMappingURL=orderService.d.ts.map