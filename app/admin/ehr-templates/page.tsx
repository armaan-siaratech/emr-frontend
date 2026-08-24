"use client";

import { useMemo, useState } from "react";

type TemplateStatus = "Active" | "Draft" | "Inactive";

type EHRTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  specialty: string;
  sections: number;
  fields: number;
  status: TemplateStatus;
  updated: string;
  updatedBy: string;
};

const templates: EHRTemplate[] = [
  {
    id: "TPL-001",
    name: "General Consultation",
    description: "Standard clinical consultation documentation template",
    category: "Clinical",
    specialty: "General Medicine",
    sections: 8,
    fields: 32,
    status: "Active",
    updated: "Aug 08, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-002",
    name: "Cardiology Follow-up",
    description: "Follow-up documentation for cardiology patients",
    category: "Clinical",
    specialty: "Cardiology",
    sections: 10,
    fields: 46,
    status: "Active",
    updated: "Aug 07, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-003",
    name: "Annual Physical Examination",
    description: "Complete annual physical examination documentation",
    category: "Clinical",
    specialty: "General Medicine",
    sections: 7,
    fields: 38,
    status: "Active",
    updated: "Aug 05, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-004",
    name: "Emergency Visit",
    description: "Emergency department patient assessment template",
    category: "Clinical",
    specialty: "Emergency Medicine",
    sections: 12,
    fields: 58,
    status: "Draft",
    updated: "Aug 04, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-005",
    name: "Orthopedic Assessment",
    description: "Musculoskeletal and orthopedic assessment template",
    category: "Clinical",
    specialty: "Orthopedics",
    sections: 9,
    fields: 41,
    status: "Active",
    updated: "Aug 02, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-006",
    name: "Neurology Consultation",
    description: "Neurological examination and consultation template",
    category: "Clinical",
    specialty: "Neurology",
    sections: 11,
    fields: 52,
    status: "Active",
    updated: "Jul 30, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-007",
    name: "Pediatric Consultation",
    description: "Clinical documentation template for pediatric visits",
    category: "Clinical",
    specialty: "Pediatrics",
    sections: 8,
    fields: 35,
    status: "Inactive",
    updated: "Jul 28, 2026",
    updatedBy: "Admin",
  },
  {
    id: "TPL-008",
    name: "Mental Health Assessment",
    description: "Behavioral and mental health assessment documentation",
    category: "Behavioral Health",
    specialty: "Psychiatry",
    sections: 9,
    fields: 44,
    status: "Draft",
    updated: "Jul 26, 2026",
    updatedBy: "Admin",
  },
];

