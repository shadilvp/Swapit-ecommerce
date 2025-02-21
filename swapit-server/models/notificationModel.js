import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    receiver: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    selectedProduct: { //the product they needed
        _id: { type: mongoose.Schema.Types.ObjectId},
        name: { type: String},
        image: { type: String },
        price: { type: Number },
    },
    swappingProduct: { //the product they offering
        _id: { type: mongoose.Schema.Types.ObjectId},
        name: { type: String},
        image: { type: String },
        price: { type: Number },
      },
    message: {
        type:String
    },
    phone: {
        type:Number
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected","delete"],
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