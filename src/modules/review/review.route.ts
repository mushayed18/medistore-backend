import { Router } from "express";
import { ReviewController } from "./review.controller";
import { customerOnly } from "../../middlewares/customerOnly"; 

const router = Router();

router.post("/", customerOnly, ReviewController.createReview);

export const ReviewRoutes = router;