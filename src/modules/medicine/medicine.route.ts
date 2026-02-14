import { Router } from "express";
import { MedicineController } from "./medicine.controller";
import { sellerOrAdmin } from "../../middlewares/sellerOrAdmin";
import { sellerOnly } from "../../middlewares/sellerOnly";

const router = Router();

// Protected seller-only routes
router.get("/my-medicines", sellerOnly, MedicineController.getMyMedicines);

// Public / customer-facing routes
router.get("/", MedicineController.getAllMedicines);
router.get("/:id", MedicineController.getMedicineById);

router.post("/", sellerOrAdmin, MedicineController.createMedicine);
router.patch("/:id", sellerOrAdmin, MedicineController.updateMedicine);
router.delete("/:id", sellerOrAdmin, MedicineController.deleteMedicine);

export const MedicineRoutes = router;