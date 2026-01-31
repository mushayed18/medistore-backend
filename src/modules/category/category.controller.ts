import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("getAllCategories error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await CategoryService.getCategoryById(id as string);

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
  } catch (error) {
    console.error("getCategoryById error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
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

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await CategoryService.updateCategory(
      id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
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

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await CategoryService.deleteCategory(id as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
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
