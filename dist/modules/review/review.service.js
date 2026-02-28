import { prisma } from "../../lib/prisma";
export const ReviewService = {
    createReview: async (input) => {
        const { customerId, medicineId, rating, comment } = input;
        // Optional: Check if customer actually bought this medicine
        const hasPurchased = await prisma.orderItem.findFirst({
            where: {
                order: { customerId },
                medicineId,
            },
        });
        if (!hasPurchased) {
            throw new Error("You can only review medicines you have purchased");
        }
        // Check if customer already reviewed this medicine
        const existingReview = await prisma.review.findFirst({
            where: {
                customerId,
                medicineId,
            },
        });
        if (existingReview) {
            throw new Error("You have already reviewed this medicine");
        }
        // Create the review
        const review = await prisma.review.create({
            data: {
                customerId,
                medicineId,
                rating,
                comment,
            },
        });
        return review;
    },
};
//# sourceMappingURL=review.service.js.map