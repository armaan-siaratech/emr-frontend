"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
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
  User as UserIcon,
  Stethoscope,
  Activity,
  CalendarClock,
  DollarSign,
  Award,
  FileText,
  Video,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { getFacilitiesApi, FacilityRecordItem } from "@/lib/api/facilityApi";

export type UserStatus = "Active" | "Inactive" | "Pending";
export type StaffRole = "Doctor" | "Nurse" | "Receptionist" | "Billing Staff";

export type StaffUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: string;
  employeeId: string;
  status: UserStatus;
  lastLogin: string;
  initials: string;

  // Facility Relationships
  primaryFacilityName: string;
  primaryFacilityCode: string;
  secondaryFacilityNames?: string[];

  // Provider (Doctor) specific data
  npiNumber?: string;
  medicalLicense?: string;
  specialty?: string;
  deaNumber?: string;
  credentials?: string;
  consultationFee?: string;

  // Nurse specific data
  nursingLicense?: string;
  nurseType?: string;
  assignedWard?: string;
  shiftPattern?: string;

  // Scheduler / Receptionist specific data
  receptionStation?: string;
  extensionLine?: string;
  bookingClearance?: string;
};

const initialStaffUsers: StaffUser[] = [
  {
    id: "USR-1001",
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@healthcare.com",
    phone: "+1 (555) 234-5678",
    role: "Doctor",
    department: "Cardiology",
    employeeId: "DOC-1001",
    status: "Active",
    lastLogin: "Today, 09:42 AM",
    initials: "SM",
    primaryFacilityName: "Central Medical Center",
    primaryFacilityCode: "CMC-MAIN",
    secondaryFacilityNames: ["Downtown OPD Branch", "Westside Urgent Care"],
    npiNumber: "1948201948",
    medicalLicense: "LIC-92841 (CA)",
    specialty: "Cardiovascular Disease",
    deaNumber: "BS9281923",
    credentials: "MD, FACC",
    consultationFee: "$180",
  },
  {
    id: "USR-1002",
    name: "Dr. Michael Anderson",
    email: "michael.anderson@healthcare.com",
    phone: "+1 (555) 345-6789",
    role: "Doctor",
    department: "Internal Medicine",
    employeeId: "DOC-1002",
    status: "Active",
    lastLogin: "Today, 08:18 AM",
    initials: "MA",
    primaryFacilityName: "Central Medical Center",
    primaryFacilityCode: "CMC-MAIN",
    secondaryFacilityNames: ["Downtown OPD Branch"],
    npiNumber: "1837492817",
    medicalLicense: "LIC-73825 (CA)",
    specialty: "Internal Medicine",
    deaNumber: "BA7381920",
    credentials: "MD",
    consultationFee: "$150",
  },
  {
    id: "USR-1003",
    name: "James Wilson, RN",
    email: "james.wilson@healthcare.com",
    phone: "+1 (555) 456-7890",
    role: "Nurse",
    department: "Emergency / Triage",
    employeeId: "NUR-2001",
    status: "Active",
    lastLogin: "Today, 07:55 AM",
    initials: "JW",
    primaryFacilityName: "Central Medical Center",
    primaryFacilityCode: "CMC-MAIN",
    secondaryFacilityNames: ["Westside Urgent Care"],
    nursingLicense: "RN-829142",
    nurseType: "BSN, RN, ER-Certified",
    assignedWard: "ER Triage Bay 2",
    shiftPattern: "Day Shift (07:00 - 19:00)",
  },
  {
    id: "USR-1004",
    name: "Olivia Martin",
    email: "olivia.martin@healthcare.com",
    phone: "+1 (555) 567-8901",
    role: "Receptionist",
    department: "Front Desk & Scheduling",
    employeeId: "REC-3001",
    status: "Active",
    lastLogin: "Today, 08:47 AM",
    initials: "OM",
    primaryFacilityName: "Downtown OPD Branch",
    primaryFacilityCode: "CMC-OPD",
    receptionStation: "Station 1 - Main Lobby",
    extensionLine: "x401",
    bookingClearance: "Full Booking & Overbook Rights",
  },
  {
    id: "USR-1005",
    name: "Emma Davis",
    email: "emma.davis@healthcare.com",
    phone: "+1 (555) 678-9012",
    role: "Billing Staff",
    department: "Claims & Finance",
    employeeId: "BIL-4001",
    status: "Active",
    lastLogin: "Today, 10:12 AM",
    initials: "ED",
    primaryFacilityName: "Central Medical Center",
    primaryFacilityCode: "CMC-MAIN",
  },
  {
    id: "USR-1006",
    name: "Dr. Emily Carter",
    email: "emily.carter@healthcare.com",
    phone: "+1 (555) 789-0123",
    role: "Doctor",
    department: "Pediatrics",
    employeeId: "DOC-1003",
    status: "Active",
    lastLogin: "Yesterday, 05:26 PM",
    initials: "EC",
    primaryFacilityName: "Children's Specialty Clinic",
    primaryFacilityCode: "CSC-PEDS",
    secondaryFacilityNames: ["Central Medical Center"],
    npiNumber: "1726354819",
    medicalLicense: "LIC-65172 (CA)",
    specialty: "General Pediatrics",
    credentials: "MD, FAAP",
    consultationFee: "$160",
  },
  {
    id: "USR-1007",
    name: "Jessica Williams, LPN",
    email: "jessica.williams@healthcare.com",
    phone: "+1 (555) 890-1234",
    role: "Nurse",
    department: "Pediatric Care",
    employeeId: "NUR-2002",
    status: "Active",
    lastLogin: "Today, 09:10 AM",
    initials: "JW",
    primaryFacilityName: "Children's Specialty Clinic",
    primaryFacilityCode: "CSC-PEDS",
    nursingLicense: "LPN-67291",
    nurseType: "LPN",
    assignedWard: "Pediatric Ward 4A",
    shiftPattern: "Morning Shift (08:00 - 16:30)",
  },
];

