"use client";

import { useState } from "react";
import Link from "next/link";
import GlassCard3D from "@/components/common/GlassCard3D";
import CreateStaffModal from "@/components/dashboard/CreateStaffModal";
import {
  ShieldCheck,
  Building2,
  Users,
  UserPlus,
  FileCode2,
  Stethoscope,
  FileText,
  HelpCircle,
  Bell,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Server,
  Database,
  BarChart3,
  PieChart,
  Cpu,
  Globe,
  Zap,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  FolderKanban,
  Check,
  AlertCircle
} from "lucide-react";

// Quick Actions Configuration with Vibrant 3D Themes
const quickActions = [
  {
    title: "Create Admin",
    description: "Add tenant administrator",
    icon: UserPlus,
    href: "/super-admin/admins/create",
    gradient: "from-teal-500 to-emerald-600",
    shadow: "shadow-teal-500/25",
    border: "border-teal-400/40",
    cardBg: "bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60",
    badge: "bg-teal-600 text-white",
  },
  {
    title: "Create Facility",
    description: "Add healthcare unit / hospital",
    icon: Building2,
    href: "/super-admin/facilities/create",
    gradient: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/25",
    border: "border-sky-400/40",
    cardBg: "bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-blue-50/60",
    badge: "bg-sky-600 text-white",
  },
  {
    title: "ICD-10 Codes",
    description: "Manage diagnosis catalog",
    icon: FileCode2,
    href: "/super-admin/icd-10",
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/25",
    border: "border-amber-400/40",
    cardBg: "bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-orange-50/60",
    badge: "bg-amber-600 text-white",
  },
  {
    title: "CPT Codes",
    description: "Manage procedure codes",
    icon: Stethoscope,
    href: "/super-admin/cpt-codes",
    gradient: "from-purple-500 to-indigo-600",
    shadow: "shadow-purple-500/25",
    border: "border-purple-400/40",
    cardBg: "bg-gradient-to-br from-purple-50/90 via-purple-100/40 to-indigo-50/60",
    badge: "bg-purple-600 text-white",
  },
  {
    title: "Reports & Analytics",
    description: "View platform throughput",
    icon: FileText,
    href: "/super-admin/reports",
    gradient: "from-emerald-500 to-teal-700",
    shadow: "shadow-emerald-500/25",
    border: "border-emerald-400/40",
    cardBg: "bg-gradient-to-br from-emerald-50/90 via-teal-100/40 to-emerald-100/40",
    badge: "bg-emerald-600 text-white",
  },
  {
    title: "Support Tickets",
    description: "Resolve support issues",
    icon: HelpCircle,
    href: "/super-admin/support-tickets",
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-rose-500/25",
    border: "border-rose-400/40",
    cardBg: "bg-gradient-to-br from-rose-50/90 via-rose-100/40 to-red-50/60",
    badge: "bg-rose-600 text-white",
  },
  {
    title: "Notifications",
    description: "Manage system broadcasts",
    icon: Bell,
    href: "/super-admin/notifications",
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/25",
    border: "border-indigo-400/40",
    cardBg: "bg-gradient-to-br from-indigo-50/90 via-indigo-100/40 to-purple-50/60",
    badge: "bg-indigo-600 text-white",
  },
  {
    title: "Platform Settings",
    description: "System config & backups",
    icon: Settings,
    href: "/super-admin/settings",
    gradient: "from-slate-600 to-slate-800",
    shadow: "shadow-slate-600/25",
    border: "border-slate-400/40",
    cardBg: "bg-gradient-to-br from-slate-100/90 via-slate-200/50 to-slate-100/80",
    badge: "bg-slate-700 text-white",
  },
];

