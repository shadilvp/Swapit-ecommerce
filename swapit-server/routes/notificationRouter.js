import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { sendNotification } from "../controllers/shared/notificationController.js";

const router = express.Router();
router.post('/send-Notification', verifyAccessToken, asyncHandler(sendNotification));

export default router