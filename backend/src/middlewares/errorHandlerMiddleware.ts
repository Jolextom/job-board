import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Custom error handler middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ✅ Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        field: e.path.join("."), // Get the field name
        message: e.message, // Error message
      })),
    });
  }

  // ✅ Handle other custom errors (e.g., Conflict, BadRequest)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};

export default errorHandler;
