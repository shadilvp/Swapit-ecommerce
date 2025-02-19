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