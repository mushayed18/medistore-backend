import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        validate: (value: string) => {
          if (value === "ADMIN") {
            throw new Error("ADMIN role cannot be assigned");
          }
          if (value !== "CUSTOMER" && value !== "SELLER") {
            throw new Error("Invalid role");
          }
        },
        defaultValue: "CUSTOMER",
      },
      status: {
        type: "string",
        required: true, // or false if you want it optional
        defaultValue: "ACTIVE", // default for new users
        validate: (value: string) => {
          if (value !== "ACTIVE" && value !== "BANNED") {
            throw new Error("Invalid status");
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
});
