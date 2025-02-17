import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
} from "../controllers/jobController";

const router = Router();

router.post("/", authenticateUser, createJob); // Clients only
router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", authenticateUser, updateJob); // Update job
router.delete("/:id", authenticateUser, deleteJob); // Clients only

export default router;
