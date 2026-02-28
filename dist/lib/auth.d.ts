export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    user: {
        additionalFields: {
            role: {
                type: "string";
                required: true;
                validate: (value: string) => void;
                defaultValue: string;
            };
            status: {
                type: "string";
                required: true;
                defaultValue: string;
                validate: (value: string) => void;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
    };
}>;
//# sourceMappingURL=auth.d.ts.map