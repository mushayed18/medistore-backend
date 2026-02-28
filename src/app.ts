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

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

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