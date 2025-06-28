import axiosInstance from "@/utils/axiosInstence"
import { AddressPayload } from "@/types";


export const fetchAddress = async () => {
    try {
        const response = await axiosInstance.get('/profile/address');
        return response.data.addresses; 
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
};


export const addAddress = async (formDataToSend: AddressPayload) => {
    try {
        console.log("data:",formDataToSend)
        const response = await axiosInstance.post('/profile/address',formDataToSend)
        return response.data
    } catch (error) {
        return error
    }
}


export const fetchSpecificAddress = async (addressId:string) => {
    const response = await axiosInstance.get(`/profile/address/${addressId}`);
    return response.data
}

