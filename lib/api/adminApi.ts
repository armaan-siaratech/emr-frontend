import { apiClient } from "./client";

export interface AdminItem {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  designation: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminListResponse {
  total: number;
  page: number;
  page_size: number;
  items: AdminItem[];
}

export interface AdminCreateParams {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  designation?: string;
  password: string;
  is_active?: boolean;
}


export interface AdminUpdateParams {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string | null;
  designation?: string;
  password?: string;
  is_active?: boolean;
}

export async function getAdminsApi(params?: {
  search?: string;
  is_active?: boolean;
  page?: number;
  page_size?: number;
}): Promise<AdminListResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.is_active !== undefined) query.append("is_active", String(params.is_active));
  if (params?.page) query.append("page", String(params.page));
  if (params?.page_size) query.append("page_size", String(params.page_size));

  const queryString = query.toString();
  const url = `/api/account/administrators${queryString ? `?${queryString}` : ""}`;
  return apiClient<AdminListResponse>(url, { method: "GET" });
}

export async function getAdminByIdApi(id: string): Promise<AdminItem> {
  return apiClient<AdminItem>(`/api/account/administrators/${id}`, {
    method: "GET",
  });
}

export async function createAdminApi(data: AdminCreateParams): Promise<AdminItem> {
  return apiClient<AdminItem>("/api/account/administrators", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminApi(id: string, data: AdminUpdateParams): Promise<AdminItem> {
  return apiClient<AdminItem>(`/api/account/administrators/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/account/administrators/${id}`, {
    method: "DELETE",
  });
}

export async function restoreAdminApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/account/administrators/${id}/restore`, {
    method: "POST",
  });
}
