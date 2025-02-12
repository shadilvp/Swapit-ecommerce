import { validateNewProduct, NewProduct } from "../models/newProductModel.js";

export const addProduct = async (req, res) => {
    try {
        const productData = req.body;


        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product image is required" });
        }

        
        productData.image = req.file.path;

        const { error } = validateNewProduct(productData);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { name, category, price, description, quantity, image } = productData;


        const existingProduct = await NewProduct.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: `Product ${name} already exists` });
        }


        const newProduct = new NewProduct({ name, category, price, description, quantity, image });
        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "New product added successfully",
            newProduct,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
