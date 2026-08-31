"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Shield,
  LifeBuoy,
  Building,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Radio,
  Sparkles,
} from "lucide-react";
import {
  getNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
  deleteNotificationApi,
  NotificationItem,
} from "@/lib/api/notificationApi";
import { getTicketWebSocketUrl } from "@/lib/api/ticketApi";

export default function SuperAdminNotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter Tabs: 'All', 'Unread', 'Support', 'Admin', 'System'
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const typeParam =
        activeTab === "Support"
          ? "support"
          : activeTab === "Admin"
          ? "admin"
          : activeTab === "System"
          ? "system"
          : undefined;

      const isReadParam = activeTab === "Unread" ? false : undefined;

      const res = await getNotificationsApi({
        type: typeParam,
        is_read: isReadParam,
        page,
        page_size: pageSize,
      });

      setItems(res.items || []);
      setTotalCount(res.total || 0);
      setUnreadCount(res.unread_count || 0);
    } catch (err: any) {
      setError(err?.message || "Failed to load platform notifications.");
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, page, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Live WebSocket Connection
  useEffect(() => {
    const wsUrl = getTicketWebSocketUrl();
    let socket: WebSocket | null = null;

    try {
      socket = new WebSocket(wsUrl);
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.type === "NEW_NOTIFICATION" || data?.type === "TICKET_CREATED" || data?.type === "TICKET_UPDATED") {
            showToast(`🔔 ${data.message || "New Live Notification"}`);
            loadData();
          }
        } catch (_) {}
      };
    } catch (_) {}

    return () => {
      if (socket) socket.close();
    };
  }, [loadData]);

  // Mark Single as Read
  const handleMarkRead = async (id: string) => {
    try {
      const res = await markNotificationReadApi(id);
      setUnreadCount(res.unread_count);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_read: true } : item))
      );
    } catch (err: any) {
      showToast(err?.message || "Failed to mark notification as read.");
    }
  };

  // Mark All as Read
  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setUnreadCount(0);
      setItems((prev) => prev.map((item) => ({ ...item, is_read: true })));
      showToast("All notifications marked as read!");
    } catch (err: any) {
      showToast(err?.message || "Failed to mark all as read.");
    }
  };

  // Soft Delete Notification
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteNotificationApi(id);
      setUnreadCount(res.unread_count);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Notification deleted.");
    } catch (err: any) {
      showToast(err?.message || "Failed to delete notification.");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      (item.reference && item.reference.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <Radio className="w-5 h-5 text-teal-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-5 py-4 shadow-md text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#7ee8d5]/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/super-admin" className="text-[10px] font-extrabold uppercase tracking-widest text-teal-200 hover:underline">
                Super Admin
              </Link>
              <span className="text-teal-200 text-xs">/</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
                Platform Notifications
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Bell className="w-6 h-6 text-teal-300" />
              Notifications Center
            </h1>
            <p className="mt-0.5 text-xs font-medium text-teal-100/90">
              Live audit events, support ticket submissions, and platform system alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-black text-[#0F766E] shadow-sm hover:bg-teal-50 transition cursor-pointer active:scale-95"
              >
                <CheckCheck className="w-4 h-4 text-[#0F766E]" />
                <span>Mark All Read ({unreadCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl space-y-4">
        {/* Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-[#EDF2F0] pb-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 bg-[#FAFCFB] rounded-2xl border border-[#DFE8E5]">
            {["All", "Unread", "Support", "Admin", "System"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`rounded-xl px-4 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0F766E] text-white shadow-sm"
                    : "text-[#596964] hover:text-[#0F766E]"
                }`}
              >
                {tab} {tab === "Unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91A09B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notification title..."
                className="h-9 w-full rounded-xl border border-[#DFE8E5] bg-white pl-9 pr-3 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              onClick={loadData}
              className="p-2 rounded-xl border border-[#DFE8E5] bg-white hover:bg-[#EAF5F2] hover:text-[#0F766E] text-[#596964] transition cursor-pointer"
              title="Refresh Notifications"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0F766E]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="p-16 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
            <p className="font-bold text-[#172522]">Loading notifications from database...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-700 bg-rose-50 rounded-2xl border border-rose-200">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-bold">{error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 text-center">
            <Bell className="w-10 h-10 mx-auto text-[#0F766E] mb-3 opacity-60" />
            <h3 className="font-black text-lg text-[#172522]">No Notifications Found</h3>
            <p className="text-xs text-[#63827a] mt-1 max-w-sm mx-auto">
              There are no notifications matching your selected filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0F3F2]">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl transition-all flex items-start justify-between gap-4 ${
                  !item.is_read
                    ? "bg-gradient-to-r from-teal-50/80 via-emerald-50/30 to-white border border-teal-200/80 shadow-xs"
                    : "hover:bg-[#FAFCFB]"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                      item.type === "support"
                        ? "bg-teal-100 text-teal-800"
                        : item.type === "admin"
                        ? "bg-sky-100 text-sky-800"
                        : item.type === "security"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.type === "support" ? (
                      <LifeBuoy className="w-5 h-5" />
                    ) : item.type === "admin" ? (
                      <UserCheck className="w-5 h-5" />
                    ) : item.type === "security" ? (
                      <Shield className="w-5 h-5" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs ${!item.is_read ? "font-black text-[#172522]" : "font-bold text-slate-700"}`}>
                        {item.title}
                      </h4>
                      {item.reference && (
                        <span className="rounded-md bg-teal-100/70 px-2 py-0.5 text-[9px] font-mono font-bold text-[#0F766E]">
                          {item.reference}
                        </span>
                      )}
                      {!item.is_read && (
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-3xl">
                      {item.message}
                    </p>

                    <p className="text-[10px] font-mono text-slate-400">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!item.is_read && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-100 transition cursor-pointer"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between pt-3 border-t border-[#EDF2F0]">
          <p className="text-xs text-[#8A9995]">
            Showing <span className="font-bold text-[#263833]">{filteredItems.length}</span> of{" "}
            <span className="font-bold text-[#263833]">{totalCount}</span> notifications
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#52615D] font-mono font-bold px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}