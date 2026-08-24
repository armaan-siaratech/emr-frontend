"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DoctorStatus = "Active" | "Pending" | "Inactive";

type Doctor = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  department: string;
  license: string;
  experience: string;
  status: DoctorStatus;
  patients: number;
  appointments: number;
  initials: string;
};

const doctors: Doctor[] = [
  {
    id: "DOC-1001",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@healthcare.com",
    specialization: "Cardiology",
    department: "Cardiology",
    license: "LIC-92841",
    experience: "12 yrs",
    status: "Active",
    patients: 428,
    appointments: 86,
    initials: "SM",
  },
  {
    id: "DOC-1002",
    name: "Michael Anderson",
    email: "michael.anderson@healthcare.com",
    specialization: "Internal Medicine",
    department: "Internal Medicine",
    license: "LIC-73825",
    experience: "15 yrs",
    status: "Active",
    patients: 512,
    appointments: 94,
    initials: "MA",
  },
  {
    id: "DOC-1003",
    name: "Emily Carter",
    email: "emily.carter@healthcare.com",
    specialization: "Pediatrics",
    department: "Pediatrics",
    license: "LIC-65172",
    experience: "9 yrs",
    status: "Active",
    patients: 367,
    appointments: 72,
    initials: "EC",
  },
  {
    id: "DOC-1004",
    name: "Daniel Thompson",
    email: "daniel.thompson@healthcare.com",
    specialization: "Orthopedics",
    department: "Orthopedics",
    license: "LIC-48126",
    experience: "11 yrs",
    status: "Pending",
    patients: 0,
    appointments: 0,
    initials: "DT",
  },
  {
    id: "DOC-1005",
    name: "Jessica Williams",
    email: "jessica.williams@healthcare.com",
    specialization: "Dermatology",
    department: "Dermatology",
    license: "LIC-57319",
    experience: "8 yrs",
    status: "Active",
    patients: 289,
    appointments: 58,
    initials: "JW",
  },
  {
    id: "DOC-1006",
    name: "Robert Harris",
    email: "robert.harris@healthcare.com",
    specialization: "Neurology",
    department: "Neurology",
    license: "LIC-38214",
    experience: "18 yrs",
    status: "Active",
    patients: 601,
    appointments: 105,
    initials: "RH",
  },
  {
    id: "DOC-1007",
    name: "Sophia Martinez",
    email: "sophia.martinez@healthcare.com",
    specialization: "General Medicine",
    department: "General Medicine",
    license: "LIC-82463",
    experience: "6 yrs",
    status: "Inactive",
    patients: 198,
    appointments: 32,
    initials: "SM",
  },
  {
    id: "DOC-1008",
    name: "Christopher Lee",
    email: "christopher.lee@healthcare.com",
    specialization: "Psychiatry",
    department: "Behavioral Health",
    license: "LIC-29581",
    experience: "10 yrs",
    status: "Active",
    patients: 341,
    appointments: 67,
    initials: "CL",
  },
];

