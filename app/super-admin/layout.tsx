"use client";

import { ReactNode, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Bell, Shield, Menu, CheckCheck, X, ExternalLink } from "lucide-react";
import {
  getUnreadCountApi,
  getNotificationsApi,
  markAllNotificationsReadApi,
  NotificationItem,
} from "@/lib/api/notificationApi";
import { getTicketWebSocketUrl } from "@/lib/api/ticketApi";

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Live Notification States
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [recentNotifs, setRecentNotifs] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await getUnreadCountApi();
      setUnreadCount(res.unread_count || 0);
    } catch (_) {
      // Ignore initial unread count error
    }
  }, []);

  const fetchRecentNotifs = useCallback(async () => {
    try {
      const res = await getNotificationsApi({ page: 1, page_size: 5 });
      setRecentNotifs(res.items || []);
      setUnreadCount(res.unread_count || 0);
    } catch (_) {
      // Ignore dropdown fetch error
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Live WebSocket Connection for Unread Count Badge (1, 2, 3...)
  useEffect(() => {
    const wsUrl = getTicketWebSocketUrl();
    let socket: WebSocket | null = null;

    try {
      socket = new WebSocket(wsUrl);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.type === "NEW_NOTIFICATION" || data?.type === "TICKET_CREATED" || data?.type === "TICKET_UPDATED") {
            setUnreadCount((c) => c + 1);
            fetchRecentNotifs();
          }
        } catch (_) {}
      };
    } catch (_) {}

    return () => {
      if (socket) socket.close();
    };
  }, [fetchRecentNotifs]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setUnreadCount(0);
      setRecentNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (_) {}
  };

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
      <div className="flex min-h-screen bg-[#F7FAF9] text-[#172522] font-sans">
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
                className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#E3EBE8] bg-[#F7FAF9] text-[#0F766E] hover:bg-[#E3EBE8] transition-colors cursor-pointer"
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

            <div className="flex items-center gap-2 sm:gap-5 relative">
              {/* Notification Bell Button with Live Badge Count (1, 2, 3...) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                    if (!showDropdown) fetchRecentNotifs();
                  }}
                  className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3EBE8] text-[#6D7C78] transition hover:bg-[#F2F7F5] hover:text-[#0F766E] cursor-pointer"
                  aria-label="Notifications"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />

                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-black text-white shadow-sm animate-pulse">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Quick Notification Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-teal-100 bg-white/95 shadow-2xl backdrop-blur-2xl z-50 p-4 space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#172522]">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                            {unreadCount} Unread
                          </span>
                        )}
                      </div>

                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="flex items-center gap-1 text-[10px] font-bold text-[#0F766E] hover:underline cursor-pointer"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {recentNotifs.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400">
                          No notifications yet.
                        </div>
                      ) : (
                        recentNotifs.map((notif) => (
                          <div
                            key={notif.id}
                            className={`py-2.5 px-1 flex items-start justify-between gap-2 text-xs transition ${
                              !notif.is_read ? "bg-teal-50/50 rounded-xl px-2 font-semibold" : ""
                            }`}
                          >
                            <div>
                              <p className="font-bold text-[#172522]">{notif.title}</p>
                              <p className="text-[11px] text-slate-600 mt-0.5">{notif.message}</p>
                              <span className="text-[9px] font-mono text-slate-400">
                                {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-2 text-center">
                      <Link
                        href="/super-admin/notifications"
                        onClick={() => setShowDropdown(false)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] hover:underline"
                      >
                        <span>View All Notifications</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

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
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all cursor-pointer shadow-xs"
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