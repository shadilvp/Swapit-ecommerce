import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import express from "express"
import { addProduct } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

//new



router.post('/addProduct', upload.single("image"),asyncHandler(addProduct));


//old


export default router;
