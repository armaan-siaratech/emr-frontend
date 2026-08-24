"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PatientStatus = "Active" | "Inactive" | "Pending";

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  doctor: string;
  doctorInitials: string;
  insurance: string;
  lastVisit: string;
  registered: string;
  status: PatientStatus;
  initials: string;
};

const patients: Patient[] = [
  {
    id: "PT-20481",
    name: "Olivia Bennett",
    email: "olivia.bennett@email.com",
    phone: "+1 (555) 281-4102",
    dob: "May 14, 1982",
    gender: "Female",
    doctor: "Dr. Sarah Mitchell",
    doctorInitials: "SM",
    insurance: "Blue Cross",
    lastVisit: "Aug 07, 2026",
    registered: "Jan 18, 2025",
    status: "Active",
    initials: "OB",
  },
  {
    id: "PT-20482",
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 392-1842",
    dob: "September 21, 1975",
    gender: "Male",
    doctor: "Dr. Michael Anderson",
    doctorInitials: "MA",
    insurance: "Aetna",
    lastVisit: "Aug 06, 2026",
    registered: "Feb 03, 2025",
    status: "Active",
    initials: "JW",
  },
  {
    id: "PT-20483",
    name: "Emma Richardson",
    email: "emma.richardson@email.com",
    phone: "+1 (555) 184-7219",
    dob: "January 08, 1991",
    gender: "Female",
    doctor: "Dr. Emily Carter",
    doctorInitials: "EC",
    insurance: "UnitedHealth",
    lastVisit: "Aug 05, 2026",
    registered: "Mar 12, 2025",
    status: "Active",
    initials: "ER",
  },
  {
    id: "PT-20484",
    name: "William Parker",
    email: "william.parker@email.com",
    phone: "+1 (555) 728-1934",
    dob: "November 03, 1968",
    gender: "Male",
    doctor: "Dr. Robert Harris",
    doctorInitials: "RH",
    insurance: "Medicare",
    lastVisit: "Aug 04, 2026",
    registered: "Apr 09, 2025",
    status: "Active",
    initials: "WP",
  },
  {
    id: "PT-20485",
    name: "Sophia Adams",
    email: "sophia.adams@email.com",
    phone: "+1 (555) 614-2831",
    dob: "June 25, 1988",
    gender: "Female",
    doctor: "Dr. Jessica Williams",
    doctorInitials: "JW",
    insurance: "Cigna",
    lastVisit: "Aug 02, 2026",
    registered: "May 21, 2025",
    status: "Active",
    initials: "SA",
  },
  {
    id: "PT-20486",
    name: "Henry Cooper",
    email: "henry.cooper@email.com",
    phone: "+1 (555) 431-7620",
    dob: "February 17, 1959",
    gender: "Male",
    doctor: "Dr. Sarah Mitchell",
    doctorInitials: "SM",
    insurance: "Medicare",
    lastVisit: "Jul 29, 2026",
    registered: "Jun 15, 2025",
    status: "Active",
    initials: "HC",
  },
  {
    id: "PT-20487",
    name: "Ava Thompson",
    email: "ava.thompson@email.com",
    phone: "+1 (555) 582-3917",
    dob: "October 12, 1996",
    gender: "Female",
    doctor: "Dr. Emily Carter",
    doctorInitials: "EC",
    insurance: "Aetna",
    lastVisit: "Jul 25, 2026",
    registered: "Jul 02, 2025",
    status: "Pending",
    initials: "AT",
  },
  {
    id: "PT-20488",
    name: "Noah Martin",
    email: "noah.martin@email.com",
    phone: "+1 (555) 391-6284",
    dob: "April 06, 1972",
    gender: "Male",
    doctor: "Dr. Christopher Lee",
    doctorInitials: "CL",
    insurance: "UnitedHealth",
    lastVisit: "Jul 18, 2026",
    registered: "Aug 14, 2025",
    status: "Inactive",
    initials: "NM",
  },
];

