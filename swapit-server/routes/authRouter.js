import { adminRegister, login, refreshAccessToken, userRegister } from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express"

const router = express.Router();

router.post('/register-user', asyncHandler(userRegister));
router.post('/register-admin', asyncHandler(adminRegister));
router.post('/login', asyncHandler(login))
router.post('/refresh-token', refreshAccessToken)


export default router;

