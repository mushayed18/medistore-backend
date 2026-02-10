import { prisma } from "../../lib/prisma";

type CreateOrderInput = {
  items: Array<{
    medicineId: string;
    quantity: number;
  }>;
};

export const OrderService = {
  createOrder: async (customerId: string, input: CreateOrderInput) => {
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
            `Not enough stock for "${medicine.name}". Available: ${medicine.stock}, Requested: ${item.quantity}`
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
  },
};