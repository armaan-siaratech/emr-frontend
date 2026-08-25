import { apiClient } from "./client";

export interface TenantItem {
  id: string;
  name: string;
  slug: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  timezone: string;
  status: "active" | "inactive" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface TenantCreateData {
  name: string;
  slug: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  timezone?: string;
  status?: "active" | "inactive" | "suspended";
  admin_email?: string;
  admin_password?: string;
}


export interface TenantUpdateData {
  name?: string;
  slug?: string;
  code?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  timezone?: string;
  status?: "active" | "inactive" | "suspended";
}

/**
 * Fetch all registered tenant organizations.
 */
export async function getTenantsApi(): Promise<TenantItem[]> {
  try {
    return await apiClient<TenantItem[]>("/api/organization/tenants");
  } catch (_) {
    // Fallback to accounts route if needed
    return await apiClient<TenantItem[]>("/api/account/tenants");
  }
}

/**
 * Lookup tenant details by URL domain slug (e.g. tenant-slug.ethizo.com or local ?tenant=slug).
 */
export async function getTenantBySlugApi(slug: string): Promise<TenantItem> {
  return apiClient<TenantItem>(`/api/organization/tenants/slug/${encodeURIComponent(slug)}`);
}

/**
 * Fetch tenant organization details by ID.
 */
export async function getTenantByIdApi(id: string): Promise<TenantItem> {
  try {
    return await apiClient<TenantItem>(`/api/organization/tenants/${id}`);
  } catch (_) {
    return await apiClient<TenantItem>(`/api/account/tenants/${id}`);
  }
}

/**
 * Provision / register a new tenant organization.
 */
export async function createTenantApi(data: TenantCreateData): Promise<TenantItem> {
  try {
    return await apiClient<TenantItem>("/api/organization/tenants", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    // Fallback to accounts route if needed
    return await apiClient<TenantItem>("/api/account/tenants", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

/**
 * Update an existing tenant organization.
 */
export async function updateTenantApi(id: string, data: TenantUpdateData): Promise<TenantItem> {
  return apiClient<TenantItem>(`/api/organization/tenants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Suspend/delete a tenant organization.
 */
export async function deleteTenantApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/tenants/${id}`, {
    method: "DELETE",
  });
}
