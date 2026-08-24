"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UserStatus = "Active" | "Inactive" | "Pending";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  employeeId: string;
  status: UserStatus;
  lastLogin: string;
  avatar: string;
};

const users: User[] = [
  {
    id: "USR-1001",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@healthcare.com",
    role: "Doctor",
    department: "Cardiology",
    employeeId: "DOC-1001",
    status: "Active",
    lastLogin: "Today, 09:42 AM",
    avatar: "SM",
  },
  {
    id: "USR-1002",
    name: "Michael Anderson",
    email: "michael.anderson@healthcare.com",
    role: "Doctor",
    department: "Internal Medicine",
    employeeId: "DOC-1002",
    status: "Active",
    lastLogin: "Today, 08:18 AM",
    avatar: "MA",
  },
  {
    id: "USR-1003",
    name: "Emily Carter",
    email: "emily.carter@healthcare.com",
    role: "Doctor",
    department: "Pediatrics",
    employeeId: "DOC-1003",
    status: "Active",
    lastLogin: "Yesterday, 05:26 PM",
    avatar: "EC",
  },
  {
    id: "USR-1004",
    name: "James Wilson",
    email: "james.wilson@healthcare.com",
    role: "Nurse",
    department: "Emergency",
    employeeId: "NUR-2001",
    status: "Active",
    lastLogin: "Today, 07:55 AM",
    avatar: "JW",
  },
  {
    id: "USR-1005",
    name: "Olivia Martin",
    email: "olivia.martin@healthcare.com",
    role: "Receptionist",
    department: "Front Desk",
    employeeId: "REC-3001",
    status: "Active",
    lastLogin: "Today, 08:47 AM",
    avatar: "OM",
  },
  {
    id: "USR-1006",
    name: "Daniel Thompson",
    email: "daniel.thompson@healthcare.com",
    role: "Doctor",
    department: "Orthopedics",
    employeeId: "DOC-1004",
    status: "Pending",
    lastLogin: "Never",
    avatar: "DT",
  },
  {
    id: "USR-1007",
    name: "Emma Davis",
    email: "emma.davis@healthcare.com",
    role: "Billing Staff",
    department: "Billing",
    employeeId: "BIL-4001",
    status: "Active",
    lastLogin: "Today, 10:12 AM",
    avatar: "ED",
  },
  {
    id: "USR-1008",
    name: "David Brown",
    email: "david.brown@healthcare.com",
    role: "Nurse",
    department: "General Ward",
    employeeId: "NUR-2002",
    status: "Inactive",
    lastLogin: "Jul 28, 2026",
    avatar: "DB",
  },
  {
    id: "USR-1009",
    name: "Sophia Taylor",
    email: "sophia.taylor@healthcare.com",
    role: "Administrator",
    department: "Administration",
    employeeId: "ADM-5001",
    status: "Active",
    lastLogin: "Today, 10:31 AM",
    avatar: "ST",
  },
  {
    id: "USR-1010",
    name: "William Clark",
    email: "william.clark@healthcare.com",
    role: "Lab Technician",
    department: "Laboratory",
    employeeId: "LAB-6001",
    status: "Pending",
    lastLogin: "Never",
    avatar: "WC",
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.employeeId.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All Roles" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" || user.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        user.department === departmentFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [search, roleFilter, statusFilter, departmentFilter]);

  const activeCount = users.filter(
    (user) => user.status === "Active"
  ).length;

  const pendingCount = users.filter(
    (user) => user.status === "Pending"
  ).length;

  const inactiveCount = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* HEADER */}
      <div className="mb-6 flex items-end justify-between">

        <div>

          <div className="mb-2 flex items-center gap-2 text-[9px]">

            <Link
              href="/admin"
              className="font-semibold text-[#0f766e] hover:underline"
            >
              Administration
            </Link>

            <span className="text-[#b2bcb8]">/</span>

            <span className="text-[#8d9995]">
              Users
            </span>

          </div>

          <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#172522]">
            Users
          </h1>

          <p className="mt-1 text-[10px] text-[#8a9793]">
            Manage staff accounts, roles and access across your organization.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-3.5 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]">
            Export
          </button>

          <Link
            href="/admin/users/new"
            className="flex items-center gap-2 rounded-[9px] bg-[#0f766e] px-4 py-2.5 text-[9px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.15)] hover:bg-[#0b665f]"
          >
            <span className="text-[14px]">+</span>
            Add User
          </Link>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Users"
          value={users.length.toString()}
          description="Registered accounts"
          icon="US"
        />

        <SummaryCard
          label="Active Users"
          value={activeCount.toString()}
          description="Currently active"
          icon="AC"
          positive
        />

        <SummaryCard
          label="Pending Users"
          value={pendingCount.toString()}
          description="Awaiting approval"
          icon="PN"
          warning
        />

        <SummaryCard
          label="Inactive Users"
          value={inactiveCount.toString()}
          description="Currently disabled"
          icon="IN"
        />

      </div>

      {/* USERS CARD */}
      <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

        {/* TOOLBAR */}
        <div className="border-b border-[#edf2f0] p-5">

          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <div className="relative flex-1">

              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ba7a2]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or employee ID..."
                className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] pl-9 pr-3 text-[9px] text-[#596963] outline-none placeholder:text-[#a5afab] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
              />

            </div>

            {/* ROLE */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 w-[145px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Roles</option>
              <option>Administrator</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Receptionist</option>
              <option>Billing Staff</option>
              <option>Lab Technician</option>
            </select>

            {/* DEPARTMENT */}
            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
              className="h-10 w-[160px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Internal Medicine</option>
              <option>Pediatrics</option>
              <option>Emergency</option>
              <option>Front Desk</option>
              <option>Orthopedics</option>
              <option>Billing</option>
              <option>Administration</option>
              <option>Laboratory</option>
              <option>General Ward</option>
            </select>

            {/* STATUS */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="h-10 w-[130px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>

          </div>

        </div>

        {/* RESULT INFO */}
        <div className="flex items-center justify-between border-b border-[#edf2f0] px-5 py-3">

          <p className="text-[8px] text-[#929e99]">
            Showing{" "}
            <span className="font-semibold text-[#596963]">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#596963]">
              {users.length}
            </span>{" "}
            users
          </p>

          {(search ||
            roleFilter !== "All Roles" ||
            statusFilter !== "All Status" ||
            departmentFilter !== "All Departments") && (
            <button
              onClick={() => {
                setSearch("");
                setRoleFilter("All Roles");
                setStatusFilter("All Status");
                setDepartmentFilter("All Departments");
              }}
              className="text-[8px] font-semibold text-[#0f766e] hover:underline"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <div className="min-w-[1050px]">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-[1.7fr_1.1fr_1.05fr_0.9fr_0.9fr_1fr_45px] items-center bg-[#fafcfb] px-5 py-3">

              <TableHead text="USER" />
              <TableHead text="ROLE" />
              <TableHead text="DEPARTMENT" />
              <TableHead text="EMPLOYEE ID" />
              <TableHead text="STATUS" />
              <TableHead text="LAST LOGIN" />
              <div />

            </div>

            {/* ROWS */}
            {filteredUsers.length > 0 ? (

              filteredUsers.map((user) => (

                <UserRow
                  key={user.id}
                  user={user}
                />

              ))

            ) : (

              <div className="flex flex-col items-center justify-center py-20">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#eaf5f2] text-[10px] font-bold text-[#0f766e]">
                  US
                </div>

                <p className="text-[10px] font-semibold text-[#596963]">
                  No users found
                </p>

                <p className="mt-1 text-[8px] text-[#9aa5a1]">
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* PAGINATION */}
        {filteredUsers.length > 0 && (

          <div className="flex items-center justify-between border-t border-[#edf2f0] px-5 py-4">

            <p className="text-[8px] text-[#929e99]">
              Page{" "}
              <span className="font-semibold text-[#596963]">
                1
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#596963]">
                1
              </span>
            </p>

            <div className="flex items-center gap-1">

              <button
                disabled
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e6ece9] text-[10px] text-[#c0c8c5] disabled:cursor-not-allowed"
              >
                ←
              </button>

              <button className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#0f766e] text-[8px] font-semibold text-white">
                1
              </button>

              <button
                disabled
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e6ece9] text-[10px] text-[#c0c8c5]"
              >
                →
              </button>

            </div>

          </div>

        )}

      </section>

    </div>
  );
}

/* =========================
   USER ROW
========================= */

function UserRow({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-[1.7fr_1.1fr_1.05fr_0.9fr_0.9fr_1fr_45px] items-center border-b border-[#edf2f0] px-5 py-3.5 last:border-0 hover:bg-[#fafcfb]">

      {/* USER */}
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f5f1] text-[7px] font-bold text-[#0f766e]">
          {user.avatar}
        </div>

        <div className="min-w-0">

          <p className="truncate text-[9px] font-semibold text-[#52615c]">
            {user.name}
          </p>

          <p className="mt-1 truncate text-[7px] text-[#9aa5a1]">
            {user.email}
          </p>

        </div>

      </div>

      {/* ROLE */}
      <div>

        <span className="rounded-[6px] bg-[#f1f5f3] px-2 py-1 text-[7px] font-semibold text-[#687771]">
          {user.role}
        </span>

      </div>

      {/* DEPARTMENT */}
      <p className="text-[8px] text-[#687771]">
        {user.department}
      </p>

      {/* EMPLOYEE ID */}
      <p className="font-mono text-[7px] font-medium text-[#8d9995]">
        {user.employeeId}
      </p>

      {/* STATUS */}
      <StatusBadge status={user.status} />

      {/* LAST LOGIN */}
      <p className="text-[8px] text-[#7f8c87]">
        {user.lastLogin}
      </p>

      {/* MENU */}
      <button className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[14px] text-[#9da8a4] hover:bg-[#edf5f2] hover:text-[#0f766e]">
        ⋮
      </button>

    </div>
  );
}

/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  label,
  value,
  description,
  icon,
  positive,
  warning,
}: {
  label: string;
  value: string;
  description: string;
  icon: string;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-[15px] border border-[#e4ebe8] bg-white p-4.5 shadow-[0_4px_18px_rgba(30,60,52,0.025)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[8px] font-semibold uppercase tracking-[0.09em] text-[#919d98]">
            {label}
          </p>

          <p className="mt-2.5 text-[23px] font-semibold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[7px] font-bold ${
            positive
              ? "bg-[#e5f5f1] text-[#0f766e]"
              : warning
                ? "bg-[#fff4df] text-[#a2733f]"
                : "bg-[#f1f5f3] text-[#687771]"
          }`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-2 text-[7px] text-[#9aa5a1]">
        {description}
      </p>

    </div>
  );
}

/* =========================
   STATUS
========================= */

function StatusBadge({ status }: { status: UserStatus }) {
  const styles = {
    Active: {
      wrapper: "bg-[#e8f6f0] text-[#278460]",
      dot: "bg-[#35a878]",
    },
    Inactive: {
      wrapper: "bg-[#f1f3f2] text-[#7e8985]",
      dot: "bg-[#a5aeaa]",
    },
    Pending: {
      wrapper: "bg-[#fff5df] text-[#a2733f]",
      dot: "bg-[#d6a64d]",
    },
  };

  const style = styles[status];

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[7px] font-semibold ${style.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

/* =========================
   TABLE HEAD
========================= */

function TableHead({ text }: { text: string }) {
  return (
    <span className="text-[7px] font-semibold tracking-[0.1em] text-[#9aa5a1]">
      {text}
    </span>
  );
}