import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./db";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
    }

startServer();
