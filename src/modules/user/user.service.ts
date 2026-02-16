import { prisma } from "../../lib/prisma";

const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateCurrentUser = async (userId: string, data: { name: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
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

export const UserService = {
  getCurrentUser,
  updateCurrentUser,
  getAllUsers,
};
