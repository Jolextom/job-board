import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access Denied. No Token Provided" });
    return; // Ensure function stops execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };
    req.user = decoded; // Attach user data to request
    next(); // ✅ Always call next() in successful case
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};
