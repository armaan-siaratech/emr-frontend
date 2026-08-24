"use client";

import Link from "next/link";

const admin = {
  name: "John Smith",
  initials: "JS",
  email: "john.smith@medicarehms.com",
  phone: "+91 98765 43210",
  employeeId: "ADM-00024",
  facility: "Central Medical Center",
  role: "Administrator",
  status: "Active",
  createdAt: "August 05, 2026",
  lastLogin: "Today, 09:42 AM",
};

export default function AdminDetailsPage() {
  return (
    <div className="w-full max-w-[1150px]">

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
          {admin.name}
        </span>
      </div>


      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
            Administrator Details
          </h1>

          <p className="mt-1 text-[11px] text-[#8A9995]">
            View administrator account information and activity.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <Link
            href="/super-admin/admins"
            className="rounded-[9px] border border-[#DDE6E3] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
          >
            Back
          </Link>

          <Link
            href="/super-admin/admins/1/edit"
            className="flex items-center gap-2 rounded-[9px] bg-[#0F766E] px-4 py-2.5 text-[10px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.16)] hover:bg-[#0B625C]"
          >
            <EditIcon />
            Edit Administrator
          </Link>

        </div>

      </div>


      {/* Profile Header */}

      <div className="mb-5 rounded-[16px] border border-[#E4ECE9] bg-white p-6 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#DDF2ED] text-[18px] font-semibold text-[#0F766E]">
              {admin.initials}
            </div>

            <div>

              <div className="flex items-center gap-3">

                <h2 className="text-[18px] font-semibold text-[#263833]">
                  {admin.name}
                </h2>

                <StatusBadge status={admin.status} />

              </div>

              <p className="mt-1 text-[10px] text-[#8A9995]">
                {admin.role} · {admin.employeeId}
              </p>

            </div>

          </div>


          <div className="text-right">

            <p className="text-[9px] uppercase tracking-[0.08em] text-[#9AA5A1]">
              Account Created
            </p>

            <p className="mt-1 text-[10px] font-medium text-[#596964]">
              {admin.createdAt}
            </p>

          </div>

        </div>

      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-[1.5fr_1fr] gap-5">


        {/* Personal Information */}

        <section className="rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

          <SectionHeader
            title="Personal Information"
            description="Basic administrator information."
          />

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6">

            <InfoItem
              label="First Name"
              value="John"
            />

            <InfoItem
              label="Last Name"
              value="Smith"
            />

            <InfoItem
              label="Email Address"
              value={admin.email}
            />

            <InfoItem
              label="Phone Number"
              value={admin.phone}
            />

            <InfoItem
              label="Employee ID"
              value={admin.employeeId}
            />

            <InfoItem
              label="Role"
              value={admin.role}
            />

          </div>

        </section>


        {/* Account Information */}

        <section className="rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

          <SectionHeader
            title="Account Information"
            description="Current account status."
          />

          <div className="space-y-5 p-6">

            <InfoItem
              label="Status"
              value={admin.status}
              badge
            />

            <InfoItem
              label="Facility"
              value={admin.facility}
            />

            <InfoItem
              label="Last Login"
              value={admin.lastLogin}
            />

            <InfoItem
              label="Created On"
              value={admin.createdAt}
            />

          </div>

        </section>

      </div>


      {/* Facility */}

      <section className="mt-5 rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

        <SectionHeader
          title="Assigned Facility"
          description="Healthcare facility assigned to this administrator."
        />

        <div className="flex items-center justify-between p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#EAF3F7] text-[#527B99]">
              <BuildingIcon />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[#34443F]">
                {admin.facility}
              </p>

              <p className="mt-1 text-[9px] text-[#98A49F]">
                Primary healthcare facility
              </p>
            </div>

          </div>

          <span className="rounded-full bg-[#E8F6EF] px-3 py-1 text-[8px] font-semibold text-[#278260]">
            Assigned
          </span>

        </div>

      </section>


      {/* Activity */}

      <section className="mt-5 rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

        <SectionHeader
          title="Recent Activity"
          description="Recent administrator account activity."
        />

        <div className="divide-y divide-[#EEF2F0]">

          <Activity
            title="Logged in"
            description="Administrator signed into the platform."
            time="Today, 09:42 AM"
          />

          <Activity
            title="Updated profile"
            description="Administrator profile information was updated."
            time="Yesterday, 04:18 PM"
          />

          <Activity
            title="Account created"
            description="Administrator account was created by Super Admin."
            time="Aug 05, 2026"
          />

        </div>

      </section>

    </div>
  );
}


/* -------------------------------------------------------------
   Components
------------------------------------------------------------- */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-[#EDF2F0] px-6 py-5">
      <h2 className="text-[13px] font-semibold text-[#263833]">
        {title}
      </h2>

      <p className="mt-1 text-[9px] text-[#98A49F]">
        {description}
      </p>
    </div>
  );
}


function InfoItem({
  label,
  value,
  badge = false,
}: {
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.06em] text-[#9AA5A1]">
        {label}
      </p>

      {badge ? (
        <StatusBadge status={value} />
      ) : (
        <p className="mt-1.5 text-[11px] font-medium text-[#465550]">
          {value}
        </p>
      )}
    </div>
  );
}


function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EF] px-2.5 py-1 text-[8px] font-semibold text-[#278260]">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}


function Activity({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F2] text-[#0F766E]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#4B5B56]">
            {title}
          </p>

          <p className="mt-0.5 text-[9px] text-[#98A49F]">
            {description}
          </p>
        </div>

      </div>

      <span className="text-[9px] text-[#9AA5A1]">
        {time}
      </span>

    </div>
  );
}


function EditIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}


function BuildingIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M3 21h18" />
      <path d="M5 21V5l7-2 7 2v16" />
      <path d="M9 9h1" />
      <path d="M14 9h1" />
      <path d="M9 13h1" />
      <path d="M14 13h1" />
      <path d="M10 21v-4h4v4" />
    </svg>
  );
}