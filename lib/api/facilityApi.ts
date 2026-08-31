import { apiClient } from "./client";

export interface FacilityTypeItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface FacilityRecordItem {
  id: string;
  tenant_id: string;
  facility_type_id: string;
  name: string;
  code: string;
  description?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  email?: string;
  timezone?: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
}

export interface FacilityCreateData {
  name: string;
  code: string;
  description?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  email?: string;
  timezone?: string;
  facility_type_id?: string;
  status?: "ACTIVE" | "INACTIVE";
}

/**
 * Fetch all active facility types dynamically from the database 'facility_types' table.
 */
export async function getFacilityTypesApi(): Promise<FacilityTypeItem[]> {
  return apiClient<FacilityTypeItem[]>("/api/organization/facilities/types");
}

/**
 * Fetch all facility records belonging to the current tenant from the 'facilities' table.
 */
export async function getFacilitiesApi(): Promise<FacilityRecordItem[]> {
  return apiClient<FacilityRecordItem[]>("/api/organization/facilities");
}

/**
 * Create a new facility record in the 'facilities' table (linked to tenant_id).
 */
export async function createFacilityApi(data: FacilityCreateData): Promise<FacilityRecordItem> {
  return apiClient<FacilityRecordItem>("/api/organization/facilities", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Update an existing facility record in the 'facilities' table.
 */
export async function updateFacilityApi(id: string, data: Partial<FacilityCreateData>): Promise<FacilityRecordItem> {
  return apiClient<FacilityRecordItem>(`/api/organization/facilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Soft-delete / deactivate a facility from the 'facilities' table.
 */
export async function deleteFacilityApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/facilities/${id}`, {
    method: "DELETE",
  });
}

/**
 * Restore / reactivate a soft-deleted facility in the 'facilities' table.
 */
export async function restoreFacilityApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/facilities/${id}/restore`, {
    method: "POST",
  });
}
