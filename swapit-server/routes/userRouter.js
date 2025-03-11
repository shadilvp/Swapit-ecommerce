import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { addAdress, editProfile, loadAddress, loadSpecificAddress, userProfile } from "../controllers/user/profileController.js";
import express from "express";
import upload from "../middlewares/multer.js";
import { createOrder, createRazorpayOrder, getSpecificUserOrders, verifyRazorpayPayment } from "../controllers/user/orderController.js";

const router = express.Router();

    router.get("/profile", verifyAccessToken,asyncHandler(userProfile));
    router.post("/profile",verifyAccessToken,upload.single("profileImage"),asyncHandler(editProfile))

    //userAdress
    router.get('/profile/address',verifyAccessToken,asyncHandler(loadAddress))
    router.post('/profile/address',verifyAccessToken,asyncHandler(addAdress))
    router.get('/profile/address/:addressId',verifyAccessToken,asyncHandler(loadSpecificAddress))

    router.post('/orders',verifyAccessToken, asyncHandler(createOrder))
    router.get('/orders', asyncHandler(getSpecificUserOrders))


    router.post('/razorpay/order',verifyAccessToken, asyncHandler(createRazorpayOrder));
    router.post('/razorpay/payment',verifyAccessToken, asyncHandler(verifyRazorpayPayment));

export default router;
