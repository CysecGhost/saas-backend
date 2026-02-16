import { prisma } from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import AppError from "../lib/AppError.js";

// Define types for sorting
type ProductSortField = "name" | "price" | "createdAt";
type SortOrder = "asc" | "desc";

export const createProduct = async (name: string, price: number, orgId: string) => {
    const product = await prisma.product.create({
        data: {
            name,
            price,
            orgId,
        }
    });

    return { product };
};

export const getProducts = async (orgId: string, page: number, limit: number, skip: number, search?: string, sort?: ProductSortField, order?: SortOrder) => {
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

export const getProductById = async (id: string, orgId: string) => {
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

export const updateProduct = async (id: string, name: string, price: number, orgId: string) => {
    const product = await prisma.product.update({
        where: {
            id_orgId: {
                id,
                orgId,
            },
        },
        data: {
            name,
            price,
        },
    });

    if (!product) {
        throw new AppError("Product not found", 404)
    }

    return { product };
};

export const deleteProduct = async (id: string, orgId: string) => {
    const product = await prisma.product.delete({
        where: {
            id_orgId: {
                id,
                orgId,
            },
        },
    });

    if (!product) {
        throw new AppError("Product not found", 404)
    }    

    return { product };
};