import axiosInstance from "@/utils/axiosInstence"

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  // console.log("data is got from register form",data)
  const response = await axiosInstance.post("/register-user", data);
  // console.log("data is got from server",response.data)
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  console.log("data is got from login form",data)
  const response = await axiosInstance.post("/login", data,{
    withCredentials: true,
  });
  console.log("Login Response:", response.data);
  return response.data;
};

