"use client";

import { useState } from "react";
import Link from "next/link";

const medications = [
  {
    id: "MED-1001",
    name: "Lisinopril",
    generic: "Lisinopril",
    strength: "10 mg",
    form: "Tablet",
    category: "Antihypertensive",
    route: "Oral",
    status: "Active",
    patients: 48,
    updated: "Aug 08, 2026",
  },
  {
    id: "MED-1002",
    name: "Amlodipine",
    generic: "Amlodipine Besylate",
    strength: "5 mg",
    form: "Tablet",
    category: "Calcium Channel Blocker",
    route: "Oral",
    status: "Active",
    patients: 36,
    updated: "Aug 07, 2026",
  },
  {
    id: "MED-1003",
    name: "Atorvastatin",
    generic: "Atorvastatin Calcium",
    strength: "20 mg",
    form: "Tablet",
    category: "Statin",
    route: "Oral",
    status: "Active",
    patients: 29,
    updated: "Aug 06, 2026",
  },
  {
    id: "MED-1004",
    name: "Metformin",
    generic: "Metformin Hydrochloride",
    strength: "500 mg",
    form: "Tablet",
    category: "Antidiabetic",
    route: "Oral",
    status: "Active",
    patients: 62,
    updated: "Aug 05, 2026",
  },
  {
    id: "MED-1005",
    name: "Amoxicillin",
    generic: "Amoxicillin",
    strength: "500 mg",
    form: "Capsule",
    category: "Antibiotic",
    route: "Oral",
    status: "Inactive",
    patients: 8,
    updated: "Aug 02, 2026",
  },
  {
    id: "MED-1006",
    name: "Levothyroxine",
    generic: "Levothyroxine Sodium",
    strength: "50 mcg",
    form: "Tablet",
    category: "Thyroid",
    route: "Oral",
    status: "Active",
    patients: 24,
    updated: "Aug 01, 2026",
  },
];

const categories = [
  "All Categories",
  "Antihypertensive",
  "Antidiabetic",
  "Antibiotic",
  "Statin",
  "Thyroid",
];

