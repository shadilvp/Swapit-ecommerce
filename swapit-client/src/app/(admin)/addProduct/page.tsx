"use client"

import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { addProduct } from "@/services/product";

const categories: Record<string, string[]> = {
  fashion: ["men", "women", "kids", "others"],
  books: ["fiction", "non-fiction", "educational", "others"],
  sports: ["indoor", "outdoor", "gym", "others"],
  electronics: ["fridge", "tv", "washingmachine", "others"],
  mobiles: ["smartphones", "feature phones", "accessories", "others"],
  furnitures: ["sofa", "table", "chair", "others"],
};


const AddProduct = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    quantity: 1,
    price: 0,
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
   

    e.preventDefault();
    
    if (!formData.image) {
      alert("Product image is required");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value as any);
    });


    try {
      const response = await addProduct(formData);
      alert(response.message);
      router.push("/newProducts");
    } catch (error: any) {
      alert(error.message);
    }

  };

  return (
    <div className="ml-64 flex gap-6 min-h-screen p-6 bg-gray-100 justify-center mx-auto">

      <div className="w-2/5 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[650px]">
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Description</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700"
            rows={4}
          ></textarea>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black mb-4">Category</h2>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Select Subcategory</option>
            {formData.category && categories[formData.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black mb-4">Quantity & Price</h2>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
          />
          <input
            type="number"
            name="price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700"
          />
        </div>
      </div>


      <div className="w-2/5 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[650px]">
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Product Image</h2>
          <div className="grid grid-cols-3 gap-4">
            
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-3 bg-gray-300 text-black rounded-lg">Discard</button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2"
          >
            <FiPlus />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
