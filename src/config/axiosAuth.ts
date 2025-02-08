import { updateAccessToken } from "@/redux/slice/AuthSlice";
import { store } from "@/redux/store/store";
import { TAuthApiResponseData } from "@/types/Auth";
import { AuthApiResponseSchema } from "@/validation/Auth";
import axios, { AxiosError, AxiosResponse } from "axios";
const authApi = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
authApi.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
authApi.interceptors.response.use(
  (response: AxiosResponse<TAuthApiResponseData>) => {
    AuthApiResponseSchema.parse(response.data);
    const { accessToken } = response.data;
    if (accessToken) {
      store.dispatch(updateAccessToken(accessToken));
    }
    return response;
  },
  (error: AxiosError) => {
    console.error("authApi::response interceptor", error);
    return Promise.reject(error);
  }
);
export default authApi;