export default function EHRTemplatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [status, setStatus] = useState("All Status");

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        template.name.toLowerCase().includes(searchText) ||
        template.description.toLowerCase().includes(searchText) ||
        template.specialty.toLowerCase().includes(searchText) ||
        template.id.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" ||
        template.category === category;

      const matchesSpecialty =
        specialty === "All Specialties" ||
        template.specialty === specialty;

      const matchesStatus =
        status === "All Status" ||
        template.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSpecialty &&
        matchesStatus
      );
    });
  }, [search, category, specialty, status]);

  const activeCount = templates.filter(
    (template) => template.status === "Active"
  ).length;

  const draftCount = templates.filter(
    (template) => template.status === "Draft"
  ).length;

  const inactiveCount = templates.filter(
    (template) => template.status === "Inactive"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* Header */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">
        <div className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Admin</span>
              <span>›</span>
              <span className="text-[#0d9b91]">
                EHR Templates
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              EHR Templates
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Create and manage clinical documentation templates
            </p>
          </div>

          <a
            href="/admin/ehr-templates/create"
            className="rounded-[8px] bg-[#0d9b91] px-5 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.15)] transition hover:bg-[#078a81]"
          >
            + Create Template
          </a>

        </div>
      </div>


      {/* Main Content */}
      <div className="px-6 py-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">

          <SummaryCard
            title="Total Templates"
            value={templates.length.toString()}
            subtitle="All templates"
            icon="▤"
          />

          <SummaryCard
            title="Active Templates"
            value={activeCount.toString()}
            subtitle="Currently available"
            icon="✓"
          />

          <SummaryCard
            title="Draft Templates"
            value={draftCount.toString()}
            subtitle="Work in progress"
            icon="◌"
          />

          <SummaryCard
            title="Inactive Templates"
            value={inactiveCount.toString()}
            subtitle="Currently disabled"
            icon="×"
          />

        </div>


        {/* Filters */}
        <div className="mt-6 rounded-[14px] border border-[#dce8e5] bg-white p-5">

          <div className="mb-4">
            <h2 className="text-[12px] font-semibold text-[#172522]">
              Search & Filters
            </h2>

            <p className="mt-1 text-[9px] text-[#929e99]">
              Find templates by name, specialty, category or status
            </p>
          </div>


          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_auto] gap-3">

            {/* Search */}
            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#9aa6a2]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search template..."
                className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] pl-9 pr-3 text-[10px] text-[#53645f] outline-none placeholder:text-[#a8b1ae] focus:border-[#0d9b91]"
              />

            </div>


            {/* Category */}
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
            >
              <option>All Categories</option>
              <option>Clinical</option>
              <option>Behavioral Health</option>
              <option>Administrative</option>
            </select>


            {/* Specialty */}
            <select
              value={specialty}
              onChange={(event) =>
                setSpecialty(event.target.value)
              }
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
            >
              <option>All Specialties</option>
              <option>General Medicine</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Emergency Medicine</option>
              <option>Psychiatry</option>
            </select>


            {/* Status */}
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Inactive</option>
            </select>


            {/* Clear */}
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setSpecialty("All Specialties");
                setStatus("All Status");
              }}
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-white px-4 text-[10px] font-semibold text-[#687771] hover:bg-[#f5f9f7]"
            >
              Clear
            </button>

          </div>

        </div>


        {/* Template Table */}
        <div className="mt-6 overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

            <div>
              <h2 className="text-[14px] font-semibold text-[#172522]">
                Template List
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                {filteredTemplates.length} templates found
              </p>
            </div>

            <button
              type="button"
              className="rounded-[7px] border border-[#dce8e5] px-3 py-2 text-[9px] font-semibold text-[#687771] hover:bg-[#f5f9f7]"
            >
              Export
            </button>

          </div>


          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-[#f7faf9]">

                  <TableHead text="TEMPLATE" />
                  <TableHead text="CATEGORY" />
                  <TableHead text="SPECIALTY" />
                  <TableHead text="STRUCTURE" />
                  <TableHead text="STATUS" />
                  <TableHead text="LAST UPDATED" />
                  <TableHead text="ACTIONS" />

                </tr>
              </thead>


              <tbody>

                {filteredTemplates.map((template) => (

                  <tr
                    key={template.id}
                    className="border-t border-[#edf2f0] transition hover:bg-[#fbfdfc]"
                  >

                    {/* Template */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[14px] font-bold text-[#0d9b91]">
                          ▤
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#53645f]">
                            {template.name}
                          </p>

                          <p className="mt-1 max-w-[250px] text-[8px] leading-4 text-[#9aa6a2]">
                            {template.description}
                          </p>

                          <p className="mt-1 text-[8px] font-medium text-[#0d9b91]">
                            {template.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Category */}
                    <td className="px-5 py-4">

                      <span className="rounded-full bg-[#edf5f3] px-2.5 py-1 text-[8px] font-semibold text-[#536f68]">
                        {template.category}
                      </span>

                    </td>


                    {/* Specialty */}
                    <td className="px-5 py-4">

                      <p className="text-[9px] font-medium text-[#53645f]">
                        {template.specialty}
                      </p>

                    </td>


                    {/* Structure */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-4">

                        <div>
                          <p className="text-[10px] font-semibold text-[#53645f]">
                            {template.sections}
                          </p>

                          <p className="text-[8px] text-[#929e99]">
                            Sections
                          </p>
                        </div>

                        <div className="h-6 w-px bg-[#e4ece9]" />

                        <div>
                          <p className="text-[10px] font-semibold text-[#53645f]">
                            {template.fields}
                          </p>

                          <p className="text-[8px] text-[#929e99]">
                            Fields
                          </p>
                        </div>

                      </div>

                    </td>


                    {/* Status */}
                    <td className="px-5 py-4">

                      <StatusBadge
                        status={template.status}
                      />

                    </td>


                    {/* Updated */}
                    <td className="px-5 py-4">

                      <p className="text-[9px] font-medium text-[#53645f]">
                        {template.updated}
                      </p>

                      <p className="mt-1 text-[8px] text-[#929e99]">
                        by {template.updatedBy}
                      </p>

                    </td>


                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1">

                        <a
                          href={`/admin/ehr-templates/${template.id}`}
                          title="View"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                        >
                          ◉
                        </a>

                        <a
                          href={`/admin/ehr-templates/${template.id}/edit`}
                          title="Edit"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                        >
                          ✎
                        </a>

                        <button
                          type="button"
                          title="Duplicate"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                        >
                          ⧉
                        </button>

                        <button
                          type="button"
                          title="More"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] hover:bg-[#f1f5f3]"
                        >
                          ⋮
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}


                {filteredTemplates.length === 0 && (

                  <tr>

                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >

                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f6f3] text-[18px] text-[#0d9b91]">
                        ▤
                      </div>

                      <p className="mt-4 text-[11px] font-semibold text-[#53645f]">
                        No templates found
                      </p>

                      <p className="mt-1 text-[9px] text-[#929e99]">
                        Try changing your search or filters
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#e4ece9] px-5 py-4">

            <p className="text-[9px] text-[#929e99]">
              Showing{" "}
              <span className="font-semibold text-[#53645f]">
                {filteredTemplates.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#53645f]">
                {templates.length}
              </span>{" "}
              templates
            </p>

            <div className="flex items-center gap-1">

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#a0aaa7]"
              >
                ‹
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#0d9b91] text-[9px] font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[9px] text-[#687771]"
              >
                2
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[9px] text-[#687771]"
              >
                ›
              </button>

            </div>

          </div>

        </div>


        {/* Bottom Info */}
        <div className="mt-5 rounded-[12px] border border-[#dce8e5] bg-white p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[14px] text-[#0d9b91]">
              i
            </div>

            <div>

              <p className="text-[10px] font-semibold text-[#53645f]">
                About EHR Templates
              </p>

              <p className="mt-1 text-[8px] leading-4 text-[#929e99]">
                EHR templates define the structure and fields doctors use
                during clinical documentation and patient encounters.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-[13px] border border-[#dce8e5] bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] font-semibold text-[#71807c]">
            {title}
          </p>

          <p className="mt-2 text-[24px] font-bold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <p className="mt-2 text-[9px] text-[#929e99]">
            {subtitle}
          </p>

        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[14px] font-bold text-[#0d9b91]">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: TemplateStatus;
}) {
  const statusStyles = {
    Active: "bg-[#e8f6f0] text-[#278460]",
    Draft: "bg-[#fff5df] text-[#b47b1d]",
    Inactive: "bg-[#fdecec] text-[#c45c5c]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}


/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({
  text,
}: {
  text: string;
}) {
  return (
    <th className="whitespace-nowrap px-5 py-3 text-left">

      <span className="text-[8px] font-semibold tracking-[0.08em] text-[#929e99]">
        {text}
      </span>

    </th>
  );
}