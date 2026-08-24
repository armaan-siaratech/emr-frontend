"use client";

import Link from "next/link";
import { useState } from "react";

export default function EditAdminPage() {
  const [status, setStatus] = useState("Active");
  const [sendEmail, setSendEmail] = useState(false);

  return (
    <div className="w-full max-w-[1100px]">

      {/* Breadcrumb */}

      <div className="mb-2 flex items-center gap-2">

        <Link
          href="/super-admin"
          className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
        >
          Super Admin
        </Link>

        <span className="text-[10px] text-[#B3BCB8]">/</span>

        <Link
          href="/super-admin/admins"
          className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
        >
          Administrators
        </Link>

        <span className="text-[10px] text-[#B3BCB8]">/</span>

        <span className="text-[10px] text-[#596964]">
          Edit Administrator
        </span>

      </div>


      {/* Header */}

      <div className="mb-7 flex items-center justify-between">

        <div>

          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
            Edit Administrator
          </h1>

          <p className="mt-1 text-[11px] text-[#8A9995]">
            Update administrator account information and access settings.
          </p>

        </div>

        <Link
          href="/super-admin/admins/1"
          className="rounded-[9px] border border-[#DDE6E3] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
        >
          Cancel
        </Link>

      </div>


      <form className="space-y-5">

        {/* Profile */}

        <FormSection
          title="Personal Information"
          description="Update the administrator's personal information."
        >

          <div className="grid grid-cols-2 gap-5">

            <Input
              label="First Name"
              defaultValue="John"
            />

            <Input
              label="Last Name"
              defaultValue="Smith"
            />

            <Input
              label="Email Address"
              type="email"
              defaultValue="john.smith@medicarehms.com"
            />

            <Input
              label="Phone Number"
              defaultValue="+91 98765 43210"
            />

            <Input
              label="Employee ID"
              defaultValue="ADM-00024"
            />

          </div>

        </FormSection>


        {/* Administrator Details */}

        <FormSection
          title="Administrator Details"
          description="Manage facility assignment and administrator role."
        >

          <div className="grid grid-cols-2 gap-5">

            <SelectInput
              label="Facility"
              defaultValue="Central Medical Center"
              options={[
                "Central Medical Center",
                "Green Valley Hospital",
                "City Care Clinic",
                "Sunrise Healthcare",
              ]}
            />

            <SelectInput
              label="Role"
              defaultValue="Administrator"
              options={[
                "Administrator",
                "Facility Administrator",
              ]}
            />

            <div>

              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Account Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#65736F] outline-none focus:border-[#77BDB4] focus:ring-2 focus:ring-[#0F766E]/10"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>

            </div>

          </div>

        </FormSection>


        {/* Access */}

        <FormSection
          title="Account Access"
          description="Manage account access and communication preferences."
        >

          <div className="space-y-4">

            <SettingRow
              title="Send password reset email"
              description="Send the administrator an email to reset their password."
              enabled={sendEmail}
              onToggle={() => setSendEmail(!sendEmail)}
            />

            <div className="h-px bg-[#EDF2F0]" />

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-semibold text-[#465550]">
                  Current Account Status
                </p>

                <p className="mt-1 text-[9px] text-[#98A49F]">
                  This administrator is currently {status.toLowerCase()}.
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-[8px] font-semibold ${
                  status === "Active"
                    ? "bg-[#E7F6EF] text-[#278260]"
                    : status === "Pending"
                    ? "bg-[#FFF3E5] text-[#BD7730]"
                    : "bg-[#F0F2F1] text-[#7A8581]"
                }`}
              >
                {status}
              </span>

            </div>

          </div>

        </FormSection>


        {/* Danger Zone */}

        <section className="rounded-[15px] border border-[#F0DCD9] bg-white">

          <div className="border-b border-[#F4E5E2] px-6 py-5">

            <h2 className="text-[13px] font-semibold text-[#9D5049]">
              Danger Zone
            </h2>

            <p className="mt-1 text-[9px] text-[#A98A86]">
              These actions can affect administrator account access.
            </p>

          </div>

          <div className="flex items-center justify-between p-6">

            <div>

              <p className="text-[11px] font-semibold text-[#53615D]">
                Disable administrator
              </p>

              <p className="mt-1 text-[9px] text-[#98A49F]">
                The administrator will no longer be able to access the platform.
              </p>

            </div>

            <button
              type="button"
              className="rounded-[8px] border border-[#E6C7C3] px-4 py-2 text-[9px] font-semibold text-[#A4564F] hover:bg-[#FFF8F7]"
            >
              Disable Account
            </button>

          </div>

        </section>


        {/* Bottom Actions */}

        <div className="flex items-center justify-end gap-3 border-t border-[#E5ECEA] pt-5">

          <Link
            href="/super-admin/admins/1"
            className="rounded-[9px] border border-[#DDE6E3] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-[9px] bg-[#0F766E] px-6 py-2.5 text-[10px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.18)] hover:bg-[#0B625C]"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}


/* ============================================================
   FORM SECTION
============================================================ */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

      <div className="border-b border-[#EDF2F0] px-6 py-5">

        <h2 className="text-[13px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[9px] text-[#98A49F]">
          {description}
        </p>

      </div>

      <div className="p-6">
        {children}
      </div>

    </section>
  );
}


/* ============================================================
   INPUT
============================================================ */

function Input({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
      />

    </div>
  );
}


/* ============================================================
   SELECT
============================================================ */

function SelectInput({
  label,
  options,
  defaultValue,
}: {
  label: string;
  options: string[];
  defaultValue: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
        {label}
      </label>

      <select
        defaultValue={defaultValue}
        className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#65736F] outline-none focus:border-[#77BDB4] focus:ring-2 focus:ring-[#0F766E]/10"
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


/* ============================================================
   SETTING ROW
============================================================ */

function SettingRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">

      <div>

        <p className="text-[11px] font-semibold text-[#465550]">
          {title}
        </p>

        <p className="mt-1 text-[9px] text-[#98A49F]">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition ${
          enabled
            ? "bg-[#0F766E]"
            : "bg-[#CBD5D2]"
        }`}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}