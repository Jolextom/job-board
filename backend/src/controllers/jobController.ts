import { Request, Response } from "express";
import { prisma } from "../../utils/prisma"; // ✅ Prisma Singleton
import { jobSchema } from "../middlewares/validate";
import { StatusCodes } from "http-status-codes";
import customErrors from "http-errors";

const { Forbidden, NotFound, BadRequest } = customErrors;

// ✅ Create Job (Client Only)
export const createJob = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "CLIENT") {
    throw new Forbidden("Only clients can post jobs");
  }

  const data = jobSchema.parse(req.body); // ✅ Zod validation (handled in middleware)

  const job = await prisma.job.create({
    data: { ...data, clientId: req.user.userId },
  });

  res.status(StatusCodes.CREATED).json({ success: true, job });
};

// ✅ Get All Jobs (Freelancers & Clients)
export const getJobs = async (req: Request, res: Response) => {
  const page = parseInt(String(req.query.page)) || 1;
  const limit = parseInt(String(req.query.limit)) || 10;
  const skip = (page - 1) * limit;

  const search = req.query.search as string | undefined;
  const category = req.query.category as string | undefined;
  const type = req.query.type as string | undefined;
  const experience = req.query.experience as string | undefined;
  const skills = req.query.skills as string | undefined;
  const budgetRange = req.query.budgetRange as string | undefined;
  const sort = req.query.sort as string | undefined;

  // Validate and set sorting
  let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };
  if (sort) {
    switch (sort) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "budget_high":
        orderBy = { budget: "desc" };
        break;
      case "budget_low":
        orderBy = { budget: "asc" };
        break;
      default:
        throw new BadRequest(
          "Invalid sort parameter. Use 'oldest', 'budget_high', or 'budget_low'."
        );
    }
  }

  // Budget range filter
  let budgetFilter: { gte?: number; lte?: number } = {};
  if (budgetRange) {
    const sanitizedRange = budgetRange.replace(/,/g, "");
    const [min, max] = sanitizedRange.split("-").map(Number);
    if (isNaN(min) || isNaN(max)) {
      throw new BadRequest(
        "Invalid budget range format. Use numbers only (e.g., 80000-90000)."
      );
    }
    budgetFilter = { gte: min, lte: max };
  }

  // Build where clause with stricter typing
  const where = {
    deleted: false,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(category && { category }),
    ...(type && { type }),
    ...(experience && { experience }),
    ...(skills && { skills: { hasSome: skills.split(",") } }),
    ...(budgetRange && { budget: budgetFilter }),
  };

  // Fetch jobs
  const jobs = await prisma.job.findMany({
    where,
    orderBy,
    skip,
    take: limit,
    include: {
      client: {
        select: { name: true, email: true, id: true },
      },
    },
  });

  const totalJobs = await prisma.job.count({ where });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Jobs fetched successfully",
    data: {
      count: jobs.length,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
      jobs,
    },
  });
};

// ✅ Get Single Job
export const getJobById = async (req: Request, res: Response) => {
  const job = await prisma.job.findUnique({
    where: { id: req.params.id, deleted: false },
    include: { applications: true, client: true },
  });

  if (!job) {
    throw new NotFound("Job not found");
  }

  res.status(StatusCodes.OK).json({ success: true, job });
};

export const updateJob = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "CLIENT") {
    throw new Forbidden("Only clients can update jobs");
  }

  const data = jobSchema.parse(req.body);

  const job = await prisma.job.findUnique({
    where: { id: req.params.id, deleted: false },
  });

  if (!job) {
    throw new NotFound("Job not found");
  }

  if (job.clientId !== req.user.userId) {
    throw new Forbidden("Unauthorized to update this job");
  }

  const updatedJob = await prisma.job.update({
    where: { id: req.params.id },
    data,
  });

  res.status(StatusCodes.OK).json({ success: true, job: updatedJob });
};

// ✅ Delete Job (Client Only)
export const deleteJob = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "CLIENT") {
    throw new Forbidden("Only clients can delete jobs");
  }

  const jobId = req.params.id;

  const job = await prisma.job.findUnique({
    where: { id: req.params.id, deleted: false },
  });

  if (!job) {
    throw new NotFound("Job not found");
  }

  if (job.clientId !== req.user.userId) {
    throw new Forbidden("Unauthorized to delete this job");
  }

  // ✅ Soft delete instead of permanent delete
  await prisma.job.update({
    where: { id: jobId },
    data: { deleted: true },
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Job deleted successfully (soft delete)" });
};
