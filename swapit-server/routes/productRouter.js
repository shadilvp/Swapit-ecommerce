import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import express from "express"
import { addCategories, addNewProduct, getAllProducts, getCategories, getSpecificProduct } from "../controllers/shared/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();


router.post('/addNewProduct', verifyAccessToken,upload.single("image"),asyncHandler(addNewProduct));
router.post("/addCategories", addCategories);
router.get("/categories", getCategories);
router.get("/products",getAllProducts)
router.get("/products/:productId",asyncHandler(getSpecificProduct))


export default router;