export default function AdminDoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("All Specializations");
  const [status, setStatus] = useState("All Status");
  const [department, setDepartment] =
    useState("All Departments");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const value = search.toLowerCase();

      const matchesSearch =
        doctor.name.toLowerCase().includes(value) ||
        doctor.email.toLowerCase().includes(value) ||
        doctor.id.toLowerCase().includes(value) ||
        doctor.license.toLowerCase().includes(value);

      const matchesSpecialization =
        specialization === "All Specializations" ||
        doctor.specialization === specialization;

      const matchesStatus =
        status === "All Status" ||
        doctor.status === status;

      const matchesDepartment =
        department === "All Departments" ||
        doctor.department === department;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [search, specialization, status, department]);

  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === "Active"
  ).length;

  const pendingDoctors = doctors.filter(
    (doctor) => doctor.status === "Pending"
  ).length;

  const inactiveDoctors = doctors.filter(
    (doctor) => doctor.status === "Inactive"
  ).length;

  const totalPatients = doctors.reduce(
    (total, doctor) => total + doctor.patients,
    0
  );

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
              Doctors
            </span>

          </div>

          <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#172522]">
            Doctors
          </h1>

          <p className="mt-1.5 text-[10px] text-[#8a9793]">
            Manage providers, specialties, verification and clinical access.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]">
            Export
          </button>

          <Link
            href="/admin/users/new"
            className="flex items-center gap-2 rounded-[9px] bg-[#0f766e] px-4 py-2.5 text-[9px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.15)] hover:bg-[#0b665f]"
          >
            <span className="text-[14px]">+</span>
            Add Doctor
          </Link>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Doctors"
          value={doctors.length.toString()}
          description="Registered providers"
          icon="DR"
        />

        <SummaryCard
          label="Active Doctors"
          value={activeDoctors.toString()}
          description="Currently practicing"
          icon="AC"
          positive
        />

        <SummaryCard
          label="Pending Verification"
          value={pendingDoctors.toString()}
          description="Require admin review"
          icon="VR"
          warning
        />

        <SummaryCard
          label="Assigned Patients"
          value={totalPatients.toLocaleString()}
          description="Across all providers"
          icon="PT"
        />

      </div>

      {/* MAIN TABLE */}
      <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

        {/* FILTER BAR */}
        <div className="border-b border-[#edf2f0] p-5">

          <div className="flex items-center gap-3">

            <div className="relative flex-1">

              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ba7a2]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor, email, doctor ID or license..."
                className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] pl-9 pr-3 text-[9px] text-[#596963] outline-none placeholder:text-[#a5afab] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
              />

            </div>

            <select
              value={specialization}
              onChange={(e) =>
                setSpecialization(e.target.value)
              }
              className="h-10 w-[170px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Specializations</option>
              <option>Cardiology</option>
              <option>Internal Medicine</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
              <option>Neurology</option>
              <option>General Medicine</option>
              <option>Psychiatry</option>
            </select>

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="h-10 w-[155px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Internal Medicine</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
              <option>Neurology</option>
              <option>General Medicine</option>
              <option>Behavioral Health</option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-10 w-[125px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>

          </div>

        </div>

        {/* RESULT BAR */}
        <div className="flex items-center justify-between border-b border-[#edf2f0] px-5 py-3">

          <p className="text-[8px] text-[#929e99]">

            Showing{" "}

            <span className="font-semibold text-[#596963]">
              {filteredDoctors.length}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-[#596963]">
              {doctors.length}
            </span>{" "}

            doctors

          </p>

          {(search ||
            specialization !== "All Specializations" ||
            department !== "All Departments" ||
            status !== "All Status") && (

            <button
              onClick={() => {
                setSearch("");
                setSpecialization("All Specializations");
                setDepartment("All Departments");
                setStatus("All Status");
              }}
              className="text-[8px] font-semibold text-[#0f766e] hover:underline"
            >
              Clear filters
            </button>

          )}

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <div className="min-w-[1150px]">

            {/* HEADER */}
            <div className="grid grid-cols-[1.65fr_1.1fr_1fr_0.8fr_0.75fr_0.8fr_0.8fr_45px] items-center bg-[#fafcfb] px-5 py-3">

              <TableHead text="DOCTOR" />
              <TableHead text="SPECIALIZATION" />
              <TableHead text="DEPARTMENT" />
              <TableHead text="EXPERIENCE" />
              <TableHead text="PATIENTS" />
              <TableHead text="APPOINTMENTS" />
              <TableHead text="STATUS" />
              <div />

            </div>

            {/* ROWS */}
            {filteredDoctors.length > 0 ? (

              filteredDoctors.map((doctor) => (
                <DoctorRow
                  key={doctor.id}
                  doctor={doctor}
                />
              ))

            ) : (

              <div className="flex flex-col items-center justify-center py-20">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#eaf5f2] text-[10px] font-bold text-[#0f766e]">
                  DR
                </div>

                <p className="text-[10px] font-semibold text-[#596963]">
                  No doctors found
                </p>

                <p className="mt-1 text-[8px] text-[#9aa5a1]">
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* PAGINATION */}
        {filteredDoctors.length > 0 && (

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
                className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e6ece9] text-[10px] text-[#c0c8c5]"
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

      {/* BOTTOM INFO */}
      <div className="mt-5 grid grid-cols-3 gap-4">

        <InfoCard
          icon="VR"
          title="Verification"
          description="Review provider credentials and license information before activating doctors."
        />

        <InfoCard
          icon="SP"
          title="Specializations"
          description="Keep provider specialties organized for appointments and patient routing."
        />

        <InfoCard
          icon="AC"
          title="Access Control"
          description="Doctor permissions are managed through their assigned role."
        />

      </div>

    </div>
  );
}

/* =========================================
   DOCTOR ROW
========================================= */

function DoctorRow({ doctor }: { doctor: Doctor }) {
  return (
    <div className="grid grid-cols-[1.65fr_1.1fr_1fr_0.8fr_0.75fr_0.8fr_0.8fr_45px] items-center border-b border-[#edf2f0] px-5 py-3.5 last:border-0 hover:bg-[#fafcfb]">

      {/* DOCTOR */}
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f5f1] text-[7px] font-bold text-[#0f766e]">
          {doctor.initials}
        </div>

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <Link
              href={`/admin/doctors/${doctor.id}`}
              className="truncate text-[9px] font-semibold text-[#52615c] hover:text-[#0f766e]"
            >
              {doctor.name}
            </Link>

            {doctor.status === "Active" && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#35a878]" />
            )}

          </div>

          <p className="mt-1 truncate text-[7px] text-[#9aa5a1]">
            {doctor.email}
          </p>

          <p className="mt-0.5 font-mono text-[6px] text-[#b0b9b5]">
            {doctor.id}
          </p>

        </div>

      </div>

      {/* SPECIALIZATION */}
      <span className="w-fit rounded-[7px] bg-[#f1f5f3] px-2 py-1.5 text-[7px] font-semibold text-[#687771]">
        {doctor.specialization}
      </span>

      {/* DEPARTMENT */}
      <p className="text-[8px] text-[#687771]">
        {doctor.department}
      </p>

      {/* EXPERIENCE */}
      <p className="text-[8px] font-medium text-[#687771]">
        {doctor.experience}
      </p>

      {/* PATIENTS */}
      <p className="text-[9px] font-semibold text-[#596963]">
        {doctor.patients}
      </p>

      {/* APPOINTMENTS */}
      <p className="text-[9px] font-semibold text-[#596963]">
        {doctor.appointments}
      </p>

      {/* STATUS */}
      <StatusBadge status={doctor.status} />

      {/* MENU */}
      <button className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[14px] text-[#9da8a4] hover:bg-[#edf5f2] hover:text-[#0f766e]">
        ⋮
      </button>

    </div>
  );
}

/* =========================================
   SUMMARY CARD
========================================= */

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

/* =========================================
   STATUS
========================================= */

function StatusBadge({
  status,
}: {
  status: DoctorStatus;
}) {
  const styles = {
    Active: {
      wrapper: "bg-[#e8f6f0] text-[#278460]",
      dot: "bg-[#35a878]",
    },
    Pending: {
      wrapper: "bg-[#fff5df] text-[#a2733f]",
      dot: "bg-[#d6a64d]",
    },
    Inactive: {
      wrapper: "bg-[#f1f3f2] text-[#7e8985]",
      dot: "bg-[#a5aeaa]",
    },
  };

  const style = styles[status];

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[7px] font-semibold ${style.wrapper}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
      />

      {status}
    </span>
  );
}

/* =========================================
   INFO CARD
========================================= */

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
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

/* =========================================
   TABLE HEAD
========================================= */

function TableHead({ text }: { text: string }) {
  return (
    <span className="text-[7px] font-semibold tracking-[0.1em] text-[#9aa5a1]">
      {text}
    </span>
  );
}