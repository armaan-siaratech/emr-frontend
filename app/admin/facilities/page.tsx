"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard3D from "@/components/common/GlassCard3D";
import { getTenantsApi, createTenantApi, TenantItem } from "@/lib/api/authApi";
import {
  Building2,
  Plus,
  Search,
  Check,
  Edit3,
  RefreshCw,
  Shield,
  MapPin,
  Phone,
  Mail,
  X,
  Clock,
  Compass,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const initialTenants: TenantItem[] = [
  {
    id: "1",
    name: "Apex Healthcare Network",
    slug: "apex-healthcare",
    code: "TEN-APEX-01",
    email: "contact@apexhealth.com",
    phone: "(555) 123-4567",
    address: "100 Medical Center Parkway",
    city: "Boston",
    state: "MA",
    country: "United States",
    postal_code: "02115",
    timezone: "America/New_York",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Green Valley Medical Group",
    slug: "green-valley-med",
    code: "TEN-GVM-02",
    email: "info@greenvalleymed.org",
    phone: "(555) 348-2190",
    address: "240 Hospital Drive",
    city: "San Diego",
    state: "CA",
    country: "United States",
    postal_code: "92101",
    timezone: "America/Los_Angeles",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Sunrise Care System",
    slug: "sunrise-care",
    code: "TEN-SHC-03",
    email: "admin@sunrisecare.com",
    phone: "(555) 491-8230",
    address: "88 Health Boulevard",
    city: "Irvine",
    state: "CA",
    country: "United States",
    postal_code: "92618",
    timezone: "America/Los_Angeles",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function FacilitiesPage() {
  const [tenants, setTenants] = useState<TenantItem[]>(initialTenants);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Modal Control State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCode, setFormCode] = useState("TEN-MED-901");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formState, setFormState] = useState("");
  const [formCountry, setFormCountry] = useState("United States");
  const [formPostalCode, setFormPostalCode] = useState("");
  const [formTimezone, setFormTimezone] = useState("America/New_York");
  const [formStatus, setFormStatus] = useState<"active" | "inactive" | "suspended">("active");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadTenants = () => {
    setIsLoading(true);
    getTenantsApi()
      .then((data) => {
        if (data && data.length > 0) {
          setTenants(data);
        }
      })
      .catch((err) => console.error("Failed to load tenants from backend:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTenants();
  }, []);

  // Lock outer body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleNameChange = (val: string) => {
    setFormName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormSlug(generatedSlug);
  };

  const handleGenerateCode = () => {
    const randomCode = `TEN-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormCode(randomCode);
  };

  const openAddTenantModal = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setFormName("");
    setFormSlug("");
    handleGenerateCode();
    setIsModalOpen(true);
  };

  const handleCreateTenantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formName.trim()) {
      setErrorMsg("Tenant organization name is required.");
      return;
    }
    if (!formSlug.trim()) {
      setErrorMsg("URL slug identifier is required.");
      return;
    }
    if (!formCode.trim()) {
      setErrorMsg("Tenant code is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await createTenantApi({
        name: formName.trim(),
        slug: formSlug.trim().toLowerCase(),
        code: formCode.trim().toUpperCase(),
        email: formEmail.trim() || undefined,
        phone: formPhone.trim() || undefined,
        address: formAddress.trim() || undefined,
        city: formCity.trim() || undefined,
        state: formState.trim() || undefined,
        country: formCountry.trim() || undefined,
        postal_code: formPostalCode.trim() || undefined,
        timezone: formTimezone,
        status: formStatus,
      });

      setTenants((prev) => [created, ...prev]);
      setSuccessMsg(`Tenant '${created.name}' (${created.code}) created successfully!`);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMsg("");
      }, 1200);
    } catch (err: any) {
      console.error("Failed to create tenant:", err);
      setErrorMsg(err.message || "Failed to register tenant organization in database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.code.toLowerCase().includes(search.toLowerCase()) ||
      tenant.slug.toLowerCase().includes(search.toLowerCase()) ||
      (tenant.city && tenant.city.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filter === "All" || tenant.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full space-y-6 pb-12 animate-fade-in">
      {/* 3D HERO HEADER BANNER */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0f766e]">
                SuperAdmin Multi-Tenancy Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d28] tracking-tight flex items-center gap-2.5">
              <Building2 className="h-7 w-7 text-[#0f766e]" />
              Tenants Management
            </h1>
            <p className="mt-1 text-xs font-semibold text-[#54736b]">
              Manage healthcare tenant organizations, database boundaries, contact information, and domain slugs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={loadTenants}
              className="h-10 px-3.5 rounded-2xl bg-white/80 border border-white text-xs font-extrabold text-[#0f766e] shadow-xs hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* OPEN MODAL REGISTRATION FORM */}
            <button
              type="button"
              onClick={openAddTenantModal}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#0a4641] hover:from-[#0d5c56] hover:to-[#042f2c] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Add Tenant</span>
            </button>
          </div>
        </div>
      </GlassCard3D>

      {/* 3D STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Total Registered Tenants</p>
              <p className="mt-1 text-2xl font-black text-[#0f2d28]">{tenants.length}</p>
              <span className="text-[10px] font-bold text-[#0f766e]">Database Tenants</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7] font-bold">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Active Tenants</p>
              <p className="mt-1 text-2xl font-black text-[#10b981]">
                {tenants.filter((t) => t.status === "active").length}
              </p>
              <span className="text-[10px] font-bold text-[#10b981]">Operational</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcfce7] text-[#166534] font-bold">
              <Check className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Multi-Tenant Isolation</p>
              <p className="mt-1 text-2xl font-black text-[#0284c7]">Strict</p>
              <span className="text-[10px] font-bold text-[#0284c7]">HIPAA Encrypted</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7] font-bold">
              <Shield className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>
      </div>

      {/* MAIN TABLE CONTAINER */}
      <GlassCard3D depth={30}>
        {/* TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#cbe3db]">
          <div>
            <h2 className="text-base font-black text-[#0f2d28]">All Registered Healthcare Tenant Organizations</h2>
            <p className="text-xs font-bold text-[#5c7a72]">View and configure tenant domain identifiers and system settings</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5c7a72]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tenant name, code..."
                className="h-9 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 rounded-xl border border-[#bfe0d6] bg-white px-3 text-xs font-bold text-[#0f766e] outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-[#cbe3db] bg-white/90 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#cbe3db] bg-[#edf6f3] text-[#0f766e] font-black uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Tenant Organization</th>
                <th className="p-3.5">Tenant Code</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Timezone</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4f2ee]">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-[#f2faf7] transition-colors">
                  <td className="p-3.5 font-bold text-[#0f2d28]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#d6ece6] text-[#0f766e] font-black flex items-center justify-center text-sm shadow-xs">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#0f2d28]">{t.name}</p>
                        <p className="text-[10px] text-[#0f766e] font-mono">/{t.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#0f766e]">{t.code}</td>
                  <td className="p-3.5 font-semibold text-[#0f2d28]">
                    {t.city ? `${t.city}, ${t.state || ""} ${t.country || ""}` : "Global / Remote"}
                  </td>
                  <td className="p-3.5 font-mono text-[#5c7a72] text-[11px]">
                    {t.email || t.phone || "N/A"}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-600">
                    {t.timezone}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        t.status === "active"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : t.status === "suspended"
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : "bg-slate-100 text-slate-700 border border-slate-300"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      type="button"
                      onClick={openAddTenantModal}
                      className="rounded-lg p-1.5 text-[#0f766e] hover:bg-[#e4f2ee] transition-colors outline-none inline-block font-bold text-xs cursor-pointer"
                      title="Edit Tenant"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard3D>

      {/* ================= HIGH-END CLINICAL ADMIN REGISTRATION MODAL WITH PERFECT POSITIONING ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-20 pb-6 bg-[#081816]/80 backdrop-blur-md overflow-hidden animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-[#14b8a6]/40 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(15,118,110,0.35)] overflow-hidden max-h-[82vh] sm:max-h-[85vh] flex flex-col mt-1 sm:mt-2 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL CLINICAL HEADER */}
            <div className="bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] px-5 py-3.5 text-white flex items-center justify-between shadow-md shrink-0 border-b border-teal-500/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center font-black text-white shadow-inner">
                  <Building2 className="h-5 w-5 text-teal-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-teal-200 bg-teal-900/50 px-2 py-0.5 rounded-full border border-teal-500/30">
                      SuperAdmin Console
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    Register New Tenant Organization
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-95"
                title="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* MODAL BODY FORM */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-[#f7faf9] dark:bg-slate-950">
              {/* Feedback Alerts */}
              {successMsg && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2.5 shadow-sm">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2.5 shadow-sm">
                  <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form id="tenant-modal-form" onSubmit={handleCreateTenantSubmit} className="space-y-4">
                {/* SECTION 1: IDENTITY */}
                <div className="rounded-2xl border border-[#bcdad1] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#bcdad1]/60 dark:border-slate-800 pb-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] dark:text-teal-300 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#0f766e]" />
                      Tenant Identification & Domain Key
                    </h4>
                    <span className="text-[10px] font-black text-[#0f766e] bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Tenant Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Apex Healthcare Network"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold text-[#0f2d28] dark:text-white outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        URL Slug Identifier *
                      </label>
                      <input
                        type="text"
                        required
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="apex-healthcare"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 font-mono text-xs font-bold text-[#0f766e] dark:text-teal-400 outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                      Tenant Organization Code *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={formCode}
                        onChange={(e) => setFormCode(e.target.value)}
                        placeholder="TEN-APEX-01"
                        className="h-9 flex-1 rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 font-mono text-xs font-bold text-[#0f2d28] dark:text-white outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        className="h-9 px-3.5 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#0d5c56] text-white text-xs font-black shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Generate</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: CONTACT DETAILS */}
                <div className="rounded-2xl border border-[#bcdad1] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:shadow-md transition-all space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] dark:text-teal-300 flex items-center gap-2 border-b border-[#bcdad1]/60 dark:border-slate-800 pb-2">
                    <Mail className="h-4 w-4 text-[#0f766e]" />
                    Primary Contact Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Administrative Email
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="admin@apexhealth.com"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Primary Phone Number
                      </label>
                      <input
                        type="text"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: LOCATION */}
                <div className="rounded-2xl border border-[#bcdad1] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:shadow-md transition-all space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] dark:text-teal-300 flex items-center gap-2 border-b border-[#bcdad1]/60 dark:border-slate-800 pb-2">
                    <MapPin className="h-4 w-4 text-[#0f766e]" />
                    HQ Address & Location
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        placeholder="100 Medical Center Parkway"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        placeholder="Boston"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        State / Region
                      </label>
                      <input
                        type="text"
                        value={formState}
                        onChange={(e) => setFormState(e.target.value)}
                        placeholder="MA"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        placeholder="United States"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Postal / ZIP
                      </label>
                      <input
                        type="text"
                        value={formPostalCode}
                        onChange={(e) => setFormPostalCode(e.target.value)}
                        placeholder="02115"
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: TIMEZONE & STATUS */}
                <div className="rounded-2xl border border-[#bcdad1] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:shadow-md transition-all space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] dark:text-teal-300 flex items-center gap-2 border-b border-[#bcdad1]/60 dark:border-slate-800 pb-2">
                    <Compass className="h-4 w-4 text-[#0f766e]" />
                    Timezone & Status Configuration
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        System Timezone *
                      </label>
                      <select
                        value={formTimezone}
                        onChange={(e) => setFormTimezone(e.target.value)}
                        className="h-9 w-full rounded-xl border border-[#bfe0d6] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-extrabold outline-none focus:border-[#0f766e] cursor-pointer"
                      >
                        <option value="UTC">UTC (Universal Coordinated Time)</option>
                        <option value="America/New_York">America/New_York (Eastern Time)</option>
                        <option value="America/Chicago">America/Chicago (Central Time)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (Pacific Time)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#172522] dark:text-slate-200 mb-1">
                        Operational Status *
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "active", label: "Active", bg: "bg-emerald-600 text-white" },
                          { id: "inactive", label: "Inactive", bg: "bg-slate-600 text-white" },
                          { id: "suspended", label: "Suspended", bg: "bg-rose-600 text-white" },
                        ].map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setFormStatus(st.id as any)}
                            className={`flex-1 h-9 rounded-xl text-xs font-black transition-all cursor-pointer border border-[#bcdad1] ${
                              formStatus === st.id
                                ? `${st.bg} shadow-sm ring-2 ring-[#0f766e]/30 scale-[1.02]`
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* MODAL FOOTER */}
            <div className="bg-white dark:bg-slate-900 px-5 py-3 border-t border-[#bcdad1] dark:border-slate-800 flex items-center justify-between gap-3 shadow-md shrink-0">
              <Link
                href="/super-admin/tenants/create"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-[#0f766e] hover:underline flex items-center gap-1.5"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open Full Page Form</span>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-9 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="tenant-modal-form"
                  disabled={isSubmitting}
                  className="h-9 px-5 rounded-xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] hover:from-[#0d5c56] hover:to-[#042f2c] text-white text-xs font-black shadow-lg hover:shadow-teal-900/30 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting && <RefreshCw className="h-4 w-4 animate-spin" />}
                  <span>{isSubmitting ? "Registering Tenant..." : "Register Tenant"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}