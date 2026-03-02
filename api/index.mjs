// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/category/category.route.ts
import { Router } from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum UserRole {\n  ADMIN\n  SELLER\n  CUSTOMER\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nmodel User {\n  id            String   @id\n  name          String\n  email         String\n  emailVerified Boolean  @default(false)\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  role          String   @default("CUSTOMER")\n\n  status UserStatus @default(ACTIVE)\n\n  phone   String?\n  address String?\n\n  sessions Session[]\n  accounts Account[]\n\n  // Relations\n  medicines Medicine[] @relation("SellerMedicines")\n  orders    Order[]    @relation("CustomerOrders")\n  reviews   Review[]   @relation("CustomerReviews")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  description String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  medicines Medicine[]\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String  @id @default(uuid())\n  name         String\n  description  String?\n  price        Float\n  stock        Int     @default(0)\n  manufacturer String?\n\n  sellerId   String\n  categoryId String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  seller   User     @relation("SellerMedicines", fields: [sellerId], references: [id], onDelete: Cascade)\n  category Category @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  @@map("medicines")\n}\n\nenum OrderStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel Order {\n  id          String      @id @default(uuid())\n  customerId  String\n  totalAmount Float\n  status      OrderStatus @default(PENDING)\n\n  shippingName    String\n  shippingPhone   String\n  shippingAddress String\n  shippingCity    String\n  shippingZip     String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  customer User @relation("CustomerOrders", fields: [customerId], references: [id], onDelete: Cascade)\n\n  items OrderItem[]\n\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  quantity Int\n  price    Float\n\n  orderId    String\n  medicineId String\n\n  order    Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  medicine Medicine @relation(fields: [medicineId], references: [id], onDelete: Restrict)\n\n  @@map("order_items")\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int\n  comment String?\n\n  medicineId String\n  customerId String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  medicine Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  customer User     @relation("CustomerReviews", fields: [customerId], references: [id], onDelete: Cascade)\n\n  @@unique([customerId, medicineId]) // one review per customer per medicine\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"SellerMedicines"},{"name":"orders","kind":"object","type":"Order","relationName":"CustomerOrders"},{"name":"reviews","kind":"object","type":"Review","relationName":"CustomerReviews"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"seller","kind":"object","type":"User","relationName":"SellerMedicines"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"shippingName","kind":"scalar","type":"String"},{"name":"shippingPhone","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"shippingCity","kind":"scalar","type":"String"},{"name":"shippingZip","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"CustomerOrders"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"customer","kind":"object","type":"User","relationName":"CustomerReviews"}],"dbName":"reviews"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/category/category.service.ts
var createCategory = async (payload) => {
  return prisma.category.create({
    data: payload
  });
};
var getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getCategoryById = async (id) => {
  return prisma.category.findUnique({
    where: { id }
  });
};
var updateCategory = async (id, payload) => {
  return prisma.category.update({
    where: { id },
    data: payload
  });
};
var deleteCategory = async (id) => {
  return prisma.category.delete({
    where: { id }
  });
};
var CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var getAllCategories2 = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error("getAllCategories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
};
var getCategoryById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("getCategoryById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category"
    });
  }
};
var createCategory2 = async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("createCategory error:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Category already exists"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create category"
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.updateCategory(
      id,
      req.body
    );
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("updateCategory error:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update category"
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("deleteCategory error:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete category"
    });
  }
};
var CategoryController = {
  getAllCategories: getAllCategories2,
  getCategoryById: getCategoryById2,
  createCategory: createCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        validate: (value) => {
          if (value === "ADMIN") {
            throw new Error("ADMIN role cannot be assigned");
          }
          if (value !== "CUSTOMER" && value !== "SELLER") {
            throw new Error("Invalid role");
          }
        },
        defaultValue: "CUSTOMER"
      },
      status: {
        type: "string",
        required: true,
        // or false if you want it optional
        defaultValue: "ACTIVE",
        // default for new users
        validate: (value) => {
          if (value !== "ACTIVE" && value !== "BANNED") {
            throw new Error("Invalid status");
          }
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "none",
      secure: true
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/utils/nodeHeadersToWebHeaders.ts
function nodeHeadersToWebHeaders(headers) {
  const webHeaders = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => webHeaders.append(key, v));
    } else {
      webHeaders.set(key, value);
    }
  }
  return webHeaders;
}

