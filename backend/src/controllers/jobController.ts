import { Request, Response } from "express";
import prisma from "../../utils/prisma"; // ✅ Prisma Singleton
import { jobSchema } from "../middlewares/validate";
import { StatusCodes } from "http-status-codes";
import customErrors from "http-errors";

const { Forbidden, NotFound } = customErrors;

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
export const getJobs = async (_req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({ include: { client: true } });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      count: jobs.length,
      jobs,
    },
  });
};

// ✅ Get Single Job
export const getJobById = async (req: Request, res: Response) => {
  const job = await prisma.job.findUnique({
    where: { id: req.params.id },
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

  const job = await prisma.job.findUnique({ where: { id: req.params.id } });

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

  const job = await prisma.job.findUnique({ where: { id: req.params.id } });

  if (!job) {
    throw new NotFound("Job not found");
  }

  if (job.clientId !== req.user.userId) {
    throw new Forbidden("Unauthorized to delete this job");
  }

  await prisma.job.delete({ where: { id: req.params.id } });

  res.json({ success: true, message: "Job deleted" });
};
