import { Request, Response } from "express";
import { MedicineService } from "./medicine.service";

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const { search, categoryId } = req.query; // support both search & category filter

    const medicines = await MedicineService.getAllMedicines({
      search: search ? String(search) : undefined,
      categoryId: categoryId ? String(categoryId) : undefined,
    });

    res.status(200).json({
      success: true,
      data: medicines,
    });
  } catch (error) {
    console.error("getAllMedicines error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
    });
  }
};

const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const medicine = await MedicineService.getMedicineById(id as string);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    console.error("getMedicineById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine",
    });
  }
};

const createMedicine = async (req: Request, res: Response) => {
  try {
    // req.user comes from sellerOnly middleware
    const sellerId = (req as any).user.id; // TypeScript needs help here

    const medicine = await MedicineService.createMedicine({
      ...req.body,
      sellerId,
    });

    res.status(201).json({
      success: true,
      data: medicine,
    });
  } catch (error: any) {
    console.error("createMedicine error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry (possibly unique constraint violation)",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create medicine",
    });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const updated = await MedicineService.updateMedicine(
      id as string,
      req.body,
      {
        id: user.id,
        role: user.role,
      },
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("updateMedicine error:", error);

    if (error.message?.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    if (error.message?.includes("own medicines")) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own medicines",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update medicine",
    });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    await MedicineService.deleteMedicine(id as string, {
      id: user.id,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteMedicine error:", error);

    if (error.message?.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    if (error.message?.includes("own medicines")) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own medicines",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete medicine",
    });
  }
};

export const MedicineController = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
