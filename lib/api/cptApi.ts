import { apiClient } from "./client";

export interface CPTItem {
  id: string;
  code: string;
  description: string;
  category: string | null;
  subcategory: string | null;
  fee: string | null;
  version: string;
  is_active: boolean;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CPTListResponse {
  total: number;
  page: number;
  page_size: number;
  items: CPTItem[];
}

export interface CPTCreateParams {
  code: string;
  description: string;
  category?: string | null;
  subcategory?: string | null;
  fee?: string | null;
  version?: string;
  is_active?: boolean;
}

export interface CPTUpdateParams {
  code?: string;
  description?: string;
  category?: string | null;
  subcategory?: string | null;
  fee?: string | null;
  version?: string;
  is_active?: boolean;
}

export interface UploadCPTResponse {
  filename: string;
  message: string;
  created_count: number;
  updated_count?: number;
  skipped_count: number;
  total_rows: number;
}

export async function getCPTCodesApi(params?: {
  search?: string;
  category?: string;
  subcategory?: string;
  version?: string;
  is_active?: boolean;
  include_deleted?: boolean;
  page?: number;
  page_size?: number;
}): Promise<CPTListResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.category && params.category !== "All") query.append("category", params.category);
  if (params?.subcategory && params.subcategory !== "All") query.append("subcategory", params.subcategory);
  if (params?.version && params.version !== "All") query.append("version", params.version);
  if (params?.is_active !== undefined) query.append("is_active", String(params.is_active));
  if (params?.include_deleted !== undefined) query.append("include_deleted", String(params.include_deleted));
  if (params?.page) query.append("page", String(params.page));
  if (params?.page_size) query.append("page_size", String(params.page_size));

  const queryString = query.toString();
  const url = `/api/clinical/cpt${queryString ? `?${queryString}` : ""}`;
  return apiClient<CPTListResponse>(url, { method: "GET" });
}

export async function getCPTByCodeApi(code: string): Promise<CPTItem> {
  return apiClient<CPTItem>(`/api/clinical/cpt/code/${encodeURIComponent(code)}`, {
    method: "GET",
  });
}

export async function createCPTCodeApi(data: CPTCreateParams): Promise<CPTItem> {
  return apiClient<CPTItem>("/api/clinical/cpt", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCPTCodeApi(id: string, data: CPTUpdateParams): Promise<CPTItem> {
  return apiClient<CPTItem>(`/api/clinical/cpt/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCPTCodeApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/clinical/cpt/${id}`, {
    method: "DELETE",
  });
}

export async function restoreCPTCodeApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/clinical/cpt/${id}/restore`, {
    method: "POST",
  });
}

export async function uploadCPTExcelApi(file: File): Promise<UploadCPTResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient<UploadCPTResponse>("/api/clinical/cpt/upload", {
    method: "POST",
    body: formData,
  });
}
