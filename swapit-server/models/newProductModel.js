import mongoose from "mongoose"
import joi from "joi"


const categories = {
    fashion: ["men", "women", "kids", "others"],
    books: ["fiction", "non-fiction", "educational", "others"],
    sports: ["indoor", "outdoor", "gym", "others"],
    electronics: ["fridge", "tv", "washingmachine", "others"],
    mobiles: ["smartphones", "feature phones", "accessories", "others"],
    furnitures: ["sofa", "table", "chair", "others"],
}

const validCategories = Object.keys(categories);

const newProductSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            unique:true,
            required:[true,"Product name is required"],
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: validCategories,
        },
        subCategory: {
            type: String,
            required: [true, "Product sub-category is required"],
        },
        price:{
            type:Number,
            required:[true,"Product price is required"],
        },
        description:{
            type:String,
            required:[true,"Product description is required"],
        },
        quantity:{
            type:String,
            required:[true,"Product quantity is required"],
        },
        image:{
            type: String,
            required:[true, "Product image URL is required"],
        },
        purchasedQuantity:{
            type:Number,
            default:0,
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }  
)

newProductSchema.pre("save", function (next) {
    if (!categories[this.category]?.includes(this.subCategory)) {
        return next(new Error("Invalid sub-category for the selected category"));
    }
    next();
});


const   NewProduct = mongoose.model("Product",newProductSchema)
export  {NewProduct};