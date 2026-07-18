import express from "express";

import {
  updateProfile,
  changePassword,
} from "../controllers/settingsController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile", protect, adminOnly, updateProfile);

router.put("/password", protect, adminOnly, changePassword);

export default router;
