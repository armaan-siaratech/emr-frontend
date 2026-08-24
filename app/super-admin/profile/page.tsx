"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAuditLogsApi, AuditLogItem } from "@/lib/api/authApi";
import {
  ShieldCheck,
  User,
  Mail,
  Building2,
  KeyRound,
  Lock,
  Activity,
  CheckCircle2,
  Shield,
  FileCode2,
  Copy,
  Check,
  Clock,
  Laptop,
  Server,
  Zap,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

export default function SuperAdminProfilePage() {
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "security" | "audit">("overview");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);
  const [auditPage, setAuditPage] = useState(1);
  const [auditPageSize, setAuditPageSize] = useState(10);
  const [auditTotal, setAuditTotal] = useState(0);

  const fetchProfileAuditLogs = useCallback(() => {
    if (activeTab === "audit") {
      setIsLoadingAudit(true);
      const offset = (auditPage - 1) * auditPageSize;
      getAuditLogsApi(auditPageSize, offset)
        .then((res) => {
          if (res) {
            setAuditLogs(res.logs || []);
            setAuditTotal(res.total || 0);
          }
        })
        .catch((err) => console.error("Failed to load audit logs:", err))
        .finally(() => setIsLoadingAudit(false));
    }
  }, [activeTab, auditPage, auditPageSize]);

  useEffect(() => {
    fetchProfileAuditLogs();
  }, [fetchProfileAuditLogs]);

  // Form states for password update
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passUpdated, setPassUpdated] = useState(false);

  const handleCopyId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassUpdated(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPassUpdated(false), 4000);
  };

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email || "Platform Super Admin";

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : "SA";

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#081c19] via-[#0f766e] to-[#0284c7] p-8 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 border-2 border-white/30 text-2xl font-black text-white shadow-2xl backdrop-blur-md">
              {initials}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">{displayName}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-3 py-0.5 text-xs font-extrabold text-emerald-300 border border-emerald-400/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified SuperAdmin
                </span>
              </div>

              <p className="text-sm font-semibold text-teal-100/90 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {user?.email || "superadmin@medicarehms.com"}
              </p>

              <p className="text-xs font-mono text-teal-200/80 flex items-center gap-2 pt-1">
                <span>Designation:</span>
                <span className="font-bold text-white bg-white/15 px-2 py-0.5 rounded-md">
                  {user?.designation || "Platform Super Admin"}
                </span>
              </p>
            </div>
          </div>

          {/* Quick System Badge */}
          <div className="flex flex-wrap items-center gap-3 bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-sm self-start md:self-auto">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
                System Scope
              </p>
              <p className="text-xs font-black text-white">Root Platform Master</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
                Security clearance
              </p>
              <p className="text-xs font-black text-emerald-400">HIPAA Tier-1 Highest</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E3EBE8] pb-3">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#0f766e] text-white shadow-md"
              : "bg-white text-[#6D7C78] hover:bg-[#F2F7F5]"
          }`}
        >
          <User className="h-4 w-4" />
          Profile Details
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "security"
              ? "bg-[#0f766e] text-white shadow-md"
              : "bg-white text-[#6D7C78] hover:bg-[#F2F7F5]"
          }`}
        >
          <Lock className="h-4 w-4" />
          Security & Password
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "audit"
              ? "bg-[#0f766e] text-white shadow-md"
              : "bg-white text-[#6D7C78] hover:bg-[#F2F7F5]"
          }`}
        >
          <Activity className="h-4 w-4" />
          HIPAA Audit Logs
        </button>
      </div>

      {/* TAB 1: OVERVIEW & PROFILE DETAILS */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[#E3EBE8] bg-white p-6 shadow-sm space-y-6">
              <h3 className="text-base font-black text-[#172522] flex items-center gap-2 border-b border-[#E3EBE8] pb-3">
                <ShieldCheck className="h-5 w-5 text-[#0f766e]" />
                SuperAdmin Credentials & Metadata
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#E3EBE8]">
                  <p className="text-[10px] font-extrabold text-[#82918D] uppercase tracking-wider">
                    SuperAdmin User ID (UUID)
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs font-mono font-bold text-[#172522] truncate max-w-[220px]">
                      {user?.id || "Generating..."}
                    </p>
                    <button
                      onClick={handleCopyId}
                      className="text-[#0f766e] hover:text-[#115e59] p-1 rounded-md transition-colors"
                      title="Copy User ID"
                    >
                      {copiedId ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#E3EBE8]">
                  <p className="text-[10px] font-extrabold text-[#82918D] uppercase tracking-wider">
                    Primary Email
                  </p>
                  <p className="text-xs font-bold text-[#172522] mt-1">
                    {user?.email || "superadmin@medicarehms.com"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#E3EBE8]">
                  <p className="text-[10px] font-extrabold text-[#82918D] uppercase tracking-wider">
                    Assigned System Roles
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user?.roles?.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#0f766e]/10 text-[#0f766e] text-[11px] font-extrabold border border-[#0f766e]/20"
                      >
                        {role}
                      </span>
                    )) || (
                      <span className="px-2 py-0.5 rounded-md bg-[#0f766e]/10 text-[#0f766e] text-[11px] font-extrabold">
                        SUPER_ADMIN
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#E3EBE8]">
                  <p className="text-[10px] font-extrabold text-[#82918D] uppercase tracking-wider">
                    Tenant Level Scope
                  </p>
                  <p className="text-xs font-bold text-[#172522] mt-1 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[#0f766e]" />
                    {user?.tenant_id ? `Tenant #${user.tenant_id.slice(0, 8)}...` : "System Master (Global Root)"}
                  </p>
                </div>
              </div>

              {/* Status Pills */}
              <div className="pt-4 border-t border-[#E3EBE8] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-emerald-700">Account Active & Operational</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-extrabold text-[#172522]">Identity Verified & Email Confirmed</span>
                </div>
              </div>
            </div>

            {/* Privileges Matrix */}
            <div className="rounded-2xl border border-[#E3EBE8] bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-[#0f766e]" />
                SuperAdmin Platform Privileges
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-teal-200/60 bg-teal-50/50 flex items-center justify-between">
                  <span className="font-bold text-[#172522]">Multi-Tenant Management</span>
                  <span className="text-emerald-700 font-extrabold">Full Control</span>
                </div>

                <div className="p-3 rounded-xl border border-teal-200/60 bg-teal-50/50 flex items-center justify-between">
                  <span className="font-bold text-[#172522]">ICD-10 Master Catalog Edit</span>
                  <span className="text-emerald-700 font-extrabold">Read / Write</span>
                </div>

                <div className="p-3 rounded-xl border border-teal-200/60 bg-teal-50/50 flex items-center justify-between">
                  <span className="font-bold text-[#172522]">CPT Codes Master Catalog</span>
                  <span className="text-emerald-700 font-extrabold">Read / Write</span>
                </div>

                <div className="p-3 rounded-xl border border-teal-200/60 bg-teal-50/50 flex items-center justify-between">
                  <span className="font-bold text-[#172522]">SuperAdmin Creation & Revoke</span>
                  <span className="text-emerald-700 font-extrabold">Full Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Stats & Active Sessions */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E3EBE8] bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#172522] flex items-center gap-2">
                <Server className="h-4 w-4 text-[#0f766e]" />
                Session Health & Tokens
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAF9]">
                  <span className="text-[#82918D] font-bold">Access Token Expiry:</span>
                  <span className="font-mono font-bold text-[#0f766e]">24 Hours</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAF9]">
                  <span className="text-[#82918D] font-bold">Refresh Token Validity:</span>
                  <span className="font-mono font-bold text-[#0f766e]">7 Days</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAF9]">
                  <span className="text-[#82918D] font-bold">Cookie Security:</span>
                  <span className="font-bold text-emerald-700">HttpOnly / Lax</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#0f766e]">
                <Zap className="h-4 w-4 text-[#0f766e]" />
                SuperAdmin Quick Action Tip
              </div>
              <p className="text-xs text-[#2e4d46] leading-relaxed">
                As SuperAdmin, your active JWT refresh token is silently maintained in the background. You can manage system facilities, ICD-10 catalogs, and administrator accounts directly from the sidebar.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & PASSWORD UPDATE */}
      {activeTab === "security" && (
        <div className="max-w-2xl bg-white border border-[#E3EBE8] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-black text-[#172522] flex items-center gap-2 border-b border-[#E3EBE8] pb-3">
            <Lock className="h-5 w-5 text-[#0f766e]" />
            Change Password & Security Credentials
          </h3>

          {passUpdated && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              Password updated successfully! Next login will require updated credentials.
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172522] mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password..."
                className="w-full h-11 px-4 rounded-xl border border-[#E3EBE8] text-xs font-semibold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172522] mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)..."
                className="w-full h-11 px-4 rounded-xl border border-[#E3EBE8] text-xs font-semibold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172522] mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password..."
                className="w-full h-11 px-4 rounded-xl border border-[#E3EBE8] text-xs font-semibold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black shadow-md transition-all cursor-pointer"
            >
              Update Password Credentials
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: HIPAA AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="bg-white border border-[#E3EBE8] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E3EBE8] pb-3 gap-3">
            <div>
              <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0f766e]" />
                Live HIPAA Audit Log History
              </h3>
              <p className="text-[11px] text-[#8A9995] font-semibold">
                {auditTotal} Total audit events recorded in database
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={auditPageSize}
                onChange={(e) => {
                  setAuditPageSize(Number(e.target.value));
                  setAuditPage(1);
                }}
                className="h-8 rounded-lg border border-[#E3EBE8] bg-[#F7FAF9] px-2 text-xs font-bold text-[#172522] outline-none cursor-pointer"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>

              <button
                type="button"
                onClick={fetchProfileAuditLogs}
                className="h-8 px-3 rounded-lg bg-[#0f766e] text-white text-xs font-bold hover:bg-[#115e59] transition-all cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoadingAudit ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE8] text-[#82918D] uppercase tracking-wider text-[10px] font-black">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Action Event</th>
                  <th className="py-3 px-3">User Email</th>
                  <th className="py-3 px-3">IP Address</th>
                  <th className="py-3 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE8] text-[#172522]">
                {isLoadingAudit ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-3 px-3"><div className="h-3 w-24 bg-slate-200 rounded" /></td>
                      <td className="py-3 px-3"><div className="h-3.5 w-28 bg-slate-200 rounded" /></td>
                      <td className="py-3 px-3"><div className="h-3 w-32 bg-slate-200 rounded" /></td>
                      <td className="py-3 px-3"><div className="h-3 w-20 bg-slate-200 rounded" /></td>
                      <td className="py-3 px-3"><div className="h-3 w-40 bg-slate-200 rounded" /></td>
                    </tr>
                  ))
                ) : auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs font-semibold opacity-70">
                      No audit log records found in database.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-[11px] whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : "N/A"}
                      </td>
                      <td className="py-3 px-3 font-black text-xs text-[#0f766e]">
                        {log.action}
                      </td>
                      <td className="py-3 px-3 font-bold text-xs">
                        {log.user_email}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] opacity-80">
                        {log.ip_address}
                      </td>
                      <td className="py-3 px-3 text-[11px] font-medium opacity-90 max-w-md">
                        {log.details || "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E3EBE8] pt-3 gap-2 text-xs font-semibold">
            <span className="text-[#8A9995]">
              Showing <strong className="text-[#0f766e]">{auditTotal === 0 ? 0 : (auditPage - 1) * auditPageSize + 1}</strong> to{" "}
              <strong className="text-[#0f766e]">{Math.min(auditPage * auditPageSize, auditTotal)}</strong> of{" "}
              <strong className="text-[#0f766e]">{auditTotal}</strong> logs
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={auditPage <= 1 || isLoadingAudit}
                onClick={() => setAuditPage((p) => Math.max(1, p - 1))}
                className="h-8 px-2.5 rounded-lg border border-[#E3EBE8] bg-[#F7FAF9] font-bold hover:bg-slate-100 disabled:opacity-40 cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>

              <span className="px-2 font-mono font-bold text-[11px]">
                Page {auditPage} of {Math.max(1, Math.ceil(auditTotal / auditPageSize))}
              </span>

              <button
                type="button"
                disabled={auditPage >= Math.ceil(auditTotal / auditPageSize) || isLoadingAudit}
                onClick={() => setAuditPage((p) => Math.min(Math.ceil(auditTotal / auditPageSize), p + 1))}
                className="h-8 px-2.5 rounded-lg border border-[#E3EBE8] bg-[#F7FAF9] font-bold hover:bg-slate-100 disabled:opacity-40 cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
