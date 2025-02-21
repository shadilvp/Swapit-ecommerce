import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { getNotification, notificationButtons, sendNotification } from "../controllers/shared/notificationController.js";

const router = express.Router();
router.post('/send-Notification', verifyAccessToken, asyncHandler(sendNotification));
router.get('/get-Notification',verifyAccessToken,asyncHandler(getNotification));
router.patch("/notifications/:id",verifyAccessToken,notificationButtons);

export default router