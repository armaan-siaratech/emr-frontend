"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getTenantsApi, TenantItem } from "@/lib/api/authApi";
import { updateTenantApi, deleteTenantApi } from "@/lib/api/tenantApi";
import {
  Building2,
  Plus,
  Search,
  Check,
  Edit3,
  Trash2,
  RefreshCw,
  Shield,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  LayoutGrid,
  List,
  AlertCircle,
  X,
  XCircle,
  ShieldCheck,
  RotateCcw,
  Globe,
  Clock,
  Hash,
  Eye,
} from "lucide-react";

export default function SuperAdminTenantsPage() {
  const [tenants, setTenants] = useState<TenantItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // View Mode: 'grid' (Colorized Cards) or 'table' (Elevated Glass Table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter & Search
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(12);

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Tenants Data from Backend
  const loadTenants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTenantsApi();
      setTenants(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Failed to load tenants from backend:", err);
      setError(err?.message || "Failed to load tenant organizations from backend.");
      setTenants([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Open View Modal
  const openViewModal = (tenant: TenantItem) => {
    setSelectedTenant(tenant);
    setShowViewModal(true);
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (tenant: TenantItem) => {
    setSelectedTenant(tenant);
    setShowDeleteModal(true);
  };

  // Handle Confirm Delete / Suspend
  const handleConfirmDelete = async () => {
    if (!selectedTenant) return;
    setIsSubmitting(true);
    try {
      await deleteTenantApi(selectedTenant.id);
      showToast(`Tenant organization '${selectedTenant.name}' has been suspended / soft-deleted.`);
      setShowDeleteModal(false);
      setSelectedTenant(null);
      await loadTenants();
    } catch (err: any) {
      showToast(err?.message || "Failed to suspend tenant organization.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Restore Tenant
  const handleRestore = async (tenant: TenantItem) => {
    setIsLoading(true);
    try {
      await updateTenantApi(tenant.id, { status: "active" });
      showToast(`Tenant organization '${tenant.name}' restored to Active status!`);
      await loadTenants();
    } catch (err: any) {
      showToast(err?.message || "Failed to restore tenant organization.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered tenants list
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.code.toLowerCase().includes(search.toLowerCase()) ||
      tenant.slug.toLowerCase().includes(search.toLowerCase()) ||
      (tenant.city && tenant.city.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filter === "All" || tenant.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTenants.length / pageSize) || 1;
  const paginatedTenants = filteredTenants.slice((page - 1) * pageSize, page * pageSize);

  const activeCount = tenants.filter((t) => t.status === "active").length;
  const suspendedCount = tenants.filter((t) => t.status === "suspended").length;

  return (
    <div className="w-full space-y-6 font-sans pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] p-6 sm:p-8 shadow-[0_15px_40px_rgba(15,118,110,0.25)] text-white backdrop-blur-3xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Link href="/super-admin" className="hover:text-white transition">
                Super Admin
              </Link>
              <span>/</span>
              <span className="text-white">Multi-Tenancy Console</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <Building2 className="w-8 h-8 text-teal-300 animate-pulse" />
              Tenant Organizations
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
              Manage healthcare tenant organizations, database boundaries, contact information, domain slugs, and status lifecycle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadTenants}
              className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/15 px-4 py-3 text-xs font-bold text-white shadow-md backdrop-blur-md hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <Link
              href="/register-tenant"
              target="_blank"
              className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/15 px-4 py-3 text-xs font-bold text-white shadow-md backdrop-blur-md hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Registration Portal</span>
            </Link>

            <Link
              href="/super-admin/tenants/create"
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-black text-[#0F766E] shadow-xl shadow-teal-950/30 hover:bg-teal-50 transition cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#0F766E]" />
              <span>Add Tenant</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassSummaryCard
          title="Total Registered Tenants"
          value={tenants.length.toString()}
          subtitle="Database Organizations"
          icon="🏢"
          cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
          badge="bg-teal-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(15,118,110,0.15)]"
        />

        <GlassSummaryCard
          title="Active Operational Tenants"
          value={activeCount.toString()}
          subtitle="Clinical Workspaces Live"
          icon="✓"
          cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
          badge="bg-emerald-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
        />

        <GlassSummaryCard
          title="Suspended Tenants"
          value={suspendedCount.toString()}
          subtitle="Locked Access Organizations"
          icon="🔒"
          cardBg="bg-gradient-to-br from-rose-50/90 via-rose-100/40 to-red-50/60 border-rose-300/60"
          badge="bg-rose-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(225,29,72,0.15)]"
        />

        <GlassSummaryCard
          title="Multi-Tenant Security"
          value="Strict Isolation"
          subtitle="HIPAA Encrypted DB Limits"
          icon="🛡"
          cardBg="bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-blue-50/60 border-sky-300/60"
          badge="bg-sky-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(14,165,233,0.15)]"
        />
      </div>

      {/* Main Content & Controls Container */}
      <div className="space-y-4">
        {/* Search, Filters & View Switcher Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91A09B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search tenant name, code, slug, city..."
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-3 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs font-medium"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full sm:w-auto rounded-2xl border border-[#DFE8E5] bg-white px-3.5 text-xs text-[#596964] outline-none focus:border-[#0F766E] font-bold shadow-xs cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center rounded-2xl border border-[#DFE8E5] bg-[#FAFCFB] p-1 shadow-inner">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${viewMode === "grid"
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                    : "text-[#596964] hover:text-[#0F766E]"
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards View</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${viewMode === "table"
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                    : "text-[#596964] hover:text-[#0F766E]"
                  }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
            </div>

            <button
              onClick={loadTenants}
              className="p-2.5 rounded-2xl border border-[#DFE8E5] bg-white hover:bg-[#EAF5F2] hover:text-[#0F766E] text-[#596964] transition cursor-pointer shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0F766E]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content Display: Cards Grid or Table */}
        {isLoading ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
            <p className="font-bold text-[#172522]">Loading tenant organizations from backend...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 p-12 text-center text-rose-700 shadow-md">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-bold">{error}</p>
          </div>
        ) : filteredTenants.length === 0 ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl space-y-3">
            <Building2 className="w-10 h-10 mx-auto text-[#0F766E] opacity-60" />
            <h3 className="font-black text-lg text-[#172522]">No Tenant Organizations Found</h3>
            <p className="text-xs text-[#63827a] max-w-sm mx-auto">
              {search || filter !== "All"
                ? "No tenant organizations match your search or status filter criteria."
                : "No healthcare tenants exist in the database yet. Click below to provision your first organization."}
            </p>
            {!search && filter === "All" && (
              <Link
                href="/super-admin/tenants/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#0B625C] shadow-md transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tenant</span>
              </Link>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* ============================================================
             COLORIZED GLASS CARDS GRID VIEW
          ============================================================ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedTenants.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`relative group rounded-3xl border-2 p-5 shadow-[0_10px_25px_rgba(15,118,110,0.08)] hover:shadow-[0_20px_45px_rgba(15,118,110,0.22)] hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden ${t.status === "suspended"
                    ? "bg-gradient-to-br from-rose-50/90 via-rose-100/30 to-white border-rose-300/80"
                    : t.status === "active"
                      ? "bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-white border-[#7ee8d5]/70 hover:border-[#0f766e]"
                      : "bg-gradient-to-br from-slate-50/90 via-slate-100/40 to-white border-slate-200"
                  }`}
              >
                {/* Ambient Top Card Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#7ee8d5]/30 blur-2xl group-hover:bg-[#0f766e]/20 transition-all duration-500" />

                <div className="space-y-3 relative z-10">
                  {/* Header: Avatar, Name & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white font-black flex items-center justify-center text-lg shadow-md shadow-teal-900/25 shrink-0 border border-teal-400/40">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[#132a26] leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-[10px] font-mono text-[#0F766E] font-bold mt-0.5">
                          Code: {t.code}
                        </p>
                      </div>
                    </div>

                    <div>
                      {t.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EF] px-2.5 py-1 text-[10px] font-bold text-[#278260] border border-[#a3e4c9]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                          Active
                        </span>
                      ) : t.status === "suspended" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-bold text-rose-700 border border-rose-200">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F2F1] px-2.5 py-1 text-[10px] font-semibold text-[#7A8581]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7A8581]" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subdomain URLs */}
                  <div className="rounded-2xl border border-teal-100 bg-white/80 p-3 text-xs space-y-1 shadow-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#63827a] font-bold uppercase">Production Slug:</span>
                      <a
                        href={`https://${t.slug}.ethizo.com`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0F766E] hover:underline font-bold text-[11px] truncate max-w-[180px]"
                      >
                        {t.slug}.ethizo.com
                      </a>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-1">
                      <span className="text-[10px] text-[#63827a] font-bold uppercase">Local Dev:</span>
                      <a
                        href={`http://localhost:3000/?tenant=${t.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0284c7] hover:underline text-[10px] truncate max-w-[180px]"
                      >
                        ?tenant={t.slug}
                      </a>
                    </div>
                  </div>

                  {/* Meta Details: Location & Contact */}
                  <div className="space-y-1 text-xs text-[#596964]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                      <span className="truncate text-[11px]">
                        {t.city ? `${t.city}, ${t.state || ""} ${t.country || ""}` : "Global / Remote Facility"}
                      </span>
                    </div>

                    {(t.email || t.phone) && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                        <span className="truncate font-mono text-[10px]">{t.email || t.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between border-t border-teal-100/80 pt-3 mt-4 relative z-10">
                  <span className="text-[10px] font-mono text-[#8A9995]">
                    TZ: {t.timezone || "UTC"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openViewModal(t)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#596964] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                      title="View Tenant Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/super-admin/tenants/edit/${t.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#596964] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                      title="Edit Tenant"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openDeleteModal(t)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#596964] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer shadow-xs"
                      title="Suspend / Soft-Delete Tenant"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {t.status === "suspended" && (
                      <button
                        onClick={() => handleRestore(t)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition cursor-pointer active:scale-95"
                        title="Restore Tenant Access"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ============================================================
             ELEVATED GLASS TABLE VIEW
          ============================================================ */
          <div className="overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-xs text-[#263833]">
                <thead>
                  <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB] text-[10px] font-bold uppercase tracking-wider text-[#8A9995]">
                    <th className="py-3.5 px-6">Tenant Organization</th>
                    <th className="py-3.5 px-4">Tenant Code</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Contact Information</th>
                    <th className="py-3.5 px-4">Timezone</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#F0F3F2]">
                  {paginatedTenants.map((t) => (
                    <tr key={t.id} className={`hover:bg-[#F8FBFA] transition-colors ${t.status === "suspended" ? "bg-rose-50/30" : ""}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#172522]">{t.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <a
                                href={`https://${t.slug}.ethizo.com`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-[#0F766E] font-mono hover:underline inline-flex items-center gap-0.5 font-bold"
                              >
                                https://{t.slug}.ethizo.com
                              </a>
                              <span className="text-slate-300">•</span>
                              <a
                                href={`http://localhost:3000/?tenant=${t.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-[#0284c7] font-mono hover:underline inline-flex items-center gap-0.5"
                              >
                                local: ?tenant={t.slug}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-[#0F766E]">
                        {t.code}
                      </td>

                      <td className="py-4 px-4 font-medium text-[#263833]">
                        {t.city ? `${t.city}, ${t.state || ""} ${t.country || ""}` : "Global / Remote"}
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-[#596964]">
                        {t.email || t.phone || "N/A"}
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                        {t.timezone}
                      </td>

                      <td className="py-4 px-4">
                        {t.status === "active" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EF] px-2.5 py-1 text-[9px] font-bold text-[#278260] border border-[#a3e4c9]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                            Active
                          </span>
                        ) : t.status === "suspended" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[9px] font-bold text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            Suspended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F2F1] px-2.5 py-1 text-[9px] font-semibold text-[#7A8581]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7A8581]" />
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openViewModal(t)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
                            title="View Tenant Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <Link
                            href={`/super-admin/tenants/edit/${t.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
                            title="Edit Tenant"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => openDeleteModal(t)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                            title="Suspend Tenant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {t.status === "suspended" && (
                            <button
                              onClick={() => handleRestore(t)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-[#0F766E]/30 text-xs font-bold transition cursor-pointer"
                              title="Restore Tenant Access"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Restore</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Table/Grid Pagination Footer */}
        <div className="flex items-center justify-between rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 px-6 py-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
          <p className="text-xs text-[#8A9995]">
            Showing <span className="font-bold text-[#263833]">{paginatedTenants.length}</span> of{" "}
            <span className="font-bold text-[#263833]">{filteredTenants.length}</span> tenant organizations
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 hover:text-[#0F766E] disabled:opacity-40 transition cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#52615D] font-mono font-bold px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 hover:text-[#0F766E] disabled:opacity-40 transition cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          TRANSLUCENT GLASS MODALS (PERMANENT BACKDROP UNTIL CLOSE/CANCEL)
      ============================================================ */}

      {/* 1. View Tenant Details Glass Modal */}
      <AnimatePresence>
        {showViewModal && selectedTenant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop overlay (NO onClick event to prevent closing on outside click) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/50 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              {/* Ambient cyan corner highlights */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

              {/* Modal Header */}
              <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <Building2 className="h-6 w-6 text-[#0f766e]" />
                  Tenant Details: <span className="text-[#0f766e]">{selectedTenant.name}</span>
                </h2>

                <button
                  onClick={() => setShowViewModal(false)}
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs relative z-10">
                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2">Organization Overview</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Tenant Code</span>
                      <p className="text-[#132a26] font-mono font-bold text-sm mt-0.5">{selectedTenant.code}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Status</span>
                      <p className="mt-0.5">
                        {selectedTenant.status === "active" ? (
                          <span className="text-[#278260] font-bold">Active</span>
                        ) : selectedTenant.status === "suspended" ? (
                          <span className="text-rose-600 font-bold">Suspended</span>
                        ) : (
                          <span className="text-slate-500 font-bold">Inactive</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md font-mono">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2 font-sans">Domain Routing</span>
                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[#132a26]">
                      <span className="font-bold text-[#63827a]">Production Domain: </span>
                      <a href={`https://${selectedTenant.slug}.ethizo.com`} target="_blank" rel="noreferrer" className="text-[#0F766E] underline font-bold">
                        https://{selectedTenant.slug}.ethizo.com
                      </a>
                    </p>
                    <p className="text-[11px] text-[#132a26]">
                      <span className="font-bold text-[#63827a]">Local Query Domain: </span>
                      <a href={`http://localhost:3000/?tenant=${selectedTenant.slug}`} target="_blank" rel="noreferrer" className="text-[#0284c7] underline font-bold">
                        http://localhost:3000/?tenant={selectedTenant.slug}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2">Location & Contact</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Address</span>
                      <p className="text-[#132a26] font-medium text-xs mt-0.5">
                        {selectedTenant.address || "N/A"}{selectedTenant.city ? `, ${selectedTenant.city}` : ""}{selectedTenant.state ? `, ${selectedTenant.state}` : ""}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Contact Information</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">
                        {selectedTenant.email || selectedTenant.phone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Timezone</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">{selectedTenant.timezone || "UTC"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Created Date</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">
                        {selectedTenant.created_at ? new Date(selectedTenant.created_at).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 relative z-10">
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="w-48 py-3 rounded-2xl border border-white/80 bg-white/60 hover:bg-white text-[#35544d] font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Suspend / Delete Tenant Glass Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedTenant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop overlay (NO onClick event to prevent closing on outside click) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-md w-full rounded-3xl border-2 border-rose-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(225,29,72,0.25)] backdrop-blur-3xl text-center space-y-4 overflow-hidden my-auto"
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
                <Trash2 className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-[#132a26]">Suspend Tenant Organization</h3>

              <p className="text-xs text-[#52615D] leading-relaxed">
                Are you sure you want to suspend access for tenant{" "}
                <span className="font-bold text-[#0F766E]">{selectedTenant.name}</span> (Code:{" "}
                <span className="font-mono font-bold">{selectedTenant.code}</span>)?
              </p>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium text-left">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Tenant Suspension Policy Enforcement:
                </p>
                <p className="mt-0.5 text-[#596964]">
                  All clinical workspace modules, patient charts, and record workflows for this organization will be locked until restored by SuperAdmin.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleConfirmDelete}
                  disabled={isSubmitting}
                  className="w-44 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/30 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Confirm Suspend"}
                </button>

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-44 py-3 rounded-2xl border border-slate-200 bg-slate-100 text-[#35544d] font-bold text-xs hover:bg-white transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Glass Summary Card Component */
function GlassSummaryCard({
  title,
  value,
  subtitle,
  icon,
  cardBg,
  badge,
  shadow,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  cardBg: string;
  badge: string;
  shadow: string;
}) {
  return (
    <div
      className={`rounded-3xl border-2 ${cardBg} ${shadow} p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#63827a]">{title}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#172522]">{value}</p>
          <p className="mt-1 text-[10px] text-[#7A8581] font-medium">{subtitle}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl text-[16px] font-black shadow-md ${badge}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
