"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Stethoscope,
  BedDouble,
  CalendarCheck,
  TrendingUp,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  FileText,
  UserPlus,
  ChevronRight,
  Sparkles,
  X,
  Activity,
  ArrowUpRight,
  Download,
  RefreshCw,
  Pill,
  HelpCircle,
  KeyRound,
  Settings,
  BarChart3,
  PieChart,
  UserCheck,
  ShieldAlert,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

// Stat Cards Data (Ethizo Clinical Theme Styled)
const stats = [
  {
    label: "Total Patients",
    value: "12,486",
    change: "+8.4%",
    description: "vs last month",
    icon: Users,
    gradient: "from-[#0f766e] to-[#0d5c56] text-white",
    cardBg: "bg-[#f4faf8] border-[#bcdad1]",
    badge: "bg-[#0f766e]/10 text-[#0f766e]",
  },
  {
    label: "Total Doctors",
    value: "186",
    change: "+4.2%",
    description: "active providers",
    icon: Stethoscope,
    gradient: "from-[#0284c7] to-[#0f766e] text-white",
    cardBg: "bg-[#f4faf8] border-[#bcdad1]",
    badge: "bg-[#0284c7]/10 text-[#0284c7]",
  },
  {
    label: "Active Users",
    value: "324",
    change: "+12",
    description: "this month",
    icon: UserCheck,
    gradient: "from-[#a34e36] to-[#8c3f2a] text-white",
    cardBg: "bg-[#fdf6f3] border-[#f0c2b6]",
    badge: "bg-[#a34e36]/10 text-[#a34e36]",
  },
  {
    label: "Appointments",
    value: "1,284",
    change: "+6.8%",
    description: "this month",
    icon: CalendarCheck,
    gradient: "from-[#0f766e] to-[#14b8a6] text-white",
    cardBg: "bg-[#f4faf8] border-[#bcdad1]",
    badge: "bg-[#14b8a6]/15 text-[#0f766e]",
  },
];

// All 10 Quick Actions (Ethizo Clinical Theme Palette)
const quickActions = [
  {
    href: "/admin/users",
    icon: Users,
    title: "Manage Users",
    desc: "Staff accounts & roles",
    bg: "bg-[#e9f5f2] border-[#bcdad1] text-[#0f766e] hover:bg-[#d8ece8]",
    iconBg: "bg-[#0f766e] text-white",
  },
  {
    href: "/admin/doctors",
    icon: Stethoscope,
    title: "Manage Doctors",
    desc: "Providers & specialties",
    bg: "bg-[#e0f2fe]/60 border-[#bae6fd] text-[#0284c7] hover:bg-[#e0f2fe]",
    iconBg: "bg-[#0284c7] text-white",
  },
  {
    href: "/admin/patients",
    icon: UserPlus,
    title: "Manage Patients",
    desc: "Patient records & charts",
    bg: "bg-[#e9f5f2] border-[#bcdad1] text-[#0f766e] hover:bg-[#d8ece8]",
    iconBg: "bg-[#0f766e] text-white",
  },
  {
    href: "/admin/facilities",
    icon: Building2,
    title: "Facilities & Beds",
    desc: "Departments & ICU rooms",
    bg: "bg-[#fdf6f3] border-[#f0c2b6] text-[#a34e36] hover:bg-[#fcebe6]",
    iconBg: "bg-[#a34e36] text-white",
  },
  {
    href: "/admin/pharmacy",
    icon: Pill,
    title: "eRx Pharmacy",
    desc: "Medications & formulary",
    bg: "bg-[#e0f2fe]/60 border-[#bae6fd] text-[#0284c7] hover:bg-[#e0f2fe]",
    iconBg: "bg-[#0284c7] text-white",
  },
  {
    href: "/admin/reports",
    icon: FileText,
    title: "Reports & Analytics",
    desc: "Hospital performance",
    bg: "bg-[#fdf6f3] border-[#f0c2b6] text-[#a34e36] hover:bg-[#fcebe6]",
    iconBg: "bg-[#a34e36] text-white",
  },
  {
    href: "/admin/ehr-templates",
    icon: BarChart3,
    title: "EHR Templates",
    desc: "SOAP & Chart forms",
    bg: "bg-[#e9f5f2] border-[#bcdad1] text-[#0f766e] hover:bg-[#d8ece8]",
    iconBg: "bg-[#0f766e] text-white",
  },
  {
    href: "/admin/support-tickets",
    icon: HelpCircle,
    title: "Support Tickets",
    desc: "Helpdesk & inquiries",
    bg: "bg-[#e0f2fe]/60 border-[#bae6fd] text-[#0284c7] hover:bg-[#e0f2fe]",
    iconBg: "bg-[#0284c7] text-white",
  },
  {
    href: "/admin/roles-permissions",
    icon: KeyRound,
    title: "Roles & Security",
    desc: "RBAC & HIPAA Audit",
    bg: "bg-[#fdf6f3] border-[#f0c2b6] text-[#a34e36] hover:bg-[#fcebe6]",
    iconBg: "bg-[#a34e36] text-white",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    title: "System Settings",
    desc: "Global config & backup",
    bg: "bg-[#e9f5f2] border-[#bcdad1] text-[#0f766e] hover:bg-[#d8ece8]",
    iconBg: "bg-[#0f766e] text-white",
  },
];

