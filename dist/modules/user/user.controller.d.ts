import { Request, Response } from "express";
export declare const UserController: {
    getCurrentUser: (req: Request, res: Response) => Promise<void>;
    updateCurrentUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    updateUserStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=user.controller.d.ts.map