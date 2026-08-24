"use client";

import { useState } from "react";
import {
  LayoutList,
  Check,
  Pencil,
  Clock,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  type LucideIcon,
} from "lucide-react";

const notes = [
  {
    patient: "Robert Johnson",
    initials: "RJ",
    mrn: "MRN-10241",
    noteType: "Progress Note",
    complaint: "Follow-up for hypertension",
    provider: "Dr. John",
    date: "Aug 08, 2026",
    time: "10:42 AM",
    status: "Signed",
  },
  {
    patient: "Sarah Williams",
    initials: "SW",
    mrn: "MRN-10256",
    noteType: "SOAP Note",
    complaint: "Headache and dizziness",
    provider: "Dr. John",
    date: "Aug 08, 2026",
    time: "09:35 AM",
    status: "Draft",
  },
  {
    patient: "Michael Brown",
    initials: "MB",
    mrn: "MRN-10301",
    noteType: "Progress Note",
    complaint: "Diabetes follow-up",
    provider: "Dr. Emily",
    date: "Aug 07, 2026",
    time: "03:20 PM",
    status: "Signed",
  },
  {
    patient: "Emily Davis",
    initials: "ED",
    mrn: "MRN-10312",
    noteType: "Initial Assessment",
    complaint: "New patient consultation",
    provider: "Dr. John",
    date: "Aug 07, 2026",
    time: "11:15 AM",
    status: "Signed",
  },
  {
    patient: "David Wilson",
    initials: "DW",
    mrn: "MRN-10325",
    noteType: "Progress Note",
    complaint: "Medication review",
    provider: "Dr. Emily",
    date: "Aug 06, 2026",
    time: "02:40 PM",
    status: "Signed",
  },
  {
    patient: "James Anderson",
    initials: "JA",
    mrn: "MRN-10341",
    noteType: "SOAP Note",
    complaint: "Back pain follow-up",
    provider: "Dr. John",
    date: "Aug 06, 2026",
    time: "11:20 AM",
    status: "Draft",
  },
];

const filters = ["All Notes", "Signed", "Draft"];