// src/middlewares/adminOnly.ts
var adminOnly = async (req, res, next) => {
  try {
    const headers = nodeHeadersToWebHeaders(req.headers);
    const session = await auth.api.getSession({
      headers
    });
    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (session.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access only" });
    }
    req.user = session.user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// src/modules/category/category.route.ts
var router = Router();
router.post("/", adminOnly, CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", adminOnly, CategoryController.updateCategory);
router.delete("/:id", adminOnly, CategoryController.deleteCategory);
var CategoryRoutes = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/medicine/medicine.route.ts
import { Router as Router2 } from "express";

// src/modules/medicine/medicine.service.ts
var getAllMedicines = async (options = {}) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(100, options.limit ?? 10));
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";
  const where = {};
  if (options.search) {
    where.name = {
      contains: options.search,
      mode: "insensitive"
    };
  }
  if (options.categoryId) {
    where.categoryId = options.categoryId;
  }
  if (options.manufacturer) {
    where.manufacturer = {
      contains: options.manufacturer,
      mode: "insensitive"
    };
  }
  if (options.minPrice !== void 0 || options.maxPrice !== void 0) {
    where.price = {};
    if (options.minPrice !== void 0) {
      where.price.gte = Number(options.minPrice);
    }
    if (options.maxPrice !== void 0) {
      where.price.lte = Number(options.maxPrice);
    }
  }
  const total = await prisma.medicine.count({ where });
  const medicines = await prisma.medicine.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      category: { select: { name: true } },
      seller: { select: { name: true } }
    }
  });
  return {
    data: medicines,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};
var getMedicineById = async (id) => {
  return prisma.medicine.findUnique({
    where: {
      id
    },
    include: {
      category: {
        select: {
          name: true
        }
      },
      seller: {
        select: {
          name: true
        }
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          customer: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
};
var createMedicine = async (data) => {
  return prisma.medicine.create({
    data
  });
};
var updateMedicine = async (id, data, user) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    select: {
      sellerId: true
    }
  });
  if (!medicine) {
    throw new Error("Medicine not found");
  }
  if (user.role === "SELLER" && medicine.sellerId !== user.id) {
    throw new Error("You can only update your own medicines");
  }
  return prisma.medicine.update({
    where: { id },
    data
  });
};
var deleteMedicine = async (id, user) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    select: {
      sellerId: true
    }
  });
  if (!medicine) {
    throw new Error("Medicine not found");
  }
  if (user.role === "SELLER" && medicine.sellerId !== user.id) {
    throw new Error("You can only delete your own medicines");
  }
  return prisma.medicine.delete({
    where: { id }
  });
};
var getMyMedicines = async (sellerId, options = {}) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";
  const total = await prisma.medicine.count({
    where: { sellerId }
  });
  const medicines = await prisma.medicine.findMany({
    where: {
      sellerId
      // ← only this seller's medicines
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      category: {
        select: { name: true }
      }
      // Optional: include stock status or other useful info
    }
  });
  return {
    data: medicines,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};
var MedicineService = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMyMedicines
};

