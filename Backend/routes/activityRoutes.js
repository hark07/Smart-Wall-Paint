import express from "express";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

import { getActivities } from "../controllers/activityController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getActivities);

export default router;