// Stats Data with Rich 3D Palette
const statsData = [
  {
    label: "Total Admins",
    value: "24",
    change: "+8.2%",
    description: "Administrator accounts",
    icon: ShieldCheck,
    gradient: "from-teal-600 to-teal-800 text-white",
    cardBg: "bg-gradient-to-br from-[#f0faf7] to-[#e1f5f0] border-teal-200/80",
    badge: "bg-teal-700/10 text-teal-800 border border-teal-300/50",
    glow: "shadow-[0_10px_30px_rgba(15,118,110,0.18)]",
  },
  {
    label: "Active Admins",
    value: "21",
    change: "+3",
    description: "Currently active",
    icon: CheckCircle2,
    gradient: "from-sky-600 to-blue-700 text-white",
    cardBg: "bg-gradient-to-br from-[#f0f8ff] to-[#e0f2fe] border-sky-200/80",
    badge: "bg-sky-700/10 text-sky-800 border border-sky-300/50",
    glow: "shadow-[0_10px_30px_rgba(2,132,199,0.18)]",
  },
  {
    label: "Pending Admins",
    value: "3",
    change: "+1",
    description: "Awaiting activation",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600 text-white",
    cardBg: "bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border-amber-200/80",
    badge: "bg-amber-700/10 text-amber-800 border border-amber-300/50",
    glow: "shadow-[0_10px_30px_rgba(217,119,6,0.18)]",
  },
  {
    label: "Total Facilities",
    value: "42",
    change: "+3",
    description: "Healthcare facilities",
    icon: Building2,
    gradient: "from-purple-600 to-indigo-700 text-white",
    cardBg: "bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] border-purple-200/80",
    badge: "bg-purple-700/10 text-purple-800 border border-purple-300/50",
    glow: "shadow-[0_10px_30px_rgba(147,51,234,0.18)]",
  },
  {
    label: "ICD-10 Codes",
    value: "72,418",
    change: "+124",
    description: "Diagnosis codes",
    icon: FileCode2,
    gradient: "from-amber-600 to-orange-700 text-white",
    cardBg: "bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] border-orange-200/80",
    badge: "bg-orange-700/10 text-orange-800 border border-orange-300/50",
    glow: "shadow-[0_10px_30px_rgba(234,88,12,0.18)]",
  },
  {
    label: "CPT Codes",
    value: "10,842",
    change: "+86",
    description: "Procedure codes",
    icon: Stethoscope,
    gradient: "from-emerald-600 to-teal-700 text-white",
    cardBg: "bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80",
    badge: "bg-emerald-700/10 text-emerald-800 border border-emerald-300/50",
    glow: "shadow-[0_10px_30px_rgba(16,185,129,0.18)]",
  },
  {
    label: "Open Tickets",
    value: "18",
    change: "-12%",
    description: "Support tickets",
    icon: HelpCircle,
    gradient: "from-rose-600 to-red-700 text-white",
    cardBg: "bg-gradient-to-br from-[#fff1f2] to-[#ffe4e6] border-rose-200/80",
    badge: "bg-rose-700/10 text-rose-800 border border-rose-300/50",
    glow: "shadow-[0_10px_30px_rgba(225,29,72,0.18)]",
  },
  {
    label: "Critical Tickets",
    value: "5",
    change: "-2",
    description: "Need immediate action",
    icon: AlertTriangle,
    gradient: "from-red-600 to-rose-800 text-white",
    cardBg: "bg-gradient-to-br from-[#fef2f2] to-[#fecaca] border-red-300/80",
    badge: "bg-red-700/15 text-red-900 border border-red-300/50",
    glow: "shadow-[0_10px_30px_rgba(220,38,38,0.22)]",
  },
];

const admins = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    facility: "Central Medical Center",
    role: "Administrator",
    status: "Active",
    initials: "JS",
    color: "bg-teal-600 text-white shadow-teal-600/30",
  },
  {
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    facility: "Green Valley Hospital",
    role: "Administrator",
    status: "Active",
    initials: "SW",
    color: "bg-sky-600 text-white shadow-sky-600/30",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    facility: "City Care Clinic",
    role: "Administrator",
    status: "Pending",
    initials: "MB",
    color: "bg-amber-600 text-white shadow-amber-600/30",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    facility: "Sunrise Healthcare",
    role: "Administrator",
    status: "Active",
    initials: "ED",
    color: "bg-purple-600 text-white shadow-purple-600/30",
  },
];

const facilities = [
  {
    name: "Central Medical Center",
    location: "New Delhi",
    admins: 4,
    users: 128,
    status: "Active",
    code: "CMC-DEL",
  },
  {
    name: "Green Valley Hospital",
    location: "Mumbai",
    admins: 3,
    users: 96,
    status: "Active",
    code: "GVH-BOM",
  },
  {
    name: "City Care Clinic",
    location: "Bangalore",
    admins: 2,
    users: 74,
    status: "Active",
    code: "CCC-BLR",
  },
  {
    name: "Sunrise Healthcare",
    location: "Pune",
    admins: 2,
    users: 61,
    status: "Pending",
    code: "SHC-PUN",
  },
];

