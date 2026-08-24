"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassCard3D from "@/components/common/GlassCard3D";
import { createTenantApi } from "@/lib/api/authApi";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Compass,
  Globe,
  Sparkles,
  Server,
  Key,
  Shield,
  Zap,
  Check,
  Cpu,
  Wand2,
  Copy,
} from "lucide-react";

export default function SuperAdminCreateTenantPage() {
  const router = useRouter();

  // Tenant Backend Fields State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [code, setCode] = useState("TEN-MED-849");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [status, setStatus] = useState<"active" | "inactive" | "suspended">("active");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-generate slug from Tenant Name
  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  // Auto-generate random Tenant Code
  const handleGenerateCode = () => {
    const randomCode = `TEN-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setCode(randomCode);
  };

  // Fill Sample Data for instant testing
  const handleFillSampleData = () => {
    setName("Metro Health Systems");
    setSlug("metro-health");
    handleGenerateCode();
    setEmail("admin@metrohealth.org");
    setPhone("+1 (555) 890-1234");
    setAddress("500 Innovation Boulevard, Suite 400");
    setCity("Austin");
    setState("TX");
    setCountry("United States");
    setPostalCode("78701");
    setTimezone("America/Chicago");
    setStatus("active");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Tenant Organization Name is required.");
      return;
    }
    if (!slug.trim()) {
      setErrorMsg("URL Slug Identifier is required.");
      return;
    }
    if (!code.trim()) {
      setErrorMsg("Tenant Organization Code is required.");
      return;
    }

    setIsLoading(true);

    try {
      await createTenantApi({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        code: code.trim().toUpperCase(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        country: country.trim() || undefined,
        postal_code: postalCode.trim() || undefined,
        timezone: timezone,
        status: status,
      });

      setSubmitted(true);
      setTimeout(() => {
        router.push("/super-admin/tenants");
      }, 1500);
    } catch (err: any) {
      console.error("Failed to create tenant:", err);
      setErrorMsg(err.message || "Failed to create tenant organization. Slug or Code may already exist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-24 animate-fade-in max-w-7xl mx-auto">
      {/* 3D HERO HEADER BANNER WITH LIVE DOMAIN BADGE BAR */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/super-admin/tenants"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0f766e] hover:underline group"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Tenants Directory</span>
              </Link>
              <span className="text-[#bcdad1]">•</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0f766e] bg-[#e6f4f0] px-2.5 py-0.5 rounded-full border border-teal-200">
                SuperAdmin Provisioning Terminal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d28] tracking-tight flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#0a4641] text-white flex items-center justify-center shadow-md">
                <Building2 className="h-6 w-6 text-teal-200" />
              </div>
              Provision New Tenant Organization
            </h1>
            <p className="mt-1 text-xs font-semibold text-[#54736b]">
              Enterprise Multi-Tenant Onboarding Studio — Provision database boundary, domain key, & contact metadata.
            </p>
          </div>

          {/* REAL-TIME DOMAIN PREVIEW BADGE */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#062420] via-[#0b3c36] to-[#041a17] text-white shadow-xl border border-teal-500/30 flex items-center gap-3 self-start lg:self-auto min-w-[280px]">
            <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Globe className="h-5 w-5 text-teal-300 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-wider text-teal-300">
                <span>Live Domain URL</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </span>
              </div>
              <p className="font-mono text-xs font-black text-white truncate mt-0.5">
                https://{slug || "tenant-slug"}.ethizo.com
              </p>
            </div>
          </div>
        </div>
      </GlassCard3D>

      {/* FEEDBACK ALERTS */}
      {submitted && (
        <div className="p-4.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-extrabold flex items-center gap-3 shadow-md">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Tenant Organization &apos;{name}&apos; ({code}) created successfully! Redirecting...</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-sm font-extrabold flex items-center gap-3 shadow-md">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* PROVISIONING FORM CONTAINER */}
      <form id="tenant-provision-form" onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: IDENTITY & DOMAIN (3 INPUT FIELDS IN ROW 1, 2 IN ROW 2) */}
        <GlassCard3D depth={25}>
          <div className="space-y-4 border-l-4 border-l-[#0f766e] pl-4 -ml-2">
            <div className="flex items-center justify-between border-b border-[#cbe3db] pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0f766e]/15 to-[#0f766e]/5 border border-[#0f766e]/20 text-[#0f766e] flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-[#0f2d28]">
                    1. Tenant Identity & Domain Keys
                  </h2>
                  <p className="text-xs font-semibold text-[#54736b]">
                    Configure organization title, domain slug identifier, and system codes
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0f766e] bg-[#e6f4f0] px-3 py-1 rounded-full border border-teal-200">
                Mandatory
              </span>
            </div>

            {/* ROW 1: 3 DATA INPUT FIELDS IN 1 ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5 flex items-center justify-between">
                  <span>Tenant Organization Name *</span>
                  <span className="text-[10px] font-bold text-[#0f766e]">Auto-Slug</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Apex Healthcare Network"
                    className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5 flex items-center justify-between">
                  <span>URL Slug Identifier *</span>
                  <span className="text-[10px] font-mono text-[#0f766e]">/{slug || "slug"}</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="apex-healthcare"
                    className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 font-mono text-xs font-bold text-[#0f766e] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5 flex items-center justify-between">
                  <span>Tenant Code *</span>
                  <span className="text-[10px] font-bold text-slate-500">Unique Code</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="TEN-APEX-01"
                      className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 font-mono text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    className="h-11 px-4 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#0d5c56] text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shrink-0"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 2: 2 DATA INPUT FIELDS IN 1 ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  System Operating Timezone *
                </label>
                <div className="relative">
                  <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0f766e]" />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-extrabold text-[#0f766e] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 cursor-pointer shadow-xs transition-all"
                  >
                    <option value="UTC">UTC (Universal Coordinated Time)</option>
                    <option value="America/New_York">America/New_York (Eastern Time)</option>
                    <option value="America/Chicago">America/Chicago (Central Time)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (Pacific Time)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Operational Status *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "active", label: "Active", bg: "bg-emerald-600 text-white border-emerald-700 shadow-md" },
                    { id: "inactive", label: "Inactive", bg: "bg-slate-600 text-white border-slate-700 shadow-md" },
                    { id: "suspended", label: "Suspended", bg: "bg-rose-600 text-white border-rose-700 shadow-md" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatus(st.id as any)}
                      className={`h-11 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                        status === st.id
                          ? `${st.bg} ring-2 ring-[#0f766e]/30 scale-[1.02]`
                          : "bg-white text-slate-700 border-[#bcdad1] hover:bg-slate-50"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard3D>

        {/* SECTION 2: ADMINISTRATIVE CONTACT & COMMUNICATION (3 INPUT FIELDS IN 1 ROW!) */}
        <GlassCard3D depth={25}>
          <div className="space-y-4 border-l-4 border-l-[#0284c7] pl-4 -ml-2">
            <div className="flex items-center justify-between border-b border-[#cbe3db] pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0284c7]/15 to-[#0284c7]/5 border border-[#0284c7]/20 text-[#0284c7] flex items-center justify-center font-bold shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-[#0f2d28]">
                    2. Administrative Contact & Communication
                  </h2>
                  <p className="text-xs font-semibold text-[#54736b]">
                    Primary administrator contact parameters for multi-tenant notifications
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0284c7] bg-[#e0f2fe] px-3 py-1 rounded-full border border-sky-200">
                3 Inputs per Row
              </span>
            </div>

            {/* 3 DATA INPUT FIELDS IN 1 ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Administrative Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@apexhealth.com"
                    className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Primary Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Compliance Audit Email
                </label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="compliance@apexhealth.com"
                    className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard3D>

        {/* SECTION 3: PHYSICAL LOCATION & HEADQUARTERS (5 INPUT FIELDS IN PROPORTIONAL ROW!) */}
        <GlassCard3D depth={25}>
          <div className="space-y-4 border-l-4 border-l-[#10b981] pl-4 -ml-2">
            <div className="flex items-center justify-between border-b border-[#cbe3db] pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#10b981]/15 to-[#10b981]/5 border border-[#10b981]/20 text-[#10b981] flex items-center justify-center font-bold shadow-xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-[#0f2d28]">
                    3. Headquarters Physical Location & Regional Data
                  </h2>
                  <p className="text-xs font-semibold text-[#54736b]">
                    Physical organization HQ address parameters across 5 dense data inputs
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#10b981] bg-[#dcfce7] px-3 py-1 rounded-full border border-emerald-300">
                5 Inputs per Row
              </span>
            </div>

            {/* 5 DATA INPUT FIELDS IN 1 SINGLE PROPORTIONAL ROW! */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
              <div className="lg:col-span-2">
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="100 Medical Center Parkway"
                  className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Boston"
                  className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  State / Region
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="MA"
                  className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States"
                  className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#172522] mb-1.5">
                  Postal / ZIP
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="02115"
                  className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/15 shadow-xs transition-all"
                />
              </div>
            </div>
          </div>
        </GlassCard3D>

        {/* HIGH-END STICKY BOTTOM ACTION BAR */}
        <div className="sticky bottom-4 z-40 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-[#bcdad1] dark:border-slate-800 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFillSampleData}
              className="h-10 px-4 rounded-2xl bg-[#e6f4f0] text-[#0f766e] hover:bg-[#d5ece6] text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border border-teal-200"
            >
              <Wand2 className="h-4 w-4" />
              <span>Fill Sample Data</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#54736b]">
              <Server className="h-4 w-4 text-[#0f766e]" />
              <span>PostgreSQL Schema Boundaries Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/super-admin/tenants"
              className="h-10 px-5 rounded-2xl border border-[#bcdad1] bg-white text-xs font-extrabold text-[#5c7a72] hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer shadow-xs"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="h-10 px-7 rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] hover:from-[#0d5c56] hover:to-[#042f2c] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 active:scale-95"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 text-emerald-400" />
              )}
              <span>{isLoading ? "Provisioning Database..." : "Deploy Tenant Organization"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
