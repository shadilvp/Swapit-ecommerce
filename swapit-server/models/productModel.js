import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Product name is required"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"],
    },
    subCategory: {
        type: String,
        required: [true, "Product sub-category is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
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
    purchasedQuantity: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    condition: {
        type: String,
        enum: ["new", "used"],
        required: true,
    },
    location: {
        type: String,
        required: function () {
            return this.condition === "used";
        },
    }
});

// Middleware to validate subCategory against the selected Category
productSchema.pre("save", async function (next) {
    const category = await mongoose.model("Category").findById(this.category);
    if (!category) {
        return next(new Error("Invalid category selected"));
    }
    if (!category.subCategories.includes(this.subCategory)) {
        return next(new Error("Invalid sub-category for the selected category"));
    }
    next();
});

const Product = mongoose.model("Product", productSchema);
export { Product };
