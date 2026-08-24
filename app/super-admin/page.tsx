"use client";

import { useState } from "react";
import Link from "next/link";
import GlassCard3D from "@/components/common/GlassCard3D";
import CreateStaffModal from "@/components/dashboard/CreateStaffModal";


const quickActions = [
  {
    title: "Create Admin",
    description: "Add administrator",
    icon: "+",
    href: "/super-admin/admins/create",
    tone: "mint",
  },
  {
    title: "Create Facility",
    description: "Add healthcare facility",
    icon: "⌂",
    href: "/super-admin/facilities/create",
    tone: "blue",
  },
  {
    title: "ICD-10 Codes",
    description: "Manage diagnosis codes",
    icon: "✚",
    href: "/super-admin/icd-10",
    tone: "orange",
  },
  {
    title: "CPT Codes",
    description: "Manage procedure codes",
    icon: "▣",
    href: "/super-admin/cpt-codes",
    tone: "purple",
  },
  {
    title: "Reports",
    description: "View platform reports",
    icon: "▤",
    href: "/super-admin/reports",
    tone: "teal",
  },
  {
    title: "Support Tickets",
    description: "Resolve support issues",
    icon: "?",
    href: "/super-admin/support-tickets",
    tone: "red",
  },
  {
    title: "Notifications",
    description: "Manage notifications",
    icon: "♢",
    href: "/super-admin/notifications",
    tone: "yellow",
  },
  {
    title: "Settings",
    description: "Platform settings",
    icon: "⚙",
    href: "/super-admin/settings",
    tone: "gray",
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
  },
  {
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    facility: "Green Valley Hospital",
    role: "Administrator",
    status: "Active",
    initials: "SW",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    facility: "City Care Clinic",
    role: "Administrator",
    status: "Pending",
    initials: "MB",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    facility: "Sunrise Healthcare",
    role: "Administrator",
    status: "Active",
    initials: "ED",
  },
];

const facilities = [
  {
    name: "Central Medical Center",
    location: "New Delhi",
    admins: 4,
    users: 128,
    status: "Active",
  },
  {
    name: "Green Valley Hospital",
    location: "Mumbai",
    admins: 3,
    users: 96,
    status: "Active",
  },
  {
    name: "City Care Clinic",
    location: "Bangalore",
    admins: 2,
    users: 74,
    status: "Active",
  },
  {
    name: "Sunrise Healthcare",
    location: "Pune",
    admins: 2,
    users: 61,
    status: "Pending",
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
    icon: "+",
    tone: "mint",
  },
  {
    title: "ICD-10 database updated",
    description: "124 diagnosis codes were imported",
    time: "08:30 AM",
    icon: "✓",
    tone: "blue",
  },
  {
    title: "Support ticket opened",
    description: "Unable to create patient",
    time: "08:12 AM",
    icon: "!",
    tone: "orange",
  },
  {
    title: "CPT database synchronized",
    description: "86 procedure codes were updated",
    time: "Yesterday",
    icon: "↗",
    tone: "purple",
  },
  {
    title: "Facility account activated",
    description: "Green Valley Hospital is now active",
    time: "Yesterday",
    icon: "⌂",
    tone: "teal",
  },
];

const codeUpdates = [
  {
    name: "ICD-10",
    updated: "124 codes",
    date: "Today",
    percentage: 92,
  },
  {
    name: "CPT",
    updated: "86 codes",
    date: "Today",
    percentage: 76,
  },
  {
    name: "HCPCS",
    updated: "42 codes",
    date: "Yesterday",
    percentage: 58,
  },
];

