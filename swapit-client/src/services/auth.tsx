import axiosInstance from "@/utils/axiosInstence"

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post("/register-user", data);
  return response.data;
};

export const googleAuth = async (googleData:{ name: string; email: string; googleId: string }) => {
  console.log("googleData",googleData)
  const response = await axiosInstance.post("/google-auth", googleData);
  return response.data;
};


export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/login", data,{
  });
  return response.data;
};

export const logoutUser = async () => {
  console.log("hy")
  const response = await axiosInstance.post("/logout");
  console.log(response.data)
};

