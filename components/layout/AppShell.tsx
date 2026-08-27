"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { SidebarProvider } from "./SidebarContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainContent from "./MainContent";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isSuperAdmin, isTenantSuspended, user, isLoading, refreshUser } = useAuth();

  const isSuspendedRoute = pathname.startsWith("/suspended");

  const isSuspended = !isSuperAdmin && (
    isTenantSuspended || 
    user?.tenant_status === "suspended" || 
    user?.tenant_status === "inactive"
  );

  // Public/Standalone routes that never show clinical sidebar layout
  const isStandalone =
    pathname === "/login" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/register-tenant") ||
    isSuspendedRoute;

  // Poll tenant status every 10 seconds for active logged-in tenant users
  useEffect(() => {
    if (isAuthenticated && !isSuperAdmin && !isSuspended) {
      const interval = setInterval(() => {
        refreshUser().catch(() => {});
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isSuperAdmin, isSuspended, refreshUser]);

  // Mandatory redirect for suspended tenant users to /suspended
  useEffect(() => {
    if (!isLoading && isSuspended && !isSuspendedRoute) {
      router.replace("/suspended");
    }
  }, [isLoading, isSuspended, isSuspendedRoute, router]);

  // Client-Side Auth Guard: Mandatory redirect of unauthenticated user away from protected routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isStandalone && !isSuspended) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, isStandalone, isSuspended, router]);

  // Route Isolation Guard: Redirect SuperAdmin away from standard clinical admin routes
  useEffect(() => {
    if (!isLoading && isAuthenticated && isSuperAdmin && !isStandalone) {
      router.replace("/super-admin");
    }
  }, [isLoading, isAuthenticated, isSuperAdmin, isStandalone, router]);

  // 1. While auth state is initializing, render children cleanly without sidebar flash
  if (isLoading) {
    return <>{children}</>;
  }

  // 2. ABSOLUTE CRITICAL ENFORCEMENT: If tenant is suspended, NEVER render dashboard or any page except /suspended!
  if (isSuspended) {
    if (isSuspendedRoute) {
      return <>{children}</>;
    }
    // Block rendering dashboard/protected views completely while redirecting to /suspended
    return null;
  }

  // 3. If route is standalone OR user is not authenticated, render children without sidebar/navbar
  if (isStandalone || !isAuthenticated) {
    return <>{children}</>;
  }

  // 4. If SuperAdmin is being redirected
  if (isSuperAdmin) {
    return null;
  }

  // 5. Render clinical shell ONLY when user is authenticated, finished loading, and on a clinical route
  return (
    <SidebarProvider>
      <Sidebar />
      <Navbar />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