export default function AdminPatientsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [gender, setGender] = useState("All Gender");
  const [insurance, setInsurance] = useState("All Insurance");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const query = search.toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query);

      const matchesStatus =
        status === "All Status" ||
        patient.status === status;

      const matchesGender =
        gender === "All Gender" ||
        patient.gender === gender;

      const matchesInsurance =
        insurance === "All Insurance" ||
        patient.insurance === insurance;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesGender &&
        matchesInsurance
      );
    });
  }, [search, status, gender, insurance]);

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const pendingPatients = patients.filter(
    (patient) => patient.status === "Pending"
  ).length;

  const inactivePatients = patients.filter(
    (patient) => patient.status === "Inactive"
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
              Patients
            </span>

          </div>

          <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#172522]">
            Patients
          </h1>

          <p className="mt-1.5 text-[10px] text-[#8a9793]">
            Manage patient records, assignments, insurance and account status.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]">
            Export
          </button>

          <button className="flex items-center gap-2 rounded-[9px] bg-[#0f766e] px-4 py-2.5 text-[9px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.15)] hover:bg-[#0b665f]">
            <span className="text-[14px]">+</span>
            Add Patient
          </button>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Patients"
          value={patients.length.toString()}
          description="Registered in system"
          icon="PT"
        />

        <SummaryCard
          label="Active Patients"
          value={activePatients.toString()}
          description="Currently active"
          icon="AC"
          positive
        />

        <SummaryCard
          label="Pending"
          value={pendingPatients.toString()}
          description="Require attention"
          icon="PN"
          warning
        />

        <SummaryCard
          label="Inactive"
          value={inactivePatients.toString()}
          description="Currently inactive"
          icon="IN"
        />

      </div>

      {/* TABLE */}
      <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

        {/* FILTERS */}
        <div className="border-b border-[#edf2f0] p-5">

          <div className="flex items-center gap-3">

            <div className="relative flex-1">

              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ba7a2]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient, ID, email or phone..."
                className="h-10 w-full rounded-[9px] border border-[#dfe8e4] bg-[#fbfcfc] pl-9 pr-3 text-[9px] text-[#596963] outline-none placeholder:text-[#a5afab] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/10"
              />

            </div>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="h-10 w-[125px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Gender</option>
              <option>Female</option>
              <option>Male</option>
            </select>

            <select
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="h-10 w-[155px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Insurance</option>
              <option>Blue Cross</option>
              <option>Aetna</option>
              <option>UnitedHealth</option>
              <option>Medicare</option>
              <option>Cigna</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 w-[125px] rounded-[9px] border border-[#dfe8e4] bg-white px-3 text-[9px] text-[#687771] outline-none focus:border-[#0f766e]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>

          </div>

        </div>

        {/* RESULT */}
        <div className="flex items-center justify-between border-b border-[#edf2f0] px-5 py-3">

          <p className="text-[8px] text-[#929e99]">

            Showing{" "}

            <span className="font-semibold text-[#596963]">
              {filteredPatients.length}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-[#596963]">
              {patients.length}
            </span>{" "}

            patients

          </p>

          {(search ||
            status !== "All Status" ||
            gender !== "All Gender" ||
            insurance !== "All Insurance") && (

            <button
              onClick={() => {
                setSearch("");
                setStatus("All Status");
                setGender("All Gender");
                setInsurance("All Insurance");
              }}
              className="text-[8px] font-semibold text-[#0f766e] hover:underline"
            >
              Clear filters
            </button>

          )}

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <div className="min-w-[1200px]">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-[1.65fr_0.95fr_1.25fr_1fr_1fr_0.9fr_0.75fr_45px] items-center bg-[#fafcfb] px-5 py-3">

              <TableHead text="PATIENT" />
              <TableHead text="PATIENT ID" />
              <TableHead text="ASSIGNED DOCTOR" />
              <TableHead text="INSURANCE" />
              <TableHead text="LAST VISIT" />
              <TableHead text="REGISTERED" />
              <TableHead text="STATUS" />

              <div />

            </div>

            {/* ROWS */}
            {filteredPatients.length > 0 ? (

              filteredPatients.map((patient) => (
                <PatientRow
                  key={patient.id}
                  patient={patient}
                />
              ))

            ) : (

              <div className="flex flex-col items-center justify-center py-20">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#eaf5f2] text-[10px] font-bold text-[#0f766e]">
                  PT
                </div>

                <p className="text-[10px] font-semibold text-[#596963]">
                  No patients found
                </p>

                <p className="mt-1 text-[8px] text-[#9aa5a1]">
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* PAGINATION */}
        {filteredPatients.length > 0 && (

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

      {/* INFO CARDS */}
      <div className="mt-5 grid grid-cols-3 gap-4">

        <InfoCard
          icon="PH"
          title="Patient Records"
          description="Access patient demographics, contact details and registration information."
        />

        <InfoCard
          icon="DR"
          title="Doctor Assignment"
          description="Track which provider is responsible for each patient's care."
        />

        <InfoCard
          icon="IN"
          title="Insurance"
          description="Keep insurance coverage information visible for administrative workflows."
        />

      </div>

    </div>
  );
}

/* =========================================
   PATIENT ROW
========================================= */

function PatientRow({
  patient,
}: {
  patient: Patient;
}) {
  return (
    <div className="grid grid-cols-[1.65fr_0.95fr_1.25fr_1fr_1fr_0.9fr_0.75fr_45px] items-center border-b border-[#edf2f0] px-5 py-3.5 last:border-0 hover:bg-[#fafcfb]">

      {/* PATIENT */}
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f5f1] text-[7px] font-bold text-[#0f766e]">
          {patient.initials}
        </div>

        <div className="min-w-0">

          <Link
            href={`/admin/patients/${patient.id}`}
            className="block truncate text-[9px] font-semibold text-[#52615c] hover:text-[#0f766e]"
          >
            {patient.name}
          </Link>

          <p className="mt-1 truncate text-[7px] text-[#9aa5a1]">
            {patient.email}
          </p>

          <p className="mt-0.5 text-[7px] text-[#a7b0ad]">
            {patient.phone}
          </p>

        </div>

      </div>

      {/* ID */}
      <span className="font-mono text-[7px] font-semibold text-[#687771]">
        {patient.id}
      </span>

      {/* DOCTOR */}
      <div className="flex items-center gap-2">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#edf4f2] text-[6px] font-bold text-[#668078]">
          {patient.doctorInitials}
        </div>

        <span className="truncate text-[8px] font-medium text-[#687771]">
          {patient.doctor}
        </span>

      </div>

      {/* INSURANCE */}
      <span className="w-fit rounded-[7px] bg-[#f2f5f4] px-2 py-1.5 text-[7px] font-semibold text-[#687771]">
        {patient.insurance}
      </span>

      {/* LAST VISIT */}
      <p className="text-[8px] text-[#687771]">
        {patient.lastVisit}
      </p>

      {/* REGISTERED */}
      <p className="text-[8px] text-[#8a9691]">
        {patient.registered}
      </p>

      {/* STATUS */}
      <StatusBadge status={patient.status} />

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
   STATUS BADGE
========================================= */

function StatusBadge({
  status,
}: {
  status: PatientStatus;
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
   TABLE HEAD
========================================= */

function TableHead({
  text,
}: {
  text: string;
}) {
  return (
    <span className="text-[7px] font-semibold tracking-[0.1em] text-[#9aa5a1]">
      {text}
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