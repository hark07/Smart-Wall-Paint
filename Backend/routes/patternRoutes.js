import express from "express";

import {
  createPattern,
  getPatterns,
  getPatternById,
  updatePattern,
  deletePattern,
} from "../controllers/patternController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPatterns);

router.get("/:id", getPatternById);

router.post("/", protect, adminOnly, createPattern);

router.put("/:id", protect, adminOnly, updatePattern);

router.delete("/:id", protect, adminOnly, deletePattern);

export default router;
