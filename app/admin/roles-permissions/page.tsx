"use client";

import { useState } from "react";
import Link from "next/link";

const roles = [
  {
    name: "Administrator",
    key: "administrator",
    description: "Full access to organization and system settings.",
    users: 4,
    color: "teal",
  },
  {
    name: "Doctor",
    key: "doctor",
    description: "Clinical access for physicians and providers.",
    users: 38,
    color: "blue",
  },
  {
    name: "Nurse",
    key: "nurse",
    description: "Clinical and patient-care access.",
    users: 64,
    color: "purple",
  },
  {
    name: "Receptionist",
    key: "receptionist",
    description: "Front desk and appointment management.",
    users: 21,
    color: "orange",
  },
  {
    name: "Billing Staff",
    key: "billing",
    description: "Billing, invoices and payment management.",
    users: 15,
    color: "green",
  },
];

const permissionGroups = [
  {
    title: "Patients",
    permissions: [
      "View patients",
      "Create patients",
      "Edit patients",
      "Delete patients",
    ],
  },
  {
    title: "Appointments",
    permissions: [
      "View appointments",
      "Create appointments",
      "Edit appointments",
      "Cancel appointments",
    ],
  },
  {
    title: "Clinical",
    permissions: [
      "View clinical records",
      "Create clinical notes",
      "Edit clinical notes",
      "Manage medications",
    ],
  },
  {
    title: "Administration",
    permissions: [
      "View users",
      "Create users",
      "Manage roles",
      "System settings",
    ],
  },
  {
    title: "Financial",
    permissions: [
      "View billing",
      "Create invoices",
      "Process payments",
      "View financial reports",
    ],
  },
];

