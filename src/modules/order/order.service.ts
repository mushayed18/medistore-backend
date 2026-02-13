import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type CreateOrderInput = {
  items: Array<{
    medicineId: string;
    quantity: number;
  }>;
};

const createOrder = async (customerId: string, input: CreateOrderInput) => {
  const { items } = input;

  // Basic validation
  if (!items || items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  return prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    // Check stock and calculate total
    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: item.medicineId },
        select: { price: true, stock: true, name: true },
      });

      if (!medicine) {
        throw new Error(`Medicine with ID ${item.medicineId} not found`);
      }

      if (medicine.stock < item.quantity) {
        throw new Error(
          `Not enough stock for "${medicine.name}". Available: ${medicine.stock}, Requested: ${item.quantity}`,
        );
      }

      totalAmount += medicine.price * item.quantity;
    }

    // Create the order
    const order = await tx.order.create({
      data: {
        customerId,
        totalAmount,
        status: "PENDING",
      },
    });

    // Create order items + reduce stock
    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: item.medicineId },
        select: { price: true },
      })!;

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: medicine?.price as number,
        },
      });

      await tx.medicine.update({
        where: { id: item.medicineId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  });
};

const getMyOrders = async (
  customerId: string,
  options: {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
  } = {},
) => {
  // Default values (same style as medicines)
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10)); // max 50 orders per page
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";

  // Count total orders for this customer
  const total = await prisma.order.count({
    where: { customerId },
  });

  // Fetch paginated orders
  const orders = await prisma.order.findMany({
    where: {
      customerId,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      items: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  // Return data + pagination info
  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

const getOrderById = async (
  orderId: string,
  currentUser: { id: string; role: string }, // minimal user info we need
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Authorization check
  const isOwner = order.customerId === currentUser.id;
  const isSellerOrAdmin =
    currentUser.role === "SELLER" || currentUser.role === "ADMIN";

  if (!isOwner && !isSellerOrAdmin) {
    throw new Error("Unauthorized to view this order");
  }

  return order;
};

const updateOrderStatus = async (
  orderId: string,
  newStatus: string,
  currentUser: { id: string; role: string },
) => {
  // Validate the new status
  const validStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

  if (!validStatuses.includes(newStatus)) {
    throw new Error(
      `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
    );
  }

  // Find the order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      customerId: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Update the status
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: newStatus as OrderStatus, // cast to enum type
    },
  });

  return updatedOrder;
};

// In order.service.ts

const getAllOrders = async (
  currentUser: { id: string; role: string },
  options: {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
  } = {},
) => {
  // Default pagination (same as before)
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy ?? "createdAt";
  const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";

  // Build the 'where' clause based on role
  let where: any = {};

  if (currentUser.role === "SELLER") {
    // For sellers: only orders with at least one of their medicines
    where = {
      items: {
        some: {
          medicine: {
            sellerId: currentUser.id,
          },
        },
      },
    };
  }
  // For admins: no filter → all orders

  // Count total matching orders
  const total = await prisma.order.count({ where });

  // Fetch the paginated orders
  const orders = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      customer: {
        select: { id: true, name: true, email: true },
      },
      items: {
        include: {
          medicine: {
            select: { id: true, name: true, price: true },
          },
        },
      },
    },
  });

  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
