"use client";

import Link from "next/link";
import { useState } from "react";
import GlassCard3D from "@/components/common/GlassCard3D";
import { UserCheck, ArrowLeft, ShieldCheck, Mail, Phone, Building2, Lock, Check } from "lucide-react";

export default function CreateAdminPage() {
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facility, setFacility] = useState("Central Medical Center");
  const [role, setRole] = useState("Administrator");
  const [employeeId, setEmployeeId] = useState("ADM-00824");
  const [status, setStatus] = useState("Active");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full space-y-6 pb-12">
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
              Create administrator credentials, assign facility access roles, and initialize security parameters.
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
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-[#166534] shadow-lg">
              <Check className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-black text-[#0f2d28]">Administrator Account Created!</h2>
            <p className="text-xs font-semibold text-[#54736b] max-w-md mx-auto">
              <span className="font-bold text-[#0f766e]">{firstName} {lastName}</span> ({email}) has been granted {role} access for <span className="font-bold text-[#0284c7]">{facility}</span>.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/super-admin/admins"
                className="btn-primary"
              >
                Go to Administrators Directory
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-2xl bg-white border border-white/80 px-6 py-3 text-xs font-extrabold text-[#0f766e] shadow-xs"
              >
                Create Another Admin
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
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
                    placeholder="+1 (555) 019-2831"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Administrator & Facility Details */}
            <div className="rounded-2xl border border-white/80 bg-white/50 p-5 shadow-xs backdrop-blur-md">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0f2d28] mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#0f766e]" />
                Facility & Role Assignments
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Healthcare Facility *
                  </label>
                  <select
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] cursor-pointer"
                  >
                    <option value="Central Medical Center">Central Medical Center</option>
                    <option value="Green Valley Hospital">Green Valley Hospital</option>
                    <option value="City Care Clinic">City Care Clinic</option>
                    <option value="Sunrise Healthcare">Sunrise Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Administrator Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] cursor-pointer"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Super Administrator">Super Administrator</option>
                    <option value="Facility Administrator">Facility Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Account Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/90 px-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e] cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Welcome Email Settings */}
            <div className="rounded-2xl border border-white/80 bg-white/50 p-5 shadow-xs backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold text-[#0f2d28]">Send Welcome & Activation Email</p>
                  <p className="text-[10px] font-semibold text-[#54736b]">
                    Automatically send password setup instructions to the administrator&apos;s email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSendWelcomeEmail(!sendWelcomeEmail)}
                  className={`h-6 w-11 rounded-full p-1 transition-colors ${
                    sendWelcomeEmail ? "bg-[#0f766e]" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white shadow-md transition-transform ${
                      sendWelcomeEmail ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
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
                className="btn-primary"
              >
                Create Administrator
              </button>
            </div>
          </form>
        )}
      </GlassCard3D>
    </div>
  );
}