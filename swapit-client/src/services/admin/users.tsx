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