import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";

const PORT = Number(process.env.PORT) || 8000;

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "https://your-frontend.vercel.app",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/orgs", authMiddleware, orgRoutes);
app.use("/products", authMiddleware, productRoutes);
app.use("/orders", authMiddleware, orderRoutes);
app.use("/analytics", authMiddleware, analyticsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});