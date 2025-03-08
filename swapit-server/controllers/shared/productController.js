import { Product } from "../../models/productModel.js";
import { Category } from "../../models/catagoryModel.js";
import mongoose from "mongoose";


export const addNewProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product image is required" });
        }

        console.log("Raw Request Body:", req.body);

        const categoryId = req.body.category;
        const subCategoryName = req.body.subCategory;
        const userId = req.user?.id; // Ensure user ID exists
        console.log("User ID:", userId);

        const currentCategory = await Category.findById(categoryId);

        if (!currentCategory) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        if (!currentCategory.subCategories.includes(subCategoryName)) {
            return res.status(400).json({
                success: false,
                message: `Invalid sub-category. Available sub-categories: ${currentCategory.subCategories.join(", ")}`,
            });
        }

        // Determine condition dynamically
        let condition = "new";
        let location = null;
        let seller = null;

        // If location fields are provided, set condition to "used"
        if (req.body.latitude && req.body.longitude && req.body.address) {
            condition = "used";
            location = {
                latitude: Number(req.body.latitude),
                longitude: Number(req.body.longitude),
                address: req.body.address,
            };
            if (!userId) {
                return res.status(401).json({ success: false, message: "User must be logged in to add a used product" });
            }
            seller = userId;
        }

        const productData = {
            name: req.body.name,
            description: req.body.description,
            category: categoryId,
            subCategory: subCategoryName,
            quantity: Number(req.body.quantity),
            price: Number(req.body.price),
            image: req.file.path,
            condition,
            location,
            seller,
        };

        console.log("Parsed Product Data:", productData);

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
        let {page, limit, search, category, minPrice,subCategory, maxPrice, condition} = req.query ; 
        const currentUserId = req.user.id; 
        
        page = parseInt(page) || 1 ;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let filter = { seller: { $ne: new mongoose.Types.ObjectId(currentUserId) } }; 

        if(search){
            filter.name = { $regex: search, $options: "i" };
        };

        if(condition){
            filter.condition = condition
        }

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


  //get specific product ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  export const getSpecificProduct = async (req, res) => {
    const { productId } = req.params; // This could be either a product ID or a seller ID

    try {
        let product;

        // Check if productId is a valid MongoDB ObjectId (for products)
        if (mongoose.Types.ObjectId.isValid(productId)) {
            product = await Product.findById(productId);
        }

        // If no product is found, assume productId is actually a sellerId
        if (!product) {
            product = await Product.find({ seller: productId });
        }

        // If no results found, return a 404 response
        if (!product || (Array.isArray(product) && product.length === 0)) {
            return res.status(404).json({ success: false, message: "Product(s) not found" });
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// Edit Product ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



export const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user?.id;
        const data = req.body;
        const file = req.file;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if the logged-in user is the seller of the product
        if (product.seller?.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to edit this product" });
        }

        // Update product fields if provided in the request
        if (data.name) product.name = data.name;
        if (data.description) product.description = data.description;
        if (data.quantity) product.quantity = Number(data.quantity);
        if (data.price) product.price = Number(data.price);

        // Update category and subcategory if provided
        if (data.category) {
            const categoryId = data.category;
            const currentCategory = await Category.findById(categoryId);

            if (!currentCategory) {
                return res.status(400).json({ success: false, message: "Invalid category ID" });
            }

            product.category = categoryId;

            // Validate subcategory if provided
            if (data.subCategory) {
                if (!currentCategory.subCategories.includes(data.subCategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid sub-category. Available sub-categories: ${currentCategory.subCategories.join(", ")}`,
                    });
                }
                product.subCategory = data.subCategory;
            }
        }

        // Update image if a new file is provided
        if (file) {
            product.image = file.path;
        }

        // Update condition and location if provided
        if (data.condition) {
            product.condition = data.condition;
        }

        if (data.latitude && data.longitude && data.address) {
            product.location = {
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                address: data.address,
            };
        }

        // Save the updated product
        await product.save();

        return res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
