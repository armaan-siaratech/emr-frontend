import { apiClient } from "./client";

export interface PatientItem {
  id: string;
  mrn: string;
  tenant_id: string;
  facility_id?: string | null;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  marital_status?: string | null;
  preferred_language?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_relationship?: string | null;
  emergency_contact_phone?: string | null;
  insurance_provider?: string | null;
  insurance_policy_number?: string | null;
  insurance_member_id?: string | null;
  insurance_group_number?: string | null;
  insurance_policy_holder?: string | null;
  insurance_relationship?: string | null;
  image_url?: string | null;
  notes?: string | null;
  status: string;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PatientListResponse {
  items: PatientItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface PatientCreateParams {
  mrn?: string;
  facility_id?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  marital_status?: string;
  preferred_language?: string;
  emergency_contact_name?: string;
  emergency_contact_relationship?: string;
  emergency_contact_phone?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  insurance_member_id?: string;
  insurance_group_number?: string;
  insurance_policy_holder?: string;
  insurance_relationship?: string;
  image_url?: string;
  notes?: string;
  status?: string;
}

export interface PatientUpdateParams {
  facility_id?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  phone?: string;
  email?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  marital_status?: string;
  preferred_language?: string;
  emergency_contact_name?: string;
  emergency_contact_relationship?: string;
  emergency_contact_phone?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  insurance_member_id?: string;
  insurance_group_number?: string;
  insurance_policy_holder?: string;
  insurance_relationship?: string;
  image_url?: string;
  notes?: string;
  status?: string;
}

export async function getPatientsApi(params?: {
  search?: string;
  facility_id?: string;
  status?: string;
  gender?: string;
  include_deleted?: boolean;
  page?: number;
  page_size?: number;
}): Promise<PatientListResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.facility_id) query.append("facility_id", params.facility_id);
  if (params?.status && params.status !== "All Status") query.append("status", params.status);
  if (params?.gender && params.gender !== "All Gender") query.append("gender", params.gender);
  if (params?.include_deleted || params?.status === "Soft-Deleted") query.append("include_deleted", "true");
  if (params?.page) query.append("page", String(params.page));
  if (params?.page_size) query.append("page_size", String(params.page_size));

  const queryString = query.toString();
  const url = `/api/patients${queryString ? `?${queryString}` : ""}`;
  return apiClient<PatientListResponse>(url, { method: "GET" });
}

export async function getPatientByIdApi(id: string): Promise<PatientItem> {
  return apiClient<PatientItem>(`/api/patients/${id}`, { method: "GET" });
}

export async function createPatientApi(data: PatientCreateParams): Promise<PatientItem> {
  return apiClient<PatientItem>("/api/patients", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function uploadPatientImageApi(patientId: string, file: File): Promise<PatientItem> {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient<PatientItem>(`/api/patients/${patientId}/upload-image`, {
    method: "POST",
    body: formData,
  });
}

export async function updatePatientApi(id: string, data: PatientUpdateParams): Promise<PatientItem> {
  return apiClient<PatientItem>(`/api/patients/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deletePatientApi(id: string): Promise<{ message: string; id: string }> {
  return apiClient<{ message: string; id: string }>(`/api/patients/${id}`, {
    method: "DELETE",
  });
}

export async function restorePatientApi(id: string): Promise<PatientItem> {
  return apiClient<PatientItem>(`/api/patients/${id}/restore`, {
    method: "POST",
  });
}
