// import { store } from "@/stateManagement/store/store";.
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});
// api.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
export default api;
