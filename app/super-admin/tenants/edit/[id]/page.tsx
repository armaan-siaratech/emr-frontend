"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import GlassCard3D from "@/components/common/GlassCard3D";
import { getTenantByIdApi, getTenantsApi, updateTenantApi, TenantItem } from "@/lib/api/authApi";
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
  Globe,
  Save,
  Check,
  ExternalLink,
  Shield,
  Activity,
  Sparkles,
} from "lucide-react";

export default function SuperAdminEditTenantPage() {
  const router = useRouter();
  const params = useParams();
  const tenantId = (params?.id as string) || "";

  // Tenant Fields State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [status, setStatus] = useState<"active" | "inactive" | "suspended">("active");

  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    setIsFetching(true);
    setErrorMsg("");

    getTenantByIdApi(tenantId)
      .then((data) => {
        populateForm(data);
      })
      .catch(async () => {
        // Fallback: try loading all tenants and finding the match
        try {
          const list = await getTenantsApi();
          const match = Array.isArray(list) ? list.find((t) => t.id === tenantId) : null;
          if (match) {
            populateForm(match);
          } else {
            setErrorMsg("Tenant organization not found in database.");
          }
        } catch (err: any) {
          console.error("Failed to load tenant details:", err);
          setErrorMsg(err.message || "Failed to fetch tenant configuration details.");
        }
      })
      .finally(() => setIsFetching(false));
  }, [tenantId]);

  const populateForm = (data: TenantItem) => {
    setName(data.name || "");
    setSlug(data.slug || "");
    setCode(data.code || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setAddress(data.address || "");
    setCity(data.city || "");
    setState(data.state || "");
    setCountry(data.country || "United States");
    setPostalCode(data.postal_code || "");
    setTimezone(data.timezone || "America/New_York");
    setStatus(data.status || "active");
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
      await updateTenantApi(tenantId, {
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
      console.error("Failed to update tenant:", err);
      setErrorMsg(err.message || "Failed to update tenant configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-fade-in">
        <div className="h-14 w-14 rounded-2xl bg-[#e4f2ee] text-[#0f766e] flex items-center justify-center animate-spin">
          <RefreshCw className="h-7 w-7" />
        </div>
        <p className="text-sm font-bold text-[#0f2d28]">Loading Tenant Configuration...</p>
        <p className="text-xs text-[#5c7a72]">Retrieving encryption keys and tenant organization metadata.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-24 animate-fade-in max-w-7xl mx-auto">
      {/* HERO HEADER */}
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
                SuperAdmin Configuration Terminal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d28] tracking-tight flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#0a4641] text-white flex items-center justify-center shadow-md">
                <Building2 className="h-6 w-6 text-teal-200" />
              </div>
              Edit Tenant: {name || "Healthcare Organization"}
            </h1>
            <p className="mt-1 text-xs font-semibold text-[#54736b]">
              Modify domain routing, contact profile, timezone rules, and tenant operational status.
            </p>
          </div>

          {/* REAL-TIME DOMAIN PREVIEW BADGE */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#062420] via-[#0b3c36] to-[#041a17] text-white shadow-xl border border-teal-500/30 flex flex-col gap-2.5 self-start lg:self-auto min-w-[310px]">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-teal-300 animate-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-wider text-teal-300">
                  <span>Production Domain</span>
                  <span
                    className={`flex items-center gap-1 font-bold ${status === "active"
                      ? "text-emerald-400"
                      : status === "suspended"
                        ? "text-rose-400"
                        : "text-amber-400"
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status === "active"
                        ? "bg-emerald-400 animate-ping"
                        : status === "suspended"
                          ? "bg-rose-400"
                          : "bg-amber-400"
                        }`}
                    />
                    {status.toUpperCase()}
                  </span>
                </div>
                <p className="font-mono text-xs font-black text-white truncate mt-0.5">
                  https://{slug || "tenant-slug"}.ethizo.com
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between text-[10px] font-extrabold text-teal-200">
              <span className="text-cyan-300">Local Dev URL:</span>
              <span className="font-mono text-[#72d4bd] bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">
                http://localhost:3000/?tenant={slug || "slug"}
              </span>
            </div>
          </div>
        </div>
      </GlassCard3D>

      {/* FEEDBACK ALERTS */}
      {submitted && (
        <div className="p-4.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-extrabold flex items-center gap-3 shadow-md animate-bounce">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <div>
            <p>Tenant Organization Updated Successfully!</p>
            <p className="text-xs font-semibold text-emerald-700">Redirecting to tenants dashboard...</p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg("")}
            className="text-xs text-rose-700 hover:underline font-extrabold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* MAIN EDIT FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard3D depth={25}>
          <div className="p-1 space-y-6">
            {/* SECTION 1: IDENTITY & IDENTIFIERS */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#cbe3db]">
                <ShieldCheck className="h-5 w-5 text-[#0f766e]" />
                <h2 className="text-base font-black text-[#0f2d28]">Organization Identity & Multi-Tenant Keys</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">
                    Tenant Organization Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Apollo Healthcare Network"
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">
                    Subdomain / URL Slug <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      placeholder="apollo-health"
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-mono font-bold text-[#0f766e] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 transition-all"
                    />
                  </div>
                  <p className="mt-1 text-[10px] font-semibold text-[#5c7a72]">
                    Subdomain key used in http://[slug].ethizo.com
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">
                    Tenant Organization Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="TEN-APOLLO-01"
                    disabled
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-mono font-bold text-[#0f766e] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 transition-all uppercase"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: STATUS & TIMEZONE */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#cbe3db]">
                <Activity className="h-5 w-5 text-[#0f766e]" />
                <h2 className="text-base font-black text-[#0f2d28]">Operational Status & Timezone Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">
                    Operational Status <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] cursor-pointer"
                  >
                    <option value="active">Active (Fully Operational)</option>
                    <option value="inactive">Inactive (Maintenance / Offline)</option>
                    <option value="suspended">Suspended (Access Disabled)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">Primary Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] cursor-pointer"
                  >
                    <option value="America/New_York">Eastern Time (US & Canada) (EDT)</option>
                    <option value="America/Chicago">Central Time (US & Canada) (CDT)</option>
                    <option value="America/Denver">Mountain Time (US & Canada) (MDT)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada) (PDT)</option>
                    <option value="Europe/London">London (GMT / BST)</option>
                    <option value="Asia/Kolkata">India Standard Time (IST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: CONTACT & LOCATION METADATA */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#cbe3db]">
                <MapPin className="h-5 w-5 text-[#0f766e]" />
                <h2 className="text-base font-black text-[#0f2d28]">Contact & Location Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">Official Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@organization.com"
                      disabled
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-10 pr-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="100 Healthcare Way, Suite 300"
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">State / Province</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="NY"
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="United States"
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#0f2d28] mb-1.5">Postal / Zip Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3.5 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-6 border-t border-[#cbe3db] flex items-center justify-end gap-3">
              <Link
                href="/super-admin/tenants"
                className="h-11 px-5 rounded-2xl bg-white border border-[#bfe0d6] text-xs font-extrabold text-[#0f766e] hover:bg-[#edf6f3] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Cancel</span>
              </Link>

              <button
                type="submit"
                disabled={isLoading || submitted}
                className="h-11 px-6 rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] hover:from-[#0d5c56] hover:to-[#042f2c] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Tenant Configuration</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </GlassCard3D>
      </form>
    </div>
  );
}
