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
  const { isAuthenticated, isSuperAdmin, isLoading } = useAuth();

  // Public/Standalone routes that never show clinical sidebar layout
  const isStandalone =
    pathname === "/login" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/register-tenant");

  // Client-Side Auth Guard: Mandatory redirect of unauthenticated user away from protected routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isStandalone) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, isStandalone, router]);

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

  // 2. If route is standalone OR user is not authenticated, render children without sidebar/navbar
  if (isStandalone || !isAuthenticated) {
    return <>{children}</>;
  }

  // 3. If SuperAdmin is being redirected
  if (isSuperAdmin) {
    return null;
  }

  // 4. Render clinical shell ONLY when user is authenticated, finished loading, and on a clinical route
  return (
    <SidebarProvider>
      <Sidebar />
      <Navbar />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}

