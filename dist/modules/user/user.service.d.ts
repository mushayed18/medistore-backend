export declare const UserService: {
    getCurrentUser: (userId: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        role: string;
        status: import("../../generated/prisma/enums").UserStatus;
        email: string;
        phone: string | null;
        address: string | null;
    }>;
    updateCurrentUser: (userId: string, data: {
        name?: string;
        phone?: string;
        address?: string;
    }) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        role: string;
        email: string;
        phone: string | null;
        address: string | null;
    }>;
    getAllUsers: (options?: {
        page?: number | undefined;
        limit?: number | undefined;
    }) => Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            role: string;
            status: import("../../generated/prisma/enums").UserStatus;
            email: string;
            phone: string | null;
            address: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    updateUserStatus: (userId: string, newStatus: "ACTIVE" | "BANNED", adminId: string) => Promise<{
        id: string;
        name: string;
        role: string;
        status: import("../../generated/prisma/enums").UserStatus;
        email: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map