import axiosInstance from "@/utils/axiosInstence"

export const fetchMessages = async (sellerId:String) => {
    try {
        const response = await axiosInstance.get(`/message/${sellerId}`);
        return response.data.messages;;
    } catch (error) {
        return null;
    }
};

export const sendMessageApi = async (sellerId: string, message: string , productId: string) => {
    const response = await axiosInstance.post("/send", { receiver: sellerId, message,productId });
    return response.data;
};

export const fetchAllMessages = async () => {
    const response = await axiosInstance.get("/messages");
    return response.data;
  };