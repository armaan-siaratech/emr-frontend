"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard3D from "@/components/common/GlassCard3D";
import { getTenantsApi, TenantItem } from "@/lib/api/authApi";
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
  ExternalLink,
  ChevronRight,
  Sparkles,
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

export default function SuperAdminTenantsPage() {
  const [tenants, setTenants] = useState<TenantItem[]>(initialTenants);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

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

            {/* DIRECT FULL PAGE REGISTRATION LINK */}
            <Link
              href="/super-admin/tenants/create"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] hover:from-[#0d5c56] hover:to-[#042f2c] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Add Tenant</span>
              <ChevronRight className="h-4 w-4 opacity-75" />
            </Link>
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
                    <Link
                      href="/super-admin/tenants/create"
                      className="rounded-lg p-1.5 text-[#0f766e] hover:bg-[#e4f2ee] transition-colors outline-none inline-block font-bold text-xs cursor-pointer"
                      title="Edit Tenant"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard3D>
    </div>
  );
}
