import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    selectionBox:{type:Boolean,default:false},
    timestamp: { type: Date, default: Date.now },
    }
);

const Message = mongoose.model("Message", messageSchema);

export {Message};