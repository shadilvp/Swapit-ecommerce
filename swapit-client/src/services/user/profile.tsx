import axiosInstance from "@/utils/axiosInstence"

export const fetchUserProfile = async () => {
    try {
        const response = await axiosInstance.get("/profile");
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
};


export const editProfile = async (formDataToSend: FormData) => {
  try {
    const response = await axiosInstance.post("/profile", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Profile update failed:", error);
    throw error;
  }
};