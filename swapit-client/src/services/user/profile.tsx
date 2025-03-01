import axiosInstance from "@/utils/axiosInstence"


export const fetchUserProfile = async () => {
    try {
        const response = await axiosInstance.get("/profile");
        // console.log("Fetched Data:", response.data); // Logging data to console
        return response.data;
    } catch (error) {
        // console.error("Error fetching profile:", error);
        return null;
    }
};


export const editProfile = async (data: { name: string; email: string; phone: string; image: string | null }) => {
    try {
        const response = await axiosInstance.post("/profile",data)
        return response.data
    } catch (error) {
        return error
    }
}