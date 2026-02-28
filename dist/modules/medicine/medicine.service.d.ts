export declare const getAllMedicines: (options?: {
    search?: string | undefined;
    categoryId?: string | undefined;
    manufacturer?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc";
}) => Promise<{
    data: ({
        category: {
            name: string;
        };
        seller: {
            name: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        manufacturer: string | null;
        sellerId: string;
        categoryId: string;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}>;
export declare const MedicineService: {
    getAllMedicines: (options?: {
        search?: string | undefined;
        categoryId?: string | undefined;
        manufacturer?: string | undefined;
        minPrice?: number | undefined;
        maxPrice?: number | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc";
    }) => Promise<{
        data: ({
            category: {
                name: string;
            };
            seller: {
                name: string;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            stock: number;
            manufacturer: string | null;
            sellerId: string;
            categoryId: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    getMedicineById: (id: string) => Promise<({
        category: {
            name: string;
        };
        seller: {
            name: string;
        };
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            comment: string | null;
            customer: {
                name: string;
            };
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        manufacturer: string | null;
        sellerId: string;
        categoryId: string;
    }) | null>;
    createMedicine: (data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        categoryId: string;
        sellerId: string;
    }) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        manufacturer: string | null;
        sellerId: string;
        categoryId: string;
    }>;
    updateMedicine: (id: string, data: Partial<{
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        categoryId?: string;
    }>, user: {
        id: string;
        role: string;
    }) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        manufacturer: string | null;
        sellerId: string;
        categoryId: string;
    }>;
    deleteMedicine: (id: string, user: {
        id: string;
        role: string;
    }) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
        manufacturer: string | null;
        sellerId: string;
        categoryId: string;
    }>;
    getMyMedicines: (sellerId: string, options?: {
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: string | undefined;
        sortOrder?: string | undefined;
    }) => Promise<{
        data: ({
            category: {
                name: string;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            stock: number;
            manufacturer: string | null;
            sellerId: string;
            categoryId: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
};
//# sourceMappingURL=medicine.service.d.ts.map