// src/modules/medicine/medicine.controller.ts
var getAllMedicines2 = async (req, res) => {
  try {
    const { search, categoryId, minPrice, maxPrice, manufacturer, page, limit, sortBy, sortOrder } = req.query;
    const result = await MedicineService.getAllMedicines({
      search: search ? String(search) : void 0,
      categoryId: categoryId ? String(categoryId) : void 0,
      minPrice: minPrice ? Number(minPrice) : void 0,
      maxPrice: maxPrice ? Number(maxPrice) : void 0,
      manufacturer: manufacturer ? String(manufacturer) : void 0,
      page: page ? Number(page) : void 0,
      limit: limit ? Number(limit) : void 0,
      sortBy: sortBy ? String(sortBy) : void 0,
      sortOrder: sortOrder === "asc" ? "asc" : "desc"
    });
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("getAllMedicines error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines"
    });
  }
};
var getMedicineById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await MedicineService.getMedicineById(id);
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found"
      });
    }
    res.status(200).json({
      success: true,
      data: medicine
    });
  } catch (error) {
    console.error("getMedicineById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine"
    });
  }
};
var createMedicine2 = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const medicine = await MedicineService.createMedicine({
      ...req.body,
      sellerId
    });
    res.status(201).json({
      success: true,
      data: medicine
    });
  } catch (error) {
    console.error("createMedicine error:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry (possibly unique constraint violation)"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create medicine"
    });
  }
};
var updateMedicine2 = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const updated = await MedicineService.updateMedicine(
      id,
      req.body,
      {
        id: user.id,
        role: user.role
      }
    );
    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error("updateMedicine error:", error);
    if (error.message?.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found"
      });
    }
    if (error.message?.includes("own medicines")) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own medicines"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update medicine"
    });
  }
};
var deleteMedicine2 = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    await MedicineService.deleteMedicine(id, {
      id: user.id,
      role: user.role
    });
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    console.error("deleteMedicine error:", error);
    if (error.message?.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found"
      });
    }
    if (error.message?.includes("own medicines")) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own medicines"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete medicine"
    });
  }
};
var getMyMedicines2 = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { page, limit, sortBy, sortOrder } = req.query;
    const result = await MedicineService.getMyMedicines(sellerId, {
      page: page ? Number(page) : void 0,
      limit: limit ? Number(limit) : void 0,
      sortBy: sortBy ? String(sortBy) : void 0,
      sortOrder: sortOrder ? String(sortOrder) : void 0
    });
    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    console.error("Get my medicines error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your medicines"
    });
  }
};
var MedicineController = {
  getAllMedicines: getAllMedicines2,
  getMedicineById: getMedicineById2,
  createMedicine: createMedicine2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2,
  getMyMedicines: getMyMedicines2
};

// src/middlewares/sellerOrAdmin.ts
var sellerOrAdmin = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers)
    });
    if (!session) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (session.user.status === "BANNED") {
      return res.status(403).json({
        success: false,
        message: "Your account is banned. Please contact support."
      });
    }
    if (session.user.role !== "SELLER" && session.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Only sellers or admins can perform this action"
      });
    }
    req.user = session.user;
    next();
  } catch (error) {
    console.error("sellerOrAdmin error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// src/middlewares/sellerOnly.ts
var sellerOnly = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers)
    });
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login"
      });
    }
    if (session.user.status === "BANNED") {
      return res.status(403).json({
        success: false,
        message: "Your account is banned. Please contact support."
      });
    }
    if (session.user.role !== "SELLER") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Only sellers can perform this action"
      });
    }
    req.user = session.user;
    next();
  } catch (error) {
    console.error("sellerOnly middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// src/modules/medicine/medicine.route.ts
var router2 = Router2();
router2.get("/my-medicines", sellerOnly, MedicineController.getMyMedicines);
router2.get("/", MedicineController.getAllMedicines);
router2.get("/:id", MedicineController.getMedicineById);
router2.post("/", sellerOrAdmin, MedicineController.createMedicine);
router2.patch("/:id", sellerOrAdmin, MedicineController.updateMedicine);
router2.delete("/:id", sellerOrAdmin, MedicineController.deleteMedicine);
var MedicineRoutes = router2;

// src/modules/order/order.route.ts
import { Router as Router3 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (customerId, input) => {
  const { items } = input;
  if (!items || items.length === 0) {
    throw new Error("Order must have at least one item");
  }
  return prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: item.medicineId },
        select: { price: true, stock: true, name: true }
      });
      if (!medicine) {
        throw new Error(`Medicine with ID ${item.medicineId} not found`);
      }
      if (medicine.stock < item.quantity) {
        throw new Error(
          `Not enough stock for "${medicine.name}". Available: ${medicine.stock}, Requested: ${item.quantity}`
        );
      }
      totalAmount += medicine.price * item.quantity;
    }
    const order = await tx.order.create({
      data: {
        customerId,
        totalAmount,
        status: "PENDING",
        shippingName: input.shippingName,
        shippingPhone: input.shippingPhone,
        shippingAddress: input.shippingAddress,
        shippingCity: input.shippingCity,
        shippingZip: input.shippingZip
      }
    });
    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: item.medicineId },
        select: { price: true }
      });
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: medicine?.price
        }
      });
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: { stock: { decrement: item.quantity } }
      });
    }
    return order;
  });
};
var getMyOrders = async (customerId, options = {}) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";
  const total = await prisma.order.count({
    where: { customerId }
  });
  const orders = await prisma.order.findMany({
    where: {
      customerId
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      items: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      }
    }
  });
  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};
