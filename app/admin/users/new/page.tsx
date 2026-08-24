"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateUserPage() {
  const [role, setRole] = useState("Doctor");
  const [status, setStatus] = useState("Active");
  const [mfa, setMfa] = useState(true);
  const [sendInvite, setSendInvite] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-[1450px]">

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

            <Link
              href="/admin/users"
              className="font-semibold text-[#0f766e] hover:underline"
            >
              Users
            </Link>

            <span className="text-[#b2bcb8]">/</span>

            <span className="text-[#8d9995]">
              Create User
            </span>

          </div>

          <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#172522]">
            Create User
          </h1>

          <p className="mt-1.5 text-[10px] text-[#8a9793]">
            Create a new user account and configure their access.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <Link
            href="/admin/users"
            className="rounded-[9px] border border-[#e1e9e5] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]"
          >
            Cancel
          </Link>

          <button
            onClick={handleSave}
            className="rounded-[9px] bg-[#0f766e] px-5 py-2.5 text-[9px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.15)] hover:bg-[#0b665f]"
          >
            Create User
          </button>

        </div>

      </div>

      {/* SUCCESS */}
      {saved && (
        <div className="mb-5 flex items-center gap-2 rounded-[10px] border border-[#cce8de] bg-[#edf9f5] px-4 py-3 text-[9px] font-semibold text-[#278460]">

          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d7f1e7]">
            ✓
          </span>

          User created successfully.

        </div>
      )}

      {/* MAIN */}
      <div className="grid grid-cols-[1fr_330px] gap-5">

        {/* LEFT */}
        <div className="space-y-5">

          {/* PERSONAL INFORMATION */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              number="01"
              title="Personal Information"
              description="Basic information about the user."
            />

            <div className="grid grid-cols-2 gap-x-5 gap-y-4">

              <Field
                label="First Name"
                required
                placeholder="Enter first name"
              />

              <Field
                label="Last Name"
                required
                placeholder="Enter last name"
              />

              <Field
                label="Email Address"
                required
                type="email"
                placeholder="name@healthcare.com"
              />

              <Field
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
              />

              <Field
                label="Date of Birth"
                type="date"
              />

              <Field
                label="Gender"
                select
                options={[
                  "Select gender",
                  "Male",
                  "Female",
                  "Other",
                  "Prefer not to say",
                ]}
              />

            </div>

          </section>

          {/* PROFESSIONAL INFORMATION */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              number="02"
              title="Professional Information"
              description="Organization and employment details."
            />

            <div className="grid grid-cols-2 gap-x-5 gap-y-4">

              <Field
                label="Role"
                required
                value={role}
                select
                options={[
                  "Administrator",
                  "Doctor",
                  "Nurse",
                  "Receptionist",
                  "Billing Staff",
                  "Lab Technician",
                  "Staff",
                ]}
                onChange={setRole}
              />

              <Field
                label="Department"
                required
                select
                options={[
                  "Select department",
                  "Administration",
                  "Cardiology",
                  "Internal Medicine",
                  "Pediatrics",
                  "Orthopedics",
                  "Emergency",
                  "General Ward",
                  "Laboratory",
                  "Billing",
                  "Front Desk",
                ]}
              />

              <Field
                label="Employee ID"
                required
                placeholder="e.g. DOC-1005"
              />

              <Field
                label="Job Title"
                placeholder="e.g. Senior Physician"
              />

              <Field
                label="Facility"
                required
                select
                options={[
                  "Main Healthcare Center",
                  "Downtown Medical Center",
                  "Westside Clinic",
                  "North Campus",
                ]}
              />

              <Field
                label="Employment Type"
                select
                options={[
                  "Full Time",
                  "Part Time",
                  "Contract",
                  "Temporary",
                ]}
              />

              {role === "Doctor" && (
                <>
                  <Field
                    label="Specialization"
                    select
                    options={[
                      "Select specialization",
                      "Cardiology",
                      "Internal Medicine",
                      "Pediatrics",
                      "Orthopedics",
                      "Dermatology",
                      "Neurology",
                      "General Medicine",
                    ]}
                  />

                  <Field
                    label="License Number"
                    placeholder="Enter medical license number"
                  />
                </>
              )}

            </div>

          </section>

          {/* ACCOUNT ACCESS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              number="03"
              title="Account Access"
              description="Configure login and account settings."
            />

            <div className="grid grid-cols-2 gap-x-5 gap-y-4">

              <div>

                <label className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.08em] text-[#899691]">
                  Username
                </label>

                <div className="relative">

                  <input
                    placeholder="username"
                    className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] px-3 pr-24 text-[9px] text-[#596963] outline-none placeholder:text-[#a5afab] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[7px] text-[#a0aaa6]">
                    Optional
                  </span>

                </div>

              </div>

              <div>

                <label className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.08em] text-[#899691]">
                  Temporary Password
                </label>

                <div className="relative">

                  <input
                    type="password"
                    placeholder="Auto-generated"
                    className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] px-3 pr-20 text-[9px] text-[#596963] outline-none placeholder:text-[#a5afab] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
                  />

                  <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[6px] px-2 py-1 text-[7px] font-semibold text-[#0f766e] hover:bg-[#e7f5f1]">
                    Generate
                  </button>

                </div>

              </div>

            </div>

            <div className="mt-5 space-y-3">

              <ToggleRow
                title="Send invitation email"
                description="Send the user an email with instructions to access their account."
                checked={sendInvite}
                onChange={setSendInvite}
              />

              <ToggleRow
                title="Require multi-factor authentication"
                description="Require this user to configure MFA during their first login."
                checked={mfa}
                onChange={setMfa}
              />

            </div>

          </section>

          {/* ACCOUNT STATUS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              number="04"
              title="Account Status"
              description="Control the user's account availability."
            />

            <div className="grid grid-cols-3 gap-3">

              <StatusOption
                title="Active"
                description="User can sign in immediately."
                selected={status === "Active"}
                onClick={() => setStatus("Active")}
                type="active"
              />

              <StatusOption
                title="Pending"
                description="Awaiting account activation."
                selected={status === "Pending"}
                onClick={() => setStatus("Pending")}
                type="pending"
              />

              <StatusOption
                title="Inactive"
                description="User cannot access the system."
                selected={status === "Inactive"}
                onClick={() => setStatus("Inactive")}
                type="inactive"
              />

            </div>

          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-5">

          {/* USER PREVIEW */}
          <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="bg-[#103f3a] px-5 py-6">

              <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#8db6af]">
                Account Preview
              </p>

              <div className="mt-5 flex flex-col items-center text-center">

                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-[#dff1ec] text-[16px] font-bold text-[#0f766e]">
                  NU
                </div>

                <p className="mt-3 text-[13px] font-semibold text-white">
                  New User
                </p>

                <p className="mt-1 text-[8px] text-[#9bc0b9]">
                  {role}
                </p>

              </div>

            </div>

            <div className="space-y-4 p-5">

              <PreviewRow
                label="Role"
                value={role}
              />

              <PreviewRow
                label="Status"
                value={status}
              />

              <PreviewRow
                label="MFA"
                value={mfa ? "Required" : "Not Required"}
              />

              <PreviewRow
                label="Invitation"
                value={sendInvite ? "Email Invite" : "Manual"}
              />

            </div>

          </section>

          {/* PERMISSIONS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="mb-4">

              <p className="text-[11px] font-semibold text-[#52615c]">
                Role Permissions
              </p>

              <p className="mt-1 text-[8px] text-[#9aa5a1]">
                Permissions inherited from the selected role.
              </p>

            </div>

            <div className="space-y-2">

              <Permission
                label="View patients"
                enabled
              />

              <Permission
                label="Manage appointments"
                enabled
              />

              <Permission
                label="Clinical documentation"
                enabled={role === "Doctor" || role === "Nurse"}
              />

              <Permission
                label="Manage users"
                enabled={role === "Administrator"}
              />

              <Permission
                label="View reports"
                enabled
              />

              <Permission
                label="System settings"
                enabled={role === "Administrator"}
              />

            </div>

            <Link
              href="/admin/roles-permissions"
              className="mt-4 block text-center text-[8px] font-semibold text-[#0f766e] hover:underline"
            >
              Manage roles & permissions →
            </Link>

          </section>

          {/* SECURITY NOTE */}
          <section className="rounded-[15px] border border-[#dcece7] bg-[#f5fbf8] p-5">

            <div className="flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#dff1eb] text-[10px] text-[#0f766e]">
                ✓
              </div>

              <div>

                <p className="text-[9px] font-semibold text-[#52615c]">
                  Secure account setup
                </p>

                <p className="mt-1.5 text-[8px] leading-4 text-[#82908b]">
                  New users will be required to verify their identity
                  before accessing protected healthcare information.
                </p>

              </div>

            </div>

          </section>

        </aside>

      </div>

      {/* BOTTOM ACTIONS */}
      <div className="mt-5 flex items-center justify-between rounded-[14px] border border-[#e4ebe8] bg-white px-5 py-4">

        <div>

          <p className="text-[9px] font-semibold text-[#596963]">
            Ready to create this account?
          </p>

          <p className="mt-1 text-[7px] text-[#9aa5a1]">
            Review the information before creating the user.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <Link
            href="/admin/users"
            className="rounded-[8px] border border-[#e1e9e5] px-4 py-2 text-[8px] font-semibold text-[#687771]"
          >
            Cancel
          </Link>

          <button
            onClick={handleSave}
            className="rounded-[8px] bg-[#0f766e] px-5 py-2 text-[8px] font-semibold text-white"
          >
            Create User
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================
   SECTION HEADER
========================================= */

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#e7f5f1] text-[8px] font-bold text-[#0f766e]">
        {number}
      </div>

      <div>

        <h2 className="text-[12px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[8px] text-[#98a49f]">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =========================================
   FIELD
========================================= */

function Field({
  label,
  required,
  placeholder,
  type = "text",
  select,
  options = [],
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  select?: boolean;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.08em] text-[#899691]">

        {label}

        {required && (
          <span className="ml-1 text-[#c66d61]">
            *
          </span>
        )}

      </label>

      {select ? (

        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] px-3 text-[9px] text-[#596963] outline-none focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
        >

          {options.map((option) => (
            <option key={option}>
              {option}
            </option>
          ))}

        </select>

      ) : (

        <input
          type={type}
          placeholder={placeholder}
          className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] px-3 text-[9px] text-[#596963] outline-none placeholder:text-[#a5afab] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
        />

      )}

    </div>
  );
}

/* =========================================
   TOGGLE
========================================= */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[11px] border border-[#e7ecea] bg-[#fbfcfc] px-4 py-3">

      <div>

        <p className="text-[9px] font-semibold text-[#596963]">
          {title}
        </p>

        <p className="mt-1 text-[7px] leading-4 text-[#9aa5a1]">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          checked ? "bg-[#0f766e]" : "bg-[#cbd5d1]"
        }`}
      >

        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />

      </button>

    </div>
  );
}

/* =========================================
   STATUS OPTION
========================================= */

function StatusOption({
  title,
  description,
  selected,
  onClick,
  type,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  type: "active" | "pending" | "inactive";
}) {
  const styles = {
    active: {
      dot: "bg-[#35a878]",
      selected: "border-[#a9d9c9] bg-[#f3fbf8]",
    },
    pending: {
      dot: "bg-[#d6a64d]",
      selected: "border-[#ead8ae] bg-[#fffaf0]",
    },
    inactive: {
      dot: "bg-[#9da8a4]",
      selected: "border-[#d4dcd8] bg-[#f7f9f8]",
    },
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[11px] border p-4 text-left transition ${
        selected
          ? styles[type].selected
          : "border-[#e5ece9] bg-white hover:border-[#d5e2de]"
      }`}
    >

      <div className="flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${styles[type].dot}`}
        />

        <span className="text-[9px] font-semibold text-[#596963]">
          {title}
        </span>

        {selected && (
          <span className="ml-auto text-[10px] text-[#0f766e]">
            ✓
          </span>
        )}

      </div>

      <p className="mt-2 text-[7px] leading-4 text-[#9aa5a1]">
        {description}
      </p>

    </button>
  );
}

/* =========================================
   PREVIEW
========================================= */

function PreviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[8px] text-[#9aa5a1]">
        {label}
      </span>

      <span className="max-w-[170px] text-right text-[8px] font-semibold text-[#596963]">
        {value}
      </span>

    </div>
  );
}

/* =========================================
   PERMISSION
========================================= */

function Permission({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-[8px] bg-[#f8faf9] px-3 py-2.5">

      <span className="text-[8px] text-[#687771]">
        {label}
      </span>

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${
          enabled
            ? "bg-[#e2f3ed] text-[#278460]"
            : "bg-[#f0f2f1] text-[#a3aca8]"
        }`}
      >
        {enabled ? "✓" : "—"}
      </span>

    </div>
  );
}