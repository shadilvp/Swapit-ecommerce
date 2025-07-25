import { Address } from "../../models/addressModel.js";
import { Order } from "../../models/OrderModel.js";
import { Product } from "../../models/productModel.js";
import { User } from "../../models/userModel.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto'

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,

});



//creating an order ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const createOrder = async (req, res) => {
    const userId = req.user.id;

    const { addressId,productId } = req.body;


    const address = await Address.findById(addressId)
    if (!address) {
        return  res.status(404).json({success:false,message:"address is not available"})
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const product = await Product.findById(productId)
    if(!product){
        return  res.status(404).json({success:false,message:"product is not available"})
    }


    const totalAmount = product.price;

    const newOrder = new Order({
        userId,
        product,
        totalAmount,
        address: address,
        paymentStatus:"paid"
    })


    await newOrder.save()

    product.status = "sold";
    await product.save();

    res.status(200).json({ success: true, message: `Your order is confirmed succesfully`, newOrder })

}

//geting specifc user order ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getSpecificUserOrders = async (req, res) => {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate("productId").populate("address");

    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found for this user." });
    }

    res.status(200).json({ success: true, orders });

};



//Get all ordes ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const getAllOrders = async (req, res) => {
    const orders = await Order.find()
        .populate("items.productId")
        .populate("address")

    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found." });
    }

    res.status(200).json({ success: true, orders });
};



export const createRazorpayOrder = async (req, res) => {
    const userId = req.user.id;
    const { totalAmount } = req.body;
    try {
        const receipt = `rcpt_${userId.slice(0, 8)}_${Date.now() % 100000}`;

        if (!receipt) return res.status(400).json({ success: false, message: `reciept not found` })

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: receipt,
            payment_capture: 1,
        };

        if (!options) return res.status(400).json({ success: false, message: `options not created` })

        const order = await razorpay.orders.create(options);
        if (!order) return res.status(400).json({ success: false, message: `order not created` })
            
        res.json({
            success: true,
            razorpay_order_id: order.id,
            razorpay_payment_options: order,

        });
    } catch (error) {
        console.error("Razorpay API Error: ", error);
        res.status(500).json({ success: false, message: "Failed to create Razorpay order", error });
    }
};


export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature, address, productId} = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const product = await Product.findById(productId)
        if(!product){
            return  res.status(404).json({success:false,message:"product is not available"})
        }

        const body = orderId + "|" + paymentId;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const authenticate = signature === expectedSignature
        console.log("auth", authenticate)
        
        if (authenticate) {

            const totalAmount = product.price;

            const newOrder = new Order({
                userId,
                product,
                totalAmount,
                address: address,
                paymentStatus:"paid"
            })


            await newOrder.save()

            product.status = "sold";
            await product.save();

            res.json({ success: true, message: "Payment verified successfully!", newOrder });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'server error' })
    }
};