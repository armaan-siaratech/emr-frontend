"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassCard3D from "@/components/common/GlassCard3D";
import { createTenantApi } from "@/lib/api/tenantApi";
import {
  Building2,
  Globe,
  Key,
  Mail,
  Phone,
  MapPin,
  Compass,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Wand2,
  HeartPulse,
  Laptop,
} from "lucide-react";

export default function PublicRegisterTenantPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [code, setCode] = useState("TEN-CLINIC-101");
  const [email, setEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("Admin@123456");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("");
  const [timezone, setTimezone] = useState("UTC");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedTenant, setSubmittedTenant] = useState<any>(null);

  // Auto generate slug from Organization name
  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  // Generate random tenant code
  const handleGenerateCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCode(`TEN-ORG-${randomNum}`);
  };

  // Sample data filler
  const handleFillSample = () => {
    setName("St. Jude Health System");
    setSlug("st-jude-health");
    handleGenerateCode();
    setEmail("contact@stjudehealth.org");
    setPhone("+1 (555) 432-1098");
    setAddress("700 Hospital Way");
    setCity("Chicago");
    setState("IL");
    setCountry("United States");
    setPostalCode("60601");
    setTimezone("America/Chicago");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Organization name is required.");
      return;
    }
    if (!slug.trim()) {
      setErrorMsg("URL Slug is required.");
      return;
    }
    if (!code.trim()) {
      setErrorMsg("Organization Tenant Code is required.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Administrative Email is required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await createTenantApi({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        code: code.trim().toUpperCase(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        country: country.trim() || undefined,
        postal_code: postalCode.trim() || undefined,
        timezone: timezone,
        status: "active",
        admin_email: email.trim(),
        admin_password: adminPassword.trim() || "Admin@123456",
      });


      setSubmittedTenant(res);
    } catch (err: any) {
      console.error("Tenant registration error:", err);
      setErrorMsg(
        err.message || "Failed to register tenant organization. Slug or Code may already exist."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8f7] via-[#e6f2ef] to-[#daf0eb] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* BRAND NAVIGATION BAR */}
        <div className="flex items-center justify-between pb-4 border-b border-[#cbe3db]">
          <Link href="/login" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#0f766e] to-[#14b8a6] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black text-[#0f2d28] tracking-tight">Ethizo EHR</span>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#0f766e]">
                Enterprise Healthcare Platform
              </span>
            </div>
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-white border border-[#bfe0d6] text-xs font-black text-[#0f766e] hover:bg-[#e6f4f0] transition-colors"
          >
            Sign In to Portal
          </Link>
        </div>

        {/* HERO BANNER */}
        <GlassCard3D depth={15}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f4f0] border border-teal-200 text-[10px] font-black uppercase text-[#0f766e] mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Multi-Tenant Enterprise Onboarding</span>
              </div>
              <h1 className="text-3xl font-black text-[#0f2d28] tracking-tight">
                Register Your Healthcare Enterprise
              </h1>
              <p className="mt-1.5 text-xs font-semibold text-[#54736b] max-w-xl leading-relaxed">
                Provision a dedicated multi-tenant health network, configure unique domain parameters, and launch your HIPAA-compliant clinical workspace.
              </p>
            </div>

            {/* REAL-TIME DOMAIN PREVIEW BOX */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#062420] via-[#0b3c36] to-[#041a17] text-white shadow-2xl border border-teal-500/30 shrink-0 md:w-80">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-teal-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 animate-pulse text-teal-300" />
                  Live Production Domain
                </span>
                <span className="text-emerald-400 font-bold text-[9px] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Ready
                </span>
              </div>
              <p className="font-mono text-xs font-black text-white truncate bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                https://{slug || "tenant-slug"}.ethizo.com
              </p>

              <div className="mt-3 pt-2.5 border-t border-teal-500/20 flex items-center justify-between text-[10px] font-extrabold text-teal-200">
                <span className="flex items-center gap-1">
                  <Laptop className="h-3 w-3 text-cyan-300" />
                  Local Development:
                </span>
                <span className="font-mono text-[10px] text-teal-300">
                  http://localhost:3000/?tenant={slug || "slug"}
                </span>
              </div>
            </div>
          </div>
        </GlassCard3D>

        {/* SUCCESS CARD */}
        {submittedTenant ? (
          <GlassCard3D depth={30}>
            <div className="py-10 px-6 text-center space-y-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-4 border-emerald-200 shadow-lg animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#0f2d28]">
                  Tenant Organization Registered Successfully!
                </h2>
                <p className="text-xs font-semibold text-[#54736b] mt-1 max-w-lg mx-auto">
                  &quot;{submittedTenant.name}&quot; has been provisioned with tenant code{" "}
                  <span className="font-mono font-bold text-[#0f766e]">{submittedTenant.code}</span>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f0f9f6] border border-teal-200 max-w-md mx-auto text-left space-y-2 font-mono text-xs text-[#0f2d28]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenant ID:</span>
                  <span className="font-bold">{submittedTenant.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">URL Slug:</span>
                  <span className="font-bold text-[#0f766e]">{submittedTenant.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold uppercase text-emerald-600">
                    {submittedTenant.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSubmittedTenant(null)}
                  className="px-6 py-2.5 rounded-2xl bg-white border border-[#bfe0d6] text-xs font-black text-[#0f766e] hover:bg-[#e6f4f0] transition-all cursor-pointer"
                >
                  Register Another Tenant
                </button>
                <Link
                  href="/login"
                  className="px-8 py-2.5 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#0d5c56] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Admin Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </GlassCard3D>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-4.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-3 shadow-md">
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* SECTION 1: IDENTITY */}
            <GlassCard3D depth={25}>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#cbe3db] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#e6f4f0] text-[#0f766e] flex items-center justify-center font-bold">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-wider text-[#0f2d28]">
                        1. Tenant Organization Information
                      </h2>
                      <p className="text-[11px] font-semibold text-[#54736b]">
                        Organization name, custom URL slug identifier, and system tenant code
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillSample}
                    className="px-3 py-1 rounded-xl bg-[#e6f4f0] text-[#0f766e] text-[10px] font-black flex items-center gap-1 border border-teal-200 hover:bg-[#d4ece5] cursor-pointer"
                  >
                    <Wand2 className="h-3 w-3" />
                    <span>Fill Sample</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#172522] mb-1">
                      Organization Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Apex Hospital Network"
                        className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#172522] mb-1">
                      URL Slug Identifier *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="apex-hospital"
                        className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 font-mono text-xs font-bold text-[#0f766e] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#172522] mb-1">
                      Tenant Organization Code *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                        <input
                          type="text"
                          required
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="TEN-APEX-01"
                          className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 font-mono text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        className="h-10 px-3 rounded-xl bg-[#0f766e] text-white text-[11px] font-extrabold hover:bg-[#0d5c56] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Code</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard3D>

            {/* SECTION 2: CONTACT & LOCATION */}
            <GlassCard3D depth={25}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#cbe3db] pb-3">
                  <div className="h-9 w-9 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center font-bold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-[#0f2d28]">
                      2. Contact & Administrative Details
                    </h2>
                    <p className="text-[11px] font-semibold text-[#54736b]">
                      Administrative email, phone, and headquarters location
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#172522] mb-1">
                      Administrative Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@apexhealth.com"
                        className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#172522] mb-1">
                      Primary Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5c7a72]" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                  <div className="lg:col-span-2">
                    <label className="block text-[11px] font-extrabold text-[#172522] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="100 Medical Center Way"
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#172522] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Boston"
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#172522] mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="MA"
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#172522] mb-1">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="h-10 w-full rounded-xl border border-[#bfe0d6] bg-white px-2 text-xs font-bold text-[#0f766e] outline-none focus:border-[#0f766e]"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="America/Chicago">America/Chicago (CST)</option>
                      <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    </select>
                  </div>
                </div>
              </div>
            </GlassCard3D>

            {/* SUBMIT BUTTON BAR */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/login"
                className="text-xs font-black text-[#5c7a72] hover:text-[#0f766e] transition-colors"
              >
                Back to Sign In
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] hover:from-[#0d5c56] hover:to-[#042f2c] text-white text-xs font-black shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center gap-2.5 disabled:opacity-50 active:scale-95"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 text-emerald-400" />
                )}
                <span>{isLoading ? "Provisioning Database..." : "Register Tenant Organization"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