var getOrderById = async (orderId, currentUser) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      items: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  const isOwner = order.customerId === currentUser.id;
  const isSellerOrAdmin = currentUser.role === "SELLER" || currentUser.role === "ADMIN";
  if (!isOwner && !isSellerOrAdmin) {
    throw new Error("Unauthorized to view this order");
  }
  return order;
};
var updateOrderStatus = async (orderId, newStatus, currentUser) => {
  const validStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(
      `Invalid status. Allowed values: ${validStatuses.join(", ")}`
    );
  }
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      customerId: true
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: newStatus
      // cast to enum type
    }
  });
  return updatedOrder;
};
var getAllOrders = async (currentUser, options = {}) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";
  let where = {};
  if (currentUser.role === "SELLER") {
    where = {
      items: {
        some: {
          medicine: {
            sellerId: currentUser.id
          }
        }
      }
    };
  }
  const total = await prisma.order.count({ where });
  const orders = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      customer: {
        select: { id: true, name: true, email: true }
      },
      items: {
        include: {
          medicine: {
            select: { id: true, name: true, price: true }
          }
        }
      }
    }
  });
  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};
var cancelOrder = async (orderId, customerId) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            medicine: {
              select: { id: true, stock: true }
            }
          }
        }
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.customerId !== customerId) {
      throw new Error("Unauthorized - You can only cancel your own orders");
    }
    if (order.status !== "PENDING") {
      throw new Error(
        "Cannot cancel order - status is already " + order.status
      );
    }
    for (const item of order.items) {
      await tx.medicine.update({
        where: { id: item.medicine.id },
        data: {
          stock: { increment: item.quantity }
        }
      });
    }
    const cancelledOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED"
      }
    });
    return cancelledOrder;
  });
};
var OrderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const {
      items,
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingZip
    } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required and cannot be empty"
      });
    }
    if (!shippingAddress || !shippingPhone || !shippingName || !shippingCity || !shippingZip) {
      return res.status(400).json({
        success: false,
        message: "All shipping details are required"
      });
    }
    const order = await OrderService.createOrder(customerId, {
      items,
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingZip
    });
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (error) {
    console.error("Create order error:", error.message);
    if (error.message.includes("Not enough stock") || error.message.includes("not found")) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create order"
    });
  }
};
var getMyOrders2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { page, limit, sortBy, sortOrder } = req.query;
    const orders = await OrderService.getMyOrders(customerId, {
      page: page ? Number(page) : void 0,
      limit: limit ? Number(limit) : void 0,
      sortBy: sortBy ? String(sortBy) : void 0,
      sortOrder: sortOrder ? String(sortOrder) : void 0
    });
    res.status(200).json({
      success: true,
      data: orders.data,
      meta: orders.meta
    });
  } catch (error) {
    console.error("Get my orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your orders"
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;
    const order = await OrderService.getOrderById(id, currentUser);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error("Get order by ID error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    if (error.message.includes("Unauthorized")) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this order"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details"
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const currentUser = req.user;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "New status is required"
      });
    }
    const updatedOrder = await OrderService.updateOrderStatus(
      id,
      status,
      currentUser
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder
    });
  } catch (error) {
    console.error("Update order status error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    if (error.message.includes("Invalid status")) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update order status"
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const currentUser = req.user;
    const { page, limit, sortBy, sortOrder } = req.query;
    const result = await OrderService.getAllOrders(currentUser, {
      page: page ? Number(page) : void 0,
      limit: limit ? Number(limit) : void 0,
      sortBy: sortBy ? String(sortBy) : void 0,
      sortOrder: sortOrder ? String(sortOrder) : void 0
    });
    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    console.error("Get all orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders"
    });
  }
};
var cancelOrder2 = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.user.id;
    const cancelledOrder = await OrderService.cancelOrder(
      id,
      customerId
    );
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: cancelledOrder
    });
  } catch (error) {
    console.error("Cancel order error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    if (error.message.includes("Unauthorized")) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own orders"
      });
    }
    if (error.message.includes("Cannot cancel order")) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to cancel order"
    });
  }
};
var OrderController = {
  createOrder: createOrder2,
  getMyOrders: getMyOrders2,
  getOrderById: getOrderById2,
  updateOrderStatus: updateOrderStatus2,
  getAllOrders: getAllOrders2,
  cancelOrder: cancelOrder2
};

