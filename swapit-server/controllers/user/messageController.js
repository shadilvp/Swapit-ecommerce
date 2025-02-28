import { Message } from "../../models/messageModel.js";

// Send a new message
export const sendMessage = async (req, res) => {
    
    const { receiver, message } = req.body;
    const sender = req.user.id; // Get from access token
    console.log("baceknd send",receiver, message)
  
    if (!receiver || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    try {
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();
  
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
