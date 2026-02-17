import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { nodeHeadersToWebHeaders } from "../utils/nodeHeadersToWebHeaders";

export const sellerOnly = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login",
      });
    }

    if (session.user.status === "BANNED") {
      return res.status(403).json({
        success: false,
        message: "Your account is banned. Please contact support.",
      });
    }

    if (session.user.role !== "SELLER") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Only sellers can perform this action",
      });
    }

    // Attach user to request for later use (e.g. to check ownership)
    req.user = session.user;

    next();
  } catch (error) {
    console.error("sellerOnly middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};