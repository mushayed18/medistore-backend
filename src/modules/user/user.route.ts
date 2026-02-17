import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth"; 
import { adminOnly } from "../../middlewares/adminOnly"; 

const router = Router();

// 1. Current user profile (any logged-in user)
router.get("/me", authMiddleware, UserController.getCurrentUser);

// 2. Update own profile
router.patch("/me", authMiddleware, UserController.updateCurrentUser);

// 3. Admin list all users
router.get("/", adminOnly, UserController.getAllUsers);

// Ban/Unban user (admin only)
router.patch("/:id/status", adminOnly, UserController.updateUserStatus);

export const UserRoutes = router;