const appointments = [
  {
    id: "APT-1092",
    patient: "Robert Johnson",
    doctor: "Dr. Sarah Mitchell",
    time: "09:30 AM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: "APT-1093",
    patient: "Emma Davis",
    doctor: "Dr. Michael Anderson",
    time: "10:15 AM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "APT-1094",
    patient: "James Wilson",
    doctor: "Dr. Emily Carter",
    time: "11:00 AM",
    type: "New Patient",
    status: "Pending",
  },
  {
    id: "APT-1095",
    patient: "Olivia Martin",
    doctor: "Dr. Daniel Thompson",
    time: "01:30 PM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: "APT-1096",
    patient: "David Brown",
    doctor: "Dr. Sarah Mitchell",
    time: "03:00 PM",
    type: "Consultation",
    status: "Pending",
  },
];

const activities = [
  {
    title: "New doctor registered",
    description: "Dr. Daniel Thompson joined Pediatrics division",
    time: "12 min ago",
    icon: Stethoscope,
    badge: "bg-[#e9f5f2] text-[#0f766e]",
  },
  {
    title: "New patient registered",
    description: "Emma Wilson added to patient registry",
    time: "28 min ago",
    icon: Users,
    badge: "bg-[#e0f2fe] text-[#0284c7]",
  },
  {
    title: "User account created",
    description: "New staff account created by admin",
    time: "45 min ago",
    icon: UserCheck,
    badge: "bg-[#fdf6f3] text-[#a34e36]",
  },
  {
    title: "Appointment updated",
    description: "Appointment #APT-20481 confirmed for ER",
    time: "1 hr ago",
    icon: CalendarCheck,
    badge: "bg-[#e9f5f2] text-[#0f766e]",
  },
];

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showQuickModal, setShowQuickModal] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1650px] space-y-6 p-4 sm:p-6 font-sans">
      
      {/* ==================== HEADER (MEDICARE CLINICAL STYLED) ==================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-[#bcdad1]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[#0f766e] animate-ping" />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#0f766e]">
              MediCare Clinical Portal
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#132a26] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-xs text-[#57706a] font-semibold">
            Manage healthcare organization, staff accounts, facilities, and monitor real-time activity.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="h-10 px-3.5 rounded-xl border border-[#bcdad1] bg-white text-xs font-extrabold text-[#132a26] hover:bg-[#f4faf8] transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <RefreshCw className={`h-4 w-4 text-[#0f766e] ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQuickModal(true)}
            className="h-10 px-4 rounded-xl bg-[#a34e36] hover:bg-[#8c3f2a] text-xs font-black text-white shadow-md shadow-[#a34e36]/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>+ Quick Action</span>
          </button>
        </div>
      </div>


      {/* ==================== 1. SMALL COMPACT RECTANGULAR STAT CARDS (ETHIZO PALETTE) ==================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-2xl border p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${stat.cardBg}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#57706a]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl sm:text-3xl font-black text-[#132a26] tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center font-bold shadow-md shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-extrabold text-[10px] ${stat.badge}`}>
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
                <span className="text-[10px] text-[#57706a] font-semibold">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>


      {/* ==================== 2. COMPLETE QUICK ACTIONS GRID (ETHIZO THEME RESTORED) ==================== */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#57706a] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#a34e36]" />
            <span>Quick Management Shortcuts</span>
          </h2>
          <span className="text-[10px] font-bold text-[#0f766e]">10 Clinical Modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`group p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-between ${action.bg}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`h-8 w-8 rounded-xl ${action.iconBg} flex items-center justify-center font-bold shrink-0 shadow-xs`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black tracking-tight truncate text-[#132a26]">{action.title}</p>
                    <p className="text-[9px] opacity-75 font-semibold truncate">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </Link>
            );
          })}
        </div>
      </div>


      {/* ==================== 3. DATA CHARTS SECTION (ETHIZO THEME PALETTE) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Admissions Trend Area Chart */}
        <div className="lg:col-span-8 rounded-2xl border border-[#bcdad1] bg-[#f4faf8] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-3 border-[#bcdad1]">
            <div>
              <h3 className="text-sm font-black text-[#132a26] flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#0f766e]" />
                <span>Monthly Admissions & Discharges Trend</span>
              </h3>
              <p className="text-[10px] text-[#57706a] font-semibold">Hospital throughput metrics</p>
            </div>
            <span className="text-[10px] font-black text-[#166534] bg-[#dcfce7] px-2.5 py-1 rounded-md">
              +14.8% YoY
            </span>
          </div>

          <div className="h-44 w-full relative pt-2">
            <svg className="w-full h-36 overflow-visible" viewBox="0 0 800 140">
              <defs>
                <linearGradient id="chartTealEthizo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f766e" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="chartCyanEthizo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 0,110 Q 100,80 200,95 T 400,45 T 600,25 T 800,10 L 800,140 L 0,140 Z"
                fill="url(#chartTealEthizo)"
              />
              <path
                d="M 0,110 Q 100,80 200,95 T 400,45 T 600,25 T 800,10"
                fill="none"
                stroke="#0f766e"
                strokeWidth="3"
              />

              <path
                d="M 0,125 Q 100,95 200,105 T 400,60 T 600,40 T 800,20"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />
            </svg>

            <div className="flex justify-between items-center text-[10px] font-bold text-[#57706a] pt-1 border-t border-[#bcdad1]">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>
        </div>

        {/* Department Workload Donut Chart */}
        <div className="lg:col-span-4 rounded-2xl border border-[#bcdad1] bg-[#f4faf8] p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="border-b pb-2 border-[#bcdad1]">
            <h3 className="text-sm font-black text-[#132a26] flex items-center gap-2">
              <PieChart className="h-4 w-4 text-[#0284c7]" />
              <span>Specialty Distribution</span>
            </h3>
            <p className="text-[10px] text-[#57706a] font-semibold">186 Total Doctors</p>
          </div>

          <div className="flex items-center justify-center relative py-1">
            <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#bcdad1" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0f766e" strokeWidth="4" strokeDasharray="35, 100" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-35" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a34e36" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-60" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-80" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-[#132a26]">186</span>
              <span className="text-[9px] font-bold text-[#57706a]">Doctors</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
            <span className="flex items-center gap-1 bg-[#e9f5f2] p-1.5 rounded-lg text-[#0f766e]">
              <span className="h-2 w-2 rounded-full bg-[#0f766e]" />
              Cardiology 35%
            </span>
            <span className="flex items-center gap-1 bg-[#e0f2fe] p-1.5 rounded-lg text-[#0284c7]">
              <span className="h-2 w-2 rounded-full bg-[#0284c7]" />
              Neurology 25%
            </span>
            <span className="flex items-center gap-1 bg-[#fdf6f3] p-1.5 rounded-lg text-[#a34e36]">
              <span className="h-2 w-2 rounded-full bg-[#a34e36]" />
              Orthopedics 20%
            </span>
            <span className="flex items-center gap-1 bg-[#ccfbf1] p-1.5 rounded-lg text-[#115e59]">
              <span className="h-2 w-2 rounded-full bg-[#14b8a6]" />
              ER / ICU 20%
            </span>
          </div>
        </div>

      </div>


      {/* ==================== 4. MAIN CONTENT GRID (APPOINTMENTS TABLE & ACTIVITIES) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left 8 Cols: Appointments Table */}
        <div className="lg:col-span-8 rounded-2xl border border-[#bcdad1] bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-[#bcdad1]">
            <div>
              <h3 className="text-sm font-black text-[#132a26] flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-[#0f766e]" />
                <span>Today&apos;s Appointments</span>
              </h3>
              <p className="text-[10px] text-[#57706a] font-semibold">Scheduled patient visits</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#57706a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, doctor..."
                className="h-8 w-44 sm:w-52 rounded-xl border border-[#bcdad1] bg-[#f4faf8] pl-8 pr-3 text-xs outline-none focus:border-[#0f766e]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#bcdad1] text-[10px] font-extrabold uppercase tracking-wider text-[#57706a]">
                  <th className="py-2.5 px-2">Patient</th>
                  <th className="py-2.5 px-2">Doctor</th>
                  <th className="py-2.5 px-2">Time</th>
                  <th className="py-2.5 px-2">Type</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4ebe8] font-semibold">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#f4faf8] transition-colors">
                    <td className="py-3 px-2">
                      <p className="font-extrabold text-[#132a26]">{apt.patient}</p>
                    </td>
                    <td className="py-3 px-2 text-[#57706a]">{apt.doctor}</td>
                    <td className="py-3 px-2 font-bold text-[#132a26]">{apt.time}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#e9f5f2] text-[10px] font-bold text-[#0f766e]">
                        {apt.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                          apt.status === "Confirmed"
                            ? "bg-[#dcfce7] text-[#166534]"
                            : "bg-[#fef3c7] text-[#92400e]"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${apt.status === "Confirmed" ? "bg-[#166534]" : "bg-[#92400e]"}`} />
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        href="/admin/appointments"
                        className="px-2.5 py-1 rounded-lg border border-[#bcdad1] bg-white hover:bg-[#0f766e] hover:text-white text-[10px] font-bold text-[#0f766e] transition-all shadow-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Recent Activities */}
        <div className="lg:col-span-4 rounded-2xl border border-[#bcdad1] bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-[#bcdad1]">
            <h3 className="text-sm font-black text-[#132a26] flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#0f766e]" />
              <span>Recent Activity</span>
            </h3>
            <span className="text-[10px] font-bold text-[#57706a]">Real-time</span>
          </div>

          <div className="space-y-3">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <div className={`h-7 w-7 rounded-xl ${act.badge} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#132a26] text-xs">{act.title}</p>
                    <p className="text-[10px] text-[#57706a] leading-snug">{act.description}</p>
                    <span className="text-[9px] text-[#57706a] font-bold">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>


      {/* ==================== QUICK ACTION MODAL ==================== */}
      {showQuickModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-[#bcdad1] bg-white p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowQuickModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#0f766e]/10 text-[#0f766e] flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#132a26]">MediCare Administrator Actions</h3>
                <p className="text-xs text-[#57706a] font-medium">Select a management workflow</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Link
                href="/admin/users/new"
                className="p-3 rounded-2xl border border-[#bcdad1] hover:border-[#0f766e] hover:bg-[#e9f5f2] transition-all text-xs space-y-1 block"
              >
                <Users className="h-5 w-5 text-[#0f766e]" />
                <p className="font-extrabold text-[#132a26]">Add Staff User</p>
                <p className="text-[10px] text-[#57706a] font-medium">Create staff login</p>
              </Link>

              <Link
                href="/admin/doctors/new"
                className="p-3 rounded-2xl border border-[#bcdad1] hover:border-[#0284c7] hover:bg-[#e0f2fe] transition-all text-xs space-y-1 block"
              >
                <Stethoscope className="h-5 w-5 text-[#0284c7]" />
                <p className="font-extrabold text-[#132a26]">Register Doctor</p>
                <p className="text-[10px] text-[#57706a] font-medium">Add clinician profile</p>
              </Link>

              <Link
                href="/admin/patients/create"
                className="p-3 rounded-2xl border border-[#bcdad1] hover:border-[#0f766e] hover:bg-[#e9f5f2] transition-all text-xs space-y-1 block"
              >
                <UserPlus className="h-5 w-5 text-[#0f766e]" />
                <p className="font-extrabold text-[#132a26]">New Patient</p>
                <p className="text-[10px] text-[#57706a] font-medium">Create health record</p>
              </Link>

              <Link
                href="/admin/facilities/create"
                className="p-3 rounded-2xl border border-[#bcdad1] hover:border-[#a34e36] hover:bg-[#fdf6f3] transition-all text-xs space-y-1 block"
              >
                <BedDouble className="h-5 w-5 text-[#a34e36]" />
                <p className="font-extrabold text-[#132a26]">Allocate Bed</p>
                <p className="text-[10px] text-[#57706a] font-medium">Assign ward room</p>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