export default function SuperAdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full space-y-6 pb-10">
      {/* HERO BANNER 3D */}
      <GlassCard3D depth={15}>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#10b981]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0f766e]">
                MediCare HMS Platform Control
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d28] tracking-tight">
              Super Admin Management Hub
            </h1>

            <p className="mt-1 text-xs font-semibold text-[#54736b]">
              Monitor healthcare platform metrics, manage facilities, and ICD-10/CPT coding.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary self-start sm:self-auto"
          >
            <span className="text-base font-bold">+</span>
            <span>New Admin Account</span>
          </button>
        </div>
      </GlassCard3D>

      {/* 3D Translucent Glass Staff Modal */}
      <CreateStaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* QUICK ACTIONS */}
      <section className="mb-6">
        <div className="mb-3">
          <h2 className="text-base font-bold text-[#0f2d28]">Quick Platform Actions</h2>
          <p className="text-xs text-[#54736b] font-semibold">
            Frequently used administrative controls
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <QuickAction
              key={action.title}
              {...action}
            />
          ))}
        </div>
      </section>


      {/* =========================================================
          PLATFORM OVERVIEW
      ========================================================= */}

      <section className="mb-5">

        <div className="mb-3">

          <h2 className="text-[15px] font-semibold text-[#263833]">
            Platform overview
          </h2>

          <p className="mt-0.5 text-[10px] text-[#98a49f]">
            Current healthcare platform statistics
          </p>

        </div>

        <div className="grid grid-cols-4 gap-4">

          <StatCard
            label="Total Admins"
            value="24"
            change="+8.2%"
            description="Administrator accounts"
            icon="♙"
            tone="mint"
          />

          <StatCard
            label="Active Admins"
            value="21"
            change="+3"
            description="Currently active"
            icon="✓"
            tone="blue"
          />

          <StatCard
            label="Pending Admins"
            value="3"
            change="+1"
            description="Awaiting activation"
            icon="◷"
            tone="orange"
          />

          <StatCard
            label="Total Facilities"
            value="42"
            change="+3"
            description="Healthcare facilities"
            icon="⌂"
            tone="purple"
          />

          <StatCard
            label="ICD-10 Codes"
            value="72,418"
            change="+124"
            description="Diagnosis codes"
            icon="✚"
            tone="orange"
          />

          <StatCard
            label="CPT Codes"
            value="10,842"
            change="+86"
            description="Procedure codes"
            icon="▣"
            tone="mint"
          />

          <StatCard
            label="Open Tickets"
            value="18"
            change="-12%"
            description="Support tickets"
            icon="?"
            tone="red"
          />

          <StatCard
            label="Critical Tickets"
            value="5"
            change="-2"
            description="Need immediate attention"
            icon="!"
            tone="red"
          />

        </div>

      </section>


      {/* =========================================================
          MAIN GRID
      ========================================================= */}

      <div className="mb-5 grid grid-cols-[1.35fr_1fr] gap-5">

        {/* PLATFORM ACTIVITY */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="Platform activity"
            subtitle="Activity across the healthcare platform"
            action="View reports"
            href="/super-admin/reports"
          />

          <div className="p-6">

            <div className="mb-5 grid grid-cols-3 gap-3">

              <MiniMetric
                label="Today's activity"
                value="842"
                change="+14.6%"
              />

              <MiniMetric
                label="Active users"
                value="319"
                change="+8.4%"
              />

              <MiniMetric
                label="API requests"
                value="24.8K"
                change="+6.2%"
              />

            </div>

            <div className="relative h-[190px]">

              <div className="absolute inset-0 flex flex-col justify-between">

                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="border-t border-[#eef2f0]"
                  />
                ))}

              </div>

              <div className="absolute inset-0 flex items-end gap-3 px-2">

                {[42, 58, 51, 76, 65, 89, 73, 106, 91, 118, 102, 135].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        style={{ height: `${height}px` }}
                        className="w-full rounded-t-[6px] bg-gradient-to-t from-[#c8e9e3] to-[#e8f6f3] transition-all duration-300 group-hover:from-[#0f766e] group-hover:to-[#62c4b8]"
                      />
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="mt-3 grid grid-cols-7 text-center text-[9px] text-[#98a49f]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>

        </section>


        {/* SUPPORT TICKETS */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="Support tickets"
            subtitle="Issues requiring attention"
            action="View all"
            href="/super-admin/support-tickets"
          />

          <div>

            {tickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className={`flex items-center gap-3 px-6 py-4 transition hover:bg-[#f7fbfa] ${
                  index !== tickets.length - 1
                    ? "border-b border-[#eef2f0]"
                    : ""
                }`}
              >

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold ${
                    ticket.priority === "Critical"
                      ? "bg-[#fdebea] text-[#d45249]"
                      : ticket.priority === "High"
                        ? "bg-[#fff0e6] text-[#c76c2e]"
                        : ticket.priority === "Medium"
                          ? "bg-[#fff7dc] text-[#a97817]"
                          : "bg-[#e8f5f0] text-[#278260]"
                  }`}
                >
                  !
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[11px] font-semibold text-[#263833]">
                    {ticket.title}
                  </p>

                  <p className="mt-0.5 truncate text-[9px] text-[#98a49f]">
                    {ticket.id} · {ticket.facility}
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#b0bab6]">
                    {ticket.time}
                  </p>

                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
                    ticket.priority === "Critical"
                      ? "bg-[#fdebea] text-[#d45249]"
                      : ticket.priority === "High"
                        ? "bg-[#fff0e6] text-[#c76c2e]"
                        : ticket.priority === "Medium"
                          ? "bg-[#fff7dc] text-[#a97817]"
                          : "bg-[#e8f5f0] text-[#278260]"
                  }`}
                >
                  {ticket.priority}
                </span>

              </div>
            ))}

          </div>

          <div className="grid grid-cols-3 border-t border-[#eef2f0] bg-[#fafcfb]">

            <TicketSummary
              label="Open"
              value="18"
            />

            <TicketSummary
              label="In Progress"
              value="9"
            />

            <TicketSummary
              label="Resolved"
              value="126"
            />

          </div>

        </section>

      </div>


      {/* =========================================================
          ADMIN + FACILITY
      ========================================================= */}

      <div className="mb-5 grid grid-cols-[1.15fr_1fr] gap-5">

        {/* ADMINS */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="Administrator overview"
            subtitle="Recently created administrator accounts"
            action="View all"
            href="/super-admin/admins"
          />

          <div>

            {admins.map((admin, index) => (
              <div
                key={admin.email}
                className={`flex items-center gap-3 px-6 py-3.5 transition hover:bg-[#f7fbfa] ${
                  index !== admins.length - 1
                    ? "border-b border-[#eef2f0]"
                    : ""
                }`}
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e2f3ef] text-[10px] font-bold text-[#0f766e]">
                  {admin.initials}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[11px] font-semibold text-[#263833]">
                    {admin.name}
                  </p>

                  <p className="truncate text-[9px] text-[#98a49f]">
                    {admin.email}
                  </p>

                  <p className="truncate text-[9px] text-[#b0bab6]">
                    {admin.facility}
                  </p>

                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
                    admin.status === "Active"
                      ? "bg-[#e7f6ef] text-[#278260]"
                      : "bg-[#fff3e5] text-[#bd7730]"
                  }`}
                >
                  {admin.status}
                </span>

              </div>
            ))}

          </div>

        </section>


        {/* FACILITIES */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="Facility overview"
            subtitle="Healthcare facilities on platform"
            action="View all"
            href="/super-admin/facilities"
          />

          <div>

            {facilities.map((facility, index) => (
              <div
                key={facility.name}
                className={`flex items-center gap-3 px-6 py-3.5 ${
                  index !== facilities.length - 1
                    ? "border-b border-[#eef2f0]"
                    : ""
                }`}
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#edf5f8] text-[14px] text-[#557e9d]">
                  ⌂
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[11px] font-semibold text-[#263833]">
                    {facility.name}
                  </p>

                  <p className="text-[9px] text-[#98a49f]">
                    {facility.location} · {facility.admins} admins ·{" "}
                    {facility.users} users
                  </p>

                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
                    facility.status === "Active"
                      ? "bg-[#e7f6ef] text-[#278260]"
                      : "bg-[#fff3e5] text-[#bd7730]"
                  }`}
                >
                  {facility.status}
                </span>

              </div>
            ))}

          </div>

        </section>

      </div>


      {/* =========================================================
          DATABASE + ACTIVITY + SYSTEM HEALTH
      ========================================================= */}

      <div className="mb-5 grid grid-cols-[1fr_1.15fr_0.9fr] gap-5">

        {/* CODE DATABASE */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="Code database"
            subtitle="Recent coding database updates"
            action="Manage"
            href="/super-admin/icd10"
          />

          <div className="p-5">

            {codeUpdates.map((code, index) => (
              <div
                key={code.name}
                className={index !== codeUpdates.length - 1 ? "mb-5" : ""}
              >

                <div className="mb-2 flex items-center justify-between">

                  <div>
                    <p className="text-[11px] font-semibold text-[#263833]">
                      {code.name}
                    </p>

                    <p className="mt-0.5 text-[9px] text-[#98a49f]">
                      {code.updated} updated · {code.date}
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold text-[#0f766e]">
                    {code.percentage}%
                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#edf2f0]">

                  <div
                    style={{ width: `${code.percentage}%` }}
                    className="h-full rounded-full bg-[#0f766e]"
                  />

                </div>

              </div>
            ))}

          </div>

        </section>


        {/* SYSTEM ACTIVITY */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="Recent system activity"
            subtitle="Latest platform events"
            action="View activity"
            href="/super-admin/reports"
          />

          <div>

            {activities.map((activity, index) => (
              <div
                key={activity.title}
                className={`flex gap-3 px-5 py-3.5 ${
                  index !== activities.length - 1
                    ? "border-b border-[#eef2f0]"
                    : ""
                }`}
              >

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-[10px] font-bold ${
                    activity.tone === "mint"
                      ? "bg-[#e5f5f1] text-[#0f766e]"
                      : activity.tone === "blue"
                        ? "bg-[#edf4f8] text-[#557e9d]"
                        : activity.tone === "orange"
                          ? "bg-[#fff3e5] text-[#bd7730]"
                          : activity.tone === "purple"
                            ? "bg-[#f1eef8] text-[#7967a5]"
                            : "bg-[#e8f5f0] text-[#0f766e]"
                  }`}
                >
                  {activity.icon}
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex justify-between gap-2">

                    <p className="truncate text-[10px] font-semibold text-[#263833]">
                      {activity.title}
                    </p>

                    <span className="shrink-0 text-[8px] text-[#a0aba7]">
                      {activity.time}
                    </span>

                  </div>

                  <p className="mt-0.5 truncate text-[9px] text-[#98a49f]">
                    {activity.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>


        {/* SYSTEM HEALTH */}

        <section className="card card-hover overflow-hidden">

          <SectionHeader
            title="System health"
            subtitle="Platform service status"
            action="Details"
            href="/super-admin/settings"
          />

          <div className="p-5">

            <div className="mb-5 rounded-xl bg-[#eaf7f2] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d906d] shadow-sm">
                  ✓
                </div>

                <div>

                  <p className="text-[12px] font-semibold text-[#276e58]">
                    All systems operational
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#679183]">
                    No major incidents detected
                  </p>

                </div>

              </div>

            </div>

            <HealthRow
              label="API Services"
              value="99.99%"
            />

            <HealthRow
              label="Database"
              value="99.98%"
            />

            <HealthRow
              label="Notifications"
              value="99.95%"
            />

            <HealthRow
              label="File Storage"
              value="99.97%"
            />

            <div className="mt-5 border-t border-[#eef2f0] pt-4">

              <div className="flex items-center justify-between">

                <span className="text-[9px] text-[#98a49f]">
                  Platform uptime
                </span>

                <span className="text-[12px] font-semibold text-[#278260]">
                  99.9%
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>


      {/* =========================================================
          BOTTOM SUMMARY
      ========================================================= */}

      <div className="grid grid-cols-4 gap-4">

        <SummaryCard
          title="Today's activity"
          value="842"
          description="Platform actions"
          icon="↗"
        />

        <SummaryCard
          title="Active users"
          value="319"
          description="Currently online"
          icon="♙"
        />

        <SummaryCard
          title="Notifications sent"
          value="1,284"
          description="Today"
          icon="◇"
        />

        <SummaryCard
          title="Platform uptime"
          value="99.9%"
          description="Current month"
          icon="✓"
        />

      </div>

    </div>
  );
}


/* ===============================================================
   QUICK ACTION
=============================================================== */

function QuickAction({
  title,
  description,
  icon,
  href,
  tone,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
  tone: string;
}) {
  const toneClasses: Record<string, string> = {
    mint: "bg-[#e5f5f1] text-[#0f766e]",
    blue: "bg-[#edf4f8] text-[#557e9d]",
    orange: "bg-[#fff0df] text-[#bd7730]",
    purple: "bg-[#f0ecf7] text-[#7967a5]",
    teal: "bg-[#e4f4f1] text-[#16776d]",
    red: "bg-[#fdebea] text-[#d45d55]",
    yellow: "bg-[#fff7df] text-[#a97817]",
    gray: "bg-[#eef2f0] text-[#65736f]",
  };

  return (
    <a
      href={href}
      className="card card-hover group flex items-center gap-3 p-4"
    >

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[15px] font-bold transition-transform duration-300 group-hover:scale-110 ${toneClasses[tone]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[11px] font-semibold text-[#263833]">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[9px] text-[#98a49f]">
          {description}
        </p>

      </div>

      <span className="text-[13px] text-[#b1bbb7] transition group-hover:translate-x-1 group-hover:text-[#0f766e]">
        →
      </span>

    </a>
  );
}


/* ===============================================================
   STAT CARD
=============================================================== */

function StatCard({
  label,
  value,
  change,
  description,
  icon,
  tone,
}: {
  label: string;
  value: string;
  change: string;
  description: string;
  icon: string;
  tone: string;
}) {
  const toneClasses: Record<string, string> = {
    mint: "bg-[#e5f5f1] text-[#0f766e]",
    blue: "bg-[#edf4f8] text-[#557e9d]",
    orange: "bg-[#fff0df] text-[#bd7730]",
    purple: "bg-[#f0ecf7] text-[#7967a5]",
    red: "bg-[#fdebea] text-[#d45d55]",
  };

  return (
    <div className="card card-hover p-5">

      <div className="flex items-start justify-between">

        <p className="text-[9px] font-semibold uppercase tracking-[0.11em] text-[#8b9893]">
          {label}
        </p>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[13px] ${toneClasses[tone]}`}
        >
          {icon}
        </span>

      </div>

      <div className="mt-5 flex items-end gap-2">

        <span className="text-[25px] font-semibold tracking-[-0.04em] text-[#172522]">
          {value}
        </span>

        <span className="mb-1 rounded-full bg-[#edf8f4] px-2 py-0.5 text-[8px] font-semibold text-[#2d906d]">
          {change}
        </span>

      </div>

      <p className="mt-1 text-[10px] text-[#9aa5a1]">
        {description}
      </p>

    </div>
  );
}


/* ===============================================================
   SECTION HEADER
=============================================================== */

function SectionHeader({
  title,
  subtitle,
  action,
  href,
}: {
  title: string;
  subtitle: string;
  action: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#eef2f0] px-6 py-5">

      <div>

        <h2 className="text-[14px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[10px] text-[#98a49f]">
          {subtitle}
        </p>

      </div>

      <a
        href={href}
        className="text-[10px] font-semibold text-[#0f766e] transition hover:text-[#095e58]"
      >
        {action} →
      </a>

    </div>
  );
}


/* ===============================================================
   MINI METRIC
=============================================================== */

function MiniMetric({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-xl bg-[#f7fbfa] p-3.5">

      <p className="text-[9px] text-[#98a49f]">
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">

        <span className="text-[18px] font-semibold text-[#263833]">
          {value}
        </span>

        <span className="mb-0.5 text-[8px] font-semibold text-[#2d906d]">
          {change}
        </span>

      </div>

    </div>
  );
}


/* ===============================================================
   TICKET SUMMARY
=============================================================== */

function TicketSummary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 text-center">

      <p className="text-[16px] font-semibold text-[#263833]">
        {value}
      </p>

      <p className="mt-0.5 text-[8px] text-[#98a49f]">
        {label}
      </p>

    </div>
  );
}


/* ===============================================================
   HEALTH ROW
=============================================================== */

function HealthRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">

      <div className="flex items-center gap-2">

        <span className="h-1.5 w-1.5 rounded-full bg-[#39a879]" />

        <span className="text-[10px] text-[#667570]">
          {label}
        </span>

      </div>

      <span className="text-[9px] font-semibold text-[#278260]">
        {value}
      </span>

    </div>
  );
}


/* ===============================================================
   SUMMARY CARD
=============================================================== */

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="card card-hover flex items-center gap-4 p-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e5f5f1] text-[14px] font-bold text-[#0f766e]">
        {icon}
      </div>

      <div>

        <p className="text-[9px] uppercase tracking-[0.08em] text-[#98a49f]">
          {title}
        </p>

        <p className="mt-0.5 text-[20px] font-semibold text-[#263833]">
          {value}
        </p>

        <p className="text-[8px] text-[#a4afab]">
          {description}
        </p>

      </div>

    </div>
  );
}