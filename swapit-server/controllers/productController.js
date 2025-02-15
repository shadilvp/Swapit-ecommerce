import { NewProduct } from "../models/newProductModel.js";

export const addProduct = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product image is required" });
        }

        req.body.image = req.file.path;
        req.body.quantity = Number(req.body.quantity);
        req.body.price = Number(req.body.price);


        const newProduct = new NewProduct(req.body);
        await newProduct.save();

        return res.status(201).json({ success: true, message: "New product added successfully", newProduct });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//all new Products ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const newProducts = async (req,res) => {
    
} 
