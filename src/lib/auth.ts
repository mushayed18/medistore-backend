import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
});
