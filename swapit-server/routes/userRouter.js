import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { addAdress, editProfile, loadAddress, loadSpecificAddress, userProfile } from "../controllers/user/profileController.js";
import express from "express";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile", verifyAccessToken,asyncHandler(userProfile));
router.post("/profile",verifyAccessToken,upload.single("profileImage"),asyncHandler(editProfile))

    //userAdress
    router.get('/profile/address',verifyAccessToken,asyncHandler(loadAddress))
    router.post('/profile/address',verifyAccessToken,asyncHandler(addAdress))
    router.get('/profile/address/:addressId',verifyAccessToken,asyncHandler(loadSpecificAddress))

export default router;
