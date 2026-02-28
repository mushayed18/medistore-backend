export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly SELLER: "SELLER";
    readonly CUSTOMER: "CUSTOMER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly BANNED: "BANNED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
//# sourceMappingURL=enums.d.ts.map