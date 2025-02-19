import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express"
import { blockUser, getAllUsers, specificUser } from "../controllers/admin/userController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/users", verifyAccessToken,asyncHandler(getAllUsers))
router.patch('/users/block/:userId',asyncHandler(blockUser))
router.get('/users/:userId', asyncHandler(specificUser))


export default router;