export default function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState("administrator");
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    "View patients": true,
    "Create patients": true,
    "Edit patients": true,
    "Delete patients": true,

    "View appointments": true,
    "Create appointments": true,
    "Edit appointments": true,
    "Cancel appointments": true,

    "View clinical records": true,
    "Create clinical notes": true,
    "Edit clinical notes": true,
    "Manage medications": true,

    "View users": true,
    "Create users": true,
    "Manage roles": true,
    "System settings": true,

    "View billing": true,
    "Create invoices": true,
    "Process payments": true,
    "View financial reports": true,
  });

  const role = roles.find((item) => item.key === selectedRole);

  const togglePermission = (permission: string) => {
    setPermissions((current) => ({
      ...current,
      [permission]: !current[permission],
    }));
  };

  return (
    <div className="mx-auto max-w-[1550px]">

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
              Roles & Permissions
            </span>

          </div>

          <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#172522]">
            Roles & Permissions
          </h1>

          <p className="mt-1.5 text-[10px] text-[#8a9793]">
            Control what each user role can access across the healthcare system.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]">
            Reset Changes
          </button>

          <button className="rounded-[9px] bg-[#0f766e] px-5 py-2.5 text-[9px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.15)] hover:bg-[#0b665f]">
            Save Changes
          </button>

        </div>

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-[280px_1fr] gap-5">

        {/* ROLE SIDEBAR */}
        <aside className="h-fit overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

          <div className="border-b border-[#edf2f0] px-5 py-4">

            <p className="text-[11px] font-semibold text-[#52615c]">
              User Roles
            </p>

            <p className="mt-1 text-[8px] text-[#9aa5a1]">
              Select a role to manage permissions.
            </p>

          </div>

          <div className="p-2.5">

            {roles.map((item) => {

              const active = selectedRole === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedRole(item.key)}
                  className={`mb-1.5 w-full rounded-[11px] p-3 text-left transition last:mb-0 ${
                    active
                      ? "bg-[#eaf6f2]"
                      : "hover:bg-[#f8faf9]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <RoleIcon
                      color={item.color}
                      active={active}
                    />

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between">

                        <p
                          className={`text-[9px] font-semibold ${
                            active
                              ? "text-[#0f766e]"
                              : "text-[#596963]"
                          }`}
                        >
                          {item.name}
                        </p>

                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[6px] font-semibold ${
                            active
                              ? "bg-white text-[#0f766e]"
                              : "bg-[#f0f3f2] text-[#899590]"
                          }`}
                        >
                          {item.users}
                        </span>

                      </div>

                      <p className="mt-1 line-clamp-2 text-[7px] leading-3.5 text-[#9aa5a1]">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </button>
              );
            })}

          </div>

          {/* CREATE ROLE */}
          <div className="border-t border-[#edf2f0] p-3">

            <button className="flex w-full items-center justify-center gap-2 rounded-[9px] border border-dashed border-[#cbdcd7] py-2.5 text-[8px] font-semibold text-[#0f766e] hover:bg-[#f5faf8]">
              <span className="text-[13px]">+</span>
              Create Custom Role
            </button>

          </div>

        </aside>

        {/* PERMISSION CONTENT */}
        <main className="space-y-5">

          {/* ROLE HEADER */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-[#e7f5f1] text-[10px] font-bold text-[#0f766e]">
                  {role?.name.slice(0, 2).toUpperCase()}
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-[14px] font-semibold text-[#263833]">
                      {role?.name}
                    </h2>

                    <span className="rounded-full bg-[#e8f6f0] px-2 py-1 text-[6px] font-semibold text-[#278460]">
                      {role?.users} USERS
                    </span>

                  </div>

                  <p className="mt-1 text-[8px] text-[#9aa5a1]">
                    {role?.description}
                  </p>

                </div>

              </div>

              <button className="rounded-[8px] border border-[#e1e9e5] px-3 py-2 text-[8px] font-semibold text-[#687771] hover:bg-[#f8faf9]">
                Edit Role
              </button>

            </div>

          </section>

          {/* PERMISSION MATRIX */}
          <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="flex items-center justify-between border-b border-[#edf2f0] px-5 py-4">

              <div>

                <p className="text-[11px] font-semibold text-[#52615c]">
                  Permission Matrix
                </p>

                <p className="mt-1 text-[8px] text-[#9aa5a1]">
                  Enable or disable access for this role.
                </p>

              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() => {
                    const updated = { ...permissions };

                    permissionGroups.forEach((group) => {
                      group.permissions.forEach((permission) => {
                        updated[permission] = true;
                      });
                    });

                    setPermissions(updated);
                  }}
                  className="rounded-[7px] px-2.5 py-1.5 text-[7px] font-semibold text-[#0f766e] hover:bg-[#eaf6f2]"
                >
                  Enable All
                </button>

                <button
                  onClick={() => {
                    const updated = { ...permissions };

                    permissionGroups.forEach((group) => {
                      group.permissions.forEach((permission) => {
                        updated[permission] = false;
                      });
                    });

                    setPermissions(updated);
                  }}
                  className="rounded-[7px] px-2.5 py-1.5 text-[7px] font-semibold text-[#899691] hover:bg-[#f3f5f4]"
                >
                  Disable All
                </button>

              </div>

            </div>

            {/* GROUPS */}
            <div className="divide-y divide-[#edf2f0]">

              {permissionGroups.map((group) => (

                <div
                  key={group.title}
                  className="p-5"
                >

                  <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#f0f5f3] text-[8px] font-bold text-[#687771]">
                        {group.title.slice(0, 2).toUpperCase()}
                      </div>

                      <div>

                        <p className="text-[9px] font-semibold text-[#596963]">
                          {group.title}
                        </p>

                        <p className="text-[7px] text-[#a0aaa6]">
                          {group.permissions.length} permissions
                        </p>

                      </div>

                    </div>

                    <span className="text-[7px] text-[#9aa5a1]">
                      {group.permissions.filter(
                        (permission) => permissions[permission]
                      ).length}{" "}
                      enabled
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    {group.permissions.map((permission) => (

                      <PermissionRow
                        key={permission}
                        label={permission}
                        enabled={permissions[permission]}
                        onChange={() =>
                          togglePermission(permission)
                        }
                      />

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* INFORMATION */}
          <section className="grid grid-cols-2 gap-5">

            <InfoCard
              title="Role inheritance"
              description="Permissions are automatically inherited by every user assigned to this role."
              icon="RI"
            />

            <InfoCard
              title="Security reminder"
              description="Only grant permissions required for the user's responsibilities and access level."
              icon="SC"
            />

          </section>

        </main>

      </div>

      {/* BOTTOM */}
      <div className="mt-5 flex items-center justify-between rounded-[14px] border border-[#e4ebe8] bg-white px-5 py-4">

        <div>

          <p className="text-[9px] font-semibold text-[#596963]">
            Managing {role?.name} permissions
          </p>

          <p className="mt-1 text-[7px] text-[#9aa5a1]">
            Changes will apply to all users assigned to this role.
          </p>

        </div>

        <button className="rounded-[8px] bg-[#0f766e] px-5 py-2.5 text-[8px] font-semibold text-white">
          Save Permission Changes
        </button>

      </div>

    </div>
  );
}

/* =========================================
   ROLE ICON
========================================= */

function RoleIcon({
  color,
  active,
}: {
  color: string;
  active: boolean;
}) {
  const styles: Record<string, string> = {
    teal: active
      ? "bg-[#d9f0ea] text-[#0f766e]"
      : "bg-[#eef5f2] text-[#60736d]",
    blue: active
      ? "bg-[#dcecf7] text-[#39799d]"
      : "bg-[#f0f5f7] text-[#71868e]",
    purple: active
      ? "bg-[#eee8f7] text-[#7556a0]"
      : "bg-[#f5f1f8] text-[#8d7b9f]",
    orange: active
      ? "bg-[#fff0dc] text-[#ae7435]"
      : "bg-[#f8f3ed] text-[#9b8a78]",
    green: active
      ? "bg-[#e4f3e7] text-[#42804d]"
      : "bg-[#f0f6f1] text-[#728b77]",
  };

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-[7px] font-bold ${styles[color]}`}
    >
      R
    </div>
  );
}

/* =========================================
   PERMISSION ROW
========================================= */

function PermissionRow({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center justify-between rounded-[9px] border px-3.5 py-3 text-left transition ${
        enabled
          ? "border-[#d9eae5] bg-[#f7fbf9]"
          : "border-[#edf1ef] bg-[#fbfcfc]"
      }`}
    >

      <div className="flex items-center gap-2.5">

        <span
          className={`flex h-5 w-5 items-center justify-center rounded-[6px] text-[8px] font-bold ${
            enabled
              ? "bg-[#dff2eb] text-[#278460]"
              : "bg-[#edf0ef] text-[#a1aaa6]"
          }`}
        >
          {enabled ? "✓" : "—"}
        </span>

        <span
          className={`text-[8px] ${
            enabled
              ? "font-semibold text-[#596963]"
              : "text-[#899590]"
          }`}
        >
          {label}
        </span>

      </div>

      <span
        className={`relative h-4 w-7 rounded-full transition ${
          enabled ? "bg-[#0f766e]" : "bg-[#ccd5d1]"
        }`}
      >

        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-[15px]" : "left-0.5"
          }`}
        />

      </span>

    </button>
  );
}

/* =========================================
   INFO CARD
========================================= */

function InfoCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex gap-3 rounded-[14px] border border-[#e4ebe8] bg-white p-4">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#e8f5f2] text-[7px] font-bold text-[#0f766e]">
        {icon}
      </div>

      <div>

        <p className="text-[9px] font-semibold text-[#596963]">
          {title}
        </p>

        <p className="mt-1 text-[7px] leading-4 text-[#9aa5a1]">
          {description}
        </p>

      </div>

    </div>
  );
}