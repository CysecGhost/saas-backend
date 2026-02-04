import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});