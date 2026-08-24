"use client";

import Link from "next/link";
import { useState } from "react";

export default function DoctorDetailPage() {
  const [status, setStatus] = useState("Active");
  const [verified, setVerified] = useState(true);

  return (
    <div className="mx-auto max-w-[1550px]">

      {/* HEADER */}
      <div className="mb-6">

        <div className="mb-2 flex items-center gap-2 text-[9px]">
          <Link
            href="/admin"
            className="font-semibold text-[#0f766e] hover:underline"
          >
            Administration
          </Link>

          <span className="text-[#b2bcb8]">/</span>

          <Link
            href="/admin/doctors"
            className="font-semibold text-[#0f766e] hover:underline"
          >
            Doctors
          </Link>

          <span className="text-[#b2bcb8]">/</span>

          <span className="text-[#8d9995]">
            Doctor Profile
          </span>
        </div>

        <div className="flex items-end justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[17px] bg-[#dff1ec] text-[17px] font-bold text-[#0f766e]">
              SM
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#172522]">
                  Dr. Sarah Mitchell
                </h1>

                <span className="flex items-center gap-1 rounded-full bg-[#e7f6ef] px-2.5 py-1 text-[7px] font-semibold text-[#278460]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#35a878]" />
                  Verified
                </span>

              </div>

              <p className="mt-1.5 text-[9px] text-[#8a9793]">
                Cardiology · Main Healthcare Center · DOC-1001
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <Link
              href="/admin/doctors"
              className="rounded-[9px] border border-[#e1e9e5] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]"
            >
              Back to Doctors
            </Link>

            <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]">
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      {/* TOP STATS */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <StatCard
          label="Assigned Patients"
          value="428"
          description="Current patient panel"
        />

        <StatCard
          label="Appointments"
          value="86"
          description="Scheduled this month"
        />

        <StatCard
          label="Experience"
          value="12 yrs"
          description="Clinical experience"
        />

        <StatCard
          label="Account Status"
          value={status}
          description="Current system access"
          status
        />

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-[1fr_350px] gap-5">

        {/* LEFT */}
        <div className="space-y-5">

          {/* PERSONAL INFORMATION */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionTitle
              number="01"
              title="Personal Information"
              description="Basic information associated with this provider."
            />

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">

              <Detail
                label="Full Name"
                value="Dr. Sarah Mitchell"
              />

              <Detail
                label="Date of Birth"
                value="March 18, 1984"
              />

              <Detail
                label="Email Address"
                value="sarah.mitchell@healthcare.com"
              />

              <Detail
                label="Phone Number"
                value="+1 (555) 281-4920"
              />

              <Detail
                label="Gender"
                value="Female"
              />

              <Detail
                label="Employee ID"
                value="DOC-1001"
              />

            </div>

          </section>

          {/* PROFESSIONAL */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionTitle
              number="02"
              title="Professional Information"
              description="Provider credentials, specialization and employment details."
            />

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">

              <Detail
                label="Specialization"
                value="Cardiology"
              />

              <Detail
                label="Department"
                value="Cardiology"
              />

              <Detail
                label="Job Title"
                value="Senior Cardiologist"
              />

              <Detail
                label="Facility"
                value="Main Healthcare Center"
              />

              <Detail
                label="License Number"
                value="LIC-92841"
                verified
              />

              <Detail
                label="License Expiry"
                value="December 31, 2028"
              />

              <Detail
                label="Employment Type"
                value="Full Time"
              />

              <Detail
                label="Experience"
                value="12 years"
              />

            </div>

          </section>

          {/* VERIFICATION */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionTitle
              number="03"
              title="Credential Verification"
              description="Review provider credentials and verification status."
            />

            <div className="space-y-3">

              <Credential
                title="Medical License"
                subtitle="LIC-92841"
                status="Verified"
              />

              <Credential
                title="Board Certification"
                subtitle="American Board of Internal Medicine"
                status="Verified"
              />

              <Credential
                title="DEA Registration"
                subtitle="DEA-784219"
                status="Verified"
              />

              <Credential
                title="Professional Liability Insurance"
                subtitle="Coverage valid through Dec 2027"
                status="Verified"
              />

            </div>

            <div className="mt-5 rounded-[10px] border border-[#dcece6] bg-[#f5fbf8] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff2eb] text-[9px] font-bold text-[#278460]">
                  ✓
                </div>

                <div>

                  <p className="text-[9px] font-semibold text-[#52615c]">
                    Provider verified
                  </p>

                  <p className="mt-1 text-[7px] leading-4 text-[#8c9994]">
                    All required credentials have been reviewed and verified
                    by the healthcare administrator.
                  </p>

                  <p className="mt-2 text-[7px] font-medium text-[#9aa5a1]">
                    Last verified: August 6, 2026 · Admin User
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* ACCESS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-6 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionTitle
              number="04"
              title="System Access"
              description="Current role and permissions assigned to this doctor."
            />

            <div className="mb-5 flex items-center justify-between rounded-[11px] bg-[#f7faf9] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e6f4f0] text-[8px] font-bold text-[#0f766e]">
                  DR
                </div>

                <div>

                  <p className="text-[9px] font-semibold text-[#596963]">
                    Doctor
                  </p>

                  <p className="mt-1 text-[7px] text-[#9aa5a1]">
                    Clinical provider role
                  </p>

                </div>

              </div>

              <Link
                href="/admin/roles-permissions"
                className="text-[8px] font-semibold text-[#0f766e] hover:underline"
              >
                View permissions →
              </Link>

            </div>

            <div className="grid grid-cols-2 gap-2">

              <AccessItem
                label="View patients"
                enabled
              />

              <AccessItem
                label="Manage appointments"
                enabled
              />

              <AccessItem
                label="Clinical documentation"
                enabled
              />

              <AccessItem
                label="Manage medications"
                enabled
              />

              <AccessItem
                label="View billing"
                enabled
              />

              <AccessItem
                label="Manage users"
                enabled={false}
              />

            </div>

          </section>

        </div>

        {/* RIGHT */}
        <aside className="space-y-5">

          {/* ACCOUNT CARD */}
          <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="bg-[#103f3a] px-5 py-6">

              <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#8db6af]">
                Account
              </p>

              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-[#dff1ec] text-[12px] font-bold text-[#0f766e]">
                  SM
                </div>

                <div>

                  <p className="text-[11px] font-semibold text-white">
                    Sarah Mitchell
                  </p>

                  <p className="mt-1 text-[7px] text-[#9bc0b9]">
                    DOC-1001
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-5">

              <AccountRow
                label="Role"
                value="Doctor"
              />

              <AccountRow
                label="Status"
                value={status}
                green={status === "Active"}
              />

              <AccountRow
                label="MFA"
                value="Enabled"
                green
              />

              <AccountRow
                label="Last Login"
                value="Today, 08:42 AM"
              />

              <AccountRow
                label="Created"
                value="Jan 12, 2025"
              />

            </div>

          </section>

          {/* STATUS CONTROL */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <p className="text-[11px] font-semibold text-[#52615c]">
              Account Status
            </p>

            <p className="mt-1 text-[8px] text-[#9aa5a1]">
              Control whether this provider can access the system.
            </p>

            <div className="mt-4 space-y-2">

              <button
                onClick={() => setStatus("Active")}
                className={`flex w-full items-center gap-3 rounded-[9px] border p-3 text-left ${
                  status === "Active"
                    ? "border-[#b9ddd2] bg-[#f1faf7]"
                    : "border-[#e7ecea]"
                }`}
              >

                <span className="h-2 w-2 rounded-full bg-[#35a878]" />

                <div className="flex-1">

                  <p className="text-[8px] font-semibold text-[#596963]">
                    Active
                  </p>

                  <p className="mt-1 text-[7px] text-[#9aa5a1]">
                    Full system access
                  </p>

                </div>

                {status === "Active" && (
                  <span className="text-[10px] text-[#0f766e]">
                    ✓
                  </span>
                )}

              </button>

              <button
                onClick={() => setStatus("Inactive")}
                className={`flex w-full items-center gap-3 rounded-[9px] border p-3 text-left ${
                  status === "Inactive"
                    ? "border-[#d9dfdc] bg-[#f7f9f8]"
                    : "border-[#e7ecea]"
                }`}
              >

                <span className="h-2 w-2 rounded-full bg-[#9fa9a5]" />

                <div className="flex-1">

                  <p className="text-[8px] font-semibold text-[#596963]">
                    Inactive
                  </p>

                  <p className="mt-1 text-[7px] text-[#9aa5a1]">
                    Access temporarily disabled
                  </p>

                </div>

                {status === "Inactive" && (
                  <span className="text-[10px] text-[#0f766e]">
                    ✓
                  </span>
                )}

              </button>

            </div>

          </section>

          {/* VERIFICATION CARD */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-semibold text-[#52615c]">
                  Verification
                </p>

                <p className="mt-1 text-[8px] text-[#9aa5a1]">
                  Provider credential status.
                </p>

              </div>

              <button
                onClick={() => setVerified(!verified)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] ${
                  verified
                    ? "bg-[#e0f3eb] text-[#278460]"
                    : "bg-[#f0f2f1] text-[#899590]"
                }`}
              >
                {verified ? "✓" : "!"}
              </button>

            </div>

            <div className="mt-4 rounded-[9px] bg-[#f7faf9] p-3">

              <div className="flex items-center gap-2">

                <span
                  className={`h-2 w-2 rounded-full ${
                    verified
                      ? "bg-[#35a878]"
                      : "bg-[#d6a64d]"
                  }`}
                />

                <span className="text-[8px] font-semibold text-[#596963]">
                  {verified ? "Verified" : "Pending Review"}
                </span>

              </div>

              <p className="mt-2 text-[7px] leading-4 text-[#9aa5a1]">
                {verified
                  ? "All required provider credentials have been verified."
                  : "This provider requires credential review."}
              </p>

            </div>

            <button className="mt-3 w-full rounded-[8px] border border-[#dfe8e4] py-2 text-[8px] font-semibold text-[#687771] hover:bg-[#f7faf9]">
              Review Credentials
            </button>

          </section>

          {/* DANGER */}
          <section className="rounded-[15px] border border-[#f0dddd] bg-[#fffafa] p-5">

            <p className="text-[9px] font-semibold text-[#a45e59]">
              Sensitive Account Actions
            </p>

            <p className="mt-1.5 text-[7px] leading-4 text-[#a58a87]">
              These actions can affect the provider&apos;s access to
              protected healthcare information.
            </p>

            <button className="mt-4 w-full rounded-[8px] border border-[#e8c9c6] py-2 text-[8px] font-semibold text-[#a45e59] hover:bg-[#fff2f1]">
              Disable Account
            </button>

          </section>

        </aside>

      </div>

    </div>
  );
}

/* =========================================
   SECTION TITLE
========================================= */

function SectionTitle({
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
   DETAIL
========================================= */

function Detail({
  label,
  value,
  verified,
}: {
  label: string;
  value: string;
  verified?: boolean;
}) {
  return (
    <div>

      <p className="text-[7px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2">

        <p className="text-[9px] font-semibold text-[#596963]">
          {value}
        </p>

        {verified && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e2f3ed] text-[7px] font-bold text-[#278460]">
            ✓
          </span>
        )}

      </div>

    </div>
  );
}

/* =========================================
   CREDENTIAL
========================================= */

function Credential({
  title,
  subtitle,
  status,
}: {
  title: string;
  subtitle: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#e8eeeb] p-3.5">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f0f6f3] text-[8px] text-[#0f766e]">
          ✓
        </div>

        <div>

          <p className="text-[9px] font-semibold text-[#596963]">
            {title}
          </p>

          <p className="mt-1 text-[7px] text-[#9aa5a1]">
            {subtitle}
          </p>

        </div>

      </div>

      <span className="rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[7px] font-semibold text-[#278460]">
        {status}
      </span>

    </div>
  );
}

/* =========================================
   ACCESS
========================================= */

function AccessItem({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-[9px] bg-[#f8faf9] px-3 py-2.5">

      <span className="text-[8px] text-[#687771]">
        {label}
      </span>

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${
          enabled
            ? "bg-[#e2f3ed] text-[#278460]"
            : "bg-[#eef1ef] text-[#a2aba7]"
        }`}
      >
        {enabled ? "✓" : "—"}
      </span>

    </div>
  );
}

/* =========================================
   ACCOUNT ROW
========================================= */

function AccountRow({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[8px] text-[#9aa5a1]">
        {label}
      </span>

      <span
        className={`text-[8px] font-semibold ${
          green ? "text-[#278460]" : "text-[#596963]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  label,
  value,
  description,
  status,
}: {
  label: string;
  value: string;
  description: string;
  status?: boolean;
}) {
  return (
    <div className="rounded-[15px] border border-[#e4ebe8] bg-white p-4.5 shadow-[0_4px_18px_rgba(30,60,52,0.025)]">

      <p className="text-[8px] font-semibold uppercase tracking-[0.09em] text-[#919d98]">
        {label}
      </p>

      <p
        className={`mt-2.5 font-semibold tracking-[-0.03em] ${
          status
            ? "text-[14px] text-[#278460]"
            : "text-[23px] text-[#172522]"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-[7px] text-[#9aa5a1]">
        {description}
      </p>

    </div>
  );
}