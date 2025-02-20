import { User } from "../../models/userModel.js";
import { Notification } from "../../models/notificationModel.js";


export const sendNotification = async (req,res) => {

    const userId = req.user.id;
    const { sellerId, selectedProduct, swappingProduct} = req.body;
    console.log("datas",userId,sellerId,selectedProduct,swappingProduct)

    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const notification = await Notification({
        userId: sellerId,
        message: `User ${userId} wants to swap with you!`,
        fromUser: userId,
        selectedProduct: selectedProduct,
        swappingProduct: swappingProduct,
    });
    console.log("notification",notification)
    await notification.save();

    res.status(201).json({ success: true, message: "Notification sent" });
}