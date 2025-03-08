import { Message } from "../../models/messageModel.js";

// Send a new message
export const sendMessage = async (req, res) => {
    
    const { receiver, message,productId,transactionType,selectionBox } = req.body;
    const sender = req.user.id; // Get from access token
    console.log("baceknd send",receiver, message, productId, transactionType, selectionBox)
    console.log(sender)

    const finalMessage = message?.trim() ? message : "selectionBox";

    if (!receiver || !finalMessage || !productId || !transactionType ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    try {

      if (selectionBox) {
        // Find and delete any existing messages with the same productId and selectionBox: true
        await Message.deleteMany({ product: productId, selectionBox: true });
      }
      
      const newMessage = new Message({ sender, receiver, message:finalMessage, product : productId, selectionBox, transactionType });
      await newMessage.save();
      console.log(newMessage)
      res.status(201).json({ success: true, message: "Message sent", data: newMessage });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

  
  

// Get chat history between two users
export const getMessages = async (req, res) => {
  const { receiverId } = req.params;
  const userId = req.user.id; 
  console.log("baceknd get",receiverId)

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sender", "name").populate("receiver", "name").populate("product", "name");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};