export default function MedicationsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All");

  const filteredMedications = medications.filter((medication) => {
    const searchMatch =
      medication.name.toLowerCase().includes(search.toLowerCase()) ||
      medication.generic.toLowerCase().includes(search.toLowerCase()) ||
      medication.id.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All Categories" ||
      medication.category === category;

    const statusMatch =
      status === "All" ||
      medication.status === status;

    return searchMatch && categoryMatch && statusMatch;
  });

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* HEADER */}
      <div className="mb-6 flex items-end justify-between">

        <div>

          <div className="mb-1 flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-[#0f766e]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#899691]">
              Clinical Management
            </p>

          </div>

          <h1 className="text-[26px] font-semibold tracking-[-0.035em] text-[#172522]">
            Medications
          </h1>

          <p className="mt-1.5 text-[12px] text-[#8a9793]">
            Manage medications, prescriptions and treatment information.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-[10px] bg-[#0f766e] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0b665f]">

          <span className="text-[16px]">
            +
          </span>

          Add Medication

        </button>

      </div>

      {/* SUMMARY */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Medications"
          value="128"
          description="Available medications"
          icon="Rx"
        />

        <SummaryCard
          label="Active"
          value="116"
          description="Currently active"
          icon="✓"
        />

        <SummaryCard
          label="Categories"
          value="24"
          description="Medication categories"
          icon="▦"
        />

        <SummaryCard
          label="Prescribed"
          value="207"
          description="Active prescriptions"
          icon="◉"
        />

      </div>

      {/* MAIN CARD */}
      <section className="overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        {/* TOOLBAR */}
        <div className="border-b border-[#edf2f0] px-6 py-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              {/* SEARCH */}
              <div className="flex h-9 w-[260px] items-center gap-2 rounded-[9px] border border-[#e1e9e5] bg-[#fbfcfc] px-3">

                <span className="text-[14px] text-[#9aa5a1]">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search medication..."
                  className="w-full bg-transparent text-[10px] text-[#52615c] outline-none placeholder:text-[#a5afab]"
                />

              </div>

              {/* CATEGORY */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-9 rounded-[9px] border border-[#e1e9e5] bg-white px-3 text-[9px] font-semibold text-[#697772] outline-none"
              >

                {categories.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}

              </select>

              {/* STATUS */}
              <div className="flex items-center gap-1 rounded-[9px] bg-[#f3f6f5] p-1">

                {["All", "Active", "Inactive"].map((item) => (

                  <button
                    key={item}
                    onClick={() => setStatus(item)}
                    className={`rounded-[7px] px-3 py-1.5 text-[8px] font-semibold transition ${
                      status === item
                        ? "bg-white text-[#0f766e] shadow-sm"
                        : "text-[#899691]"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            <button className="flex h-9 items-center gap-2 rounded-[9px] border border-[#e1e9e5] px-3 text-[9px] font-semibold text-[#697772] hover:bg-[#f7faf9]">
              ↓ Export
            </button>

          </div>

        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[1.5fr_1.3fr_0.8fr_1.1fr_0.8fr_0.8fr_45px] items-center border-b border-[#edf2f0] bg-[#fafcfb] px-6 py-3">

          <TableHead text="MEDICATION" />

          <TableHead text="CATEGORY" />

          <TableHead text="FORM" />

          <TableHead text="ROUTE" />

          <TableHead text="PATIENTS" />

          <TableHead text="STATUS" />

          <div />

        </div>

        {/* ROWS */}
        {filteredMedications.map((medication) => (

          <Link
            href={`/medications/${medication.id}`}
            key={medication.id}
            className="group grid grid-cols-[1.5fr_1.3fr_0.8fr_1.1fr_0.8fr_0.8fr_45px] items-center border-b border-[#edf2f0] px-6 py-4 transition hover:bg-[#f8fbfa]"
          >

            {/* MEDICATION */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e7f5f1] text-[11px] font-bold text-[#0f766e]">
                Rx
              </div>

              <div>

                <p className="text-[11px] font-semibold text-[#35453f]">
                  {medication.name}
                </p>

                <p className="mt-1 text-[8px] text-[#9aa5a1]">
                  {medication.generic}
                </p>

                <p className="mt-1 text-[8px] text-[#a7b0ac]">
                  {medication.id} • {medication.strength}
                </p>

              </div>

            </div>

            {/* CATEGORY */}
            <div>

              <span className="rounded-full bg-[#f1f5f3] px-2.5 py-1 text-[8px] font-medium text-[#687771]">
                {medication.category}
              </span>

            </div>

            {/* FORM */}
            <p className="text-[9px] font-medium text-[#687771]">
              {medication.form}
            </p>

            {/* ROUTE */}
            <p className="text-[9px] font-medium text-[#687771]">
              {medication.route}
            </p>

            {/* PATIENTS */}
            <div>

              <p className="text-[11px] font-semibold text-[#52615c]">
                {medication.patients}
              </p>

              <p className="mt-1 text-[7px] text-[#a0aaa6]">
                patients
              </p>

            </div>

            {/* STATUS */}
            <StatusBadge status={medication.status} />

            {/* ARROW */}
            <div className="flex justify-end">

              <span className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[14px] text-[#a0aaa6] transition group-hover:bg-[#e9f5f2] group-hover:text-[#0f766e]">
                →
              </span>

            </div>

          </Link>

        ))}

        {filteredMedications.length === 0 && (

          <div className="flex flex-col items-center justify-center py-16">

            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf6f3] text-[#0f766e]">
              Rx
            </div>

            <p className="text-[12px] font-semibold text-[#52615c]">
              No medications found
            </p>

            <p className="mt-1 text-[9px] text-[#9aa5a1]">
              Try changing your search or filters.
            </p>

          </div>

        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between bg-[#fafcfb] px-6 py-3">

          <p className="text-[9px] text-[#98a49f]">

            Showing{" "}

            <span className="font-semibold text-[#64736d]">
              {filteredMedications.length}
            </span>{" "}

            of 128 medications

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

function SummaryCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#e4ebe8] bg-white p-5 shadow-[0_4px_18px_rgba(30,60,52,0.025)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(30,60,52,0.07)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8b9893]">
            {label}
          </p>

          <p className="mt-4 text-[26px] font-semibold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#e5f5f1] text-[11px] font-bold text-[#0f766e]">
          {icon}
        </span>

      </div>

      <p className="mt-1 text-[10px] text-[#9aa5a1]">
        {description}
      </p>

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "Inactive") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f2f3f3] px-2.5 py-1 text-[8px] font-semibold text-[#8a9390]">

        <span className="h-1.5 w-1.5 rounded-full bg-[#9ca5a2]" />

        Inactive

      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[8px] font-semibold text-[#278460]">

      <span className="h-1.5 w-1.5 rounded-full bg-[#35a878]" />

      Active

    </span>
  );
}

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