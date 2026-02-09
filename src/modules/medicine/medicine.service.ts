import { prisma } from "../../lib/prisma";

const getAllMedicines = async (options: {
  search?: string | undefined;
  categoryId?: string | undefined;
}) => {
  const { search, categoryId } = options;

  return prisma.medicine.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive", // case-insensitive search
        },
      }),
      ...(categoryId && { categoryId }),
    },
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      seller: { select: { name: true } },
    },
  });
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

export const MedicineService = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
