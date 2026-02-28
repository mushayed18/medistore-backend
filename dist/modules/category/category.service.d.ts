export declare const CategoryService: {
    createCategory: (payload: {
        name: string;
        description?: string;
    }) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getCategoryById: (id: string) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateCategory: (id: string, payload: {
        name?: string;
        description?: string;
    }) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCategory: (id: string) => Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map