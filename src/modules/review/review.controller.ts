import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id; // from customerOnly
    const { medicineId, rating, comment } = req.body;

    if (!medicineId || !rating) {
      return res.status(400).json({
        success: false,
        message: "medicineId and rating are required",
      });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
    }

    const review = await ReviewService.createReview({
      customerId,
      medicineId,
      rating,
      comment: comment || null,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error: any) {
    console.error("Create review error:", error.message);

    if (error.message.includes("already reviewed")) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes("You can only review medicines you have purchased")) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};

export const ReviewController = {
  createReview,
};