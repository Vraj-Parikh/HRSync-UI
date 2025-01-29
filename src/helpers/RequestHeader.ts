import { AxiosRequestConfig } from "axios";
export function generateRequestHeader(token: string) {
  const AuthStr = `Bearer ${token}`;
  const headers: AxiosRequestConfig["headers"] = {};
  headers.Authorization = AuthStr;
  return headers;
}
