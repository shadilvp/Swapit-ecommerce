import axiosInstance from "@/utils/axiosInstence";

interface NotificationParams {
  sellerId: string;
  selectedProduct: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  swappingProduct: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}

export const sendNotification = async (params: NotificationParams) => {
    console.log("notificaation datas",params)
  try {
    const response = await axiosInstance.post('/send-Notification', params);
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

export const getNotification = async () => {
  const response = await axiosInstance.get('/get-Notification');
  return response.data
}



export const updateNotificationStatus = async (notificationId: string, status: string) => {
  console.log(status)
  const response = await axiosInstance.patch(`/notifications/${notificationId}`, { status });
  return response.data;
};

