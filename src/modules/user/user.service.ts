import { prisma } from "../../lib/prisma";

const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateCurrentUser = async (
  userId: string,
  data: {
    name?: string;
    phone?: string;
    address?: string;
  },
) => {
  const updateData: any = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.address !== undefined) updateData.address = data.address;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updated;
};

const getAllUsers = async (
  options: { page?: number | undefined; limit?: number | undefined } = {},
) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(50, options.limit ?? 10));
  const skip = (page - 1) * limit;

  // Count total users
  const total = await prisma.user.count();

  // Fetch paginated users (only safe fields)
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    data: users,
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

const updateUserStatus = async (
  userId: string,
  newStatus: "ACTIVE" | "BANNED",
  adminId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent banning admins or self
  if (user.role === "ADMIN") {
    throw new Error("Cannot ban another admin");
  }

  if (userId === adminId) {
    throw new Error("Cannot ban yourself");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus },
    select: { id: true, name: true, email: true, role: true, status: true },
  });

  return updated;
};

export const UserService = {
  getCurrentUser,
  updateCurrentUser,
  getAllUsers,
  updateUserStatus,
};
