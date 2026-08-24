"use client";

import { useState, useEffect, useCallback } from "react";
import { getAuditLogsApi, AuditLogItem } from "@/lib/api/authApi";
import {
  ShieldCheck,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  X,
  Activity,
  Download,
  Filter,
} from "lucide-react";

export default function SuperAdminAuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // Debounce search input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchLogs = useCallback(() => {
    setIsLoading(true);
    const offset = (page - 1) * pageSize;
    getAuditLogsApi(pageSize, offset, debouncedSearch || undefined)
      .then((res) => {
        if (res) {
          setAuditLogs(res.logs || []);
          setTotalRecords(res.total || 0);
        }
      })
      .catch((err) => console.error("Failed to fetch audit logs:", err))
      .finally(() => setIsLoading(false));
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startItem = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalRecords);

  const getActionBadge = (action: string) => {
    const actUpper = action.toUpperCase();
    if (actUpper.includes("SUCCESS")) {
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    }
    if (actUpper.includes("FAILED") || actUpper.includes("DISABLE")) {
      return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
    }
    if (actUpper.includes("2FA") || actUpper.includes("ENABLE")) {
      return "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30";
    }
    if (actUpper.includes("PIN")) {
      return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
    }
    return "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30";
  };

  const handleExportCSV = () => {
    if (auditLogs.length === 0) return;
    const headers = ["Timestamp", "Event Action", "User Email", "Role", "IP Address", "Details"];
    const rows = auditLogs.map((log) => [
      log.created_at ? new Date(log.created_at).toLocaleString() : "",
      log.action,
      log.user_email,
      log.user_role,
      log.ip_address,
      `"${(log.details || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hipaa_audit_logs_page_${page}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 w-full animate-fade-in">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[10px] text-[#8A9995]">Super Admin</span>
            <span className="text-[10px] text-[#B3BCB8]">/</span>
            <span className="text-[10px] text-[#596964]">Governance & Audit</span>
          </div>
          <h1 className="text-[24px] font-black tracking-[-0.03em] text-[#172522] dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#0f766e] dark:text-teal-400" />
            HIPAA Audit Logs & Security Matrix
          </h1>
          <p className="mt-0.5 text-[11px] font-semibold text-[#8A9995]">
            Immutable real-time database audit trail for compliance, 2FA logins, and security events.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          disabled={auditLogs.length === 0}
          className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-black text-[#172522] dark:text-white hover:bg-slate-50 transition-all cursor-pointer shadow-xs flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Download className="h-4 w-4 text-[#0f766e]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div className="rounded-3xl border border-[#E3EBE8] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
        {/* CONTROLS BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[#E3EBE8] dark:border-slate-800 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0f766e]/10 text-[#0f766e] dark:text-teal-400 flex items-center justify-center font-bold">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#172522] dark:text-white">
                Live Audit Logs Stream
              </p>
              <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400">
                {totalRecords} Total HIPAA Audit Records Registered
              </p>
            </div>
          </div>

          {/* Search, Page Size, Refresh */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search action event (e.g. LOGIN, 2FA)..."
                className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 pl-9 pr-8 text-xs font-bold outline-none focus:border-[#0f766e] shadow-xs"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 px-3 text-xs font-extrabold outline-none focus:border-[#0f766e] shadow-xs cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>

            <button
              type="button"
              onClick={fetchLogs}
              className="h-10 px-4 rounded-xl bg-[#0f766e] hover:bg-[#0d5c56] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium border-collapse">
            <thead>
              <tr className="border-b border-[#E3EBE8] dark:border-slate-800 text-[#82918D] uppercase tracking-wider text-[10px] font-black">
                <th className="py-3.5 px-3">Timestamp</th>
                <th className="py-3.5 px-3">Event Action</th>
                <th className="py-3.5 px-3">User Email</th>
                <th className="py-3.5 px-3">Role</th>
                <th className="py-3.5 px-3">IP Address</th>
                <th className="py-3.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EBE8] dark:divide-slate-800 text-[#172522] dark:text-slate-200">
              {isLoading ? (
                /* Shimmer Skeleton Pulse Rows */
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-3">
                      <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-3.5 w-36 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-3.5 w-20 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-3.5 w-48 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                  </tr>
                ))
              ) : auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center space-y-2">
                    <ShieldAlert className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold opacity-80">No audit log records found matching search filter.</p>
                    <p className="text-[11px] opacity-60">Try clearing the search filter or performing actions like login or 2FA setup.</p>
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-teal-50/40 dark:hover:bg-slate-800/60 transition-all group">
                    <td className="py-3.5 px-3 font-mono text-[11px] whitespace-nowrap opacity-80">
                      {log.created_at ? new Date(log.created_at).toLocaleString() : "N/A"}
                    </td>
                    <td className="py-3.5 px-3 font-extrabold text-xs">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-black ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-xs">
                      {log.user_email}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {log.user_role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] opacity-75">
                      {log.ip_address}
                    </td>
                    <td className="py-3.5 px-3 text-[11px] font-medium opacity-90 max-w-xs truncate group-hover:whitespace-normal group-hover:max-w-none transition-all">
                      {log.details || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* SERVER-SIDE PAGINATION CONTROLS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E3EBE8] dark:border-slate-800 pt-4 gap-3">
          <div className="text-xs font-bold opacity-75 text-center sm:text-left">
            Showing <span className="font-extrabold text-[#0f766e] dark:text-teal-400">{startItem}</span> to{" "}
            <span className="font-extrabold text-[#0f766e] dark:text-teal-400">{endItem}</span> of{" "}
            <span className="font-extrabold text-[#0f766e] dark:text-teal-400">{totalRecords}</span> HIPAA Audit Logs
          </div>

          <div className="flex items-center justify-center gap-1.5 self-center sm:self-auto">
            <button
              type="button"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </button>

            {/* Page number buttons */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              let pageNum = page;
              if (totalPages <= 5) pageNum = idx + 1;
              else if (page <= 3) pageNum = idx + 1;
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
              else pageNum = page - 2 + idx;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={`h-8 w-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    page === pageNum
                      ? "bg-[#0f766e] text-white shadow-xs"
                      : "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