// src/middlewares/customerOnly.ts
var customerOnly = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers)
    });
    if (!session) {
      return res.status(401).json({ success: false, message: "Please login" });
    }
    if (session.user.status === "BANNED") {
      return res.status(403).json({
        success: false,
        message: "Your account is banned. Please contact support."
      });
    }
    if (session.user.role !== "CUSTOMER") {
      return res.status(403).json({
        success: false,
        message: "Only customers can perform this action"
      });
    }
    req.user = session.user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// src/middlewares/auth.ts
var authMiddleware = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers)
    });
    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login"
      });
    }
    if (session.user.status === "BANNED") {
      return res.status(403).json({
        success: false,
        message: "Your account is banned. Please contact support."
      });
    }
    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error"
    });
  }
};

// src/modules/order/order.route.ts
var router3 = Router3();
router3.post("/", customerOnly, OrderController.createOrder);
router3.get("/my-orders", customerOnly, OrderController.getMyOrders);
router3.get("/:id", authMiddleware, OrderController.getOrderById);
router3.patch("/:id/status", sellerOrAdmin, OrderController.updateOrderStatus);
router3.get("/", sellerOrAdmin, OrderController.getAllOrders);
router3.patch("/:id/cancel", customerOnly, OrderController.cancelOrder);
var OrderRoutes = router3;

// src/modules/review/review.route.ts
import { Router as Router4 } from "express";

// src/modules/review/review.service.ts
var ReviewService = {
  createReview: async (input) => {
    const { customerId, medicineId, rating, comment } = input;
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        order: { customerId },
        medicineId
      }
    });
    if (!hasPurchased) {
      throw new Error("You can only review medicines you have purchased");
    }
    const existingReview = await prisma.review.findFirst({
      where: {
        customerId,
        medicineId
      }
    });
    if (existingReview) {
      throw new Error("You have already reviewed this medicine");
    }
    const review = await prisma.review.create({
      data: {
        customerId,
        medicineId,
        rating,
        comment
      }
    });
    return review;
  }
};

