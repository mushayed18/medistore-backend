import { Router } from "express";
import { OrderController } from "./order.controller";
import { customerOnly } from "../../middlewares/customerOnly";   
import { authMiddleware } from "../../middlewares/auth";
import { sellerOrAdmin } from "../../middlewares/sellerOrAdmin";

const router = Router();

router.post("/", customerOnly, OrderController.createOrder);
router.get("/my-orders", customerOnly, OrderController.getMyOrders);
router.get("/:id", authMiddleware, OrderController.getOrderById);
router.patch("/:id/status", sellerOrAdmin, OrderController.updateOrderStatus);
router.get("/", sellerOrAdmin, OrderController.getAllOrders);
router.patch("/:id/cancel", customerOnly, OrderController.cancelOrder);

export const OrderRoutes = router;