const tickets = [
  {
    id: "#TKT-1024",
    title: "Unable to create patient",
    facility: "Central Medical Center",
    priority: "Critical",
    time: "12 min ago",
  },
  {
    id: "#TKT-1023",
    title: "Template builder issue",
    facility: "Green Valley Hospital",
    priority: "High",
    time: "34 min ago",
  },
  {
    id: "#TKT-1022",
    title: "CPT code not found",
    facility: "City Care Clinic",
    priority: "Medium",
    time: "1 hr ago",
  },
  {
    id: "#TKT-1021",
    title: "Notification delivery issue",
    facility: "Sunrise Healthcare",
    priority: "Low",
    time: "2 hrs ago",
  },
];

const activities = [
  {
    title: "New admin created",
    description: "John Smith was added to Central Medical Center",
    time: "09:42 AM",
    icon: UserPlus,
    gradient: "from-teal-500 to-emerald-600 text-white",
  },
  {
    title: "ICD-10 database updated",
    description: "124 diagnosis codes were imported",
    time: "08:30 AM",
    icon: FileCode2,
    gradient: "from-sky-500 to-blue-600 text-white",
  },
  {
    title: "Support ticket opened",
    description: "Unable to create patient",
    time: "08:12 AM",
    icon: AlertTriangle,
    gradient: "from-rose-500 to-red-600 text-white",
  },
  {
    title: "CPT database synchronized",
    description: "86 procedure codes were updated",
    time: "Yesterday",
    icon: Stethoscope,
    gradient: "from-purple-500 to-indigo-600 text-white",
  },
  {
    title: "Facility account activated",
    description: "Green Valley Hospital is now active",
    time: "Yesterday",
    icon: Building2,
    gradient: "from-emerald-500 to-teal-700 text-white",
  },
];

const codeUpdates = [
  {
    name: "ICD-10",
    updated: "124 codes",
    date: "Today",
    percentage: 92,
    color: "bg-gradient-to-r from-teal-500 to-emerald-600",
  },
  {
    name: "CPT",
    updated: "86 codes",
    date: "Today",
    percentage: 76,
    color: "bg-gradient-to-r from-sky-500 to-blue-600",
  },
  {
    name: "HCPCS",
    updated: "42 codes",
    date: "Yesterday",
    percentage: 58,
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
  },
];

