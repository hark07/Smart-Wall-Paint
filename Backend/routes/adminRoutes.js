import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllProjects,
  deleteProject,
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getDashboardStats);

router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/projects", protect, adminOnly, getAllProjects);
router.delete("/projects/:id", protect, adminOnly, deleteProject);

export default router;
