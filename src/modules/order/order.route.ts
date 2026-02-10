import { Router } from "express";
import { OrderController } from "./order.controller";
import { customerOnly } from "../../middlewares/customerOnly";   

const router = Router();

router.post("/", customerOnly, OrderController.createOrder);

export const OrderRoutes = router;