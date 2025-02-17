import { Product } from "../models/productModel.js";
import { Category } from "../models/catagoryModel.js";


export const addNewProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product image is required" });
        }

        // console.log("Raw Request Body:", req.body);

        const categoryId = req.body.category;
        const subCategoryName = req.body.subCategory;

        const currentCategory = await Category.findById(categoryId);

        if (!currentCategory) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        // console.log("Fetched Category:", currentCategory);

        if (!currentCategory.subCategories.includes(subCategoryName)) {
            return res.status(400).json({
                success: false,
                message: `Invalid sub-category. Available sub-categories: ${currentCategory.subCategories.join(", ")}`,
            });
        }

        const productData = {
            name: req.body.name,
            description: req.body.description,
            category: categoryId, // Store as ObjectId
            subCategory: subCategoryName, // Store as a string
            quantity: Number(req.body.quantity),
            price: Number(req.body.price),
            image: req.file.path,
            condition: "new"
        };

        // console.log("Parsed Product Data:", productData);


        const newProduct = new Product(productData);
        await newProduct.save();

        return res.status(201).json({ success: true, message: "New product added successfully", newProduct });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//categories ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const getCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, categories });
      } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
} 


export const addCategories = async (req, res) => {
    try {
      const categories = req.body.categories; 
  
      if (!categories || categories.length === 0) {
        return res.status(400).json({ success: false, message: "Categories are required" });
      }
  
      await Category.insertMany(categories);
  
      res.status(201).json({ success: true, message: "Categories added successfully" });
    } catch (error) {
      console.error("Error adding categories:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };



  //get all products ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  export const getAllProducts = async(req,res) => {
    try {
        let {page, limit, search, category, minPrice,subCategory, maxPrice} = req.query ; 

        page = parseInt(page) || 1 ;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let filter = {}

        if(search){
            filter.name = { $regax: search, $options:"i" };
        };

        if(category){
            filter.category = category;
        };

        if(subCategory){
            filter.subCategory = subCategory;
        };

        if (minPrice && maxPrice) {
            filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        } else if (minPrice) {
            filter.price = { $gte: parseInt(minPrice) };
        } else if (maxPrice) {
            filter.price = { $lte: parseInt(maxPrice) };
        }

        const products = await Product.find(filter)
        .populate("category", "name")
        .skip(skip)
        .limit(limit);

        const totalProducts = await Product.countDocuments(filter);

        return res.status(200).json({
            success: true,
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });


    } catch (error) {

        console.error("Server Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
  }