import { apiClient } from "./client";

export interface BedRecord {
  id: string;
  room_id: string;
  code: string;
  type: string;
  status: "Available" | "Occupied" | "Maintenance" | "Cleaning";
  patient_info?: string;
  is_deleted?: boolean;
}

export interface RoomRecord {
  id: string;
  department_id: string;
  number: string;
  name: string;
  type: string;
  is_deleted?: boolean;
  beds: BedRecord[];
}

export interface DeptRecord {
  id: string;
  floor_id: string;
  name: string;
  code: string;
  head?: string;
  is_deleted?: boolean;
  rooms: RoomRecord[];
}

export interface FloorRecord {
  id: string;
  block_id: string;
  name: string;
  number: number;
  code: string;
  is_deleted?: boolean;
  departments: DeptRecord[];
}

export interface BlockRecord {
  id: string;
  facility_id: string;
  name: string;
  code: string;
  is_deleted?: boolean;
  floors: FloorRecord[];
}

/**
 * Fetch full campus infrastructure hierarchy for a facility from backend database.
 */
export async function getFacilityHierarchyApi(facilityId: string, includeDeleted: boolean = false): Promise<BlockRecord[]> {
  return apiClient<BlockRecord[]>(`/api/organization/hierarchy/facility/${facilityId}${includeDeleted ? '?include_deleted=true' : ''}`);
}

// --- BLOCKS ---
export async function createBlockApi(data: { facility_id: string; name: string; code: string }): Promise<BlockRecord> {
  return apiClient<BlockRecord>("/api/organization/hierarchy/blocks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlockApi(id: string, data: { name?: string; code?: string }): Promise<BlockRecord> {
  return apiClient<BlockRecord>(`/api/organization/hierarchy/blocks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBlockApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/blocks/${id}`, {
    method: "DELETE",
  });
}

export async function restoreBlockApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/blocks/${id}/restore`, {
    method: "POST",
  });
}

// --- FLOORS ---
export async function createFloorApi(data: { block_id: string; name: string; number: number; code: string }): Promise<FloorRecord> {
  return apiClient<FloorRecord>("/api/organization/hierarchy/floors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateFloorApi(id: string, data: { name?: string; number?: number; code?: string }): Promise<FloorRecord> {
  return apiClient<FloorRecord>(`/api/organization/hierarchy/floors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteFloorApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/floors/${id}`, {
    method: "DELETE",
  });
}

export async function restoreFloorApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/floors/${id}/restore`, {
    method: "POST",
  });
}

// --- DEPARTMENTS ---
export async function createDeptApi(data: { floor_id: string; name: string; code: string; head?: string }): Promise<DeptRecord> {
  return apiClient<DeptRecord>("/api/organization/hierarchy/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateDeptApi(id: string, data: { name?: string; code?: string; head?: string }): Promise<DeptRecord> {
  return apiClient<DeptRecord>(`/api/organization/hierarchy/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteDeptApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/departments/${id}`, {
    method: "DELETE",
  });
}

export async function restoreDeptApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/departments/${id}/restore`, {
    method: "POST",
  });
}

// --- ROOMS ---
export async function createRoomApi(data: { department_id: string; number: string; name: string; type: string }): Promise<RoomRecord> {
  return apiClient<RoomRecord>("/api/organization/hierarchy/rooms", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateRoomApi(id: string, data: { number?: string; name?: string; type?: string }): Promise<RoomRecord> {
  return apiClient<RoomRecord>(`/api/organization/hierarchy/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteRoomApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/rooms/${id}`, {
    method: "DELETE",
  });
}

export async function restoreRoomApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/rooms/${id}/restore`, {
    method: "POST",
  });
}

// --- BEDS ---
export async function createBedApi(data: { room_id: string; code: string; type: string; status: string; patient_info?: string }): Promise<BedRecord> {
  return apiClient<BedRecord>("/api/organization/hierarchy/beds", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBedApi(id: string, data: { code?: string; type?: string; status?: string; patient_info?: string }): Promise<BedRecord> {
  return apiClient<BedRecord>(`/api/organization/hierarchy/beds/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBedApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/beds/${id}`, {
    method: "DELETE",
  });
}

export async function restoreBedApi(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/api/organization/hierarchy/beds/${id}/restore`, {
    method: "POST",
  });
}
