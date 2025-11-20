// ...existing code...
import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_APP_SERVER_URL || "";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type Method = "get" | "post" | "put" | "patch" | "delete";

export async function apiHandler<T = any>(
  method: Method,
  route: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.request<T>({
      url: route,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (err: any) {
    // Normalize error for callers
    const message = err?.response?.data || err?.message || "Unknown error";
    throw message;
  }
}

