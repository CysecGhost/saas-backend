type ProductSortField = "name" | "price" | "createdAt";
type SortOrder = "asc" | "desc";
export declare const createProduct: (orgId: string, name: string, price: number, stock?: number) => Promise<{
    product: {
        id: string;
        createdAt: Date;
        name: string;
        orgId: string;
        price: number;
        stock: number;
    };
}>;
export declare const getProducts: (orgId: string, page: number, limit: number, skip: number, search?: string, sort?: ProductSortField, order?: SortOrder) => Promise<{
    products: {
        id: string;
        createdAt: Date;
        name: string;
        orgId: string;
        price: number;
        stock: number;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getProductById: (id: string, orgId: string) => Promise<{
    product: {
        id: string;
        createdAt: Date;
        name: string;
        orgId: string;
        price: number;
        stock: number;
    };
}>;
export declare const updateProduct: (id: string, orgId: string, name?: string, price?: number, stock?: number) => Promise<{
    product: {
        id: string;
        createdAt: Date;
        name: string;
        orgId: string;
        price: number;
        stock: number;
    };
}>;
export declare const deleteProduct: (id: string, orgId: string) => Promise<{
    product: {
        id: string;
        createdAt: Date;
        name: string;
        orgId: string;
        price: number;
        stock: number;
    };
}>;
export {};
//# sourceMappingURL=productService.d.ts.map