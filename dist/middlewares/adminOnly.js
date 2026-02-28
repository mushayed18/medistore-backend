import { auth } from "../lib/auth";
import { nodeHeadersToWebHeaders } from "../utils/nodeHeadersToWebHeaders";
export const adminOnly = async (req, res, next) => {
    try {
        const headers = nodeHeadersToWebHeaders(req.headers);
        const session = await auth.api.getSession({
            headers,
        });
        if (!session?.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (session.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Admin access only" });
        }
        // Optional: attach user to request
        req.user = session.user;
        next();
    }
    catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=adminOnly.js.map