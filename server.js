import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

import studentRoutes from "./routes/studentRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Rate limiter
app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200
}));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Professional Backend Running Successfully 🚀");
});

// Global error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
