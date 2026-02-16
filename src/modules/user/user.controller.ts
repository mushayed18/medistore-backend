import { Request, Response } from "express";
import { UserService } from "./user.service";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // from authMiddleware

    const user = await UserService.getCurrentUser(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Get current user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { name } = req.body;

    // Validation: at least name must be provided
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Name is required and cannot be empty",
      });
    }

    const updatedUser = await UserService.updateCurrentUser(userId, { name: name.trim() });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Update current user error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Get pagination from query params
    const { page, limit } = req.query;

    const result = await UserService.getAllUsers({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error: any) {
    console.error("Get all users error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all users",
    });
  }
};

export const UserController = {
  getCurrentUser,
  updateCurrentUser,
  getAllUsers,
};
