import axiosInstance from "@/utils/axiosInstence"
import { useRouter } from "next/navigation";


export const addProduct = async (data: {
  }) => {
    const response = await axiosInstance.post("/addProduct", data, {
      headers : {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  };