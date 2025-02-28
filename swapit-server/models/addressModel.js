import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        firstName:{ 
            type: String, 
            required: true 
        },
        lastName:{ 
            type: String,
            required: true
        },
        email:{ 
            type: String, 
            required: true 
        },
        mobile:{ 
            type: String, 
            required: true 
        },
        addressLine:{ 
            type: String, 
            required: true 
        },
        city:{ 
            type: String, 
            required: true 
        },
        state:{
            type: String, 
            required: true 
        },
        pinCode:{ 
            type: String, 
            required: true 
        },
        country:{ 
            type: String,
            required: true 
        },
    }
);

const Address = mongoose.model("Address", addressSchema);

export  {Address};
