import { UserService } from "./user.service";
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id; // from authMiddleware
        const user = await UserService.getCurrentUser(userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        console.error("Get current user error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};
const updateCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, phone, address } = req.body;
        // At least one field must be provided
        if (!name && !phone && !address) {
            return res.status(400).json({
                success: false,
                message: "Provide name, phone, or address to update",
            });
        }
        // Optional: basic validation
        if (name && (typeof name !== "string" || name.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "Name cannot be empty",
            });
        }
        if (phone && (typeof phone !== "string" || phone.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "Phone cannot be empty",
            });
        }
        if (address && (typeof address !== "string" || address.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "Address cannot be empty",
            });
        }
        const updatedUser = await UserService.updateCurrentUser(userId, {
            name: name ? name.trim() : undefined,
            phone: phone ? phone.trim() : undefined,
            address: address ? address.trim() : undefined,
        });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error("Update current user error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};
const getAllUsers = async (req, res) => {
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
    }
    catch (error) {
        console.error("Get all users error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch all users",
        });
    }
};
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params; // user ID to ban/unban
        const { status } = req.body; // "ACTIVE" or "BANNED"
        if (!status || !["ACTIVE", "BANNED"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be ACTIVE or BANNED",
            });
        }
        const updatedUser = await UserService.updateUserStatus(id, status, req.user.id); // pass admin ID to prevent self-ban
        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error("Update user status error:", error.message);
        if (error.message.includes("not found")) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (error.message.includes("Cannot ban")) {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to update user status",
        });
    }
};
export const UserController = {
    getCurrentUser,
    updateCurrentUser,
    getAllUsers,
    updateUserStatus,
};
//# sourceMappingURL=user.controller.js.map