export default function AdminUsersPage() {
  const [staffList, setStaffList] = useState<StaffUser[]>(initialStaffUsers);
  const [facilitiesList, setFacilitiesList] = useState<FacilityRecordItem[]>([]);
  const [facilityFilter, setFacilityFilter] = useState<string>("All Facilities");

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters & Debounced Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All Staff");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");

  // View Modal State
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffUser | null>(null);

  useEffect(() => {
    getFacilitiesApi()
      .then((data) => {
        if (data) setFacilitiesList(data);
      })
      .catch((err) => console.error("Could not fetch facilities:", err));
  }, []);

  // Search debouncing (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredStaff = useMemo(() => {
    return staffList.filter((item) => {
      // Facility Filter
      if (facilityFilter !== "All Facilities") {
        const matchesPrimary = item.primaryFacilityName === facilityFilter;
        const matchesSecondary = item.secondaryFacilityNames?.includes(facilityFilter);
        if (!matchesPrimary && !matchesSecondary) return false;
      }
      // Role Filter
      if (roleFilter !== "All Staff" && item.role !== roleFilter) {
        return false;
      }
      // Status Filter
      if (statusFilter !== "All Status" && item.status !== statusFilter) {
        return false;
      }
      // Search
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchEmail = item.email.toLowerCase().includes(query);
        const matchEmpId = item.employeeId.toLowerCase().includes(query);
        const matchDept = item.department.toLowerCase().includes(query);
        const matchNpi = item.npiNumber?.toLowerCase().includes(query);
        const matchLicense = item.medicalLicense?.toLowerCase().includes(query) || item.nursingLicense?.toLowerCase().includes(query);
        const matchFacility = item.primaryFacilityName.toLowerCase().includes(query);
        return matchName || matchEmail || matchEmpId || matchDept || matchNpi || matchLicense || matchFacility;
      }
      return true;
    });
  }, [staffList, roleFilter, statusFilter, facilityFilter, debouncedSearch]);

  const openViewModal = (staff: StaffUser) => {
    setSelectedStaff(staff);
    setShowViewModal(true);
  };

  // Role Counts
  const totalCount = staffList.length;
  const doctorCount = staffList.filter((s) => s.role === "Doctor").length;
  const nurseCount = staffList.filter((s) => s.role === "Nurse").length;
  const schedulerCount = staffList.filter((s) => s.role === "Receptionist").length;
  const billingCount = staffList.filter((s) => s.role === "Billing Staff").length;

  return (
    <div className="w-full space-y-6 font-sans pb-16">
      {/* Sleek Command Header Bar */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0c4f4a] p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.25)] text-white backdrop-blur-3xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7ee8d5]/25 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Link href="/admin" className="hover:text-white transition">Admin</Link>
              <span>/</span>
              <span className="text-white font-black">Staff Command Hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-1">
              <Zap className="w-6 h-6 text-teal-300 animate-pulse" />
              Tenant Staff & Multi-Facility Providers Directory
            </h1>
            <p className="text-xs text-teal-100/90 mt-1 font-medium">
              Manage Doctors (Providers), Nurses, Front Desk Schedulers, and Billing Specialists with primary & secondary facility relationships.
            </p>
          </div>

          <Link
            href="/admin/users/new"
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-xs font-black text-[#0F766E] shadow-xl hover:bg-teal-50 hover:shadow-2xl transition cursor-pointer active:scale-95 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#0F766E]" />
            <span>Add New Staff / Provider</span>
          </Link>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassSummaryCard title="Total Staff" value={totalCount} icon={Users} color="text-teal-700" bg="bg-teal-50" />
        <GlassSummaryCard title="Providers (Doctors)" value={doctorCount} icon={Stethoscope} color="text-[#0F766E]" bg="bg-[#0F766E]/10" />
        <GlassSummaryCard title="Clinical Nurses" value={nurseCount} icon={Activity} color="text-blue-700" bg="bg-blue-50" />
        <GlassSummaryCard title="Schedulers & Front Desk" value={schedulerCount} icon={CalendarClock} color="text-amber-700" bg="bg-amber-50" />
      </div>

      {/* Role Navigation Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { label: "All Staff", count: totalCount },
          { label: "Doctor", count: doctorCount, text: "Providers (Doctors)" },
          { label: "Nurse", count: nurseCount, text: "Clinical Nurses" },
          { label: "Receptionist", count: schedulerCount, text: "Schedulers & Front Desk" },
          { label: "Billing Staff", count: billingCount, text: "Billing & Claims" },
        ].map((tab) => {
          const isActive = roleFilter === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setRoleFilter(tab.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shrink-0 ${
                isActive
                  ? "bg-[#0F766E] text-white shadow-md"
                  : "bg-white border border-[#DFE8E5] text-[#596964] hover:bg-teal-50/60 hover:text-[#0F766E]"
              }`}
            >
              <span>{tab.text || tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-xl font-mono ${isActive ? "bg-white/20 text-white" : "bg-teal-50 text-[#0F766E]"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Multi-Facility Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F766E]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search NPI, License #, Name, Facility..."
            className="w-full h-10 rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-4 text-xs font-semibold text-[#172522] placeholder-[#71807c] outline-none focus:border-[#0F766E] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Facility Filter */}
          <select
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
            className="h-10 rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-bold text-[#35544d] outline-none focus:border-[#0F766E] shadow-xs"
          >
            <option value="All Facilities">🏢 All Practice Facilities</option>
            <option value="Central Medical Center">Central Medical Center</option>
            <option value="Downtown OPD Branch">Downtown OPD Branch</option>
            <option value="Children's Specialty Clinic">Children's Specialty Clinic</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-bold text-[#596964] outline-none focus:border-[#0F766E] shadow-xs"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex items-center rounded-2xl border border-[#DFE8E5] bg-white p-1 shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-xl transition ${viewMode === "grid" ? "bg-[#0F766E] text-white" : "text-[#596964]"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-xl transition ${viewMode === "table" ? "bg-[#0F766E] text-white" : "text-[#596964]"}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid vs Table Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStaff.map((staff) => (
            <StaffGlassCard key={staff.id} staff={staff} onView={openViewModal} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DFE8E5] bg-gradient-to-r from-teal-50/80 to-emerald-50/80 text-[11px] font-black text-[#0F766E] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Role & Specialty</th>
                  <th className="py-3.5 px-4">Primary Facility</th>
                  <th className="py-3.5 px-4">NPI / License #</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f0] text-xs">
                {filteredStaff.map((s) => (
                  <tr key={s.id} className="hover:bg-teal-50/40 transition cursor-pointer" onClick={() => openViewModal(s)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-[#0F766E]/40 bg-teal-50 flex items-center justify-center font-bold text-xs text-[#0F766E]">
                          {s.initials}
                        </div>
                        <div>
                          <span className="font-bold text-[#172522] block">{s.name}</span>
                          <span className="text-[10px] text-[#71807c] block">{s.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-[#172522]">{s.role}</div>
                      <div className="text-[10px] text-[#63827a]">{s.specialty || s.nurseType || s.department}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-[#0F766E] flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
                        <span>{s.primaryFacilityName}</span>
                      </div>
                      {s.secondaryFacilityNames && s.secondaryFacilityNames.length > 0 && (
                        <span className="text-[10px] text-[#63827a] font-mono block">
                          + {s.secondaryFacilityNames.length} Secondary Branches
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[11px] text-[#0F766E]">
                      {s.npiNumber ? `NPI: ${s.npiNumber}` : s.nursingLicense ? `RN: ${s.nursingLicense}` : s.receptionStation || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${s.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                        {s.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openViewModal(s);
                        }}
                        className="p-1.5 rounded-lg bg-teal-50 text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3D Glass Profile Detail Modal */}
      <AnimatePresence>
        {showViewModal && selectedStaff && (
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
              className="relative w-full max-w-2xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              <div className="relative flex items-center justify-between border-b border-teal-200/60 pb-4">
                <h2 className="text-xl font-black text-[#132a26] flex items-center gap-2">
                  <UserIcon className="h-6 w-6 text-[#0f766e]" />
                  Staff Profile: <span className="text-[#0f766e]">{selectedStaff.name}</span>
                </h2>

                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[#35544d] hover:bg-white transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Header Banner */}
                <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 to-emerald-50/40 p-4 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-2xl border-2 border-[#0F766E] bg-white flex items-center justify-center font-black text-base text-[#0F766E] shadow-xs">
                    {selectedStaff.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#132a26]">{selectedStaff.name}</h3>
                    <p className="text-[#0F766E] font-bold text-xs">{selectedStaff.role} • {selectedStaff.department}</p>
                    <p className="text-[11px] text-[#63827a] font-mono mt-0.5">Staff ID: {selectedStaff.employeeId}</p>
                  </div>
                </div>

                {/* Facility Relationships Breakdown */}
                <div className="rounded-2xl border border-amber-300/80 bg-amber-50/60 p-4 space-y-2">
                  <span className="text-amber-900 font-black text-xs uppercase tracking-wider block flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-amber-600" /> Facility Relationships & Practice Locations
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-amber-900 font-bold">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>Primary Home Facility: <strong className="text-[#0F766E] font-extrabold">{selectedStaff.primaryFacilityName}</strong> ({selectedStaff.primaryFacilityCode})</span>
                    </div>

                    {selectedStaff.secondaryFacilityNames && selectedStaff.secondaryFacilityNames.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-[#63827a] uppercase block mb-1">Secondary Practice Branches:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedStaff.secondaryFacilityNames.map((facName) => (
                            <span key={facName} className="bg-white border border-teal-200 text-[#0F766E] font-bold text-[10px] px-2.5 py-1 rounded-xl shadow-2xs">
                              🏢 {facName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Specific Panel Highlights */}
                {selectedStaff.role === "Doctor" && (
                  <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4 space-y-2">
                    <span className="text-[#0F766E] font-black text-xs uppercase tracking-wider block">
                      🩺 Physician Credentials & Licensing
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">NPI Number</span>
                        <p className="font-mono font-bold text-[#132a26]">{selectedStaff.npiNumber || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Medical License</span>
                        <p className="font-bold text-[#132a26]">{selectedStaff.medicalLicense || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Specialty</span>
                        <p className="font-bold text-[#132a26]">{selectedStaff.specialty || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">DEA Reg #</span>
                        <p className="font-mono font-bold text-[#132a26]">{selectedStaff.deaNumber || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Degree</span>
                        <p className="font-bold text-[#132a26]">{selectedStaff.credentials || "MD"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Consult Fee</span>
                        <p className="font-bold text-[#0F766E]">{selectedStaff.consultationFee || "$180"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStaff.role === "Nurse" && (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 space-y-2">
                    <span className="text-sky-800 font-black text-xs uppercase tracking-wider block">
                      💉 Nursing License & Ward Assignment
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Nursing License</span>
                        <p className="font-mono font-bold text-[#132a26]">{selectedStaff.nursingLicense || "RN-82914"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Cadre</span>
                        <p className="font-bold text-[#132a26]">{selectedStaff.nurseType || "RN"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Assigned Ward</span>
                        <p className="font-bold text-[#132a26]">{selectedStaff.assignedWard || "ER Ward"}</p>
                      </div>
                      <div>
                        <span className="text-[#63827a] font-bold block text-[10px] uppercase">Shift Pattern</span>
                        <p className="font-bold text-[#132a26]">{selectedStaff.shiftPattern || "Day Shift"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                  <span className="text-[#35544d] font-bold text-xs uppercase tracking-wider block">Contact Information</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Email</span>
                      <p className="font-mono text-[#132a26] text-xs">{selectedStaff.email}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase">Phone</span>
                      <p className="font-mono text-[#132a26] text-xs">{selectedStaff.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2.5 rounded-2xl bg-[#0F766E] text-white font-bold text-xs shadow-sm hover:bg-[#0c5c56] transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlassSummaryCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl flex items-center justify-between">
      <div>
        <span className="text-[11px] font-bold text-[#63827a] block uppercase tracking-wider">{title}</span>
        <span className={`text-2xl font-black ${color} mt-0.5 block font-mono`}>{value}</span>
      </div>
      <div className={`h-11 w-11 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

function StaffGlassCard({ staff, onView }: { staff: StaffUser; onView: (s: StaffUser) => void }) {
  // Theme styling based on role
  const roleTheme = {
    Doctor: { border: "border-teal-300", bg: "from-teal-50/90 via-emerald-50/40 to-white", tagBg: "bg-teal-50 text-[#0F766E] border-teal-200" },
    Nurse: { border: "border-blue-300", bg: "from-blue-50/90 via-indigo-50/40 to-white", tagBg: "bg-blue-50 text-blue-800 border-blue-200" },
    Receptionist: { border: "border-amber-300", bg: "from-amber-50/90 via-orange-50/40 to-white", tagBg: "bg-amber-50 text-amber-800 border-amber-200" },
    "Billing Staff": { border: "border-purple-300", bg: "from-purple-50/90 via-indigo-50/40 to-white", tagBg: "bg-purple-50 text-purple-800 border-purple-200" },
  }[staff.role] || { border: "border-teal-300", bg: "from-teal-50/90 via-emerald-50/40 to-white", tagBg: "bg-teal-50 text-[#0F766E] border-teal-200" };

  return (
    <div
      onClick={() => onView(staff)}
      className={`relative group rounded-3xl border-2 ${roleTheme.border} bg-gradient-to-br ${roleTheme.bg} p-4.5 shadow-[0_10px_25px_rgba(15,118,110,0.1)] hover:shadow-[0_18px_35px_rgba(15,118,110,0.2)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between cursor-pointer`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="h-12 w-12 rounded-2xl border-2 border-[#0F766E] bg-white flex items-center justify-center font-black text-sm text-[#0F766E] shadow-xs">
            {staff.initials}
          </div>
          <span className={`border font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-xl ${roleTheme.tagBg}`}>
            {staff.employeeId}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-black text-[#132a26]">{staff.name}</h3>
          <p className="text-[11px] text-[#0F766E] font-bold mt-0.5">{staff.role} • {staff.department}</p>
        </div>

        {/* Primary Facility Badge */}
        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50/90 p-2 rounded-xl border border-amber-200">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
          <span className="truncate">{staff.primaryFacilityName}</span>
          {staff.secondaryFacilityNames && staff.secondaryFacilityNames.length > 0 && (
            <span className="text-[9px] font-mono text-amber-700 shrink-0 bg-white px-1.5 py-0.5 rounded-md border border-amber-200 ml-auto">
              +{staff.secondaryFacilityNames.length}
            </span>
          )}
        </div>

        <div className="space-y-1 text-[11px] text-[#4d6660] bg-white/80 p-2.5 rounded-2xl border border-teal-200/50 backdrop-blur-xs">
          {staff.npiNumber && (
            <div className="font-mono font-bold text-[#0F766E]">NPI: {staff.npiNumber}</div>
          )}
          {staff.nursingLicense && (
            <div className="font-mono font-bold text-blue-800">License: {staff.nursingLicense}</div>
          )}
          {staff.receptionStation && (
            <div className="font-medium text-amber-800">{staff.receptionStation}</div>
          )}
          <div className="truncate font-mono">{staff.email}</div>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-teal-200/60 flex items-center justify-between gap-2">
        <span className={`px-2.5 py-0.5 rounded-xl text-[10px] font-bold ${staff.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
          {staff.status}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onView(staff);
          }}
          className="text-xs font-black text-[#0F766E] hover:underline flex items-center gap-0.5"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}