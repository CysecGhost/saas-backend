import { prisma } from "../lib/prisma.js";
import AppError from "../lib/AppError.js";

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

export const getProducts = async (orgId: string) => {
    const products = await prisma.product.findMany({
        where: {
            orgId,
        },
    });

    return { products };
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