export default function SuperAdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"admins" | "facilities">("admins");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="mx-auto max-w-[1700px] space-y-7 p-4 sm:p-6 font-sans">
      
      {/* ==================== 1. 3D GLASS HERO COMMAND CENTER ==================== */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-teal-500/30 bg-gradient-to-r from-[#0a2320] via-[#0d342f] to-[#12423c] p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(15,118,110,0.35)] backdrop-blur-3xl">
        {/* Ambient 3D Glow Orbs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-teal-400/20 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-500/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                MediCare HMS • SuperAdmin Command Center
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-teal-400" />
              <span>Platform Administration Hub</span>
            </h1>

            <p className="text-xs sm:text-sm text-teal-100/80 font-medium max-w-2xl">
              Monitor multi-tenant healthcare statistics, configure hospital facilities, manage ICD-10 / CPT coding catalogs, and manage administrative privileges in real-time.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRefresh}
              className="h-11 px-4 rounded-2xl border border-teal-400/40 bg-white/10 hover:bg-white/20 text-xs font-black text-white backdrop-blur-md transition-all flex items-center gap-2.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 text-teal-300 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh Status</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-xs font-black text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] border border-emerald-300/40 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="h-4.5 w-4.5 stroke-[3]" />
              <span>+ New Admin Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Integration */}
      <CreateStaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


      {/* ==================== 2. QUICK ACTIONS (3D COLORED ELEVATED CARDS) ==================== */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700">
              Quick Administrative Controls
            </h2>
          </div>
          <span className="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-200/70 px-3 py-1 rounded-xl">
            8 Controls Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative overflow-hidden rounded-2xl border-2 ${action.border} ${action.cardBg} p-4 shadow-md ${action.shadow} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex items-center justify-between active:scale-98`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center font-bold text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black tracking-tight text-slate-800 truncate group-hover:text-teal-800 transition-colors">
                      {action.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </div>

                <div className="h-7 w-7 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-700 group-hover:border-teal-300 group-hover:translate-x-1 transition-all shrink-0 ml-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      {/* ==================== 3. 3D PLATFORM METRICS STAT CARDS ==================== */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-teal-600" />
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700">
              Platform Metrics & Health Overview
            </h2>
          </div>
          <span className="text-xs font-extrabold text-slate-500">Live Telemetry</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-2xl border-2 p-4 ${stat.cardBg} ${stat.glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                    {stat.label}
                  </p>
                  <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center font-bold shadow-md shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    {stat.value}
                  </span>
                  <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${stat.badge}`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-slate-500 font-semibold truncate">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* ==================== 4. MAIN ANALYTICS & SUPPORT GRID ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left 7 Cols: Platform Activity Chart */}
        <div className="lg:col-span-7 rounded-3xl border-2 border-teal-200/80 bg-gradient-to-b from-white via-teal-50/20 to-teal-50/50 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] space-y-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-teal-100">
            <div>
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" />
                <span>Platform System Throughput</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Real-time daily activity & API request volume</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black">
                +14.6% Growth
              </span>
            </div>
          </div>

          {/* Mini Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-teal-200/70 bg-gradient-to-br from-teal-50 to-emerald-50 p-3.5 shadow-xs">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Today&apos;s Actions</p>
              <p className="text-xl font-black text-slate-800 mt-1">842</p>
              <span className="text-[10px] font-extrabold text-emerald-600">+14.6% vs yesterday</span>
            </div>

            <div className="rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-50 to-blue-50 p-3.5 shadow-xs">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Staff</p>
              <p className="text-xl font-black text-slate-800 mt-1">319</p>
              <span className="text-[10px] font-extrabold text-sky-600">+8.4% online</span>
            </div>

            <div className="rounded-2xl border border-purple-200/70 bg-gradient-to-br from-purple-50 to-indigo-50 p-3.5 shadow-xs">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">API Calls</p>
              <p className="text-xl font-black text-slate-800 mt-1">24.8K</p>
              <span className="text-[10px] font-extrabold text-purple-600">+6.2% load</span>
            </div>
          </div>

          {/* 3D Visual Bar Chart */}
          <div className="h-48 w-full relative pt-4 flex flex-col justify-end">
            <div className="flex items-end justify-between gap-2 h-36 px-2">
              {[42, 58, 51, 76, 65, 89, 73, 106, 91, 118, 102, 135].map((val, idx) => (
                <div key={idx} className="group flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: `${(val / 140) * 100}%` }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-teal-600 via-teal-500 to-emerald-400 group-hover:from-teal-700 group-hover:to-emerald-300 transition-all duration-300 shadow-md group-hover:shadow-teal-500/40 relative"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-md pointer-events-none z-10 whitespace-nowrap">
                      {val} actions
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-slate-500 pt-2 border-t border-teal-200/60 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>


        {/* Right 5 Cols: Support Tickets Queue */}
        <div className="lg:col-span-5 rounded-3xl border-2 border-rose-200/80 bg-gradient-to-b from-white via-rose-50/20 to-rose-50/40 p-6 shadow-[0_15px_40px_rgba(225,29,72,0.08)] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b pb-4 border-rose-100">
            <div>
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-rose-600" />
                <span>Support Tickets Queue</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Issues needing SuperAdmin review</p>
            </div>

            <Link
              href="/super-admin/support-tickets"
              className="text-xs font-black text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {tickets.map((tkt) => (
              <div
                key={tkt.id}
                className="p-3.5 rounded-2xl border border-rose-200/70 bg-white hover:bg-rose-50/50 transition-all shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${
                    tkt.priority === "Critical"
                      ? "bg-rose-600 text-white"
                      : tkt.priority === "High"
                      ? "bg-amber-500 text-white"
                      : tkt.priority === "Medium"
                      ? "bg-orange-500 text-white"
                      : "bg-teal-600 text-white"
                  }`}>
                    !
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-800 truncate">{tkt.title}</p>
                    <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">
                      {tkt.id} • {tkt.facility}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-block px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                    tkt.priority === "Critical"
                      ? "bg-rose-100 text-rose-800 border border-rose-300"
                      : tkt.priority === "High"
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-teal-100 text-teal-800 border border-teal-300"
                  }`}>
                    {tkt.priority}
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold mt-1">{tkt.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-rose-100 text-center">
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <p className="text-base font-black text-slate-800">18</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase">Open</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <p className="text-base font-black text-slate-800">9</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase">In Progress</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200">
              <p className="text-base font-black text-emerald-700">126</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase">Resolved</p>
            </div>
          </div>
        </div>

      </div>


      {/* ==================== 5. ADMINS & FACILITIES TABBED OVERVIEW ==================== */}
      <div className="rounded-3xl border-2 border-teal-200/80 bg-white p-6 shadow-[0_15px_40px_rgba(15,118,110,0.06)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("admins")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeTab === "admins"
                    ? "bg-teal-700 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tenant Admins (24)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("facilities")}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeTab === "facilities"
                    ? "bg-teal-700 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Facilities (42)
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter records..."
              className="h-10 w-full sm:w-64 rounded-2xl border border-slate-300 bg-slate-50 pl-9 pr-4 text-xs font-semibold outline-none focus:border-teal-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Tab 1: Tenant Admins Table */}
        {activeTab === "admins" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-3">Admin User</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Assigned Facility</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {admins.map((adm) => (
                  <tr key={adm.email} className="hover:bg-teal-50/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl ${adm.color} flex items-center justify-center font-black text-xs shadow-xs`}>
                          {adm.initials}
                        </div>
                        <span className="font-extrabold text-slate-900">{adm.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">{adm.email}</td>
                    <td className="py-3.5 px-3 text-slate-800 font-bold">{adm.facility}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[10px] font-black border border-teal-200">
                        {adm.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        adm.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${adm.status === "Active" ? "bg-emerald-600" : "bg-amber-600"}`} />
                        {adm.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/super-admin/admins`}
                        className="px-3 py-1.5 rounded-xl border border-teal-300 bg-teal-50 hover:bg-teal-700 hover:text-white text-[10px] font-extrabold text-teal-800 transition-all"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Facilities Grid */}
        {activeTab === "facilities" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((fac) => (
              <div key={fac.name} className="p-4 rounded-2xl border-2 border-sky-200/80 bg-gradient-to-br from-sky-50/50 to-blue-50/30 hover:shadow-lg transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                    fac.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {fac.status}
                  </span>
                </div>

                <div>
                  <p className="font-extrabold text-slate-900 text-sm">{fac.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold">{fac.location} • Code: {fac.code}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 pt-2 border-t border-sky-100">
                  <span>{fac.admins} Admins</span>
                  <span>{fac.users} Users</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* ==================== 6. SYSTEM HEALTH & CODING DATABASE 3D CARDS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left 6 Cols: Coding Catalog Updates */}
        <div className="lg:col-span-6 rounded-3xl border-2 border-amber-200/80 bg-gradient-to-b from-white via-amber-50/20 to-orange-50/30 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-amber-100">
            <div>
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                <FileCode2 className="h-5 w-5 text-amber-600" />
                <span>Clinical Coding Databases</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">ICD-10, CPT & HCPCS medical terminology status</p>
            </div>

            <Link
              href="/super-admin/icd-10"
              className="text-xs font-black text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1"
            >
              <span>Manage DB</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {codeUpdates.map((cd) => (
              <div key={cd.name} className="p-3.5 rounded-2xl bg-white border border-amber-200/70 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-slate-800 text-sm">{cd.name}</span>
                    <span className="text-[10px] text-slate-500 ml-2 font-bold">{cd.updated} • {cd.date}</span>
                  </div>
                  <span className="font-black text-amber-700">{cd.percentage}% synced</span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${cd.percentage}%` }}
                    className={`h-full rounded-full ${cd.color} shadow-xs`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: Live System Uptime */}
        <div className="lg:col-span-6 rounded-3xl border-2 border-emerald-200/80 bg-gradient-to-b from-white via-emerald-50/20 to-teal-50/30 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-emerald-100">
            <div>
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Server className="h-5 w-5 text-emerald-600" />
                <span>System Infrastructure Health</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">HIPAA compliant platform cluster monitors</p>
            </div>

            <span className="px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>99.9% Uptime</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-white border border-emerald-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">API Gateway</span>
              </div>
              <span className="text-xs font-black text-emerald-700">99.99%</span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-emerald-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">PostgreSQL DB</span>
              </div>
              <span className="text-xs font-black text-emerald-700">99.98%</span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-emerald-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">Notifications</span>
              </div>
              <span className="text-xs font-black text-emerald-700">99.95%</span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-emerald-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">Encrypted Storage</span>
              </div>
              <span className="text-xs font-black text-emerald-700">99.97%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}