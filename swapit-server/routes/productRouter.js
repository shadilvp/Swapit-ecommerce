import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import express from "express"
import { addCategories, addNewProduct, getAllProducts, getCategories } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

//new



router.post('/addNewProduct', upload.single("image"),asyncHandler(addNewProduct));
router.post("/addCategories", addCategories);
router.get("/categories", getCategories);
router.get("/products",getAllProducts)


//old


export default router;
