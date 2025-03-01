import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { sendMessage, getMessages, getAllMessages } from "../controllers/user/messageController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a message
router.post("/send", verifyAccessToken,asyncHandler(sendMessage));

// Get chat history
router.get("/message/:receiverId", verifyAccessToken, getMessages);

//get all messages
router.get("/messages",verifyAccessToken, getAllMessages)

export default router;
