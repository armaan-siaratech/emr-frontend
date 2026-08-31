"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GlassCard3D from "@/components/common/GlassCard3D";
import { UserCheck, ArrowLeft, Building2, Check, AlertCircle } from "lucide-react";
import { createAdminApi } from "@/lib/api/adminApi";

export default function CreateAdminPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("Platform Super Admin");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError("First Name, Last Name, Email and Password are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createAdminApi({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        designation: designation.trim() || "Platform Super Admin",
        password,
        is_active: isActive,
      });
      router.push("/super-admin/admins");
    } catch (err: any) {
      setError(err?.message || "Failed to create administrator account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* 3D Glass Hero Banner */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Link
                href="/super-admin/admins"
                className="flex items-center gap-1 text-xs font-bold text-[#0f766e] hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Administrators</span>
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0f766e]">
                Super Admin Privileges
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d28] tracking-tight flex items-center gap-2.5">
              <UserCheck className="h-7 w-7 text-[#0f766e]" />
              Create Administrator
            </h1>

            <p className="mt-1 text-xs font-semibold text-[#54736b]">
              Create system administrator credentials, set designations, and initialize access.
            </p>
          </div>

          <Link
            href="/super-admin/admins"
            className="flex items-center gap-2 rounded-2xl bg-white/80 border border-white px-4 py-2.5 text-xs font-extrabold text-[#0f2d28] shadow-xs hover:bg-white"
          >
            <span>View All Admins</span>
          </Link>
        </div>
      </GlassCard3D>

      {/* Main 3D Form Card */}
      <GlassCard3D depth={25}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Personal Information */}
          <div className="rounded-2xl border border-white/80 bg-white/50 p-5 shadow-xs backdrop-blur-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] mb-3 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#0f766e]" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2e4741] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2e4741] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2e4741] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.smith@medicarehms.com"
                  className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-mono font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2e4741] mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Administrator Credentials & Role */}
          <div className="rounded-2xl border border-white/80 bg-white/50 p-5 shadow-xs backdrop-blur-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#0f766e]" />
              Credentials & Designation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2e4741] mb-1">
                  Designation / Title
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Platform Super Admin"
                  className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2e4741] mb-1">
                  Initial Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs text-[#0f2d28] outline-none focus:border-[#0f766e]"
                />
              </div>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-[#2e4741] font-bold text-xs">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0f766e] focus:ring-[#0f766e]"
                />
                <span>Active Account Status</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <Link
              href="/super-admin/admins"
              className="rounded-2xl bg-white border border-white/80 px-6 py-3 text-xs font-extrabold text-[#5c7a72] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#0f766e] outline-none transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-[#0f766e] hover:bg-[#0B625C] px-6 py-3 text-xs font-black text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Administrator"}
            </button>
          </div>
        </form>
      </GlassCard3D>
    </div>
  );
}