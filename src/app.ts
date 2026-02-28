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

// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  "http://localhost:3000",
  "https://medistore-frontend-delta.vercel.app", // Production frontend URL
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
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