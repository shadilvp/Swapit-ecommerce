import axios from "axios";

export const uploadImage = async (file: File): Promise<string | null> => {
  console.log(file)
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/c-6ba438d697e1fc90d8c08f1a7cf48e/image/upload`,
      formData
    );

    return response.data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};