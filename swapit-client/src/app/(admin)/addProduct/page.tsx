"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FiPlus, FiTrash } from "react-icons/fi";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

const AddProduct = () => {
  const [uploading, setUploading] = useState(false);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      category: "",
      subCategory: "",
      quality: "New",
      images: [],
    },

    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      description: Yup.string().required("Business Description is required"),
      category: Yup.string().required("Category is required"),
      subCategory: Yup.string().required("Sub Category is required"),
      quality: Yup.string().required("Quality is required"),
    }),
    
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      // Send form data to backend
      try {
        const response = await axios.post("/api/products", values);
        console.log("Product Added:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  // Upload Image to Cloudinary
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = response.data.secure_url;

      // Update Formik images array
      formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  // Remove Image
  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  return (
    <div className="ml-64 flex gap-6 min-h-screen p-6 bg-gray-100 justify-center mx-auto">
      {/* Form Start */}
      <form onSubmit={formik.handleSubmit} className="flex gap-6 w-full">
        {/* Left Section */}
        <div className="w-2/5 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[650px]">
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Description</h2>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
            {formik.touched.productName && formik.errors.productName && (
              <p className="text-red-500 text-sm">{formik.errors.productName}</p>
            )}

            <textarea
              name="description"
              placeholder="Business Description"
              className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-black mb-4">Category</h2>
            <select
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}

            <select
              name="subCategory"
              className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700"
              value={formik.values.subCategory}
              onChange={formik.handleChange}
            >
              <option value="">Select Sub Category</option>
              <option value="phones">Phones</option>
              <option value="clothing">Clothing</option>
            </select>
            {formik.touched.subCategory && formik.errors.subCategory && (
              <p className="text-red-500 text-sm">{formik.errors.subCategory}</p>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-black mb-4">Quality</h2>
            <select
              name="quality"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
              value={formik.values.quality}
              onChange={formik.handleChange}
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            {formik.touched.quality && formik.errors.quality && (
              <p className="text-red-500 text-sm">{formik.errors.quality}</p>
            )}
          </div>
        </div>

        {/* Right Section - Product Images */}
        <div className="w-2/5 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[650px]">
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Product Image</h2>
            <div className="grid grid-cols-3 gap-4">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative border border-gray-300 p-6 rounded-lg">
                  <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              ))}

              <label className="border border-gray-300 p-6 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} />
                {uploading ? "Uploading..." : <FiPlus size={24} />}
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-3 bg-gray-300 text-black rounded-lg"
              onClick={() => formik.resetForm()}
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2"
            >
              <FiPlus />
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
