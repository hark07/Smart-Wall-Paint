import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAnalytics);

export default router;
