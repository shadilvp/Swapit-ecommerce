import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken, optionalAuth } from "../middlewares/authMiddleware.js";
import express from "express"
import { addCategories, addNewProduct, editProduct, getAllProducts, getCategories, getSpecificProduct } from "../controllers/shared/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();


router.post('/addNewProduct', verifyAccessToken,upload.single("image"),asyncHandler(addNewProduct));
router.post("/addCategories", addCategories);
router.get("/categories", getCategories);
router.get("/products",optionalAuth,getAllProducts)
router.get("/products/:productId",asyncHandler(getSpecificProduct))
router.patch("/products/:productId",verifyAccessToken,editProduct)


export default router;
