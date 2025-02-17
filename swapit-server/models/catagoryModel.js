import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Category name is required"],
    },
    subCategories: {
        type: [String],
        required: [true, "At least one sub-category is required"],
    },
});

const Category = mongoose.model("Category", categorySchema);
export { Category };
