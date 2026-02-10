import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth"; 
import { nodeHeadersToWebHeaders } from "../utils/nodeHeadersToWebHeaders"; 

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: nodeHeadersToWebHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login",
      });
    }

    // Attach the authenticated user to the request
    req.user = session.user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};