import axiosInstance from "@/utils/axiosInstence"


export const addProduct = async (data: {
    productName: string;
    description: string;
    category: string;
    subCategory: string;
    quality: string;
    images: string[]; // Array of Cloudinary URLs
  }) => {
    const response = await axiosInstance.post("/products", data);
    return response.data;
  };