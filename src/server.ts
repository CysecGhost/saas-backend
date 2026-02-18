import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";
import orgRoutes from "./routes/orgRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes"
import authMiddleware from "./middlewares/authMiddleware";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";

const PORT = Number(process.env.PORT) || 8000;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/orgs", authMiddleware, orgRoutes);
app.use("/products", authMiddleware, productRoutes);
app.use("/orders", authMiddleware, orderRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});