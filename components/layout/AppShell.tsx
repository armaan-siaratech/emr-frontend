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

  // Standalone pages that don't need the main clinical sidebar layout
  const isStandalone =
    pathname === "/login" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/super-admin");

  // Route Isolation Guard: Redirect SuperAdmin away from standard clinical admin routes
  useEffect(() => {
    if (!isLoading && isAuthenticated && isSuperAdmin && !isStandalone) {
      router.replace("/super-admin");
    }
  }, [isLoading, isAuthenticated, isSuperAdmin, isStandalone, router]);

  if (isStandalone) {
    return <>{children}</>;
  }

  // If SuperAdmin is being redirected
  if (!isLoading && isAuthenticated && isSuperAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <Navbar />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
