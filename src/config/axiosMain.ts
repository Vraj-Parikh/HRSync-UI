import { updateAccessToken } from "@/redux/slice/AuthSlice";
import { store } from "@/redux/store/store";
import axios from "axios";
const mainApi = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
mainApi.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let refreshPromise: Promise<string> | null = null;
const refreshAccessToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .get<{ accessToken: string }>("/api/auth/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        const newAccessToken = res.data.accessToken;
        return newAccessToken;
      })
      .catch((error) => {
        console.log("Refresh token failed", error);
        throw error;
      })
      .finally(() => {
        refreshPromise = null; // Reset the refresh promise
      });
  }
  return refreshPromise;
};
mainApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error);
    const originalRequest = error.config;
    // If the response is 401 and not a refresh request, try refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried to prevent loops

      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          store.dispatch(updateAccessToken(""));
        } else {
          store.dispatch(updateAccessToken(newAccessToken));
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return mainApi(originalRequest); // Retry original request with new token
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default mainApi;
