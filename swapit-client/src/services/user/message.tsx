import axiosInstance from "@/utils/axiosInstence"

export const fetchMessages = async (sellerId:String) => {
    try {
        const response = await axiosInstance.get(`/message/${sellerId}`);
        return response.data.messages;;
    } catch (error) {
        return null;
    }
};

export const sendMessageApi = async (sellerId: string, message: string) => {
    const response = await axiosInstance.post("/send", { receiver: sellerId, message });
    return response.data;
};