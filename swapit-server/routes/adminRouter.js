import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express"
import { getAllUsers } from "../controllers/admin/userController.js";

const router = express.Router();


router.get("/users", asyncHandler(getAllUsers))

export default router;
