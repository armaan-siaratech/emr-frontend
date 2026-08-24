"use client";

import { useState } from "react";
import Link from "next/link";

const encounters = [
  {
    id: "ENC-10021",
    patient: "Robert Johnson",
    initials: "RJ",
    mrn: "MRN-10241",
    type: "Follow-up",
    provider: "Dr. John",
    date: "Aug 08, 2026",
    time: "10:30 AM",
    duration: "28 min",
    status: "Completed",
  },
  {
    id: "ENC-10022",
    patient: "Sarah Williams",
    initials: "SW",
    mrn: "MRN-10256",
    type: "Office Visit",
    provider: "Dr. Emily",
    date: "Aug 08, 2026",
    time: "09:15 AM",
    duration: "35 min",
    status: "In Progress",
  },
  {
    id: "ENC-10023",
    patient: "Michael Brown",
    initials: "MB",
    mrn: "MRN-10301",
    type: "Follow-up",
    provider: "Dr. John",
    date: "Aug 07, 2026",
    time: "03:00 PM",
    duration: "22 min",
    status: "Completed",
  },
  {
    id: "ENC-10024",
    patient: "Emily Davis",
    initials: "ED",
    mrn: "MRN-10312",
    type: "New Patient",
    provider: "Dr. Emily",
    date: "Aug 07, 2026",
    time: "11:00 AM",
    duration: "42 min",
    status: "Completed",
  },
  {
    id: "ENC-10025",
    patient: "David Wilson",
    initials: "DW",
    mrn: "MRN-10325",
    type: "Medication Review",
    provider: "Dr. John",
    date: "Aug 06, 2026",
    time: "02:30 PM",
    duration: "18 min",
    status: "Draft",
  },
];

const filters = ["All", "In Progress", "Completed", "Draft"];

export default function EncountersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEncounters = encounters.filter((encounter) => {
    const filterMatch =
      activeFilter === "All" || encounter.status === activeFilter;

    const searchMatch =
      encounter.patient.toLowerCase().includes(search.toLowerCase()) ||
      encounter.mrn.toLowerCase().includes(search.toLowerCase()) ||
      encounter.id.toLowerCase().includes(search.toLowerCase());

    return filterMatch && searchMatch;
  });

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* HEADER */}
      <div className="mb-6 flex items-end justify-between">

        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f766e]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#899691]">
              Patient Care
            </p>
          </div>

          <h1 className="text-[26px] font-semibold tracking-[-0.035em] text-[#172522]">
            Encounters
          </h1>

          <p className="mt-1.5 text-[12px] text-[#8a9793]">
            Manage patient visits, clinical documentation and care activities.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-[10px] bg-[#0f766e] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0b665f]">
          <span className="text-[16px]">+</span>
          New Encounter
        </button>

      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Encounters"
          value="246"
          description="All patient encounters"
          icon="▤"
          type="teal"
        />

        <SummaryCard
          label="Today"
          value="18"
          description="Scheduled today"
          icon="◷"
          type="blue"
        />

        <SummaryCard
          label="In Progress"
          value="03"
          description="Currently active"
          icon="●"
          type="orange"
        />

        <SummaryCard
          label="Completed"
          value="225"
          description="Completed encounters"
          icon="✓"
          type="green"
        />

      </div>

      {/* TABLE */}
      <section className="overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        {/* TOOLBAR */}
        <div className="border-b border-[#edf1ef] px-6 py-4">

          <div className="flex items-center justify-between">

            {/* FILTERS */}
            <div className="flex items-center gap-1 rounded-[9px] bg-[#f3f6f5] p-1">

              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-[7px] px-3.5 py-2 text-[9px] font-semibold transition ${
                    activeFilter === filter
                      ? "bg-white text-[#0f766e] shadow-sm"
                      : "text-[#899691] hover:text-[#0f766e]"
                  }`}
                >
                  {filter}
                </button>
              ))}

            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-2">

              <div className="flex h-9 w-[250px] items-center gap-2 rounded-[9px] border border-[#e1e9e5] bg-[#fbfcfc] px-3">

                <span className="text-[14px] text-[#9aa5a1]">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patient or encounter..."
                  className="w-full bg-transparent text-[10px] text-[#52615c] outline-none placeholder:text-[#a5afab]"
                />

              </div>

              <button className="flex h-9 items-center gap-2 rounded-[9px] border border-[#e1e9e5] px-3 text-[9px] font-semibold text-[#75827d] transition hover:bg-[#f7faf9] hover:text-[#0f766e]">
                ☷ Filter
              </button>

              <button className="flex h-9 items-center gap-2 rounded-[9px] border border-[#e1e9e5] px-3 text-[9px] font-semibold text-[#75827d] transition hover:bg-[#f7faf9] hover:text-[#0f766e]">
                ↕ Sort
              </button>

            </div>

          </div>

        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[1.8fr_1fr_1.1fr_1fr_0.9fr_0.9fr_45px] items-center border-b border-[#edf2f0] bg-[#fafcfb] px-6 py-3">

          <TableHead text="PATIENT" />
          <TableHead text="ENCOUNTER" />
          <TableHead text="PROVIDER" />
          <TableHead text="DATE & TIME" />
          <TableHead text="DURATION" />
          <TableHead text="STATUS" />
          <div />

        </div>

        {/* ROWS */}
        <div>

          {filteredEncounters.map((encounter) => (
            <EncounterRow
              key={encounter.id}
              encounter={encounter}
            />
          ))}

          {filteredEncounters.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf6f3] text-[#0f766e]">
                ⌕
              </div>

              <p className="text-[12px] font-semibold text-[#52615c]">
                No encounters found
              </p>

              <p className="mt-1 text-[9px] text-[#9aa5a1]">
                Try changing your search or filter.
              </p>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-[#edf2f0] bg-[#fafcfb] px-6 py-3">

          <p className="text-[9px] text-[#98a49f]">
            Showing{" "}
            <span className="font-semibold text-[#64736d]">
              {filteredEncounters.length}
            </span>{" "}
            of 246 encounters
          </p>

          <div className="flex items-center gap-1">

            <button className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e1e8e5] text-[10px] text-[#a0aaa6]">
              ‹
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#0f766e] text-[9px] font-semibold text-white">
              1
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e1e8e5] text-[9px] text-[#697772]">
              2
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e1e8e5] text-[9px] text-[#697772]">
              3
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e1e8e5] text-[10px] text-[#697772]">
              ›
            </button>

          </div>

        </div>

      </section>

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
  type,
}: {
  label: string;
  value: string;
  description: string;
  icon: string;
  type: "teal" | "green" | "orange" | "blue";
}) {
  const iconStyles = {
    teal: "bg-[#e5f5f1] text-[#0f766e]",
    green: "bg-[#eaf6f0] text-[#2c8968]",
    orange: "bg-[#fff3e5] text-[#bd7730]",
    blue: "bg-[#edf4f8] text-[#557e9d]",
  };

  return (
    <div className="group rounded-[16px] border border-[#e4ebe8] bg-white p-5 shadow-[0_4px_18px_rgba(30,60,52,0.025)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(30,60,52,0.07)]">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8b9893]">
            {label}
          </p>

          <p className="mt-4 text-[26px] font-semibold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>
        </div>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[13px] ${iconStyles[type]}`}
        >
          {icon}
        </span>

      </div>

      <p className="mt-1 text-[10px] text-[#9aa5a1]">
        {description}
      </p>

    </div>
  );
}

