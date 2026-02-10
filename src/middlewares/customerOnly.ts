// src/middlewares/customerOnly.ts
import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { nodeHeadersToWebHeaders } from "../utils/nodeHeadersToWebHeaders";

export const customerOnly = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ success: false, message: "Please login" });
    }

    if (session.user.role !== "CUSTOMER") {
      return res.status(403).json({
        success: false,
        message: "Only customers can perform this action",
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};