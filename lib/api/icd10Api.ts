import { apiClient } from "./client";

export interface ICD10Item {
  id: string;
  code: string;
  description: string;
  parent_code: string | null;
  chapter: string | null;
  category: string | null;
  version: string;
  is_active: boolean;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICD10ListResponse {
  total: number;
  page: number;
  page_size: number;
  items: ICD10Item[];
}

export interface ICD10CreateParams {
  code: string;
  description: string;
  parent_code?: string | null;
  chapter?: string | null;
  category?: string | null;
  version?: string;
  is_active?: boolean;
}

export interface ICD10UpdateParams {
  code?: string;
  description?: string;
  parent_code?: string | null;
  chapter?: string | null;
  category?: string | null;
  version?: string;
  is_active?: boolean;
}

export interface UploadICD10Response {
  filename: string;
  message: string;
  created_count: number;
  skipped_count: number;
  total_rows: number;
}

export async function getICD10CodesApi(params?: {
  search?: string;
  chapter?: string;
  category?: string;
  version?: string;
  is_active?: boolean;
  include_deleted?: boolean;
  page?: number;
  page_size?: number;
}): Promise<ICD10ListResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.chapter && params.chapter !== "All") query.append("chapter", params.chapter);
  if (params?.category && params.category !== "All") query.append("category", params.category);
  if (params?.version && params.version !== "All") query.append("version", params.version);
  if (params?.is_active !== undefined) query.append("is_active", String(params.is_active));
  if (params?.include_deleted !== undefined) query.append("include_deleted", String(params.include_deleted));
  if (params?.page) query.append("page", String(params.page));
  if (params?.page_size) query.append("page_size", String(params.page_size));

  const queryString = query.toString();
  const url = `/api/clinical/icd10${queryString ? `?${queryString}` : ""}`;
  return apiClient<ICD10ListResponse>(url, { method: "GET" });
}

export async function getICD10ByCodeApi(code: string): Promise<ICD10Item> {
  return apiClient<ICD10Item>(`/api/clinical/icd10/code/${encodeURIComponent(code)}`, {
    method: "GET",
  });
}

export async function createICD10CodeApi(data: ICD10CreateParams): Promise<ICD10Item> {
  return apiClient<ICD10Item>("/api/clinical/icd10", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateICD10CodeApi(id: string, data: ICD10UpdateParams): Promise<ICD10Item> {
  return apiClient<ICD10Item>(`/api/clinical/icd10/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteICD10CodeApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/clinical/icd10/${id}`, {
    method: "DELETE",
  });
}

export async function restoreICD10CodeApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/clinical/icd10/${id}/restore`, {
    method: "POST",
  });
}

export async function uploadICD10ExcelApi(file: File): Promise<UploadICD10Response> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8000/api/clinical/icd10/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    let errDetail = `Upload Failed (${res.status})`;
    try {
      const errData = await res.json();
      if (errData.detail) errDetail = errData.detail;
    } catch (_) {}
    throw new Error(errDetail);
  }

  return res.json();
}
