"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { User, LoginCredentials, AuthResponse } from "@/types/auth";
import { loginApi, loginByPinApi, logoutApi, getCurrentUserApi, verify2FALoginApi } from "@/lib/api/authApi";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  loginByPin: (pin: string, email?: string) => Promise<AuthResponse>;
  verify2FALogin: (code: string, mfaToken?: string, email?: string, password?: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkUserRoles = useCallback((userData: User | null): boolean => {
    if (!userData || !userData.roles) return false;
    return userData.roles.some((role) =>
      ["SUPER_ADMIN", "superadmin", "SuperAdmin"].includes(role)
    );
  }, []);

  const checkIsAdminRole = useCallback((userData: User | null): boolean => {
    if (!userData) return false;
    const roles: string[] = userData.roles || [];
    const isSuper = roles.some((r) => ["SUPER_ADMIN", "superadmin", "SuperAdmin"].includes(r));
    const hasExplicitAdminRole = roles.some((r) => ["ADMIN", "admin", "TENANT_ADMIN", "tenant_admin", "TenantAdmin", "facility_admin", "FacilityAdmin"].includes(r));
    const isDoctor = roles.some((r) => ["DOCTOR", "doctor", "NURSE", "nurse", "CLINICIAN", "clinician", "Doctor", "Nurse"].includes(r));
    const isPatient = roles.some((r) => ["PATIENT", "patient", "Patient"].includes(r));
    const isTenantUser = !!userData.tenant_id;
    return hasExplicitAdminRole || (isTenantUser && !isSuper && !isDoctor && !isPatient);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getCurrentUserApi();
      if (res && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch (_) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginApi(credentials);
      if (res.mfa_required) {
        setIsLoading(false);
        return res;
      }
      if (res && res.user) {
        setUser(res.user);
        setIsLoading(false);
        return res;
      }
      throw new Error("Invalid response format from server");
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.message || "Failed to log in. Please check your credentials.";
      setError(message);
      throw err;
    }
  }, []);

  const loginByPin = useCallback(async (pin: string, email?: string): Promise<AuthResponse> => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginByPinApi(pin, email);
      if (res.mfa_required) {
        setIsLoading(false);
        return res;
      }
      if (res && res.user) {
        setUser(res.user);
        setIsLoading(false);
        return res;
      }
      throw new Error("Invalid PIN response format from server");
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.message || "Invalid 4-digit Device PIN.";
      setError(message);
      throw err;
    }
  }, []);

  const verify2FALogin = useCallback(
    async (code: string, mfaToken?: string, email?: string, password?: string): Promise<User> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await verify2FALoginApi(code, mfaToken, email, password);
        if (res && res.user) {
          setUser(res.user);
          setIsLoading(false);
          return res.user;
        }
        throw new Error("Invalid 2FA verification response");
      } catch (err: any) {
        setIsLoading(false);
        const message = err?.message || "Invalid 2FA Authenticator code or Recovery code.";
        setError(message);
        throw err;
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logoutApi();
    } catch (_) {
      // Ignore network error on logout
    } finally {
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const isAuthenticated = !!user;
  const isSuperAdmin = useMemo(() => checkUserRoles(user), [user, checkUserRoles]);
  const isAdmin = useMemo(() => checkIsAdminRole(user), [user, checkIsAdminRole]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isSuperAdmin,
      isAdmin,
      isLoading,
      error,
      login,
      loginByPin,
      verify2FALogin,
      logout,
      refreshUser,
      clearError,
    }),
    [user, isAuthenticated, isSuperAdmin, isAdmin, isLoading, error, login, loginByPin, verify2FALogin, logout, refreshUser, clearError]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
