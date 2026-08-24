"use client";

import Link from "next/link";
import { useState } from "react";
import GlassCard3D from "@/components/common/GlassCard3D";
import { UserCheck, Plus, Search, Filter, ShieldCheck, Check, Clock, Eye, Edit, MoreHorizontal } from "lucide-react";

const admins = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@medicarehms.com",
    phone: "+91 98765 43210",
    facility: "Central Medical Center",
    role: "Administrator",
    status: "Active",
    lastLogin: "Today, 09:42 AM",
    createdAt: "Aug 05, 2026",
    initials: "JS",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@medicarehms.com",
    phone: "+91 98765 12345",
    facility: "Green Valley Hospital",
    role: "Administrator",
    status: "Active",
    lastLogin: "Today, 08:31 AM",
    createdAt: "Aug 04, 2026",
    initials: "SW",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@medicarehms.com",
    phone: "+91 98765 67890",
    facility: "City Care Clinic",
    role: "Administrator",
    status: "Pending",
    lastLogin: "Never",
    createdAt: "Aug 09, 2026",
    initials: "MB",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@medicarehms.com",
    phone: "+91 98765 24680",
    facility: "Sunrise Healthcare",
    role: "Administrator",
    status: "Active",
    lastLogin: "Yesterday, 06:21 PM",
    createdAt: "Aug 02, 2026",
    initials: "ED",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@medicarehms.com",
    phone: "+91 98765 13579",
    facility: "Central Medical Center",
    role: "Administrator",
    status: "Inactive",
    lastLogin: "Aug 01, 2026",
    createdAt: "Jul 28, 2026",
    initials: "RW",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    email: "olivia.taylor@medicarehms.com",
    phone: "+91 98765 86420",
    facility: "Green Valley Hospital",
    role: "Administrator",
    status: "Active",
    lastLogin: "Today, 10:12 AM",
    createdAt: "Jul 26, 2026",
    initials: "OT",
  },
];

export default function AdminListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase()) ||
      admin.facility.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || admin.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-6 pb-12">
      {/* 3D HERO HEADER BANNER */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Link
                href="/super-admin"
                className="text-xs font-extrabold text-[#0f766e] hover:underline"
              >
                Super Admin
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0f766e]">
                Administrator Management
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d28] tracking-tight flex items-center gap-2.5">
              <UserCheck className="h-7 w-7 text-[#0f766e]" />
              Super Admin Administrators
            </h1>

            <p className="mt-1 text-xs font-semibold text-[#54736b]">
              Manage healthcare administrator credentials, facility assignments, and security permissions.
            </p>
          </div>

          <Link
            href="/super-admin/admins/create"
            className="btn-primary self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 font-bold" />
            <span>New Admin Account</span>
          </Link>
        </div>
      </GlassCard3D>

      {/* 3D SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Total Admins</p>
              <p className="mt-1 text-2xl font-black text-[#0f2d28]">24</p>
              <span className="text-[10px] font-bold text-[#0f766e]">Platform Admins</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7] font-bold">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Active Admins</p>
              <p className="mt-1 text-2xl font-black text-[#10b981]">21</p>
              <span className="text-[10px] font-bold text-[#10b981]">Active Access</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcfce7] text-[#166534] font-bold">
              <Check className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Pending Admins</p>
              <p className="mt-1 text-2xl font-black text-[#d97706]">2</p>
              <span className="text-[10px] font-bold text-[#d97706]">Awaiting Activation</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fef3c7] text-[#d97706] font-bold">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Inactive</p>
              <p className="mt-1 text-2xl font-black text-[#64748b]">1</p>
              <span className="text-[10px] font-bold text-[#64748b]">Disabled Accounts</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>
      </div>

      {/* MAIN 3D TABLE CONTAINER */}
      <GlassCard3D depth={30}>
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#cbe3db]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5c7a72]" />
              <input
                type="text"
                placeholder="Search administrators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-bold text-[#0f2d28] outline-none focus:border-[#0f766e]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-xl border border-[#bfe0d6] bg-white px-3 text-xs font-bold text-[#0f766e] outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="text-xs font-bold text-[#5c7a72]">
            Showing <span className="text-[#0f2d28] font-black">{filteredAdmins.length}</span> of 24 administrators
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-[#cbe3db] bg-white/90 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#cbe3db] bg-[#edf6f3] text-[#0f766e] font-black uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Facility</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Login</th>
                <th className="p-3.5">Created Date</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4f2ee]">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[#f2faf7] transition-colors">
                  <td className="p-3.5 font-bold text-[#0f2d28]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#d6ece6] text-[#0f766e] font-black flex items-center justify-center text-xs">
                        {admin.initials}
                      </div>
                      <div>
                        <p className="font-bold text-[#0f2d28]">{admin.name}</p>
                        <p className="text-[10px] text-[#5c7a72] font-mono">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-[#0284c7]">{admin.facility}</td>
                  <td className="p-3.5 font-semibold text-[#5c7a72]">{admin.role}</td>
                  <td className="p-3.5">
                    <span
                      className={`badge ${
                        admin.status === "Active"
                          ? "badge-success"
                          : admin.status === "Pending"
                          ? "badge-warning"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-[#5c7a72]">{admin.lastLogin}</td>
                  <td className="p-3.5 font-mono text-[#5c7a72]">{admin.createdAt}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/super-admin/admins/${admin.id}`}
                        className="rounded-lg p-1.5 text-[#0f766e] hover:bg-[#e4f2ee] transition-colors focus-visible:ring-2 focus-visible:ring-[#0f766e] outline-none"
                        title="View Admin"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/super-admin/admins/${admin.id}/edit`}
                        className="rounded-lg p-1.5 text-[#0f766e] hover:bg-[#e4f2ee] transition-colors focus-visible:ring-2 focus-visible:ring-[#0f766e] outline-none"
                        title="Edit Admin"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    </div>
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