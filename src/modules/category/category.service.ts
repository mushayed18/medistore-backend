import { prisma } from "../../lib/prisma";

const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  return prisma.category.create({
    data: payload,
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

const updateCategory = async (
  id: string,
  payload: { name?: string; description?: string },
) => {
  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
