import express from "express";
import cors from "cors";
import { CategoryRoutes } from "./modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
// import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { MedicineRoutes } from "./modules/medicine/medicine.route";
import { OrderRoutes } from "./modules/order/order.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { UserRoutes } from "./modules/user/user.route";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",                        // local dev (frontend)
        "https://medistore-frontend-delta.vercel.app",  // live Vercel frontend
      ];

      // Allow requests with no origin (Postman, curl, mobile apps, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // required for cookies/sessions/auth
  })
);

// Explicitly handle preflight OPTIONS requests (fixes some browser issues)
app.options("*", cors());

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/medicines", MedicineRoutes);
app.use("/api/v1/orders", OrderRoutes);
app.use("/api/v1/reviews", ReviewRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use(notFound);

// app.use(errorHandler)

export default app;