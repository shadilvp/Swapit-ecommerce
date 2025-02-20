import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    selectedProduct: { //the product they needed
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number },
    },
    swappingProduct: { //the product they offering
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number },
      },
    message: {
        type:String
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    is_read: {
        type:Boolean,
        default:false
    }
},
{ timestamps: true }
); 

const Notification = mongoose.model("Notification",notificationSchema)
export {Notification};