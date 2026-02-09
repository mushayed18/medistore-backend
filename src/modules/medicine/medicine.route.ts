import { Router } from "express";
import { MedicineController } from "./medicine.controller";
import { sellerOrAdmin } from "../../middlewares/sellerOrAdmin";

const router = Router();

// Public / customer-facing routes
router.get("/", MedicineController.getAllMedicines);
router.get("/:id", MedicineController.getMedicineById);

// Protected seller-only routes
router.post("/", sellerOrAdmin, MedicineController.createMedicine);
router.patch("/:id", sellerOrAdmin, MedicineController.updateMedicine);
router.delete("/:id", sellerOrAdmin, MedicineController.deleteMedicine);

export const MedicineRoutes = router;