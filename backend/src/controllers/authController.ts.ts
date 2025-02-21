import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma";
import { registerSchema, loginSchema } from "../middlewares/validate";
import customErrors from "http-errors";
import { StatusCodes } from "http-status-codes";

const { Conflict, Unauthorized } = customErrors;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

// Register User
export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Conflict("User already exists");
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  await prisma.user.create({ data: { ...data, password: hashedPassword } });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "User created successfully" });
};

// Login User
export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  // Find user
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Unauthorized("Invalid credentials");
  }

  // Generate JWT token with role
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(StatusCodes.OK).json({ token });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};
