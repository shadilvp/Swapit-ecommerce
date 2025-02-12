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

const newProductSchema = mongoose.Schema(
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
            validate: {
                validator: function (value) {
                    return categories[this.category]?.includes(value);
                },
                message: "Invalid sub-category for the selected category",
            },
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
        quality: {
            type:String,
            default:"new",
            required:true
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
const validateNewProduct = (NewProduct) => {
    const schema = joi.object(
        {
            name : joi.string().min(3).required(),
            category: joi.string().valid(...validCategories).required(),
            subCategory: joi
                .string()
                .custom((value, helpers) => {
                    const category = helpers.state.ancestors[0].category;
                    if (!categories[category]?.includes(value)) {
                        return helpers.message("Invalid sub-category for the selected category");
                    }
                    return value;
                })
                .required(),
            price : joi.number().min(0).required(),
            description : joi.string().min(10).required(),
            quantity : joi.number().min(1).required(),
            image : joi.string().uri().required(),
        })
        return schema.validate(NewProduct)
}

const   NewProduct = mongoose.model("Product",newProductSchema)
export  {NewProduct,validateNewProduct};