import axiosInstance from "@/utils/axiosInstence"




export const createOrder = async (addressId:string,productId:string) => {
    try {
        console.log("data:",addressId,productId)
        const response = await axiosInstance.post('/orders',{
            addressId,
            productId,
          })
        return response.data
    } catch (error) {
        return error
    }
}


export const getSpecificOrder = async () => {
    const response = await axiosInstance.get('/orders');
    return response.data
}


export const createRazorpayOrder = async (totalAmount:number) => {
    // console.log(totalAmount)
    const response = await axiosInstance.post('/razorpay/order',{totalAmount});
    // console.log(response.data)
    return response.data     
}


export const verifyRazorpayPayment = async (data: {
    orderId: string;
    paymentId: string;
    signature: string;
    address: string;
    productId: string
  }) => {
    const { orderId, paymentId, signature, address,productId } = data;
    console.log( "orderId:",orderId, "paymentId:",paymentId, "signature:",signature, "address:",address,"productId:",productId )
    const response = await axiosInstance.post('/razorpay/payment', {
      orderId,
      paymentId,
      signature,
      address,
      productId
    });
    return response.data;
  };