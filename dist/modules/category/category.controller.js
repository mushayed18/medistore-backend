import { CategoryService } from "./category.service";
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
        });
    }
    catch (error) {
        console.error("getAllCategories error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
        });
    }
};
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        console.error("getCategoryById error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch category",
        });
    }
};
const createCategory = async (req, res) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        console.error("createCategory error:", error);
        // Prisma unique constraint (category name already exists)
        if (error.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to create category",
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.updateCategory(id, req.body);
        res.status(200).json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        console.error("updateCategory error:", error);
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to update category",
        });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        console.error("deleteCategory error:", error);
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to delete category",
        });
    }
};
export const CategoryController = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map