export default function ClinicalNotesPage() {
  const [activeFilter, setActiveFilter] = useState("All Notes");
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) => {
    const filterMatch =
      activeFilter === "All Notes" || note.status === activeFilter;

    const searchMatch =
      note.patient.toLowerCase().includes(search.toLowerCase()) ||
      note.mrn.toLowerCase().includes(search.toLowerCase()) ||
      note.complaint.toLowerCase().includes(search.toLowerCase());

    return filterMatch && searchMatch;
  });

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* PAGE HEADER */}
      <div className="mb-6 flex items-end justify-between">

        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f766e]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#899691]">
              Clinical Documentation
            </p>
          </div>

          <h1 className="text-[26px] font-semibold tracking-[-0.035em] text-[#172522]">
            Clinical Notes
          </h1>

          <p className="mt-1.5 text-[12px] text-[#8a9793]">
            Review and manage patient clinical documentation.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-[10px] bg-[#0f766e] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0b665f]">
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          New Clinical Note
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Notes"
          value="128"
          description="All clinical notes"
          icon={LayoutList}
          type="teal"
        />

        <SummaryCard
          label="Signed"
          value="112"
          description="Completed documentation"
          icon={Check}
          type="green"
        />

        <SummaryCard
          label="Drafts"
          value="16"
          description="Pending completion"
          icon={Pencil}
          type="orange"
        />

        <SummaryCard
          label="Today's Notes"
          value="08"
          description="Created today"
          icon={Clock}
          type="blue"
        />

      </div>

      {/* MAIN CARD */}
      <section className="overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        {/* TOOLBAR */}
        <div className="border-b border-[#edf1ef] px-6 py-4">

          <div className="flex items-center justify-between">

            {/* FILTER */}
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

            {/* SEARCH + FILTER */}
            <div className="flex items-center gap-2">

              <div className="flex h-9 w-[250px] items-center gap-2 rounded-[9px] border border-[#e1e9e5] bg-[#fbfcfc] px-3">

                <Search className="h-3.5 w-3.5 text-[#9aa5a1]" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patient or note..."
                  className="w-full bg-transparent text-[10px] text-[#52615c] outline-none placeholder:text-[#a5afab]"
                />

              </div>

              <button className="flex h-9 items-center gap-2 rounded-[9px] border border-[#e1e9e5] px-3 text-[9px] font-semibold text-[#75827d] transition hover:bg-[#f7faf9] hover:text-[#0f766e]">
                <SlidersHorizontal className="h-3 w-3" /> Filter
              </button>

              <button className="flex h-9 items-center gap-2 rounded-[9px] border border-[#e1e9e5] px-3 text-[9px] font-semibold text-[#75827d] transition hover:bg-[#f7faf9] hover:text-[#0f766e]">
                <ArrowUpDown className="h-3 w-3" /> Sort
              </button>

            </div>

          </div>

        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[2fr_1.3fr_1.2fr_1fr_0.9fr_45px] items-center border-b border-[#edf2f0] bg-[#fafcfb] px-6 py-3">

          <TableHead text="PATIENT" />
          <TableHead text="NOTE TYPE" />
          <TableHead text="PROVIDER" />
          <TableHead text="DATE" />
          <TableHead text="STATUS" />
          <div />

        </div>

        {/* TABLE ROWS */}
        <div>

          {filteredNotes.map((note) => (
            <ClinicalNoteRow
              key={`${note.patient}-${note.date}-${note.time}`}
              note={note}
            />
          ))}

          {filteredNotes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf6f3] text-[#0f766e]">
                <Search className="h-4 w-4" />
              </div>

              <p className="text-[12px] font-semibold text-[#52615c]">
                No clinical notes found
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
              {filteredNotes.length}
            </span>{" "}
            of 128 notes
          </p>

          <div className="flex items-center gap-1">

            <button className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#e1e8e5] text-[10px] text-[#a0aaa6]">
              <ChevronLeft className="h-3.5 w-3.5" />
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
              <ChevronRight className="h-3.5 w-3.5" />
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
  icon: Icon,
  type,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
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
          className={`flex h-8 w-8 items-center justify-center rounded-[9px] ${iconStyles[type]}`}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>

      </div>

      <p className="mt-1 text-[10px] text-[#9aa5a1]">
        {description}
      </p>

    </div>
  );
}

/* =========================
   TABLE ROW
========================= */

function ClinicalNoteRow({
  note,
}: {
  note: (typeof notes)[number];
}) {
  return (
    <div className="group grid cursor-pointer grid-cols-[2fr_1.3fr_1.2fr_1fr_0.9fr_45px] items-center border-b border-[#edf2f0] px-6 py-4 transition hover:bg-[#f8fbfa]">

      {/* PATIENT */}
      <div className="flex items-center gap-3">

        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e2f3ef] to-[#cceae3] text-[10px] font-bold text-[#0f766e]">

          {note.initials}

          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#49b987]" />

        </div>

        <div>

          <p className="text-[11px] font-semibold text-[#35453f]">
            {note.patient}
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            {note.mrn}
          </p>

        </div>

      </div>

      {/* NOTE TYPE */}
      <div>

        <p className="text-[10px] font-semibold text-[#52615c]">
          {note.noteType}
        </p>

        <p className="mt-1 max-w-[170px] truncate text-[8px] text-[#9aa5a1]">
          {note.complaint}
        </p>

      </div>

      {/* PROVIDER */}
      <div>

        <p className="text-[10px] font-medium text-[#667570]">
          {note.provider}
        </p>

        <p className="mt-1 text-[8px] text-[#a0aaa6]">
          Physician
        </p>

      </div>

      {/* DATE */}
      <div>

        <p className="text-[10px] font-medium text-[#596963]">
          {note.date}
        </p>

        <p className="mt-1 text-[8px] text-[#a0aaa6]">
          {note.time}
        </p>

      </div>

      {/* STATUS */}
      <div>
        <StatusBadge status={note.status} />
      </div>

      {/* ACTION */}
      <div className="flex justify-end">

        <button className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[14px] text-[#a0aaa6] transition hover:bg-[#e9f5f2] hover:text-[#0f766e]">
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

      </div>

    </div>
  );
}

/* =========================
   STATUS
========================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
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
      Signed
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