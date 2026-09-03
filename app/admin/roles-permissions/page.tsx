"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Plus,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Shield,
  Star,
  Lock,
  Edit,
  Trash2,
  Save,
  RotateCcw,
  Check,
  X,
  ChevronRight,
  UserCheck,
  Stethoscope,
  Activity,
  CalendarClock,
  DollarSign,
  Building,
  Layers,
  Zap,
} from "lucide-react";

export type RoleType = "SYSTEM_STANDARD" | "CUSTOM_TENANT";

export interface TenantRoleItem {
  id: string;
  key: string;
  name: string;
  roleType: RoleType;
  description: string;
  userCount: number;
  colorBg: string;
  icon: any;
  permissions: Record<string, boolean>;
}

export interface PermissionCategory {
  category: string;
  icon: any;
  description: string;
  items: { key: string; label: string; desc: string }[];
}

const permissionCategories: PermissionCategory[] = [
  {
    category: "Patient Management & Charting",
    icon: UserCheck,
    description: "Access control for patient registry, profile details, and soft-delete/restore operations.",
    items: [
      { key: "patient:view", label: "View Patient Directory", desc: "Allows viewing patient list and demographic summary" },
      { key: "patient:create", label: "Create Patient Profile", desc: "Allows registering new patient charts" },
      { key: "patient:edit", label: "Edit Patient Profile", desc: "Allows updating demographics, contact, and insurance info" },
      { key: "patient:soft_delete", label: "Soft Delete Patient", desc: "Allows flagging patient record as soft-deleted" },
      { key: "patient:restore", label: "Restore Deleted Record", desc: "Allows un-deleting and restoring patient records" },
      { key: "patient:export", label: "Export EMR Record", desc: "Allows exporting patient chart PDF and clinical summaries" },
    ],
  },
  {
    category: "Appointment & Telehealth Scheduling",
    icon: CalendarClock,
    description: "Access control for booking appointments, overbooking rights, and virtual consultation rooms.",
    items: [
      { key: "appointment:view", label: "View Appointment Calendar", desc: "Allows viewing facility booking schedules" },
      { key: "appointment:create", label: "Book Appointments", desc: "Allows scheduling new patient visits" },
      { key: "appointment:edit", label: "Reschedule / Cancel Visit", desc: "Allows editing or cancelling existing appointments" },
      { key: "appointment:overbook", label: "Overbooking Clearance", desc: "Allows booking visits outside standard slot hours" },
      { key: "telehealth:access", label: "Telehealth Room Access", desc: "Allows launching video consultation rooms" },
    ],
  },
  {
    category: "Clinical Encounters & Prescribing (EMR)",
    icon: Stethoscope,
    description: "Access control for clinical SOAP notes, ICD-10 diagnoses, lab orders, and controlled prescriptions.",
    items: [
      { key: "encounter:view", label: "View Clinical Encounters", desc: "Allows reading physician clinical notes and vitals" },
      { key: "encounter:create", label: "Start Clinical Encounter", desc: "Allows creating SOAP notes and recording vitals" },
      { key: "encounter:sign", label: "Sign & Finalize Encounter", desc: "Allows lock-signing completed clinical encounters" },
      { key: "rx:prescribe", label: "Prescribe Medications", desc: "Allows generating electronic prescriptions (e-Rx)" },
      { key: "rx:controlled", label: "Prescribe Controlled Drugs", desc: "Allows DEA Schedule II-V controlled substance prescribing" },
      { key: "lab:order", label: "Order Lab & Diagnostic Tests", desc: "Allows placing lab orders and reviewing lab results" },
    ],
  },
  {
    category: "Billing, Claims & Financial Coding",
    icon: DollarSign,
    description: "Access control for superfills, CPT/ICD coding, insurance claims, and payment receipts.",
    items: [
      { key: "billing:view", label: "View Financial Billing", desc: "Allows reading claims history and patient balances" },
      { key: "billing:create_invoice", label: "Generate Invoices & Superbills", desc: "Allows creating encounter invoices" },
      { key: "billing:submit_claim", label: "Submit Claims to Clearinghouse", desc: "Allows sending EDI 837 claims" },
      { key: "billing:payment", label: "Process Payments & Refunds", desc: "Allows recording co-pays and processing card payments" },
      { key: "billing:report", label: "View Revenue & Financial Reports", desc: "Allows viewing financial analytics dashboards" },
    ],
  },
  {
    category: "Facility Administration & User Control",
    icon: Building,
    description: "Access control for tenant user onboarding, facility unit configuration, and audit logs.",
    items: [
      { key: "admin:view_users", label: "View Staff User Directory", desc: "Allows viewing list of clinic employees and providers" },
      { key: "admin:create_users", label: "Onboard Staff Members", desc: "Allows adding doctors, nurses, schedulers" },
      { key: "admin:manage_roles", label: "Manage Roles & Permissions", desc: "Allows configuring role matrix for tenant" },
      { key: "admin:facilities", label: "Configure Facility Units", desc: "Allows adding/editing clinic branches and wards" },
      { key: "admin:audit_logs", label: "View Security Audit Logs", desc: "Allows inspecting system security access logs" },
    ],
  },
];

