import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import { authenticateUser } from "./middlewares/authMiddleware";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: string };
    }
  }
}

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Fix the protected route
app.get(
  "/api/protected",
  authenticateUser,
  (req: any, res: express.Response) => {
    res.json({ message: "Access granted", user: req.user });
  }
);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandlerMiddleware as express.ErrorRequestHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
