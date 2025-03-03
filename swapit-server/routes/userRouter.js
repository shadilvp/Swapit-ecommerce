import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { editProfile, userProfile } from "../controllers/user/profileController.js";
import express from "express";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile", verifyAccessToken,asyncHandler(userProfile));
router.post("/profile",verifyAccessToken,upload.single("profileImage"),asyncHandler(editProfile))

export default router;