const defaultRolesList: TenantRoleItem[] = [
  {
    id: "role-doctor",
    key: "doctor",
    name: "Doctor / Provider",
    roleType: "SYSTEM_STANDARD",
    description: "Full clinical privileges, encounter signing, Rx prescribing, and patient EMR charting.",
    userCount: 14,
    colorBg: "from-[#0F766E] to-[#115e59]",
    icon: Stethoscope,
    permissions: {
      "patient:view": true,
      "patient:create": true,
      "patient:edit": true,
      "patient:export": true,
      "appointment:view": true,
      "appointment:create": true,
      "appointment:edit": true,
      "telehealth:access": true,
      "encounter:view": true,
      "encounter:create": true,
      "encounter:sign": true,
      "rx:prescribe": true,
      "rx:controlled": true,
      "lab:order": true,
      "billing:view": true,
    },
  },
  {
    id: "role-nurse",
    key: "nurse",
    name: "Clinical Nurse",
    roleType: "SYSTEM_STANDARD",
    description: "Patient triage, vital signs recording, medication administration, and encounter draft preparation.",
    userCount: 18,
    colorBg: "from-blue-600 to-indigo-700",
    icon: Activity,
    permissions: {
      "patient:view": true,
      "patient:create": true,
      "patient:edit": true,
      "appointment:view": true,
      "appointment:create": true,
      "encounter:view": true,
      "encounter:create": true,
      "lab:order": true,
    },
  },
  {
    id: "role-scheduler",
    key: "receptionist",
    name: "Scheduler / Front Desk",
    roleType: "SYSTEM_STANDARD",
    description: "Patient check-in, appointment scheduling, overbooking management, and demographic registration.",
    userCount: 8,
    colorBg: "from-amber-600 to-orange-600",
    icon: CalendarClock,
    permissions: {
      "patient:view": true,
      "patient:create": true,
      "patient:edit": true,
      "appointment:view": true,
      "appointment:create": true,
      "appointment:edit": true,
      "appointment:overbook": true,
      "billing:payment": true,
    },
  },
  {
    id: "role-billing",
    key: "billing",
    name: "Billing Specialist",
    roleType: "SYSTEM_STANDARD",
    description: "EDI claims submission, CPT/ICD coding review, payment collection, and financial reporting.",
    userCount: 6,
    colorBg: "from-purple-600 to-indigo-800",
    icon: DollarSign,
    permissions: {
      "patient:view": true,
      "appointment:view": true,
      "billing:view": true,
      "billing:create_invoice": true,
      "billing:submit_claim": true,
      "billing:payment": true,
      "billing:report": true,
    },
  },
  {
    id: "role-[#custom-cmo]",
    key: "custom_cmo",
    name: "Chief Medical Officer (CMO)",
    roleType: "CUSTOM_TENANT",
    description: "Custom role created by Tenant Admin with full clinical audit, quality reports, and administrative oversight.",
    userCount: 2,
    colorBg: "from-emerald-700 to-teal-800",
    icon: Star,
    permissions: {
      "patient:view": true,
      "patient:export": true,
      "appointment:view": true,
      "telehealth:access": true,
      "encounter:view": true,
      "encounter:sign": true,
      "lab:order": true,
      "billing:view": true,
      "billing:report": true,
      "admin:view_users": true,
      "admin:audit_logs": true,
    },
  },
];