// src/modules/review/review.controller.ts
var createReview = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { medicineId, rating, comment } = req.body;
    if (!medicineId || !rating) {
      return res.status(400).json({
        success: false,
        message: "medicineId and rating are required"
      });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5"
      });
    }
    const review = await ReviewService.createReview({
      customerId,
      medicineId,
      rating,
      comment: comment || null
    });
    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review
    });
  } catch (error) {
    console.error("Create review error:", error.message);
    if (error.message.includes("already reviewed")) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    if (error.message.includes("You can only review medicines you have purchased")) {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to submit review"
    });
  }
};
var ReviewController = {
  createReview
};

// src/modules/review/review.route.ts
var router4 = Router4();
router4.post("/", customerOnly, ReviewController.createReview);
var ReviewRoutes = router4;

// src/modules/user/user.route.ts
import { Router as Router5 } from "express";

// src/modules/user/user.service.ts
var getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
var updateCurrentUser = async (userId, data) => {
  const updateData = {};
  if (data.name !== void 0) updateData.name = data.name;
  if (data.phone !== void 0) updateData.phone = data.phone;
  if (data.address !== void 0) updateData.address = data.address;
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return updated;
};
var getAllUsers = async (options = {}) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;
  const total = await prisma.user.count();
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return {
    data: users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};
var updateUserStatus = async (userId, newStatus, adminId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true }
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role === "ADMIN") {
    throw new Error("Cannot ban another admin");
  }
  if (userId === adminId) {
    throw new Error("Cannot ban yourself");
  }
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus },
    select: { id: true, name: true, email: true, role: true, status: true }
  });
  return updated;
};
var UserService = {
  getCurrentUser,
  updateCurrentUser,
  getAllUsers,
  updateUserStatus
};

// src/modules/user/user.controller.ts
var getCurrentUser2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserService.getCurrentUser(userId);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get current user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};
var updateCurrentUser2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address } = req.body;
    if (!name && !phone && !address) {
      return res.status(400).json({
        success: false,
        message: "Provide name, phone, or address to update"
      });
    }
    if (name && (typeof name !== "string" || name.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Name cannot be empty"
      });
    }
    if (phone && (typeof phone !== "string" || phone.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Phone cannot be empty"
      });
    }
    if (address && (typeof address !== "string" || address.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Address cannot be empty"
      });
    }
    const updatedUser = await UserService.updateCurrentUser(userId, {
      name: name ? name.trim() : void 0,
      phone: phone ? phone.trim() : void 0,
      address: address ? address.trim() : void 0
    });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Update current user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};
var getAllUsers2 = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await UserService.getAllUsers({
      page: page ? Number(page) : void 0,
      limit: limit ? Number(limit) : void 0
    });
    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    console.error("Get all users error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all users"
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be ACTIVE or BANNED"
      });
    }
    const updatedUser = await UserService.updateUserStatus(
      id,
      status,
      req.user.id
    );
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Update user status error:", error.message);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    if (error.message.includes("Cannot ban")) {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update user status"
    });
  }
};
var UserController = {
  getCurrentUser: getCurrentUser2,
  updateCurrentUser: updateCurrentUser2,
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2
};

// src/modules/user/user.route.ts
var router5 = Router5();
router5.get("/me", authMiddleware, UserController.getCurrentUser);
router5.patch("/me", authMiddleware, UserController.updateCurrentUser);
router5.get("/", adminOnly, UserController.getAllUsers);
router5.patch("/:id/status", adminOnly, UserController.updateUserStatus);
var UserRoutes = router5;

// src/app.ts
var app = express();
var allowedOrigins = [
  "http://localhost:3000",
  "https://medistore-frontend-delta.vercel.app"
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.options("*", cors());
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/medicines", MedicineRoutes);
app.use("/api/v1/orders", OrderRoutes);
app.use("/api/v1/reviews", ReviewRoutes);
app.use("/api/v1/users", UserRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
