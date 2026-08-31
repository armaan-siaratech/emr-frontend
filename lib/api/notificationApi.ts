import { apiClient } from "./client";

export interface NotificationItem {
  id: string;
  user_id: string | null;
  role_target: string;
  title: string;
  message: string;
  type: string; // support | admin | tenant | security | system
  reference: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationListResponse {
  total: number;
  unread_count: number;
  page: number;
  page_size: number;
  items: NotificationItem[];
}

export interface UnreadCountResponse {
  unread_count: number;
}

export async function getNotificationsApi(params?: {
  type?: string;
  is_read?: boolean;
  page?: number;
  page_size?: number;
}): Promise<NotificationListResponse> {
  const query = new URLSearchParams();
  if (params?.type) query.append("type", params.type);
  if (params?.is_read !== undefined) query.append("is_read", String(params.is_read));
  if (params?.page) query.append("page", String(params.page));
  if (params?.page_size) query.append("page_size", String(params.page_size));

  const queryString = query.toString();
  const url = `/api/notifications${queryString ? `?${queryString}` : ""}`;
  return apiClient<NotificationListResponse>(url, { method: "GET" });
}

export async function getUnreadCountApi(): Promise<UnreadCountResponse> {
  return apiClient<UnreadCountResponse>("/api/notifications/unread-count", {
    method: "GET",
  });
}

export async function markNotificationReadApi(id: string): Promise<{ message: string; unread_count: number }> {
  return apiClient<{ message: string; unread_count: number }>(`/api/notifications/${id}/read`, {
    method: "PUT",
  });
}

export async function markAllNotificationsReadApi(): Promise<{ message: string; unread_count: number }> {
  return apiClient<{ message: string; unread_count: number }>("/api/notifications/read-all", {
    method: "PUT",
  });
}

export async function deleteNotificationApi(id: string): Promise<{ message: string; unread_count: number }> {
  return apiClient<{ message: string; unread_count: number }>(`/api/notifications/${notification_id_or_id(id)}`, {
    method: "DELETE",
  });
}

function notification_id_or_id(id: string) {
  return id;
}
