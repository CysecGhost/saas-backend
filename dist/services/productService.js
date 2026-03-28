import { prisma } from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import AppError from "../lib/AppError.js";
export const createProduct = async (orgId, name, price, stock) => {
    const product = await prisma.product.create({
        data: {
            name,
            price,
            orgId,
            stock: stock ?? 0,
        }
    });
    return { product };
};
export const getProducts = async (orgId, page, limit, skip, search, sort, order) => {
    const where = {
        orgId,
        ...(search && {
            name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
            },
        }),
    };
    const products = await prisma.product.findMany({
        where,
        orderBy: sort
            ? { [sort]: order ?? "asc" }
            : { createdAt: "desc" },
        skip,
        take: limit,
    });
    const total = await prisma.product.count({
        where,
    });
    const totalPages = Math.ceil(total / limit);
    return {
        products,
        pagination: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};
export const getProductById = async (id, orgId) => {
    const product = await prisma.product.findUnique({
        where: {
            id_orgId: {
                id,
                orgId,
            },
        },
    });
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    return { product };
};
export const updateProduct = async (id, orgId, name, price, stock) => {
    const product = await prisma.product.update({
        where: {
            id_orgId: {
                id,
                orgId,
            },
        },
        data: {
            ...(name !== undefined && {
                name,
            }),
            ...(price !== undefined && {
                price,
            }),
            ...(stock !== undefined && {
                stock,
            }),
        },
    });
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    return { product };
};
export const deleteProduct = async (id, orgId) => {
    const product = await prisma.product.delete({
        where: {
            id_orgId: {
                id,
                orgId,
            },
        },
    });
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    return { product };
};
//# sourceMappingURL=productService.js.map