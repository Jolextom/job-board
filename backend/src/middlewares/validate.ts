import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["CLIENT", "FREELANCER"]).default("FREELANCER"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.number().positive("Budget must be a positive number"),
});

export const applicationSchema = z.object({
  jobId: z.string().uuid(),
});
