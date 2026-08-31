import { apiClient } from "./client";

export interface TicketItem {
  id: string;
  ticket_number: string;
  tenant_id: string | null;
  tenant_name: string | null;
  user_id: string;
  raised_by: string;
  user_email: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketListResponse {
  total: number;
  page: number;
  page_size: number;
  items: TicketItem[];
}

export interface TicketCreateParams {
  subject: string;
  description: string;
  category?: string;
  priority?: string;
}

export interface TicketUpdateParams {
  subject?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  resolution_notes?: string | null;
}

export async function getTicketsApi(params?: {
  tenant_id?: string;
  search?: string;
  status?: string;
  priority?: string;
  category?: string;
  page?: number;
  page_size?: number;
}): Promise<TicketListResponse> {
  const query = new URLSearchParams();
  if (params?.tenant_id) query.append("tenant_id", params.tenant_id);
  if (params?.search) query.append("search", params.search);
  if (params?.status) query.append("status", params.status);
  if (params?.priority) query.append("priority", params.priority);
  if (params?.category) query.append("category", params.category);
  if (params?.page) query.append("page", String(params.page));
  if (params?.page_size) query.append("page_size", String(params.page_size));

  const queryString = query.toString();
  const url = `/api/support/tickets${queryString ? `?${queryString}` : ""}`;
  return apiClient<TicketListResponse>(url, { method: "GET" });
}

export async function getTicketByIdApi(id: string): Promise<TicketItem> {
  return apiClient<TicketItem>(`/api/support/tickets/${id}`, {
    method: "GET",
  });
}

export async function createTicketApi(data: TicketCreateParams): Promise<TicketItem> {
  return apiClient<TicketItem>("/api/support/tickets", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTicketApi(id: string, data: TicketUpdateParams): Promise<TicketItem> {
  return apiClient<TicketItem>(`/api/support/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function getTicketWebSocketUrl(): string {
  if (typeof window === "undefined") return "ws://localhost:8000/api/support/ws/notifications";
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.hostname;
  return `${protocol}//${host}:8000/api/support/ws/notifications`;
}
