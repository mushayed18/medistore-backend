import { Request, Response } from "express";
export declare const CategoryController: {
    getAllCategories: (req: Request, res: Response) => Promise<void>;
    getCategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=category.controller.d.ts.map