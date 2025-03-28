"use client";

import { FiPlus } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct, fetchCategories } from "@/services/product";
import AddImage from "@/components/ui/uploadProduct";

const sellProduct = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    quantity: 1,
    price: 0,
    image: null as File | null,
    latitude: null as number | null,
    longitude: null as number | null,
    address: "",
    condition: "used",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Update formData with latitude and longitude
          setFormData((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));

          // Get address using reverse geocoding
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setFormData((prev) => ({
              ...prev,
              address: data.display_name || "Address not found",
            }));
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file);

      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);

      setFormData((prev) => ({
        ...prev,
        image: file, // Update the image in the form data
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Product image is required");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("subCategory", formData.subCategory);
    data.append("quantity", formData.quantity.toString());
    data.append("price", formData.price.toString());
    data.append("image", formData.image);

    if (formData.latitude && formData.longitude) {
      data.append("latitude", formData.latitude.toString());
      data.append("longitude", formData.longitude.toString());
      data.append("address", formData.address);
    }

    try {
      const response = await addProduct(data);
      alert(response.message);
      router.push("/profile");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
      <div className="flex gap-6 max-w-5xl w-full mx-auto">
        {/* Left Panel */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[650px]">
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">
              Description
            </h2>
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

          {/* Category Section */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-black mb-4">Category</h2>
            {isLoading && <p>Loading categories...</p>}
            {error && <p>Error loading categories</p>}

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
            >
              <option value="">Select Category</option>
              {categories?.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
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
              {formData.category &&
                categories
                  ?.find((cat: any) => cat._id === formData.category)
                  ?.subCategories.map((sub: string) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
            </select>
          </div>

          {/* Quantity & Price Section */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-black mb-4">
              Quantity & Price
            </h2>
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

        {/* Right Panel */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between min-h-[650px]">
          {/* Product Image Section */}
          <div>
            <AddImage onImageChange={handleImageChange} />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-gray-700">
                  {imagePreview ? "Slected Image" : "No image selected"}
                </p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto rounded-lg border border-gray-300 max-w-20 max-h-20"
                />
              </div>
            )}
          </div>

          {/* Location Section */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Location</h2>
            <button
              type="button"
              onClick={getLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Get My Location
            </button>
            {formData.address && (
              <div className="mt-3 p-3 bg-gray-100 rounded-lg text-gray-700">
                <p>
                  <strong>Address:</strong> {formData.address}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-3 bg-gray-300 text-black rounded-lg">
              Discard
            </button>
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
    </div>
  );
};

export default sellProduct;
