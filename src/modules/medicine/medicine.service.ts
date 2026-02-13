import { prisma } from "../../lib/prisma";

export const getAllMedicines = async (
  options: {
    search?: string | undefined;
    categoryId?: string | undefined;
    manufacturer?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc";
  } = {},
) => {
  // ── Default values ────────────────────────────────────────
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(100, options.limit ?? 10)); // prevent abuse
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";

  // ── Build where clause ────────────────────────────────────
  const where: any = {};

  if (options.search) {
    where.name = {
      contains: options.search,
      mode: "insensitive",
    };
  }

  if (options.categoryId) {
    where.categoryId = options.categoryId;
  }

  if (options.manufacturer) {
    where.manufacturer = {
      contains: options.manufacturer,
      mode: "insensitive",
    };
  }

  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    where.price = {};

    if (options.minPrice !== undefined) {
      where.price.gte = Number(options.minPrice);
    }
    if (options.maxPrice !== undefined) {
      where.price.lte = Number(options.maxPrice);
    }
  }

  // ── Get total count for pagination ────────────────────────
  const total = await prisma.medicine.count({ where });

  // ── Fetch paginated medicines ─────────────────────────────
  const medicines = await prisma.medicine.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: { select: { name: true } },
      seller: { select: { name: true } },
    },
  });

  // ── Build response with meta ──────────────────────────────
  return {
    data: medicines,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

const getMedicineById = async (id: string) => {
  return prisma.medicine.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      seller: {
        select: {
          name: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          customer: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

const createMedicine = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  sellerId: string;
}) => {
  return prisma.medicine.create({
    data,
  });
};

const updateMedicine = async (
  id: string,
  data: Partial<{
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
  }>,
  user: {
    id: string; // sellerId / userId
    role: string; // "ADMIN" | "SELLER" | ...
  },
) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    select: {
      sellerId: true,
    },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  // Only enforce ownership for SELLER role
  if (user.role === "SELLER" && medicine.sellerId !== user.id) {
    throw new Error("You can only update your own medicines");
  }

  // Admins can update any medicine → no ownership check needed

  return prisma.medicine.update({
    where: { id },
    data,
  });
};

const deleteMedicine = async (
  id: string,
  user: {
    id: string;
    role: string;
  },
) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    select: {
      sellerId: true,
    },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  // Only enforce ownership for SELLER role
  if (user.role === "SELLER" && medicine.sellerId !== user.id) {
    throw new Error("You can only delete your own medicines");
  }

  // Admins can delete any medicine

  return prisma.medicine.delete({
    where: { id },
  });
};

const getMyMedicines = async (
  sellerId: string,
  options: {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
  } = {},
) => {
  // Pagination defaults (same as your other lists)
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";

  // Count total medicines owned by this seller
  const total = await prisma.medicine.count({
    where: { sellerId },
  });

  // Fetch paginated medicines for this seller
  const medicines = await prisma.medicine.findMany({
    where: {
      sellerId, // ← only this seller's medicines
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: {
        select: { name: true },
      },
      // Optional: include stock status or other useful info
    },
  });

  return {
    data: medicines,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

export const MedicineService = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMyMedicines,
};
