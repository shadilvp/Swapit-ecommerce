import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        totalAmount:{
            type:Number,
            required:true,
        },
        address: {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Address",
            required:true
        },
        status:{
            type:String,
            enum : ["pending","processing","shipped","deliveried","canceled"],
            default:"pending"
        },
        paymentStatus:{
            type:String,
            default:"unpaid"
        }

    },
    {timestamps:true}
);


const Order = mongoose.model("Order",orderSchema)

export {Order} ;