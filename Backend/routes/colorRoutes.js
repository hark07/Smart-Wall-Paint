import express from "express";

import {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
} from "../controllers/colorController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getColors);

router.get("/:id", getColorById);

router.post("/", protect, admin, createColor);

router.put("/:id", protect, admin, updateColor);

router.delete("/:id", protect, admin, deleteColor);

export default router;
