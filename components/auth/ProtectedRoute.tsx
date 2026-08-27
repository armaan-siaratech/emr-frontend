"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, ShieldAlert, HeartPulse, Lock, ArrowRight } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | string;
}

export default function ProtectedRoute({
  children,
  requiredRole = "SUPER_ADMIN",
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isSuperAdmin, isTenantSuspended, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isSuspended = !isSuperAdmin && (isTenantSuspended || user?.tenant_status === "suspended" || user?.tenant_status === "inactive");

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (isSuspended && pathname !== "/suspended") {
        router.replace("/suspended");
      }
    }
  }, [isLoading, isAuthenticated, isSuperAdmin, isSuspended, requiredRole, router, pathname]);

  if (!isLoading && isAuthenticated && isSuspended && pathname !== "/suspended") {
    return null;
  }

  // Loading State: Enterprise EMR Biometric Loader
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b1317] text-white p-6 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0f766e]/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#0284c7]/20 rounded-full blur-[90px]" />

        <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
          {/* Animated Shield Logo */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0f766e] p-0.5 shadow-[0_0_50px_rgba(20,184,166,0.4)] animate-bounce">
              <div className="w-full h-full bg-[#0b1317] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-[#2dd4bf]" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0f766e] border-2 border-[#0b1317] flex items-center justify-center">
              <HeartPulse className="w-3.5 h-3.5 text-white animate-pulse" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white tracking-wide">
            MediCare EMR Security Check
          </h3>
          <p className="text-xs text-emerald-400/80 mt-1 font-mono">
            Verifying SuperAdmin Credentials & Access Token...
          </p>

          {/* Loading Bar */}
          <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse w-full" />
          </div>

          <p className="text-[10px] text-slate-500 mt-8 tracking-wider uppercase">
            HIPAA Compliant Standard 2026 • Encrypted TLS 1.3
          </p>
        </div>
      </div>
    );
  }

  // Not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b1317] text-white p-6">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-sm text-slate-400 mb-6">
            You must be logged in to access the SuperAdmin Control Center.
          </p>
          <button
            onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] hover:from-[#115e59] hover:to-[#0f766e] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-900/40"
          >
            Go to Clinical Login <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Authenticated but wrong role
  if (requiredRole === "SUPER_ADMIN" && !isSuperAdmin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b1317] text-white p-6">
        <div className="max-w-md w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied: Restricted Role</h2>
          <p className="text-sm text-slate-400 mb-4">
            Your current account <span className="text-amber-300 font-semibold">{user?.email}</span> does not have Super Admin platform permissions.
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-6 text-left text-xs font-mono text-slate-400">
            <p><span className="text-slate-500">User ID:</span> {user?.id}</p>
            <p><span className="text-slate-500">Roles:</span> {user?.roles?.join(", ") || "None"}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push("/login")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-medium text-sm transition-all"
            >
              Sign In as SuperAdmin
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all"
            >
              Return to Clinical Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