/* =========================
   ENCOUNTER ROW
========================= */

function EncounterRow({
  encounter,
}: {
  encounter: (typeof encounters)[number];
}) {
  return (
    <Link
      href={`/encounters/${encounter.id}`}
      className="group grid grid-cols-[1.8fr_1fr_1.1fr_1fr_0.9fr_0.9fr_45px] items-center border-b border-[#edf2f0] px-6 py-4 transition hover:bg-[#f8fbfa]"
    >

      {/* PATIENT */}
      <div className="flex items-center gap-3">

        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e2f3ef] to-[#cceae3] text-[10px] font-bold text-[#0f766e]">

          {encounter.initials}

          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#49b987]" />

        </div>

        <div>

          <p className="text-[11px] font-semibold text-[#35453f]">
            {encounter.patient}
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            {encounter.mrn}
          </p>

        </div>

      </div>

      {/* ENCOUNTER TYPE */}
      <div>

        <p className="text-[10px] font-semibold text-[#52615c]">
          {encounter.type}
        </p>

        <p className="mt-1 text-[8px] text-[#9aa5a1]">
          {encounter.id}
        </p>

      </div>

      {/* PROVIDER */}
      <div>

        <p className="text-[10px] font-medium text-[#667570]">
          {encounter.provider}
        </p>

        <p className="mt-1 text-[8px] text-[#a0aaa6]">
          Physician
        </p>

      </div>

      {/* DATE */}
      <div>

        <p className="text-[10px] font-medium text-[#596963]">
          {encounter.date}
        </p>

        <p className="mt-1 text-[8px] text-[#a0aaa6]">
          {encounter.time}
        </p>

      </div>

      {/* DURATION */}
      <div>

        <p className="text-[10px] font-medium text-[#596963]">
          {encounter.duration}
        </p>

      </div>

      {/* STATUS */}
      <div>
        <StatusBadge status={encounter.status} />
      </div>

      {/* ARROW */}
      <div className="flex justify-end">

        <span className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[14px] text-[#a0aaa6] transition group-hover:bg-[#e9f5f2] group-hover:text-[#0f766e]">
          →
        </span>

      </div>

    </Link>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "In Progress") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3f8] px-2.5 py-1 text-[8px] font-semibold text-[#557e9d]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#557e9d]" />
        In Progress
      </span>
    );
  }

  if (status === "Draft") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff3e5] px-2.5 py-1 text-[8px] font-semibold text-[#bd7730]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d69348]" />
        Draft
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[8px] font-semibold text-[#278460]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#35a878]" />
      Completed
    </span>
  );
}

/* =========================
   TABLE HEAD
========================= */

function TableHead({
  text,
}: {
  text: string;
}) {
  return (
    <span className="text-[8px] font-semibold tracking-[0.1em] text-[#9aa5a1]">
      {text}
    </span>
  );
}