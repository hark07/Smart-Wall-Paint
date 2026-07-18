import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAllProjectsAdmin,
  deleteProjectAdmin,
  downloadProject,
} from "../controllers/projectController.js";

import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectById);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

router.get("/admin/all", protect, adminOnly, getAllProjectsAdmin);

router.delete("/admin/:id", protect, adminOnly, deleteProjectAdmin);

router.post("/:id/download", protect, downloadProject);

export default router;
