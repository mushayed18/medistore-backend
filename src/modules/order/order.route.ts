import { Router } from "express";
import { OrderController } from "./order.controller";
import { customerOnly } from "../../middlewares/customerOnly";   
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/", customerOnly, OrderController.createOrder);
router.get("/my-orders", customerOnly, OrderController.getMyOrders);
router.get("/:id", authMiddleware, OrderController.getOrderById);

export const OrderRoutes = router;