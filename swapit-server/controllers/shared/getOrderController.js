import { Order } from "../../models/orderModel";


export const getSpecificUserOrders = async (req, res) => {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).populate("items.productId").populate("address");

    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found for this user." });
    }

    res.status(200).json({ success: true, orders });

};

export const getAllOrders = async (req, res) => {
    const orders = await Order.find()
        .populate("items.productId")
        .populate("address")

    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found." });
    }

    res.status(200).json({ success: true, orders });
};