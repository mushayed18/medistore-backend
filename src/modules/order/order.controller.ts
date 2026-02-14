import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id; 
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required and cannot be empty",
      });
    }

    const order = await OrderService.createOrder(customerId, { items });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    console.error("Create order error:", error.message);

    if (error.message.includes("Not enough stock") || error.message.includes("not found")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;

    // Read pagination and sorting from query
    const { page, limit, sortBy, sortOrder } = req.query;

    const orders = await OrderService.getMyOrders(customerId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy: sortBy ? String(sortBy) : undefined,
      sortOrder: sortOrder ? String(sortOrder) : undefined,
    });

    res.status(200).json({
      success: true,
      data: orders.data,
      meta: orders.meta,
    });
  } catch (error: any) {
    console.error("Get my orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your orders",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = req.user!; // from middleware

    const order = await OrderService.getOrderById(id as string, currentUser);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    console.error("Get order by ID error:", error.message);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (error.message.includes("Unauthorized")) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view this order",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const currentUser = req.user!; // from sellerOrAdmin middleware

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "New status is required",
      });
    }

    const updatedOrder = await OrderService.updateOrderStatus(
      id as string,
      status,
      currentUser
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error: any) {
    console.error("Update order status error:", error.message);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (error.message.includes("Invalid status")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!; // from sellerOrAdmin middleware
    const { page, limit, sortBy, sortOrder } = req.query;

    const result = await OrderService.getAllOrders(currentUser, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy: sortBy ? String(sortBy) : undefined,
      sortOrder: sortOrder ? String(sortOrder) : undefined,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error: any) {
    console.error("Get all orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
    });
  }
};

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customerId = req.user!.id;

    const cancelledOrder = await OrderService.cancelOrder(id as string, customerId);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: cancelledOrder,
    });
  } catch (error: any) {
    console.error("Cancel order error:", error.message);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (error.message.includes("Unauthorized")) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own orders",
      });
    }

    if (error.message.includes("Cannot cancel order")) {
      return res.status(400).json({
        success: false,
        message: error.message,  
      });
    }

    // Fallback for unexpected errors
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
    });
  }
};

export const OrderController = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  cancelOrder,
};