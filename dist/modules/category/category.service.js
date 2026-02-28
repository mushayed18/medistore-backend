import { prisma } from "../../lib/prisma";
const createCategory = async (payload) => {
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
const getCategoryById = async (id) => {
    return prisma.category.findUnique({
        where: { id },
    });
};
const updateCategory = async (id, payload) => {
    return prisma.category.update({
        where: { id },
        data: payload,
    });
};
const deleteCategory = async (id) => {
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
//# sourceMappingURL=category.service.js.map