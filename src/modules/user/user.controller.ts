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

export const UserController = {
  getCurrentUser,
};