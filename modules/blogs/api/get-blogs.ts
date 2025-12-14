import { apiHandler } from "@/api/apiHandler";
import type { BlogsApiResponse } from "../types";

export async function getBlogs(): Promise<BlogsApiResponse> {
  return apiHandler<BlogsApiResponse>("get", "/api/website/admin/v1/blogs/");
}