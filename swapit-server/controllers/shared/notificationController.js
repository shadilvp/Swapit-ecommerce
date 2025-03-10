import { User } from "../../models/userModel.js";
import { Notification } from "../../models/notificationModel.js";


export const sendNotification = async (req,res) => {

    const userId = req.user.id;
    const { sellerId, selectedProduct, swappingProduct} = req.body;
    // console.log("datas",userId,sellerId,selectedProduct,swappingProduct)

    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const notification = await Notification({
        sender: userId,
        message: `wants to swap with you!`,
        receiver: sellerId,
        selectedProduct: selectedProduct,
        swappingProduct: swappingProduct,
    });
    // console.log("notification",notification)
    await notification.save();

    res.status(201).json({ success: true, message: "Notification sent" });
}



// getting Notifiaction ----------------------------------------------------------------------------------------------------------------------

export const getNotification = async (req, res) => {

  const receiver = req.user.id
  if (!receiver) {
    return res.status(404).json({ message: "user not found" });
  }
  // console.log("receiver",receiver)

  const notifications = await Notification.find({ receiver }).sort({ createdAt: -1 });

  // console.log(notifications)
  if (!notifications) {
    return res.status(404).json({ message: "there is not notifications are found" });
  }

  res.status(200).json(notifications)
}


//accepting or rejecting ----------------------------------------------------------------------------------------------------------------------



export const notificationButtons = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const senderId = req.user.id
    // console.log("status:",status,"id:",id,"senderId:",senderId)
    
    
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const receiver = await User.findById(notification.sender);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (status === "rejected") {
      const sender = await User.findById(senderId);
      // Remove the notification
      await Notification.findByIdAndDelete(id);

      // Send a message to the other user
      await Notification.create({
        sender: senderId,  
        receiver: receiver._id,
        message: `Your swap request has been rejected by ${sender.name}.`,
      });

      return res.json({ message: "Notification rejected and deleted successfully" });
    }

    if(status === "delete"){
      await Notification.findByIdAndDelete(id);
      return res.json({ message: "Notification deleted successfully" });
    }

    if (status === "approved") {
      const sender = await User.findById(senderId);
      // Update the notification status

      // Send a message to the other user with the phone number
      await Notification.create({
        sender: senderId,
        receiver: receiver._id,
        message: `Your swap request has been approved by ${sender.name}. You can contact them at .`,
      });
      await Notification.findByIdAndDelete(id);

      return res.json("message:succefull");
    }

    res.status(400).json({ message: "Invalid status" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating notification status" });
  }
};
