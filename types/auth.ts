export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "NURSE" | "PATIENT" | string;

export interface UserProfile {
  first_name?: string;
  last_name?: string;
  phone?: string;
  designation?: string;
}

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  is_totp_enabled?: boolean;
  tenant_id?: string | null;
  roles: UserRole[];
  first_name?: string;
  last_name?: string;
  designation?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  mfa_required?: boolean;
  mfa_token?: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}
