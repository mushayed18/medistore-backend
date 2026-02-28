import { OrderStatus } from "../../generated/prisma/enums";
type CreateOrderInput = {
    items: Array<{
        medicineId: string;
        quantity: number;
    }>;
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    shippingCity: string;
    shippingZip: string;
};
export declare const OrderService: {
    createOrder: (customerId: string, input: CreateOrderInput) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        customerId: string;
        totalAmount: number;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        shippingCity: string;
        shippingZip: string;
    }>;
    getMyOrders: (customerId: string, options?: {
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: string | undefined;
        sortOrder?: string | undefined;
    }) => Promise<{
        data: ({
            items: ({
                medicine: {
                    id: string;
                    name: string;
                    price: number;
                };
            } & {
                id: string;
                price: number;
                medicineId: string;
                quantity: number;
                orderId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: OrderStatus;
            customerId: string;
            totalAmount: number;
            shippingName: string;
            shippingPhone: string;
            shippingAddress: string;
            shippingCity: string;
            shippingZip: string;
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
    getOrderById: (orderId: string, currentUser: {
        id: string;
        role: string;
    }) => Promise<{
        customer: {
            id: string;
            name: string;
            email: string;
        };
        items: ({
            medicine: {
                id: string;
                name: string;
                price: number;
            };
        } & {
            id: string;
            price: number;
            medicineId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        customerId: string;
        totalAmount: number;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        shippingCity: string;
        shippingZip: string;
    }>;
    getAllOrders: (currentUser: {
        id: string;
        role: string;
    }, options?: {
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: string | undefined;
        sortOrder?: string | undefined;
    }) => Promise<{
        data: ({
            customer: {
                id: string;
                name: string;
                email: string;
            };
            items: ({
                medicine: {
                    id: string;
                    name: string;
                    price: number;
                };
            } & {
                id: string;
                price: number;
                medicineId: string;
                quantity: number;
                orderId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: OrderStatus;
            customerId: string;
            totalAmount: number;
            shippingName: string;
            shippingPhone: string;
            shippingAddress: string;
            shippingCity: string;
            shippingZip: string;
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
    updateOrderStatus: (orderId: string, newStatus: string, currentUser: {
        id: string;
        role: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        customerId: string;
        totalAmount: number;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        shippingCity: string;
        shippingZip: string;
    }>;
    cancelOrder: (orderId: string, customerId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        customerId: string;
        totalAmount: number;
        shippingName: string;
        shippingPhone: string;
        shippingAddress: string;
        shippingCity: string;
        shippingZip: string;
    }>;
};
export {};
//# sourceMappingURL=order.service.d.ts.map