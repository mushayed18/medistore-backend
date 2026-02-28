import { Router } from "express";
import { CategoryController } from "./category.controller";
import { adminOnly } from "../../middlewares/adminOnly";
const router = Router();
router.post("/", adminOnly, CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", adminOnly, CategoryController.updateCategory);
router.delete("/:id", adminOnly, CategoryController.deleteCategory);
export const CategoryRoutes = router;
//# sourceMappingURL=category.route.js.map