"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Bell, Shield, Menu } from "lucide-react";

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email || "Platform Super Admin";

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : "SA";

  const designation = user?.designation || "System Administrator";

  return (
    <ProtectedRoute requiredRole="SUPER_ADMIN">
      <div className="flex min-h-screen bg-[#F7FAF9] text-[#172522]">
        {/* ================= SUPERADMIN SIDEBAR ================= */}
        <SuperAdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* ================= MAIN WRAPPER ================= */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* ================= HEADER ================= */}
          <header className="sticky top-0 z-30 flex h-14 sm:h-16 shrink-0 items-center justify-between border-b border-[#E3EBE8] bg-white/95 px-4 sm:px-6 backdrop-blur shadow-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#E3EBE8] bg-[#F7FAF9] text-[#0F766E] hover:bg-[#E3EBE8] transition-colors"
                title="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0F766E] flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Super Admin Terminal
                </p>
                <h2 className="text-xs sm:text-sm font-black text-[#172522]">
                  Super Admin Dashboard
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-5">
              {/* Notification Button */}
              <Link
                href="/super-admin/notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3EBE8] text-[#6D7C78] transition hover:bg-[#F2F7F5] hover:text-[#0F766E]"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D9645A]" />
              </Link>

              <div className="h-8 w-px bg-[#E3EBE8] hidden sm:block" />

              {/* Super Admin Profile Badge */}
              <Link
                href="/super-admin/profile"
                className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 rounded-xl hover:bg-[#F2F7F5] transition-all cursor-pointer group"
              >
                <div className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F766E] to-[#14b8a6] text-xs font-black text-white shadow-md group-hover:scale-105 transition-transform">
                  {initials}
                </div>

                <div className="hidden md:block">
                  <p className="text-xs font-extrabold text-[#172522] truncate max-w-[140px] group-hover:text-[#0F766E] transition-colors">
                    {displayName}
                  </p>
                  <p className="text-[10px] font-bold text-[#0F766E] truncate max-w-[140px]">
                    {designation}
                  </p>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Log out of SuperAdmin session"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* ================= PAGE CONTENT ================= */}
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}