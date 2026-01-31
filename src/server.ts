import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(cors());
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "okie dokie"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});