import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { userProfile } from "../controllers/user/profileController.js";
import express from "express";

const router = express.Router();

router.get("/profile", verifyAccessToken,asyncHandler(userProfile));

export default router;