export default function RolesPermissionsPage() {
  const [rolesList, setRolesList] = useState<TenantRoleItem[]>(defaultRolesList);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("role-doctor");

  // Filter & Search inside Matrix
  const [searchMatrix, setSearchMatrix] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Custom Role Modal State
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [templateRoleId, setTemplateRoleId] = useState("role-doctor");

  const selectedRole = useMemo(() => {
    return rolesList.find((r) => r.id === selectedRoleId) || rolesList[0];
  }, [rolesList, selectedRoleId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const togglePermission = (permKey: string) => {
    setRolesList((prev) =>
      prev.map((role) => {
        if (role.id === selectedRoleId) {
          const currentVal = !!role.permissions[permKey];
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [permKey]: !currentVal,
            },
          };
        }
        return role;
      })
    );
  };

  const toggleCategoryGroup = (catItems: { key: string }[], enableAll: boolean) => {
    setRolesList((prev) =>
      prev.map((role) => {
        if (role.id === selectedRoleId) {
          const updatedPerms = { ...role.permissions };
          catItems.forEach((item) => {
            updatedPerms[item.key] = enableAll;
          });
          return {
            ...role,
            permissions: updatedPerms,
          };
        }
        return role;
      })
    );
  };

  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const templateRole = rolesList.find((r) => r.id === templateRoleId) || rolesList[0];

    const newRole: TenantRoleItem = {
      id: `role-custom-${Date.now()}`,
      key: newRoleName.toLowerCase().replace(/\s+/g, "_"),
      name: newRoleName.trim(),
      roleType: "CUSTOM_TENANT",
      description: newRoleDesc.trim() || "Custom tenant role configured by Tenant Admin.",
      userCount: 0,
      colorBg: "from-[#0F766E] via-teal-700 to-[#0c4f4a]",
      icon: Star,
      permissions: { ...templateRole.permissions },
    };

    setRolesList((prev) => [...prev, newRole]);
    setSelectedRoleId(newRole.id);
    setShowCreateModal(false);
    setNewRoleName("");
    setNewRoleDesc("");
    showToast(`Custom Role '${newRole.name}' created successfully!`);
  };

  const handleDeleteCustomRole = (roleId: string, roleName: string) => {
    setRolesList((prev) => prev.filter((r) => r.id !== roleId));
    setSelectedRoleId("role-doctor");
    showToast(`Custom Role '${roleName}' deleted.`);
  };

  // Counts
  const totalRoles = rolesList.length;
  const systemRolesCount = rolesList.filter((r) => r.roleType === "SYSTEM_STANDARD").length;
  const customRolesCount = rolesList.filter((r) => r.roleType === "CUSTOM_TENANT").length;
  const activePermsCount = Object.values(selectedRole.permissions).filter(Boolean).length;

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

      {/* 3D GLASS COMMAND HEADER */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0c4f4a] p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.25)] text-white backdrop-blur-3xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7ee8d5]/25 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Link href="/admin" className="hover:text-white transition">Admin</Link>
              <span>/</span>
              <span className="text-white font-black">Access Control (RBAC)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-1">
              <ShieldCheck className="w-6 h-6 text-teal-300 animate-pulse" />
              Tenant Roles & Permissions Matrix
            </h1>
            <p className="text-xs text-teal-100/90 mt-1 font-medium">
              Configure system base roles & create custom tenant-specific roles with feature-level access controls.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-xs font-black text-[#0F766E] shadow-xl hover:bg-teal-50 hover:shadow-2xl transition cursor-pointer active:scale-95 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#0F766E]" />
            <span>Create Custom Tenant Role</span>
          </button>
        </div>
      </div>

      {/* STAT SUMMARY CHIPS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#63827a] block uppercase tracking-wider">Total Roles</span>
            <span className="text-2xl font-black text-[#0F766E] mt-0.5 block font-mono">{totalRoles}</span>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#63827a] block uppercase tracking-wider">System Base Roles</span>
            <span className="text-2xl font-black text-teal-700 mt-0.5 block font-mono">{systemRolesCount}</span>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#63827a] block uppercase tracking-wider">Custom Tenant Roles</span>
            <span className="text-2xl font-black text-amber-700 mt-0.5 block font-mono">{customRolesCount}</span>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Star className="w-5 h-5" />
          </div>
        </div>

        <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-3xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#63827a] block uppercase tracking-wider">Active Permissions</span>
            <span className="text-2xl font-black text-emerald-700 mt-0.5 block font-mono">{activePermsCount} / 26</span>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: ROLES LIST (LEFT) + PERMISSIONS MATRIX (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ROLES NAVIGATION SIDEBAR (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black text-[#172522] uppercase tracking-wider">
              Tenant Role Catalog
            </span>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-[11px] font-black text-[#0F766E] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Role</span>
            </button>
          </div>

          <div className="space-y-3">
            {rolesList.map((role) => {
              const RoleIcon = role.icon;
              const isSelected = selectedRoleId === role.id;
              const isCustom = role.roleType === "CUSTOM_TENANT";

              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`relative overflow-hidden rounded-3xl border-2 p-4 cursor-pointer transition-all duration-300 backdrop-blur-2xl ${
                    isSelected
                      ? "border-[#0F766E] bg-white shadow-[0_10px_30px_rgba(15,118,110,0.15)] -translate-y-0.5 ring-4 ring-[#0F766E]/15"
                      : "border-[#DFE8E5] bg-white/80 hover:border-[#7ee8d5] hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br ${role.colorBg} text-white flex items-center justify-center shadow-md`}>
                        <RoleIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-[#172522] flex items-center gap-1.5">
                          <span>{role.name}</span>
                          {isCustom && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          {isCustom ? (
                            <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg">
                              ⭐ Custom Tenant Role
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-lg">
                              🛡️ System Base Role
                            </span>
                          )}
                          <span className="text-[10px] text-[#63827a] font-bold">{role.userCount} users</span>
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="h-6 w-6 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-xs font-black shadow-xs">
                        ✓
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#596964] mt-2.5 line-clamp-2 leading-relaxed font-medium">
                    {role.description}
                  </p>

                  {/* Delete button for custom roles */}
                  {isCustom && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCustomRole(role.id, role.name);
                        }}
                        className="text-[10px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Custom Role</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: PERMISSIONS MATRIX (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-6">
            {/* Header of selected role */}
            <div className="border-b border-[#DFE8E5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selectedRole.colorBg} text-white flex items-center justify-center shadow-md`}>
                  {React.createElement(selectedRole.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-base font-black text-[#172522] flex items-center gap-2">
                    <span>{selectedRole.name} Matrix</span>
                    {selectedRole.roleType === "CUSTOM_TENANT" ? (
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg">
                        Custom Role
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-lg">
                        Standard Role
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-[#596964] mt-0.5 font-medium">{selectedRole.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast(`Permissions Matrix saved for '${selectedRole.name}'`)}
                className="flex items-center gap-2 rounded-2xl bg-[#0F766E] px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-[#0c5c56] transition cursor-pointer active:scale-95 self-start sm:self-auto"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Matrix</span>
              </button>
            </div>

            {/* Matrix Search Filter */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F766E]" />
              <input
                type="text"
                value={searchMatrix}
                onChange={(e) => setSearchMatrix(e.target.value)}
                placeholder="Filter permissions by keyword (e.g. prescribe, patient, billing)..."
                className="w-full h-10 rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-4 text-xs font-semibold text-[#172522] placeholder-[#71807c] outline-none focus:border-[#0F766E] shadow-xs"
              />
            </div>

            {/* Categorized Permissions Grid */}
            <div className="space-y-6">
              {permissionCategories.map((cat) => {
                const CatIcon = cat.icon;
                const filteredItems = cat.items.filter(
                  (item) =>
                    !searchMatrix.trim() ||
                    item.label.toLowerCase().includes(searchMatrix.toLowerCase()) ||
                    item.desc.toLowerCase().includes(searchMatrix.toLowerCase())
                );

                if (filteredItems.length === 0) return null;

                const allEnabled = filteredItems.every((item) => !!selectedRole.permissions[item.key]);

                return (
                  <div key={cat.category} className="rounded-2xl border border-[#DFE8E5] bg-gradient-to-br from-teal-50/40 via-white to-white p-4.5 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-[#edf2f0] pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-teal-100/80 text-[#0F766E] flex items-center justify-center font-bold">
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-black text-[#172522]">{cat.category}</h3>
                          <p className="text-[10px] text-[#63827a]">{cat.description}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCategoryGroup(cat.items, !allEnabled)}
                        className="text-[10px] font-bold text-[#0F766E] hover:underline"
                      >
                        {allEnabled ? "Deselect All" : "Select All"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredItems.map((item) => {
                        const isChecked = !!selectedRole.permissions[item.key];
                        return (
                          <div
                            key={item.key}
                            onClick={() => togglePermission(item.key)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                              isChecked
                                ? "border-[#0F766E] bg-teal-50/90 shadow-2xs"
                                : "border-[#DFE8E5] bg-white hover:border-[#7ee8d5]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-0.5 h-4 w-4 rounded-md border-slate-300 text-[#0F766E] focus:ring-[#0F766E]"
                            />
                            <div>
                              <span className="text-xs font-bold text-[#172522] block">{item.label}</span>
                              <span className="text-[10px] text-[#63827a] leading-snug block mt-0.5 font-medium">{item.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE CUSTOM TENANT ROLE MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
              onClick={() => setShowCreateModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              <div className="flex items-center justify-between border-b border-teal-200/60 pb-3">
                <h2 className="text-lg font-black text-[#132a26] flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                  Create Custom Tenant Role
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCustomRole} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#596964] mb-1">Custom Role Name *</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="e.g. Senior Cardiology Fellow, ER Triage Lead"
                    required
                    className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3.5 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#596964] mb-1">Description / Purpose</label>
                  <textarea
                    rows={2}
                    value={newRoleDesc}
                    onChange={(e) => setNewRoleDesc(e.target.value)}
                    placeholder="Briefly describe the responsibilities of this custom role..."
                    className="w-full rounded-2xl border border-[#DFE8E5] bg-white p-3 text-xs font-medium text-[#172522] outline-none focus:border-[#0F766E] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#596964] mb-1">Clone Base Template Permissions From</label>
                  <select
                    value={templateRoleId}
                    onChange={(e) => setTemplateRoleId(e.target.value)}
                    className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E]"
                  >
                    {rolesList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.roleType === "SYSTEM_STANDARD" ? "System Standard" : "Custom"})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold text-xs shadow-md hover:bg-[#0c5c56]"
                  >
                    Create Custom Role
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}