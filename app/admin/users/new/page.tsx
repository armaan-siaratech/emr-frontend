"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  UserCheck,
  Building,
  Hash,
  User,
  Camera,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ShieldCheck,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Upload,
  Stethoscope,
  Activity,
  CalendarClock,
  DollarSign,
  Award,
  Clock,
  Video,
  Lock,
  ChevronRight,
  Shield,
  Layers,
  FileBadge,
  Zap,
  Star,
  Check,
} from "lucide-react";
import { getFacilitiesApi, FacilityRecordItem } from "@/lib/api/facilityApi";

export type StaffRole = "Doctor" | "Nurse" | "Scheduler" | "Billing";

export default function CreateUserPage() {
  const router = useRouter();

  // Role Selection
  const [selectedRole, setSelectedRole] = useState<StaffRole>("Doctor");

  // Multi-Facility & Primary Facility State
  const [facilitiesList, setFacilitiesList] = useState<FacilityRecordItem[]>([]);
  const [primaryFacilityId, setPrimaryFacilityId] = useState<string>("");
  const [assignedFacilityIds, setAssignedFacilityIds] = useState<string[]>([]);

  // Common Core Fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("DOC-2026-081");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Female");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Cardiology");
  const [status, setStatus] = useState("Active");

  // Photo
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 1. DOCTOR / PROVIDER Specific Fields
  const [npiNumber, setNpiNumber] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [licenseState, setLicenseState] = useState("CA");
  const [deaNumber, setDeaNumber] = useState("");
  const [specialty, setSpecialty] = useState("Cardiology");
  const [taxonomyCode, setTaxonomyCode] = useState("207RC0000X");
  const [credentials, setCredentials] = useState("MD");
  const [prescribingPrivileges, setPrescribingPrivileges] = useState("Full Controlled");
  const [telehealthUrl, setTelehealthUrl] = useState("");
  const [consultationFee, setConsultationFee] = useState("180");
  const [slotDuration, setSlotDuration] = useState("30 min");

  // 2. NURSE Specific Fields
  const [nursingLicense, setNursingLicense] = useState("");
  const [nurseType, setNurseType] = useState("RN");
  const [assignedWard, setAssignedWard] = useState("ICU Ward 3B");
  const [shiftPattern, setShiftPattern] = useState("Day Shift (07:00 - 19:00)");
  const [supervisingDoctor, setSupervisingDoctor] = useState("Dr. Sarah Mitchell");
  const [triageCert, setTriageCert] = useState("BLS, ACLS, IV Certified");

  // 3. SCHEDULER / RECEPTIONIST Specific Fields
  const [receptionStation, setReceptionStation] = useState("Desk 2 - Main Lobby");
  const [phoneExtension, setPhoneExtension] = useState("x402");
  const [bookingClearance, setBookingClearance] = useState("Full Booking & Overbook");
  const [shiftHours, setShiftHours] = useState("Morning (08:00 - 16:30)");

  // 4. BILLING STAFF Specific Fields
  const [billingCert, setBillingCert] = useState("CPC Certified");
  const [clearinghouseId, setClearinghouseId] = useState("CH-99201");
  const [approvalLimit, setApprovalLimit] = useState("5000");

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    getFacilitiesApi()
      .then((data) => {
        if (data && data.length > 0) {
          setFacilitiesList(data);
          setPrimaryFacilityId(data[0].id);
          setAssignedFacilityIds([data[0].id]);
        } else {
          // Fallback mock facilities if empty database
          const mockFacs: FacilityRecordItem[] = [
            {
              id: "fac-1",
              tenant_id: "tenant-1",
              facility_type_id: "ft-1",
              name: "Central Medical Center",
              code: "CMC-MAIN",
              address_line1: "100 Hospital Way",
              city: "Springfield",
              state: "IL",
              postal_code: "62701",
              country: "USA",
              status: "ACTIVE",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "fac-2",
              tenant_id: "tenant-1",
              facility_type_id: "ft-2",
              name: "Downtown OPD Branch",
              code: "CMC-[#2]",
              address_line1: "45 Market St",
              city: "Springfield",
              state: "IL",
              postal_code: "62702",
              country: "USA",
              status: "ACTIVE",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "fac-3",
              tenant_id: "tenant-1",
              facility_type_id: "ft-3",
              name: "Westside Urgent Care",
              code: "WUC-WEST",
              address_line1: "88 West Blvd",
              city: "Springfield",
              state: "IL",
              postal_code: "62704",
              country: "USA",
              status: "ACTIVE",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ];
          setFacilitiesList(mockFacs);
          setPrimaryFacilityId(mockFacs[0].id);
          setAssignedFacilityIds([mockFacs[0].id, mockFacs[1].id]);
        }
      })
      .catch((err) => {
        console.error("Could not load facilities:", err);
      });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in all mandatory fields marked with an asterisk (*).");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast(`New ${selectedRole} profile for '${firstName} ${lastName}' successfully registered!`);
      setTimeout(() => {
        router.push("/admin/users");
      }, 1200);
    }, 800);
  };

  // Role Theme Color Configs
  const roleConfig = {
    Doctor: {
      title: "Provider / Doctor",
      badge: "PHYSICIAN & PRESCRIBER",
      accentBg: "from-[#0F766E] via-[#115e59] to-[#0c4f4a]",
      glowColor: "bg-[#7ee8d5]/30",
      cardBorder: "border-[#7ee8d5]/80",
      themeColor: "#0F766E",
      icon: Stethoscope,
    },
    Nurse: {
      title: "Clinical Nurse",
      badge: "PATIENT CARE & NURSE CADRE",
      accentBg: "from-blue-700 via-indigo-700 to-slate-900",
      glowColor: "bg-blue-400/30",
      cardBorder: "border-blue-400/80",
      themeColor: "#2563EB",
      icon: Activity,
    },
    Scheduler: {
      title: "Scheduler / Receptionist",
      badge: "FRONT DESK & APPOINTMENTS",
      accentBg: "from-amber-600 via-orange-600 to-[#1f2937]",
      glowColor: "bg-amber-400/30",
      cardBorder: "border-amber-400/80",
      themeColor: "#D97706",
      icon: CalendarClock,
    },
    Billing: {
      title: "Billing & Claims Specialist",
      badge: "FINANCE & CLEARINGHOUSE",
      accentBg: "from-purple-700 via-indigo-800 to-[#111827]",
      glowColor: "bg-purple-400/30",
      cardBorder: "border-purple-400/80",
      themeColor: "#7C3AED",
      icon: DollarSign,
    },
  }[selectedRole];

  const CurrentRoleIcon = roleConfig.icon;

  const primaryFacilityObj = facilitiesList.find((f) => f.id === primaryFacilityId);
  const secondaryCount = assignedFacilityIds.filter((id) => id !== primaryFacilityId).length;

  return (
    <div className="w-full space-y-6 font-sans pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl"
          >
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP COMMAND HEADER */}
      <div className={`relative overflow-hidden rounded-3xl border-2 ${roleConfig.cardBorder} bg-gradient-to-r ${roleConfig.accentBg} p-6 sm:p-7 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-3xl transition-all duration-500`}>
        <div className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${roleConfig.glowColor} blur-3xl`} />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Link href="/admin" className="hover:text-white transition">Admin</Link>
              <span>/</span>
              <Link href="/admin/users" className="hover:text-white transition">Staff Directory</Link>
              <span>/</span>
              <span className="text-white font-black">Role Command Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-3 mt-1.5">
              <CurrentRoleIcon className="w-7 h-7 text-teal-300 animate-pulse" />
              <span>Add Tenant Staff:</span>
              <span className="bg-white/15 px-3 py-1 rounded-2xl border border-white/30 font-mono text-lg text-teal-200">
                {roleConfig.title}
              </span>
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded-2xl border border-white/30 bg-white/15 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-white px-6 py-2.5 text-xs font-black text-[#0F766E] shadow-xl hover:bg-teal-50 hover:shadow-2xl transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <UserCheck className="w-4 h-4 text-[#0F766E]" />
              <span>{loading ? "Registering..." : `Register ${selectedRole}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ROLE COMMAND SELECTOR BAR */}
      <div className="space-y-2">
        <span className="text-xs font-black text-[#596964] uppercase tracking-wider block">
          Select Staff Role Profile to Load Specialized Clinical / Admin Parameters:
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {[
            { id: "Doctor" as StaffRole, title: "Provider (Doctor)", icon: Stethoscope, badge: "NPI & Prescriber", color: "from-[#0F766E] to-[#115e59]" },
            { id: "Nurse" as StaffRole, title: "Clinical Nurse", icon: Activity, badge: "RN / LPN License", color: "from-blue-600 to-indigo-700" },
            { id: "Scheduler" as StaffRole, title: "Front Desk Scheduler", icon: CalendarClock, badge: "Desk & Extension", color: "from-amber-600 to-orange-600" },
            { id: "Billing" as StaffRole, title: "Billing Specialist", icon: DollarSign, badge: "Clearinghouse", color: "from-purple-600 to-indigo-800" },
          ].map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`relative overflow-hidden rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-300 backdrop-blur-xl ${
                  isSelected
                    ? "border-[#0F766E] bg-white shadow-xl -translate-y-1 ring-4 ring-[#0F766E]/15"
                    : "border-[#DFE8E5] bg-white/80 hover:border-[#7ee8d5] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${r.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="h-5 w-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-[10px] font-black">✓</span>
                  )}
                </div>
                <h3 className="text-xs font-black text-[#172522] mt-2.5">{r.title}</h3>
                <span className="text-[10px] font-bold text-[#63827a] block mt-0.5">{r.badge}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SPLIT LAYOUT: FORM (LEFT) + REAL-TIME ID CARD PREVIEW (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FORM SECTIONS (8 COLS) */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
          {error && (
            <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 p-4 text-xs font-bold text-rose-800 flex items-center gap-3 shadow-md">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* CARD 1: MULTI-FACILITY & PRIMARY FACILITY RELATIONSHIPS */}
          <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-5">
            <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0F766E]">
                <Building className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-sm font-black text-[#172522]">1. Facility Relationships & Practice Locations</h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
                Multi-Facility Mapping
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#52615D] leading-relaxed font-medium">
                Configure primary home facility and secondary practice locations for <strong className="text-[#0F766E]">{selectedRole}</strong> scheduling, cross-clinic access, and encounter billing.
              </p>

              {/* Primary Facility Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#35544d] mb-1.5 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Primary Home Facility (Main Practice Location) *</span>
                </label>
                <select
                  value={primaryFacilityId}
                  onChange={(e) => {
                    const newPrimary = e.target.value;
                    setPrimaryFacilityId(newPrimary);
                    if (!assignedFacilityIds.includes(newPrimary)) {
                      setAssignedFacilityIds([...assignedFacilityIds, newPrimary]);
                    }
                  }}
                  className="h-11 w-full rounded-2xl border-2 border-[#DFE8E5] bg-white px-3.5 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 shadow-xs transition"
                >
                  {facilitiesList.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      ⭐ {fac.name} ({fac.code}) — {fac.city || "Main Campus"} [PRIMARY LOCATION]
                    </option>
                  ))}
                </select>
              </div>

              {/* Secondary Practice Locations Multi-Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-[#35544d] mb-2 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#0F766E]" />
                  <span>Assigned Practice Locations & Branches (Multi-Facility Access)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {facilitiesList.map((fac) => {
                    const isPrimary = fac.id === primaryFacilityId;
                    const isChecked = assignedFacilityIds.includes(fac.id);

                    return (
                      <div
                        key={fac.id}
                        onClick={() => {
                          if (isPrimary) return;
                          if (isChecked) {
                            setAssignedFacilityIds(assignedFacilityIds.filter((id) => id !== fac.id));
                          } else {
                            setAssignedFacilityIds([...assignedFacilityIds, fac.id]);
                          }
                        }}
                        className={`relative p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                          isPrimary
                            ? "border-amber-400 bg-amber-50/70 shadow-sm"
                            : isChecked
                            ? "border-[#0F766E] bg-teal-50/70"
                            : "border-[#DFE8E5] bg-white hover:border-[#7ee8d5]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={isPrimary}
                            onChange={() => {}}
                            className="h-4 w-4 rounded-md border-slate-300 text-[#0F766E] focus:ring-[#0F766E]"
                          />
                          <div className="truncate">
                            <span className="text-xs font-bold text-[#172522] block truncate">{fac.name}</span>
                            <span className="text-[10px] text-[#63827a] font-mono block truncate">{fac.city || "Branch Location"}</span>
                          </div>
                        </div>

                        {isPrimary ? (
                          <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-lg shrink-0">
                            PRIMARY
                          </span>
                        ) : isChecked ? (
                          <span className="text-[9px] font-mono font-bold text-[#0F766E] bg-white border border-teal-200 px-2 py-0.5 rounded-lg shrink-0">
                            SECONDARY
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: CORE DEMOGRAPHICS & AVATAR */}
          <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-5">
            <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0F766E]">
                <User className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-sm font-black text-[#172522]">2. Personal Identity & Photo</h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
                Core Identity
              </span>
            </div>

            {/* Photo Dropzone */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl border-2 border-dashed border-[#0F766E]/40 bg-gradient-to-r from-teal-50/70 via-emerald-50/30 to-white">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0F766E] bg-white shadow-md flex items-center justify-center font-black text-xl text-[#0F766E]">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-[#0F766E]/60" />
                )}
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <label className="block text-xs font-bold text-[#172522]">Upload Profile Photo (AWS S3)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-xs text-[#596964] file:mr-3 file:rounded-xl file:border-0 file:bg-[#0F766E] file:px-3.5 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-[#0c5c56] cursor-pointer"
                />
                <p className="text-[10px] text-[#71807c]">Saved to S3 bucket: <code className="font-mono text-[#0F766E]">healthcaresiara</code></p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassInputField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Sarah" required />
              <GlassInputField label="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="e.g. Jean" />
              <GlassInputField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Mitchell" required />

              <GlassInputField label="Email Address (Login Identity)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sarah.mitchell@hospital.com" required />
              <GlassInputField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" required />
              <GlassInputField label="Staff Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="e.g. DOC-2026-081" />

              <GlassInputField label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              <div>
                <label className="block text-xs font-bold text-[#596964] mb-1">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E]">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#596964] mb-1">Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E]">
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Emergency">Emergency / Triage</option>
                  <option value="Front Desk">Front Desk / Reception</option>
                  <option value="Billing">Billing & Finance</option>
                </select>
              </div>
            </div>
          </div>

          {/* CARD 3: DYNAMIC ROLE-SPECIFIC PARAMETERS */}
          <AnimatePresence mode="wait">
            {selectedRole === "Doctor" && (
              <motion.div
                key="Doctor"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl border-2 border-teal-400/80 bg-gradient-to-br from-teal-50/90 via-emerald-50/30 to-white p-6 shadow-[0_15px_40px_rgba(15,118,110,0.12)] backdrop-blur-2xl space-y-5"
              >
                <div className="border-b border-teal-200/80 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#0F766E]">
                    <Stethoscope className="w-5 h-5 text-[#0F766E]" />
                    <h2 className="text-sm font-black text-[#172522]">3. Provider Qualifications & Licensing Panel</h2>
                  </div>
                  <span className="bg-[#0F766E] text-white text-[10px] font-mono font-black px-3 py-1 rounded-xl">
                    PHYSICIAN SPECIFIC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <GlassInputField label="NPI # (10 Digits)" value={npiNumber} onChange={(e) => setNpiNumber(e.target.value)} placeholder="e.g. 1948201948" required />
                  <GlassInputField label="Medical License #" value={medicalLicense} onChange={(e) => setMedicalLicense(e.target.value)} placeholder="e.g. LIC-92841" required />
                  <GlassInputField label="License State" value={licenseState} onChange={(e) => setLicenseState(e.target.value)} placeholder="e.g. CA, NY" />

                  <GlassInputField label="DEA Reg #" value={deaNumber} onChange={(e) => setDeaNumber(e.target.value)} placeholder="e.g. BS9281923" />
                  <GlassInputField label="Clinical Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Cardiology" />
                  <GlassInputField label="Taxonomy Code" value={taxonomyCode} onChange={(e) => setTaxonomyCode(e.target.value)} placeholder="207RC0000X" />

                  <div>
                    <label className="block text-xs font-bold text-[#596964] mb-1">Degree Credentials</label>
                    <select value={credentials} onChange={(e) => setCredentials(e.target.value)} className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522]">
                      <option value="MD">MD (Doctor of Medicine)</option>
                      <option value="DO">DO (Doctor of Osteopathic Medicine)</option>
                      <option value="MBBS">MBBS</option>
                      <option value="PhD">PhD / Research Physician</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#596964] mb-1">Prescribing Privileges</label>
                    <select value={prescribingPrivileges} onChange={(e) => setPrescribingPrivileges(e.target.value)} className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522]">
                      <option value="Full Controlled">Full Controlled Substances (Schedule II-V)</option>
                      <option value="Non-Controlled">Non-Controlled Only</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  <GlassInputField label="Consultation Fee ($)" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} placeholder="180" />

                  <div className="sm:col-span-2">
                    <GlassInputField label="Telehealth Room Link" value={telehealthUrl} onChange={(e) => setTelehealthUrl(e.target.value)} placeholder="https://telehealth.hospital.com/room/dr-sarah" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#596964] mb-1">Slot Duration</label>
                    <select value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522]">
                      <option value="15 min">15 Minutes</option>
                      <option value="30 min">30 Minutes</option>
                      <option value="45 min">45 Minutes</option>
                      <option value="60 min">60 Minutes</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedRole === "Nurse" && (
              <motion.div
                key="Nurse"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl border-2 border-blue-400/80 bg-gradient-to-br from-blue-50/90 via-indigo-50/30 to-white p-6 shadow-[0_15px_40px_rgba(37,99,235,0.12)] backdrop-blur-2xl space-y-5"
              >
                <div className="border-b border-blue-200/80 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-900">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h2 className="text-sm font-black text-[#172522]">3. Clinical Nursing License & Shift Panel</h2>
                  </div>
                  <span className="bg-blue-600 text-white text-[10px] font-mono font-black px-3 py-1 rounded-xl">
                    NURSE SPECIFIC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <GlassInputField label="Nursing License #" value={nursingLicense} onChange={(e) => setNursingLicense(e.target.value)} placeholder="e.g. RN-829142" required />

                  <div>
                    <label className="block text-xs font-bold text-[#596964] mb-1">Nurse Title / Cadre</label>
                    <select value={nurseType} onChange={(e) => setNurseType(e.target.value)} className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522]">
                      <option value="RN">RN (Registered Nurse)</option>
                      <option value="NP">NP (Nurse Practitioner)</option>
                      <option value="LPN">LPN (Licensed Practical Nurse)</option>
                    </select>
                  </div>

                  <GlassInputField label="Assigned Ward / Unit" value={assignedWard} onChange={(e) => setAssignedWard(e.target.value)} placeholder="ICU Ward 3B" />
                  <GlassInputField label="Shift Pattern" value={shiftPattern} onChange={(e) => setShiftPattern(e.target.value)} placeholder="Day Shift (07:00 - 19:00)" />
                  <GlassInputField label="Supervising Doctor" value={supervisingDoctor} onChange={(e) => setSupervisingDoctor(e.target.value)} placeholder="Dr. Sarah Mitchell" />
                  <GlassInputField label="Certifications" value={triageCert} onChange={(e) => setTriageCert(e.target.value)} placeholder="BLS, ACLS, IV Cert" />
                </div>
              </motion.div>
            )}

            {selectedRole === "Scheduler" && (
              <motion.div
                key="Scheduler"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-white p-6 shadow-[0_15px_40px_rgba(217,119,6,0.12)] backdrop-blur-2xl space-y-5"
              >
                <div className="border-b border-amber-200/80 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900">
                    <CalendarClock className="w-5 h-5 text-amber-600" />
                    <h2 className="text-sm font-black text-[#172522]">3. Front Desk Station & Clearance Panel</h2>
                  </div>
                  <span className="bg-amber-600 text-white text-[10px] font-mono font-black px-3 py-1 rounded-xl">
                    RECEPTION SPECIFIC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <GlassInputField label="Reception Station ID" value={receptionStation} onChange={(e) => setReceptionStation(e.target.value)} placeholder="Desk 2 - Main Lobby" />
                  <GlassInputField label="Extension Phone" value={phoneExtension} onChange={(e) => setPhoneExtension(e.target.value)} placeholder="x402" />
                  <GlassInputField label="Shift Hours" value={shiftHours} onChange={(e) => setShiftHours(e.target.value)} placeholder="Morning (08:00 - 16:30)" />
                </div>
              </motion.div>
            )}

            {selectedRole === "Billing" && (
              <motion.div
                key="Billing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl border-2 border-purple-400/80 bg-gradient-to-br from-purple-50/90 via-indigo-50/30 to-white p-6 shadow-[0_15px_40px_rgba(124,58,237,0.12)] backdrop-blur-2xl space-y-5"
              >
                <div className="border-b border-purple-200/80 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-900">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <h2 className="text-sm font-black text-[#172522]">3. Billing Credentials & Clearinghouse Panel</h2>
                  </div>
                  <span className="bg-purple-600 text-white text-[10px] font-mono font-black px-3 py-1 rounded-xl">
                    BILLING SPECIFIC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <GlassInputField label="Billing Certification" value={billingCert} onChange={(e) => setBillingCert(e.target.value)} placeholder="CPC Certified" />
                  <GlassInputField label="Clearinghouse Partner ID" value={clearinghouseId} onChange={(e) => setClearinghouseId(e.target.value)} placeholder="CH-99201" />
                  <GlassInputField label="Approval Limit ($)" value={approvalLimit} onChange={(e) => setApprovalLimit(e.target.value)} placeholder="5000" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* RIGHT COLUMN: REAL-TIME VIRTUAL ID CARD PREVIEW (4 COLS) */}
        <div className="lg:col-span-4 sticky top-6 space-y-5">
          <div className="rounded-3xl border-2 border-[#7ee8d5]/80 bg-gradient-to-b from-[#0c2420] via-[#091b18] to-[#040e0c] p-6 text-white shadow-[0_25px_60px_rgba(12,36,32,0.4)] backdrop-blur-3xl space-y-5 overflow-hidden relative">
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#7ee8d5]/25 blur-3xl" />

            <div className="flex items-center justify-between border-b border-teal-800/80 pb-3">
              <span className="text-[10px] font-mono font-black text-teal-300 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-teal-400 animate-bounce" /> Live Virtual Staff Badge
              </span>
              <span className="bg-teal-500/20 text-teal-300 text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border border-teal-400/30">
                ACTIVE
              </span>
            </div>

            {/* Virtual Badge Front Card */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 rounded-2xl border-2 border-teal-400 bg-teal-900/60 overflow-hidden flex items-center justify-center font-black text-lg text-teal-200 shadow-md">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "ID"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-black text-white truncate">
                    {firstName || lastName ? `${firstName} ${lastName}` : "Staff Member Name"}
                  </h4>
                  <p className="text-teal-300 text-xs font-bold mt-0.5">{selectedRole} • {department}</p>
                  <span className="text-[10px] font-mono text-teal-400/80 block mt-0.5">ID: {employeeId || "DOC-2026-081"}</span>
                </div>
              </div>

              {/* Facility Assignment Live Preview */}
              <div className="p-3 rounded-2xl bg-teal-900/40 border border-teal-700/60 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span className="truncate">Primary: {primaryFacilityObj?.name || "Main Facility"}</span>
                </div>
                {secondaryCount > 0 && (
                  <div className="text-[10px] text-teal-200/90 font-mono pl-5">
                    + {secondaryCount} Secondary Practice Locations
                  </div>
                )}
              </div>

              {/* Dynamic Badges based on role */}
              <div className="space-y-2 pt-2 border-t border-teal-800/60 text-xs">
                {selectedRole === "Doctor" && (
                  <>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">NPI Code:</span>
                      <span className="font-mono font-bold text-white">{npiNumber || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Medical License:</span>
                      <span className="font-bold text-teal-200">{medicalLicense || "—"} ({licenseState})</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Specialty:</span>
                      <span className="font-bold text-white">{specialty}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Consult Fee:</span>
                      <span className="font-bold text-emerald-400 font-mono">${consultationFee} / visit</span>
                    </div>
                  </>
                )}

                {selectedRole === "Nurse" && (
                  <>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Nursing License:</span>
                      <span className="font-mono font-bold text-white">{nursingLicense || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Ward Unit:</span>
                      <span className="font-bold text-teal-200">{assignedWard}</span>
                    </div>
                  </>
                )}

                {selectedRole === "Scheduler" && (
                  <>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Reception Station:</span>
                      <span className="font-bold text-white">{receptionStation}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-400/80">Extension:</span>
                      <span className="font-mono font-bold text-amber-300">{phoneExtension}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0c2420] font-black text-xs shadow-lg hover:brightness-110 transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-[#0c2420]" />
                <span>{loading ? "Registering..." : `Save ${selectedRole} Profile`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassInputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#596964] mb-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs transition"
      />
    </div>
  );
}