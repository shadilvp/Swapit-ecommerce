import mongoose from "mongoose";
import joi from "joi";

const categories = {
    fashion: ["men", "women", "kids", "others"],
    books: ["fiction", "non-fiction", "educational", "others"],
    sports: ["indoor", "outdoor", "gym", "others"],
    electronics: ["fridge", "tv", "washingmachine", "others"],
    mobiles: ["smartphones", "feature phones", "accessories", "others"],
    furnitures: ["sofa", "table", "chair", "others"],
};

const validCategories = Object.keys(categories);

const resoldProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Product name is required"],
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
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
        },
        image: {
            type: String,
            required: [true, "Product image URL is required"],
        },
        quality: {
            type: String,
            default: "resold",
            required: true,
        },
        purchasedQuantity: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        location: {
            type: {
                latitude: { type: Number, required: true },
                longitude: { type: Number, required: true },
                address: { type: String, required: true },
            },
            required: [true, "Location is required"],
        },
        contact: {
            whatsappNumber: {
                type: String,
                required: [true, "WhatsApp number is required"],
                match: [/^\+\d{1,3}\d{6,14}$/, "Invalid WhatsApp number"],
            },
        },
    }
);

const validateProduct = (resoldProduct) => {
    return joi.object({
        name: joi.string().min(3).required(),
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
        price: joi.number().min(0).required(),
        description: joi.string().min(10).required(),
        quantity: joi.number().min(1).required(),
        image: joi.string().uri().required(),
        location: joi.object({
            latitude: joi.number().required(),
            longitude: joi.number().required(),
            address: joi.string().required(),
        }).required(),
        contact: joi.object({
            whatsappNumber: joi.string().pattern(/^\+\d{1,3}\d{6,14}$/).required(),
        }).required(),
    }).validate(resoldProduct);
};

const ResoldProduct = mongoose.model("ResoldProduct", resoldProductSchema);
export { ResoldProduct, validateProduct };
