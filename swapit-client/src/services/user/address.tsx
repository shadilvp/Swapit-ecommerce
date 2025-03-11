import axiosInstance from "@/utils/axiosInstence"


export const fetchAddress = async () => {
    try {
        const response = await axiosInstance.get('/profile/address');
        // console.log("Fetched Data:", response.data); // Logging data to console
        return response.data.addresses; 
    } catch (error) {
        // console.error("Error fetching profile:", error);
        return null;
    }
};


export const addAddress = async (formDataToSend:any) => {
    try {
        console.log("data:",formDataToSend)
        const response = await axiosInstance.post('/profile/address',formDataToSend)
        return response.data
    } catch (error) {
        return error
    }
}


export const fetchSpecificAddress = async (addressId:any) => {
    const response = await axiosInstance.get(`/profile/address/${addressId}`);
    return response.data
  }

