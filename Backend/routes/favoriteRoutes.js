import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  addFavoriteColor,
  addFavoritePattern,
  getFavorites,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/", protect, getFavorites);

router.post("/colors/:colorId", protect, addFavoriteColor);

router.post("/patterns/:patternId", protect, addFavoritePattern);

export default router;
