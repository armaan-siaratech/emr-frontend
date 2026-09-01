"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
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
} from "lucide-react";
import { getPatientsApi, PatientItem } from "@/lib/api/patientApi";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<PatientItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // View Mode: 'grid' (3D Colorized Cards) or 'table' (Elevated Glass Table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [gender, setGender] = useState("All Gender");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPatientsApi({
        search: search.trim() || undefined,
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
    }
  }, [search, status, gender, page]);

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
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-3 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs"
              />
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
        ) : patients.length === 0 ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
            <Users className="w-10 h-10 mx-auto text-[#0F766E] mb-3 opacity-60" />
            <h3 className="font-black text-lg text-[#172522]">No Patients Registered</h3>
            <p className="text-xs text-[#63827a] mt-1 max-w-sm mx-auto">
              Click &quot;Register Patient&quot; to add a new patient profile under a facility.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* ============================================================
             3D COLORIZED GLASS CARDS GRID VIEW
          ============================================================ */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {patients.map((item) => (
              <PatientGlassCard key={item.id} patient={item} />
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
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f0] text-xs">
                  {patients.map((p) => (
                    <PatientTableRow key={p.id} patient={p} />
                  ))}
                </tbody>
              </table>
            </div>
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
    </div>
  );
}

function PatientGlassCard({ patient }: { patient: PatientItem }) {
  const fullName = `${patient.first_name} ${patient.middle_name ? patient.middle_name + " " : ""}${patient.last_name}`;
  const initials = `${patient.first_name?.[0] || ""}${patient.last_name?.[0] || ""}`.toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative group rounded-3xl border-2 border-[#7ee8d5]/70 bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-white p-4 shadow-[0_10px_25px_rgba(15,118,110,0.1)] hover:shadow-[0_15px_35px_rgba(15,118,110,0.2)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
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
          <Link
            href={`/admin/patients/${patient.id}`}
            className="text-sm font-black text-[#132a26] hover:text-[#0F766E] transition line-clamp-1 block"
          >
            {fullName}
          </Link>
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

      {/* Footer Bar: Status + View Action */}
      <div className="pt-3 mt-3 border-t border-teal-200/60 flex items-center justify-between gap-2 relative z-10">
        <StatusPill status={patient.status} />

        <Link
          href={`/admin/patients/${patient.id}`}
          className="flex items-center gap-1 text-xs font-black text-[#0F766E] hover:underline"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function PatientTableRow({ patient }: { patient: PatientItem }) {
  const fullName = `${patient.first_name} ${patient.middle_name ? patient.middle_name + " " : ""}${patient.last_name}`;
  const initials = `${patient.first_name?.[0] || ""}${patient.last_name?.[0] || ""}`.toUpperCase();

  return (
    <tr className="hover:bg-teal-50/40 transition">
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
            <Link
              href={`/admin/patients/${patient.id}`}
              className="font-bold text-[#172522] hover:text-[#0F766E] transition block"
            >
              {fullName}
            </Link>
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
        <StatusPill status={patient.status} />
      </td>

      <td className="py-3 px-4 text-right">
        <Link
          href={`/admin/patients/${patient.id}`}
          className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-white border border-[#DFE8E5] text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition shadow-xs"
        >
          <Eye className="w-4 h-4" />
        </Link>
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