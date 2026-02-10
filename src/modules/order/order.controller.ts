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

export const OrderController = {
  createOrder,
  getMyOrders,
  getOrderById,
};