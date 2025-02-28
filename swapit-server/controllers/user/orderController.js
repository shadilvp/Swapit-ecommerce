import { Product } from "../../models/productModel.js";
import { User } from "../../models/userModel.js";
import { Address } from "../../models/addressModel.js";
import { Order } from "../../models/OrderModel.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, productId } = req.body;

        console.log("User ID:", userId);
        console.log("Address:", address);

        // Fetch product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Fetch user (buyer)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Validate address
        const validAddress = await Address.findById(address);
        if (!validAddress) {
            return res.status(404).json({ success: false, message: "Address not found. Please provide a valid address." });
        }

        // Calculate total amount
        let totalAmount = product.price; // Single product order
        const updatedItems = [
            {
                productId: product._id,
                quantity: 1,
                totalPrice: product.price,
            }
        ];

        // Create new order
        const newOrder = new Order({
            userId,
            items: updatedItems,
            totalAmount,
            address,
        });

        await newOrder.save();

        // **Update seller's points, totalRevenue, and productSold**
        const sellerId = product.seller;
        if (sellerId) {
            await User.findByIdAndUpdate(
                sellerId,
                {
                    $inc: { 
                        points: 5,
                        totalRevenue: product.price,
                        productSold: 1 
                    }
                },
                { new: true }
            );
        }

        res.status(200).json({ success: true, message: "Your order is confirmed successfully", newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
