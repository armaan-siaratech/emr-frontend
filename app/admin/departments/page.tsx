"use client";

import { useState } from "react";

const departments = [
  {
    id: 1,
    name: "Cardiology",
    code: "CARD",
    type: "Clinical",
    head: "Dr. Sarah Mitchell",
    facility: "Sunrise Healthcare Center",
    providers: 8,
    patients: 124,
    status: "Active",
  },
  {
    id: 2,
    name: "Neurology",
    code: "NEUR",
    type: "Clinical",
    head: "Dr. Michael Anderson",
    facility: "Green Valley Medical Center",
    providers: 6,
    patients: 86,
    status: "Active",
  },
  {
    id: 3,
    name: "Emergency Department",
    code: "ER",
    type: "Clinical",
    head: "Dr. David Miller",
    facility: "Sunrise Healthcare Center",
    providers: 14,
    patients: 238,
    status: "Active",
  },
  {
    id: 4,
    name: "Radiology",
    code: "RAD",
    type: "Clinical",
    head: "Dr. Robert Wilson",
    facility: "Green Valley Medical Center",
    providers: 7,
    patients: 92,
    status: "Active",
  },
  {
    id: 5,
    name: "Laboratory",
    code: "LAB",
    type: "Diagnostic",
    head: "Emily Johnson",
    facility: "Sunrise Healthcare Center",
    providers: 9,
    patients: 176,
    status: "Active",
  },
  {
    id: 6,
    name: "Pharmacy",
    code: "PHAR",
    type: "Support",
    head: "Lisa Thompson",
    facility: "Harmony Care Clinic",
    providers: 5,
    patients: 64,
    status: "Active",
  },
  {
    id: 7,
    name: "Rehabilitation",
    code: "REHAB",
    type: "Clinical",
    head: "James Brown",
    facility: "Westside Rehabilitation",
    providers: 11,
    patients: 72,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Billing",
    code: "BILL",
    type: "Administrative",
    head: "Amanda Davis",
    facility: "Sunrise Healthcare Center",
    providers: 6,
    patients: 0,
    status: "Active",
  },
];

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredDepartments = departments.filter((department) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      department.name.toLowerCase().includes(searchValue) ||
      department.code.toLowerCase().includes(searchValue) ||
      department.head.toLowerCase().includes(searchValue) ||
      department.facility.toLowerCase().includes(searchValue);

    const matchesType =
      typeFilter === "All Types" ||
      department.type === typeFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      department.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* HEADER */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Departments
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Manage clinical, diagnostic, support and administrative departments
            </p>
          </div>

          <button
            type="button"
            className="rounded-[8px] bg-[#0d9b91] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.16)] transition hover:bg-[#078a81]"
          >
            + Add Department
          </button>

        </div>

      </div>


      {/* CONTENT */}
      <div className="px-6 py-6">

        {/* STAT CARDS */}
        <div className="grid grid-cols-4 gap-4">

          <StatCard
            title="Total Departments"
            value="24"
            subtitle="Across all facilities"
            icon="▤"
          />

          <StatCard
            title="Clinical"
            value="14"
            subtitle="Clinical departments"
            icon="✚"
          />

          <StatCard
            title="Active Departments"
            value="22"
            subtitle="Currently operational"
            icon="✓"
          />

          <StatCard
            title="Total Providers"
            value="86"
            subtitle="Assigned to departments"
            icon="♧"
          />

        </div>


        {/* MAIN CARD */}
        <div className="mt-6 overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white">

          {/* TOOLBAR */}
          <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

            <div>

              <h2 className="text-[14px] font-semibold text-[#172522]">
                All Departments
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                View and manage departments across your facilities
              </p>

            </div>


            <div className="flex items-center gap-2">

              {/* SEARCH */}
              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#8b9793]">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search departments..."
                  className="h-9 w-[225px] rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] pl-8 pr-3 text-[11px] outline-none transition focus:border-[#0d9b91] focus:bg-white"
                />

              </div>


              {/* TYPE FILTER */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Types</option>
                <option>Clinical</option>
                <option>Diagnostic</option>
                <option>Support</option>
                <option>Administrative</option>
              </select>


              {/* STATUS FILTER */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

            </div>

          </div>


          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-[#f7faf9]">

                  <TableHead text="DEPARTMENT" />
                  <TableHead text="TYPE" />
                  <TableHead text="DEPARTMENT HEAD" />
                  <TableHead text="FACILITY" />
                  <TableHead text="PROVIDERS" />
                  <TableHead text="PATIENTS" />
                  <TableHead text="STATUS" />
                  <TableHead text="ACTION" />

                </tr>

              </thead>


              <tbody>

                {filteredDepartments.map((department) => (
                  <DepartmentRow
                    key={department.id}
                    department={department}
                  />
                ))}

              </tbody>

            </table>


            {/* EMPTY STATE */}
            {filteredDepartments.length === 0 && (
              <div className="flex min-h-[280px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#eaf7f4] text-[20px] text-[#0d9b91]">
                    ⌕
                  </div>

                  <h3 className="mt-3 text-[13px] font-semibold text-[#53645f]">
                    No departments found
                  </h3>

                  <p className="mt-1 text-[10px] text-[#929e99]">
                    Try changing your search or filters.
                  </p>

                </div>

              </div>
            )}

          </div>


          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-[#e4ece9] px-5 py-3">

            <p className="text-[10px] text-[#899590]">

              Showing{" "}

              <span className="font-semibold text-[#53645f]">
                {filteredDepartments.length}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-[#53645f]">
                {departments.length}
              </span>

              {" "}departments

            </p>


            <div className="flex items-center gap-1">

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#9aa5a1]"
              >
                ‹
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0d9b91] text-[10px] font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#53645f]"
              >
                2
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#53645f]"
              >
                3
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#53645f]"
              >
                ›
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[13px] border border-[#dce8e5] bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] font-semibold text-[#71807c]">
            {title}
          </p>

          <p className="mt-2 text-[25px] font-bold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-[#929e99]">
            {subtitle}
          </p>

        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[16px] text-[#0d9b91]">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({ text }: { text: string }) {
  return (
    <th className="px-4 py-3 text-left">

      <span className="text-[8px] font-semibold tracking-[0.08em] text-[#929e99]">
        {text}
      </span>

    </th>
  );
}


/* =========================================================
   DEPARTMENT ROW
========================================================= */

function DepartmentRow({ department }: { department: { name: string; code: string; type: string; head: string; facility?: string; providers?: number; patients?: number; status?: string } }) {

  return (
    <tr className="border-t border-[#edf2f0] transition hover:bg-[#fbfdfc]">

      {/* DEPARTMENT */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#e5f5f1] text-[13px] font-bold text-[#0d9b91]">
            {department.name.charAt(0)}
          </div>

          <div>

            <p className="text-[11px] font-semibold text-[#273732]">
              {department.name}
            </p>

            <p className="mt-1 text-[9px] text-[#929e99]">
              Code: {department.code}
            </p>

          </div>

        </div>

      </td>


      {/* TYPE */}
      <td className="px-4 py-4">

        <TypeBadge type={department.type} />

      </td>


      {/* HEAD */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5f3] text-[8px] font-bold text-[#0d9b91]">
            {department.head
              .split(" ")
              .map((word: string) => word.charAt(0))
              .slice(0, 2)
              .join("")}
          </div>


          <span className="text-[10px] text-[#53645f]">
            {department.head}
          </span>

        </div>

      </td>


      {/* FACILITY */}
      <td className="px-4 py-4">

        <span className="text-[10px] text-[#687771]">
          {department.facility}
        </span>

      </td>


      {/* PROVIDERS */}
      <td className="px-4 py-4">

        <span className="text-[11px] font-semibold text-[#53645f]">
          {department.providers}
        </span>

      </td>


      {/* PATIENTS */}
      <td className="px-4 py-4">

        <span className="text-[11px] font-semibold text-[#53645f]">
          {department.patients}
        </span>

      </td>


      {/* STATUS */}
      <td className="px-4 py-4">

        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[8px] font-semibold ${
            department.status === "Active"
              ? "bg-[#e8f6f0] text-[#278460]"
              : "bg-[#f1f3f2] text-[#7c8783]"
          }`}
        >
          {department.status}
        </span>

      </td>


      {/* ACTION */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-1">

          <button
            type="button"
            title="View Department"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
          >
            ◉
          </button>

          <button
            type="button"
            title="Edit Department"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
          >
            ✎
          </button>

          <button
            type="button"
            title="More"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[13px] text-[#687771] transition hover:bg-[#f1f5f3]"
          >
            ⋮
          </button>

        </div>

      </td>

    </tr>
  );
}


/* =========================================================
   TYPE BADGE
========================================================= */
function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    Clinical: "bg-[#e9f3ff] text-[#3975ae]",
    Diagnostic: "bg-[#f1ecff] text-[#7657ae]",
    Support: "bg-[#fff4e5] text-[#b47725]",
    Administrative: "bg-[#f9eaf1] text-[#a65176]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[8px] font-semibold ${
        styles[type] || "bg-[#f1f3f2] text-[#687771]"
      }`}
    >
      {type}
    </span>
  );
}