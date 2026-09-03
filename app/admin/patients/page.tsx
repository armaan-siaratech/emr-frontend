"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  RefreshCw,
  UserCheck,
  UserX,
  Users,
  Clock,
  Sparkles,
  LayoutGrid,
  List,
  ChevronRight,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  Calendar,
  Hash,
  Eye,
  CreditCard,
  AlertCircle,
  X,
  User,
  MapPin,
  HeartPulse,
  FileText,
  Edit,
  Trash2,
  RotateCcw,
  Save,
  AlertTriangle,
} from "lucide-react";
import {
  getPatientsApi,
  updatePatientApi,
  deletePatientApi,
  restorePatientApi,
  PatientItem,
  PatientUpdateParams,
} from "@/lib/api/patientApi";

export default function AdminPatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<PatientItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // View Mode: 'grid' (3D Colorized Cards) or 'table' (Elevated Glass Table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters & Debouncing
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [gender, setGender] = useState("All Gender");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Action States
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Edit Form State
  const [editFormData, setEditFormData] = useState<PatientUpdateParams>({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "Female",
    date_of_birth: "",
    phone: "",
    email: "",
    address_line1: "",
    city: "",
    state: "",
    postal_code: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    insurance_provider: "",
    insurance_policy_number: "",
    status: "Active",
  });

  const openViewModal = (patient: PatientItem) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const openEditModal = (patient: PatientItem) => {
    router.push(`/admin/patients/${patient.id}/edit`);
  };

  const openDeleteModal = (patient: PatientItem) => {
    setSelectedPatient(patient);
    setShowDeleteModal(true);
  };

  // Confirm Soft Delete / Suspend
  const handleConfirmDelete = async () => {
    if (!selectedPatient) return;
    setIsSubmitting(true);
    try {
      await deletePatientApi(selectedPatient.id);
      showToast(`Patient profile for '${selectedPatient.first_name} ${selectedPatient.last_name}' has been soft-deleted.`);
      setShowDeleteModal(false);
      setSelectedPatient(null);
      await fetchPatients();
    } catch (err: any) {
      showToast(err?.message || "Failed to soft-delete patient profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Restore Patient Profile
  const handleRestore = async (patient: PatientItem) => {
    setIsSubmitting(true);
    try {
      await restorePatientApi(patient.id);
      showToast(`Patient profile '${patient.first_name} ${patient.last_name}' restored to Active status!`);
      if (showViewModal) setShowViewModal(false);
      await fetchPatients();
    } catch (err: any) {
      showToast(err?.message || "Failed to restore patient profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth Search Debouncing (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const isInitialFetch = useRef(true);

  const fetchPatients = useCallback(async () => {
    if (isInitialFetch.current) {
      setLoading(true);
    } else {
      setIsFetching(true);
    }

    try {
      const data = await getPatientsApi({
        search: debouncedSearch.trim() || undefined,
        status: status !== "All Status" ? status : undefined,
        gender: gender !== "All Gender" ? gender : undefined,
        page,
        page_size: 16,
      });

      setPatients(data.items);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
      setIsFetching(false);
      isInitialFetch.current = false;
    }
  }, [debouncedSearch, status, gender, page]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const activePatients = patients.filter((p) => p.status === "Active").length;
  const pendingPatients = patients.filter((p) => p.status === "Pending").length;
  const inactivePatients = patients.filter((p) => p.status === "Inactive").length;

  return (
    <div className="w-full space-y-6 font-sans pb-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl"
          >
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Ultra-3D Glass Header Bar */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-6 py-4 shadow-xl text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#7ee8d5]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Link href="/admin" className="hover:text-white transition">
                Administration
              </Link>
              <span>/</span>
              <span className="text-white">Patients Directory</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-1">
              <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
              Patient Records & Profiles
            </h1>
            <p className="text-xs text-teal-100/90 mt-0.5 max-w-xl">
              Multi-tenant clinical patient registry with AWS S3 photo avatars and unique MRN verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/patients/create"
              className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-[#0F766E] shadow-md hover:bg-teal-50 hover:shadow-lg transition cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#0F766E]" />
              <span>Register Patient</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Vibrant 3D Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassSummaryCard
          title="Total Registered"
          value={total.toLocaleString()}
          subtitle="System wide records"
          icon={<Users className="w-5 h-5 text-teal-700" />}
          gradient="from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
          badge="bg-teal-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(15,118,110,0.15)]"
        />

        <GlassSummaryCard
          title="Active Patients"
          value={activePatients.toLocaleString()}
          subtitle="Currently under care"
          icon={<UserCheck className="w-5 h-5 text-emerald-700" />}
          gradient="from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
          badge="bg-emerald-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
        />

        <GlassSummaryCard
          title="Pending Review"
          value={pendingPatients.toLocaleString()}
          subtitle="Awaiting charting"
          icon={<Clock className="w-5 h-5 text-amber-700" />}
          gradient="from-amber-50/90 via-amber-100/40 to-orange-50/60 border-amber-300/60"
          badge="bg-amber-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(245,158,11,0.15)]"
        />

        <GlassSummaryCard
          title="Inactive Patients"
          value={inactivePatients.toLocaleString()}
          subtitle="Archived accounts"
          icon={<UserX className="w-5 h-5 text-rose-700" />}
          gradient="from-rose-50/90 via-rose-100/40 to-slate-50/60 border-rose-300/60"
          badge="bg-rose-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(244,63,94,0.15)]"
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
                placeholder="Search patient name, MRN, phone, or email..."
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-9 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs"
              />
              {isFetching && (
                <RefreshCw className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#0F766E]" />
              )}
            </div>

            {/* Gender Filter */}
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full sm:w-auto rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none focus:border-[#0F766E] font-medium shadow-xs"
            >
              <option value="All Gender">All Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full sm:w-auto rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none focus:border-[#0F766E] font-medium shadow-xs"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
              <option value="Soft-Deleted">Soft-Deleted</option>
            </select>

            {(search || status !== "All Status" || gender !== "All Gender") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatus("All Status");
                  setGender("All Gender");
                  setPage(1);
                }}
                className="text-xs font-bold text-[#0F766E] hover:underline px-2 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center rounded-2xl border border-[#DFE8E5] bg-[#FAFCFB] p-1 shadow-inner">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                    : "text-[#596964] hover:text-[#0F766E]"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards View</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  viewMode === "table"
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                    : "text-[#596964] hover:text-[#0F766E]"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>

            <button
              onClick={() => {
                fetchPatients();
                showToast("Refreshed live patient records!");
              }}
              className="p-2.5 rounded-2xl border border-[#DFE8E5] bg-white hover:bg-[#EAF5F2] hover:text-[#0F766E] text-[#596964] transition cursor-pointer shadow-xs"
              title="Refresh Patients"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#0F766E]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Display Content: Grid vs Table */}
        {loading ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
            <p className="font-bold text-[#172522]">Loading live patient profiles from server...</p>
          </div>
        ) : (
          <div className={`transition-opacity duration-200 ${isFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
            {patients.length === 0 ? (
              <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
                <Users className="w-10 h-10 mx-auto text-[#0F766E] mb-3 opacity-60" />
                <h3 className="font-black text-lg text-[#172522]">No Patients Found</h3>
                <p className="text-xs text-[#63827a] mt-1 max-w-sm mx-auto">
                  {search || status !== "All Status" || gender !== "All Gender"
                    ? `No patient profiles match your filter criteria. Try resetting search.`
                    : 'Click "Register Patient" to add a new patient profile under a facility.'}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              /* ============================================================
                 3D COLORIZED GLASS CARDS GRID VIEW
              ============================================================ */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {patients.map((item) => (
                  <PatientGlassCard
                    key={item.id}
                    patient={item}
                    onView={openViewModal}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    onRestore={handleRestore}
                  />
                ))}
              </div>
            ) : (
              /* ============================================================
                 ELEVATED GLASS TABLE VIEW
              ============================================================ */
              <div className="overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#DFE8E5] bg-gradient-to-r from-teal-50/80 to-emerald-50/80 text-[11px] font-black text-[#0F766E] uppercase tracking-wider">
                        <th className="py-3.5 px-4">Patient Profile</th>
                        <th className="py-3.5 px-4">Unique MRN</th>
                        <th className="py-3.5 px-4">Gender / DOB</th>
                        <th className="py-3.5 px-4">Insurance</th>
                        <th className="py-3.5 px-4">Emergency Contact</th>
                        <th className="py-3.5 px-4">Registered</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf2f0] text-xs">
                      {patients.map((p) => (
                        <PatientTableRow
                          key={p.id}
                          patient={p}
                          onView={openViewModal}
                          onEdit={openEditModal}
                          onDelete={openDeleteModal}
                          onRestore={handleRestore}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && patients.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl border border-[#DFE8E5] bg-white p-4 shadow-xs text-xs text-[#596964]">
            <span>
              Page <strong className="text-[#172522]">{page}</strong> of{" "}
              <strong className="text-[#172522]">{totalPages}</strong> ({total} records)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-xl border border-[#DFE8E5] bg-white px-3 py-1.5 font-bold text-[#596964] disabled:opacity-40 hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-xl border border-[#DFE8E5] bg-white px-3 py-1.5 font-bold text-[#596964] disabled:opacity-40 hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3D Colorized Patient View Glass Modal (Matching Tenant View Modal) */}
      <AnimatePresence>
        {showViewModal && selectedPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop overlay (Does NOT close on outside click) */}
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
              className="relative w-full max-w-2xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/90 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              {/* Ambient cyan corner highlights */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

              {/* Modal Header */}
              <div className="relative flex items-center justify-between border-b border-teal-200/60 pb-4 mb-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <User className="h-6 w-6 text-[#0f766e]" />
                  Patient Record: <span className="text-[#0f766e]">{selectedPatient.first_name} {selectedPatient.last_name}</span>
                </h2>

                <button
                  onClick={() => setShowViewModal(false)}
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs relative z-10">
                {/* Avatar & Key Banner */}
                <div className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-2xl border-2 border-[#0F766E] bg-teal-50 overflow-hidden flex items-center justify-center font-black text-lg text-[#0F766E]">
                    {selectedPatient.image_url ? (
                      <img
                        src={selectedPatient.image_url}
                        alt={`${selectedPatient.first_name} ${selectedPatient.last_name}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      `${selectedPatient.first_name?.[0] || ""}${selectedPatient.last_name?.[0] || ""}`.toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-black text-[#132a26]">
                        {selectedPatient.first_name} {selectedPatient.middle_name ? selectedPatient.middle_name + " " : ""}{selectedPatient.last_name}
                      </h3>
                      <StatusPill status={selectedPatient.status} />
                    </div>
                    <p className="text-[#0F766E] text-xs font-mono font-bold mt-0.5">
                      MRN Code: {selectedPatient.mrn}
                    </p>
                  </div>
                </div>

                {/* Patient Demographics */}
                <div className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2">Demographics & Profile Overview</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Gender</span>
                      <p className="text-[#132a26] font-bold text-xs mt-0.5">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Date of Birth</span>
                      <p className="text-[#132a26] font-mono font-bold text-xs mt-0.5">{selectedPatient.date_of_birth}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Record Status</span>
                      <p className="text-[#132a26] font-bold text-xs mt-0.5">{selectedPatient.status}</p>
                    </div>
                  </div>
                </div>

                {/* Contact & Address */}
                <div className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2 font-sans">Contact & Residential Address</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Phone Number</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">{selectedPatient.phone || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Email Address</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">{selectedPatient.email || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Address</span>
                      <p className="text-[#132a26] font-medium text-xs mt-0.5">
                        {selectedPatient.address || "N/A"}{selectedPatient.city ? `, ${selectedPatient.city}` : ""}{selectedPatient.state ? `, ${selectedPatient.state}` : ""}{selectedPatient.zip_code ? ` ${selectedPatient.zip_code}` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Insurance & Emergency Contact */}
                <div className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2">Insurance & Emergency Contact</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Insurance Provider</span>
                      <p className="text-[#132a26] font-bold text-xs mt-0.5">{selectedPatient.insurance_provider || "Self Pay"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Policy Number</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">{selectedPatient.insurance_policy_number || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Emergency Contact</span>
                      <p className="text-[#132a26] font-medium text-xs mt-0.5">{selectedPatient.emergency_contact_name || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Emergency Phone</span>
                      <p className="text-[#132a26] font-mono text-xs mt-0.5">{selectedPatient.emergency_contact_phone || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
                <Link
                  href={`/admin/patients/${selectedPatient.id}`}
                  className="px-5 py-3 rounded-2xl bg-[#0F766E] hover:bg-[#0c5c56] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Full EMR Chart</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setShowViewModal(false);
                    router.push(`/admin/patients/${selectedPatient.id}/edit`);
                  }}
                  className="px-5 py-3 rounded-2xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit className="w-4 h-4 text-amber-700" />
                  <span>Edit Profile</span>
                </button>

                {selectedPatient.is_deleted || selectedPatient.status === "Inactive" ? (
                  <button
                    type="button"
                    onClick={() => handleRestore(selectedPatient)}
                    className="px-5 py-3 rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-emerald-700" />
                    <span>Restore Record</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowViewModal(false);
                      openDeleteModal(selectedPatient);
                    }}
                    className="px-5 py-3 rounded-2xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4 text-rose-700" />
                    <span>Soft Delete</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="px-5 py-3 rounded-2xl border border-white/80 bg-white/60 hover:bg-white text-[#35544d] font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      {/* 3. Soft-Delete / Suspend Patient Glass Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedPatient && (
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

              <h3 className="text-lg font-black text-[#132a26]">Soft-Delete Patient Profile</h3>

              <p className="text-xs text-[#52615D] leading-relaxed">
                Are you sure you want to soft-delete patient record for{" "}
                <span className="font-bold text-[#0F766E]">
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </span>{" "}
                (MRN: <span className="font-mono font-bold">{selectedPatient.mrn}</span>)?
              </p>

              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium text-left">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  HIPAA Record Retention Policy:
                </p>
                <p className="mt-0.5 text-[#596964]">
                  This profile will be marked as soft-deleted. Clinical history is preserved for compliance auditing and can be restored at any time by an Admin.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleConfirmDelete}
                  disabled={isSubmitting}
                  className="w-44 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/30 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Confirm Soft-Delete"}
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

function PatientGlassCard({
  patient,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: {
  patient: PatientItem;
  onView: (patient: PatientItem) => void;
  onEdit: (patient: PatientItem) => void;
  onDelete: (patient: PatientItem) => void;
  onRestore: (patient: PatientItem) => void;
}) {
  const fullName = `${patient.first_name} ${patient.middle_name ? patient.middle_name + " " : ""}${patient.last_name}`;
  const initials = `${patient.first_name?.[0] || ""}${patient.last_name?.[0] || ""}`.toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative group rounded-3xl border-2 border-[#7ee8d5]/70 bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-white p-4 shadow-[0_10px_25px_rgba(15,118,110,0.1)] hover:shadow-[0_15px_35px_rgba(15,118,110,0.2)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden cursor-pointer"
      onClick={() => onView(patient)}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7ee8d5]/30 blur-xl group-hover:bg-[#0f766e]/20 transition-all duration-300" />

      <div className="space-y-3 relative z-10">
        {/* Top: Avatar + MRN Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0F766E] bg-white shadow-xs">
            {patient.image_url ? (
              <img src={patient.image_url} alt={fullName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-black text-xs text-[#0F766E]">
                {initials}
              </div>
            )}
          </div>

          <span className="bg-gradient-to-r from-[#0F766E] to-[#115e59] text-white shadow-xs font-mono font-black text-xs px-2.5 py-1 rounded-xl flex items-center gap-1 border border-teal-400/40">
            <Hash className="w-3 h-3 text-teal-200" />
            {patient.mrn}
          </span>
        </div>

        {/* Patient Name */}
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView(patient);
            }}
            className="text-sm font-black text-[#132a26] hover:text-[#0F766E] transition line-clamp-1 block text-left cursor-pointer"
          >
            {fullName}
          </button>
          <div className="flex items-center gap-1 text-[11px] text-[#63827a] mt-0.5 font-medium">
            <span>{patient.gender}</span>
            <span>•</span>
            <span>DOB: {patient.date_of_birth}</span>
          </div>
        </div>

        {/* Quick Details */}
        <div className="space-y-1 text-[11px] text-[#4d6660] bg-white/70 p-2.5 rounded-2xl border border-teal-200/50 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#0F766E]" />
            <span className="truncate">{patient.phone}</span>
          </div>
          {patient.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#0F766E]" />
              <span className="truncate">{patient.email}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-3 h-3 text-[#0F766E]" />
            <span className="truncate font-semibold">{patient.insurance_provider || "Self Pay"}</span>
          </div>
        </div>
      </div>

      {/* Footer Bar: Status + Actions */}
      <div className="pt-3 mt-3 border-t border-teal-200/60 flex items-center justify-between gap-2 relative z-10">
        <StatusPill status={patient.is_deleted ? "Soft-Deleted" : patient.status} />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView(patient);
            }}
            className="p-1.5 rounded-lg bg-teal-50 hover:bg-[#0F766E] text-[#0F766E] hover:text-white transition cursor-pointer"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(patient);
            }}
            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white transition cursor-pointer"
            title="Edit Profile"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>

          {patient.is_deleted || patient.status === "Inactive" ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRestore(patient);
              }}
              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition cursor-pointer"
              title="Restore Patient"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(patient);
              }}
              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white transition cursor-pointer"
              title="Soft Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PatientTableRow({
  patient,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: {
  patient: PatientItem;
  onView: (patient: PatientItem) => void;
  onEdit: (patient: PatientItem) => void;
  onDelete: (patient: PatientItem) => void;
  onRestore: (patient: PatientItem) => void;
}) {
  const fullName = `${patient.first_name} ${patient.middle_name ? patient.middle_name + " " : ""}${patient.last_name}`;
  const initials = `${patient.first_name?.[0] || ""}${patient.last_name?.[0] || ""}`.toUpperCase();

  return (
    <tr className="hover:bg-teal-50/40 transition cursor-pointer" onClick={() => onView(patient)}>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-[#0F766E]/40 bg-teal-50 flex items-center justify-center font-bold text-xs text-[#0F766E]">
            {patient.image_url ? (
              <img src={patient.image_url} alt={fullName} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onView(patient);
              }}
              className="font-bold text-[#172522] hover:text-[#0F766E] transition block text-left cursor-pointer"
            >
              {fullName}
            </button>
            <span className="text-[10px] text-[#71807c] block">{patient.phone}</span>
          </div>
        </div>
      </td>

      <td className="py-3 px-4">
        <span className="bg-teal-50 text-[#0F766E] border border-teal-200/80 font-mono font-bold text-[11px] px-2.5 py-1 rounded-xl">
          {patient.mrn}
        </span>
      </td>

      <td className="py-3 px-4 text-[#596964]">
        <div className="font-semibold">{patient.gender}</div>
        <div className="text-[10px] text-[#8a9691]">DOB: {patient.date_of_birth}</div>
      </td>

      <td className="py-3 px-4 text-[#596964]">
        <div className="font-semibold">{patient.insurance_provider || "Self Pay"}</div>
        {patient.insurance_policy_number && (
          <div className="text-[10px] font-mono text-[#8a9691]">#{patient.insurance_policy_number}</div>
        )}
      </td>

      <td className="py-3 px-4 text-[#596964]">
        <div>{patient.emergency_contact_name || "—"}</div>
        <div className="text-[10px] text-[#8a9691]">{patient.emergency_contact_phone || ""}</div>
      </td>

      <td className="py-3 px-4 text-[#596964] font-medium">
        {new Date(patient.created_at).toLocaleDateString()}
      </td>

      <td className="py-3 px-4">
        <StatusPill status={patient.is_deleted ? "Soft-Deleted" : patient.status} />
      </td>

      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView(patient);
            }}
            className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-white border border-[#DFE8E5] text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition shadow-xs cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(patient);
            }}
            className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-white border border-[#DFE8E5] text-amber-700 hover:bg-amber-600 hover:text-white transition shadow-xs cursor-pointer"
            title="Edit Profile"
          >
            <Edit className="w-4 h-4" />
          </button>

          {patient.is_deleted || patient.status === "Inactive" ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRestore(patient);
              }}
              className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-white border border-[#DFE8E5] text-emerald-700 hover:bg-emerald-600 hover:text-white transition shadow-xs cursor-pointer"
              title="Restore Record"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(patient);
              }}
              className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-white border border-[#DFE8E5] text-rose-700 hover:bg-rose-600 hover:text-white transition shadow-xs cursor-pointer"
              title="Soft Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function GlassSummaryCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
  shadow,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  badge?: string;
  shadow: string;
}) {
  return (
    <div
      className={`rounded-3xl border-2 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 ${gradient} ${shadow} backdrop-blur-xl flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#63827a] block">
            {title}
          </span>
          <span className="text-2xl font-black text-[#132a26] tracking-tight mt-1 block">
            {value}
          </span>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/80 border border-white/90 shadow-xs">
          {icon}
        </div>
      </div>
      <p className="text-[11px] font-medium text-[#596964] mt-2">{subtitle}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const isActive = status === "Active";
  const isPending = status === "Pending";

  const style = isActive
    ? "bg-[#E7F6EF] text-[#278260] border-[#a3e4c9]"
    : isPending
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}