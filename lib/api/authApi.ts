import { apiClient } from "./client";
import { AuthResponse, LoginCredentials, User } from "@/types/auth";

export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/api/account/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function loginByPinApi(pin: string, email?: string): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/api/account/login-pin", {
    method: "POST",
    body: JSON.stringify({ pin, email }),
  });
}

export async function setUserPinApi(pin: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>("/api/account/set-pin", {
    method: "POST",
    body: JSON.stringify({ pin }),
  });
}

export async function togglePinSecurityApi(enabled: boolean): Promise<{ message: string; is_pin_enabled: boolean }> {
  return apiClient<{ message: string; is_pin_enabled: boolean }>("/api/account/toggle-pin", {
    method: "POST",
    body: JSON.stringify({ enabled }),
  });
}

export async function toggleGlobalPinSecurityApi(enabled: boolean): Promise<{ message: string; global_pin_enabled: boolean }> {
  return apiClient<{ message: string; global_pin_enabled: boolean }>("/api/account/global-toggle-pin", {
    method: "POST",
    body: JSON.stringify({ enabled }),
  });
}

export async function getSecurityPolicyApi(): Promise<{ global_pin_enabled: boolean; is_user_pin_enabled: boolean; user_has_pin: boolean }> {
  return apiClient<{ global_pin_enabled: boolean; is_user_pin_enabled: boolean; user_has_pin: boolean }>("/api/account/security-policy", {
    method: "GET",
  });
}

export async function refreshTokenApi(): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/api/account/refresh", {
    method: "POST",
  });
}

export async function getCurrentUserApi(): Promise<{ user: User }> {
  return apiClient<{ user: User }>("/api/account/me", {
    method: "GET",
  });
}

export async function logoutApi(): Promise<{ message: string }> {
  return apiClient<{ message: string }>("/api/account/logout", {
    method: "POST",
  });
}

export async function setup2FAApi(): Promise<{ totp_secret: string; otpauth_url: string }> {
  return apiClient<{ totp_secret: string; otpauth_url: string }>("/api/account/2fa/setup", {
    method: "POST",
  });
}

export async function enable2FAApi(secret: string, code: string): Promise<{ message: string; recovery_codes: string[] }> {
  return apiClient<{ message: string; recovery_codes: string[] }>("/api/account/2fa/enable", {
    method: "POST",
    body: JSON.stringify({ secret, code }),
  });
}

export async function disable2FAApi(codeOrPassword: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>("/api/account/2fa/disable", {
    method: "POST",
    body: JSON.stringify({ code_or_password: codeOrPassword }),
  });
}

export async function regenerateRecoveryCodesApi(code: string): Promise<{ message: string; recovery_codes: string[] }> {
  return apiClient<{ message: string; recovery_codes: string[] }>("/api/account/2fa/regenerate-recovery-codes", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export async function verify2FALoginApi(
  code: string,
  mfa_token?: string,
  email?: string,
  password?: string
): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/api/account/2fa/verify-login", {
    method: "POST",
    body: JSON.stringify({ mfa_token, email, password, code }),
  });
}

export interface AuditLogItem {
  id: string;
  user_id: string | null;
  user_email: string;
  user_role: string;
  action: string;
  ip_address: string;
  user_agent: string | null;
  details: string | null;
  created_at: string;
}

export async function getAuditLogsApi(limit = 50, offset = 0, action?: string): Promise<{ total: number; logs: AuditLogItem[] }> {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  if (action) params.append("action", action);
  return apiClient<{ total: number; logs: AuditLogItem[] }>(`/api/account/audit-logs?${params.toString()}`);
}

export type { TenantItem, TenantCreateData, TenantUpdateData } from "./tenantApi";
export {
  getTenantsApi,
  getTenantBySlugApi,
  getTenantByIdApi,
  createTenantApi,
  updateTenantApi,
  deleteTenantApi,
} from "./tenantApi";

