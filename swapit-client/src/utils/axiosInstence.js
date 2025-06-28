import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refreshToken from Cookies
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found, logging out...");
        }

        // Send Refresh Token in the request body
        const { data } = await axios.post(`${API_BASE_URL}/refresh-token`, { refreshToken }, { withCredentials: true });

        // Store new access token in Cookies
        Cookies.set("accessToken", data.accessToken, { secure: true, sameSite: "Strict" });

        // Update axios headers with new token
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Refresh token failed, logging out...",err);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;