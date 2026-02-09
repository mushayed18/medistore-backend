import { prisma } from "../../lib/prisma";

const getAllMedicines = async () => {
  return prisma.medicine.findMany({
    orderBy: {
      createdAt: "desc",
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
          email: true,
        },
      },
    },
  });
};

const getMedicineById = async (id: string) => {
  return prisma.medicine.findUnique({
    where: { id },
    include: {
      category: { select: { name: true } },
      seller: { select: { name: true } },
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
  sellerId: string,
) => {
  // Check ownership first
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    select: { sellerId: true },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  if (medicine.sellerId !== sellerId) {
    throw new Error("You can only update your own medicines");
  }

  return prisma.medicine.update({
    where: { id },
    data,
  });
};

const deleteMedicine = async (id: string, sellerId: string) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id },
    select: { sellerId: true },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  if (medicine.sellerId !== sellerId) {
    throw new Error("You can only delete your own medicines");
  }

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
