import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { sendMessage, getMessages } from "../controllers/user/messageController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a message
router.post("/send", verifyAccessToken,asyncHandler(sendMessage));

// Get chat history
router.get("/message/:receiverId", verifyAccessToken, getMessages);

export default router;
