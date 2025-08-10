import express from "express";
import { shortenUrl, redirectUrl,getAllUrls, visitedByUser } from "../controllers/shortController.js";
import { adminAuth, protect, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/api/shorten", protect, shortenUrl);
router.get("/api/urls", protect, adminAuth, getAllUrls);
router.get("/api/userUrl",protect,visitedByUser);
router.get("/r/:shortcode", redirectUrl);

export default router