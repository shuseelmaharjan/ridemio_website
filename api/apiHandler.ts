import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

/** Standard API Error Shape */
export type ApiError = {
    message: string;
    status?: number;
    data?: unknown;
};

export async function apiHandler<
    TResponse,
    TRequest = unknown
>(
    method: HttpMethod,
    route: string,
    data?: TRequest,
    config?: AxiosRequestConfig
): Promise<TResponse> {
    try {
        const response = await axiosInstance.request<TResponse>({
            url: route,
            method,
            data,
            ...config,
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;

        const apiError: ApiError = {
            message:
                (err.response?.data as any)?.message ||
                err.message ||
                "Unknown API Error",
            status: err.response?.status,
            data: err.response?.data,
        };

        throw apiError;
    }
}
