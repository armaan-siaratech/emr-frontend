"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Clock,
  Eye,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  List,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  User,
  X,
  Briefcase,
  Database,
} from "lucide-react";

import {
  getAdminsApi,
  createAdminApi,
  updateAdminApi,
  deleteAdminApi,
  restoreAdminApi,
  AdminItem,
} from "@/lib/api/adminApi";

export default function AdminListPage() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(16);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // View Mode: 'grid' (3D Colorized Cards) or 'table' (Elevated Glass Table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters & Debouncing
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Smooth Search Debouncing (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const isInitialLoad = useRef(true);

  // Load Data from Backend API
  const loadData = useCallback(async () => {
    if (isInitialLoad.current) {
      setIsLoading(true);
    } else {
      setIsFetching(true);
    }
    setError(null);
    try {
      const is_active_param =
        selectedStatus === "Active" ? true : selectedStatus === "Inactive" ? false : undefined;

      const res = await getAdminsApi({
        search: debouncedSearch || undefined,
        is_active: is_active_param,
        page,
        page_size: pageSize,
      });

      setItems(res.items || []);
      setTotalCount(res.total || 0);
    } catch (err: any) {
      setError(err?.message || "Failed to load administrator accounts from backend.");
    } finally {
      setIsLoading(false);
      setIsFetching(false);
      isInitialLoad.current = false;
    }
  }, [debouncedSearch, selectedStatus, page, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Handle Create Admin
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() || !formData.password) {
      setFormError("First Name, Last Name, Email and Password are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createAdminApi({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        designation: formData.designation.trim() || "Platform Super Admin",
        password: formData.password,
        is_active: formData.is_active,
      });
      showToast(`Administrator '${formData.first_name} ${formData.last_name}' created successfully!`);
      setShowAddModal(false);
      resetForm();
      await loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to create administrator account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Edit Modal
  const openEdit = (item: AdminItem) => {
    setSelectedItem(item);
    setFormData({
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      phone: item.phone || "",
      designation: item.designation || "Platform Super Admin",
      password: "",
      is_active: item.is_active,
    });
    setFormError(null);
    setShowEditModal(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setFormError(null);
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim()) {
      setFormError("First Name, Last Name and Email are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateAdminApi(selectedItem.id, {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        designation: formData.designation.trim() || "Platform Super Admin",
        password: formData.password || undefined,
        is_active: formData.is_active,
      });
      showToast(`Administrator '${formData.first_name} ${formData.last_name}' updated successfully!`);
      setShowEditModal(false);
      setSelectedItem(null);
      await loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to update administrator account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Deactivate Confirm
  const handleDeactivateConfirm = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await deleteAdminApi(selectedItem.id);
      showToast(`Administrator '${selectedItem.first_name} ${selectedItem.last_name}' deactivated.`);
      setShowDeleteModal(false);
      setSelectedItem(null);
      await loadData();
    } catch (err: any) {
      showToast(err?.message || "Failed to deactivate administrator account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Restore
  const handleRestore = async (item: AdminItem) => {
    setIsLoading(true);
    try {
      await restoreAdminApi(item.id);
      showToast(`Administrator '${item.first_name} ${item.last_name}' reactivated successfully!`);
      await loadData();
    } catch (err: any) {
      showToast(err?.message || "Failed to reactivate administrator account.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      designation: "Platform Super Admin",
      password: "",
      is_active: true,
    });
    setFormError(null);
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Ultra-Compact Header Bar */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-5 py-3.5 shadow-md text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#7ee8d5]/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Breadcrumb + Title */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-teal-200 text-[11px] font-bold uppercase tracking-wider">
              <Link href="/super-admin" className="hover:text-white transition">
                Super Admin
              </Link>
              <span>/</span>
            </div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-300 animate-pulse" />
              Super Admin Administrators
            </h1>
          </div>

          {/* Right: Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-black text-[#0F766E] shadow-sm hover:bg-teal-50 transition cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Add Administrator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vibrant 3D Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard3D
          title="Total Admins"
          value={totalCount.toLocaleString()}
          subtitle="Platform system administrators"
          icon="⌘"
          cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
          badge="bg-teal-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(15,118,110,0.15)]"
        />

        <GlassCard3D
          title="Active Admins"
          value={items.filter((i) => i.is_active).length.toLocaleString()}
          subtitle="Authorized active accounts"
          icon="✓"
          cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
          badge="bg-emerald-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
        />

        <GlassCard3D
          title="Inactive Accounts"
          value={items.filter((i) => !i.is_active).length.toLocaleString()}
          subtitle="Disabled or revoked access"
          icon="◫"
          cardBg="bg-gradient-to-br from-rose-50/90 via-rose-100/40 to-slate-50/60 border-rose-300/60"
          badge="bg-rose-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(225,29,72,0.15)]"
        />

        <GlassCard3D
          title="Security Role"
          value="Super Admin"
          subtitle="Full platform administrative access"
          icon="↻"
          cardBg="bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-orange-50/60 border-amber-300/60"
          badge="bg-amber-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(245,158,11,0.15)]"
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
                placeholder="Search name, email or designation..."
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-9 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs"
              />
              {isFetching && (
                <RefreshCw className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#0F766E]" />
              )}
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full sm:w-auto rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none focus:border-[#0F766E] font-medium shadow-xs"
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center rounded-2xl border border-[#DFE8E5] bg-[#FAFCFB] p-1 shadow-inner">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${viewMode === "grid"
                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                  : "text-[#596964] hover:text-[#0F766E]"
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards View</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${viewMode === "table"
                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                  : "text-[#596964] hover:text-[#0F766E]"
                  }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>

            <button
              onClick={loadData}
              className="p-2.5 rounded-2xl border border-[#DFE8E5] bg-white hover:bg-[#EAF5F2] hover:text-[#0F766E] text-[#596964] transition cursor-pointer shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0F766E]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid / Table View */}
        {isLoading ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
            <p className="font-bold text-[#172522]">Loading administrator accounts from backend...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 p-12 text-center text-rose-700 shadow-md">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-bold">{error}</p>
          </div>
        ) : (
          <div className={`transition-opacity duration-200 ${isFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
            {items.length === 0 ? (
              <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
                <Database className="w-10 h-10 mx-auto text-[#0F766E] mb-3 opacity-60" />
                <h3 className="font-black text-lg text-[#172522]">No Administrators Found</h3>
                <p className="text-xs text-[#63827a] mt-1 max-w-sm mx-auto">
                  {search || selectedStatus !== "All"
                    ? "No administrator accounts match your search criteria."
                    : "Click \"Add Administrator\" to provision a new Super Admin account."}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              /* ============================================================
                 3D COLORIZED GLASS CARDS GRID VIEW
              ============================================================ */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {items.map((item) => {
              const initials = `${item.first_name.charAt(0)}${item.last_name.charAt(0)}`.toUpperCase();
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`relative group rounded-2xl border-2 p-3.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-xl flex flex-col justify-between overflow-hidden ${!item.is_active
                    ? "bg-gradient-to-br from-rose-50/90 via-rose-100/30 to-white border-rose-300/80"
                    : "bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-white border-[#7ee8d5]/70 hover:border-[#0f766e]"
                    }`}
                >
                  {/* Ambient Top Card Glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7ee8d5]/30 blur-xl group-hover:bg-[#0f766e]/20 transition-all duration-300" />

                  <div className="space-y-2 relative z-10">
                    {/* Top Bar: Admin Initials Avatar + Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white font-black flex items-center justify-center text-xs shadow-xs border border-teal-400/40">
                          {initials}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#172522] leading-tight font-sans">
                            {item.first_name} {item.last_name}
                          </p>
                          <p className="text-[10px] text-[#0F766E] font-medium truncate max-w-[130px]">
                            {item.designation}
                          </p>
                        </div>
                      </div>

                      <div>
                        {item.is_active ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F6EF] px-2 py-0.5 text-[9px] font-bold text-[#278260] border border-[#a3e4c9]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-200">
                            <XCircle className="w-2.5 h-2.5 text-rose-600" />
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="space-y-1 pt-1 text-[10px]">
                      <div className="flex items-center gap-1.5 text-slate-600 truncate">
                        <Mail className="w-3 h-3 text-[#0F766E] shrink-0" />
                        <span className="truncate font-mono">{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Phone className="w-3 h-3 text-[#0F766E] shrink-0" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="flex items-center justify-between border-t border-teal-100/60 pt-2 mt-2.5 relative z-10">
                    <span className="text-[9px] font-mono text-[#8A9995]">
                      ID: {item.id.substring(0, 6)}...
                    </span>

                    <div className="flex items-center gap-1">
                      {!item.is_active ? (
                        <button
                          onClick={() => handleRestore(item)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-bold shadow-xs transition cursor-pointer active:scale-95"
                          title="Reactivate Account"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reactivate</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setShowViewModal(true);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#596964] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => openEdit(item)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#596964] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                            title="Edit Admin"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setShowDeleteModal(true);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#596964] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer shadow-xs"
                            title="Deactivate Account"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* ============================================================
             ELEVATED 3D GLASS TABLE VIEW
          ============================================================ */
          <div className="overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-xs text-[#263833]">
                <thead>
                  <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB] text-[10px] font-bold uppercase tracking-wider text-[#8A9995]">
                    <th className="py-3.5 px-6">Administrator</th>
                    <th className="py-3.5 px-4">Designation</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Last Login</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F3F2]">
                  {items.map((item) => {
                    const initials = `${item.first_name.charAt(0)}${item.last_name.charAt(0)}`.toUpperCase();
                    return (
                      <tr key={item.id} className={`hover:bg-[#F8FBFA] transition-colors ${!item.is_active ? "bg-rose-50/30" : ""}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-bold shadow-xs ${!item.is_active ? "bg-rose-100 text-rose-700" : "bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white"}`}>
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-[#172522] font-sans text-sm">
                                {item.first_name} {item.last_name}
                              </p>
                              <p className="text-[10px] text-[#8A9995] font-mono">{item.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-semibold text-[#0F766E]">
                          {item.designation}
                        </td>

                        <td className="py-4 px-4 font-mono text-[#53625E]">
                          {item.phone || "—"}
                        </td>

                        <td className="py-4 px-4">
                          {item.is_active ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EF] px-2.5 py-1 text-[9px] font-semibold text-[#278260]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[9px] font-bold text-rose-700 border border-rose-200">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 font-mono text-[11px] text-[#596964]">
                          {item.last_login_at ? new Date(item.last_login_at).toLocaleString() : "Never"}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {!item.is_active ? (
                              <button
                                onClick={() => handleRestore(item)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-[#0F766E]/30 text-xs font-bold transition cursor-pointer"
                                title="Reactivate Account"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reactivate</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowViewModal(true);
                                  }}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openEdit(item)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
                                  title="Edit Admin"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowDeleteModal(true);
                                  }}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                                  title="Deactivate Account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="flex items-center justify-between rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 px-6 py-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
          <p className="text-xs text-[#8A9995]">
            Showing <span className="font-bold text-[#263833]">{items.length}</span> of{" "}
            <span className="font-bold text-[#263833]">{totalCount}</span> administrators
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
          TRANSLUCENT 3D GLASS MODALS
      ============================================================ */}

      {/* 1. View Details Modal (Read) */}
      <AnimatePresence>
        {showViewModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

              <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <UserCheck className="h-6 w-6 text-[#0f766e]" />
                  Administrator: <span className="font-sans text-[#0f766e]">{selectedItem.first_name} {selectedItem.last_name}</span>
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">Profile Information</h3>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Email Address</span>
                      <p className="text-[#132a26] font-mono font-bold mt-1 text-sm">{selectedItem.email}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Designation</span>
                      <p className="text-[#132a26] font-bold mt-1 text-sm">{selectedItem.designation}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Phone</span>
                      <p className="text-[#132a26] font-medium mt-1">{selectedItem.phone || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Status</span>
                      <p className="mt-1 font-bold">
                        {selectedItem.is_active ? (
                          <span className="text-[#278260] font-bold">Active Account</span>
                        ) : (
                          <span className="text-rose-600 font-bold">Inactive Account</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-1">Account Metadata</span>
                    <p className="text-[#596964] font-medium">Created: {new Date(selectedItem.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">ID: {selectedItem.id}</span>
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

      {/* 2. Add / Edit Admin Translucent 3D Glass Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
              <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-5">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-[#0f766e]" />
                  {showAddModal ? "New Administrator Account" : `Edit Admin: ${selectedItem?.first_name} ${selectedItem?.last_name}`}
                </h2>

                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={showAddModal ? handleCreateSubmit : handleEditSubmit} className="space-y-5 relative z-10">
                {/* SECTION 1: PERSONAL DETAILS */}
                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        placeholder="e.g. John"
                        required
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        placeholder="e.g. Smith"
                        required
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: CREDENTIALS & PROFILE */}
                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                    Credentials & Role
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john.smith@medicarehms.com"
                        required
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-mono font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Designation / Title
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="e.g. Platform Super Admin"
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Password {showEditModal && "(Leave blank to keep unchanged)"} {showAddModal && "*"}
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        required={showAddModal}
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="flex items-center gap-2 cursor-pointer text-[#2e4741] font-bold text-xs">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4 rounded text-[#0f766e] focus:ring-[#0f766e]"
                      />
                      <span>Active Access Status</span>
                    </label>
                  </div>
                </div>

                {/* FOOTER ACTION BUTTONS */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-48 py-3 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] hover:from-[#115e59] hover:to-[#0f766e] text-white text-xs font-black shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isSubmitting ? "Saving..." : showAddModal ? "Create Admin" : "Update Admin"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                    className="w-48 py-3 rounded-2xl border border-white/80 bg-white/60 hover:bg-white text-[#35544d] font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Soft Delete / Deactivate Confirmation Translucent 3D Glass Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

              <h3 className="text-lg font-black text-[#132a26]">Deactivate Administrator?</h3>

              <p className="text-xs text-[#52615D] leading-relaxed">
                Are you sure you want to deactivate administrator{" "}
                <span className="font-bold text-[#0F766E]">{selectedItem.first_name} {selectedItem.last_name}</span> (
                {selectedItem.email})?
              </p>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium text-left">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Deactivation Policy Notice:
                </p>
                <p className="mt-0.5 text-[#596964]">
                  This administrator account will be disabled from logging into the platform. Access can be reactivated at any time.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDeactivateConfirm}
                  disabled={isSubmitting}
                  className="w-44 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/30 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Confirm Deactivate"}
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

/* Glass Card 3D Component */
function GlassCard3D({
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