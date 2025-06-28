import axiosInstance from "@/utils/axiosInstence";

export const fetchUsers = async ({
    page = 1,
    limit = 10,
    search = "",
    isBlock = false

  } = {}) => {
    const response = await axiosInstance.get("/users",{
        params: {page, limit, search, isBlock},
    });
    return response.data
}


export const blockUser = async (userId:string) => {
  const response = await axiosInstance.patch(`/users/block/${userId}`);
  return response.data
}

export const fetchSpecificUser = async (userId:string) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data
}
