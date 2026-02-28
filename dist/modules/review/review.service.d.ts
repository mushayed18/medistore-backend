type CreateReviewInput = {
    customerId: string;
    medicineId: string;
    rating: number;
    comment: string | null;
};
export declare const ReviewService: {
    createReview: (input: CreateReviewInput) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string | null;
        medicineId: string;
        customerId: string;
    }>;
};
export {};
//# sourceMappingURL=review.service.d.ts.map