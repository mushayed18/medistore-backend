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
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
