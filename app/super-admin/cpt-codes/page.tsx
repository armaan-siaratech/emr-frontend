"use client";

import Link from "next/link";
import { useState } from "react";

const cptCodes = [
  {
    id: 1,
    code: "99213",
    description: "Office or other outpatient visit for established patient",
    category: "Evaluation & Management",
    subcategory: "Established Patient",
    fee: "$95.00",
    status: "Active",
    updated: "Aug 08, 2026",
  },
  {
    id: 2,
    code: "99214",
    description: "Office or other outpatient visit for established patient",
    category: "Evaluation & Management",
    subcategory: "Established Patient",
    fee: "$145.00",
    status: "Active",
    updated: "Aug 07, 2026",
  },
  {
    id: 3,
    code: "99203",
    description: "Office or other outpatient visit for new patient",
    category: "Evaluation & Management",
    subcategory: "New Patient",
    fee: "$120.00",
    status: "Active",
    updated: "Aug 06, 2026",
  },
  {
    id: 4,
    code: "80053",
    description: "Comprehensive metabolic panel",
    category: "Laboratory",
    subcategory: "Chemistry",
    fee: "$48.00",
    status: "Active",
    updated: "Aug 05, 2026",
  },
  {
    id: 5,
    code: "85025",
    description: "Complete blood count with automated differential",
    category: "Laboratory",
    subcategory: "Hematology",
    fee: "$32.00",
    status: "Active",
    updated: "Aug 04, 2026",
  },
  {
    id: 6,
    code: "71046",
    description: "Radiologic examination, chest, two views",
    category: "Radiology",
    subcategory: "Diagnostic Imaging",
    fee: "$85.00",
    status: "Active",
    updated: "Aug 03, 2026",
  },
  {
    id: 7,
    code: "93000",
    description: "Electrocardiogram, routine ECG",
    category: "Medicine",
    subcategory: "Cardiovascular",
    fee: "$55.00",
    status: "Active",
    updated: "Aug 02, 2026",
  },
  {
    id: 8,
    code: "36415",
    description: "Collection of venous blood by venipuncture",
    category: "Laboratory",
    subcategory: "Specimen Collection",
    fee: "$18.00",
    status: "Inactive",
    updated: "Jul 30, 2026",
  },
];

export default function CPTPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredCodes = cptCodes.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.code.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || item.status === status;

    const matchesCategory =
      category === "All" || item.category === category;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );
  });

  return (
    <div className="w-full">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <div className="mb-1 flex items-center gap-2">

            <Link
              href="/super-admin"
              className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
            >
              Super Admin
            </Link>

            <span className="text-[10px] text-[#B3BCB8]">
              /
            </span>

            <span className="text-[10px] text-[#5F6F6A]">
              CPT Codes
            </span>

          </div>

          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
            CPT Codes
          </h1>

          <p className="mt-1 text-[11px] text-[#8A9995]">
            Manage procedure and service codes used across the healthcare platform.
          </p>

        </div>

        <Link
          href="/super-admin/cpt/create"
          className="flex items-center gap-2 rounded-[10px] bg-[#0F766E] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#0B625C]"
        >
          <span className="text-[15px]">
            +
          </span>

          Add CPT Code
        </Link>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Codes"
          value="10,482"
          description="All CPT codes"
          icon="⌘"
          tone="mint"
        />

        <SummaryCard
          label="Active Codes"
          value="10,196"
          description="Currently available"
          icon="✓"
          tone="green"
        />

        <SummaryCard
          label="Categories"
          value="18"
          description="Procedure categories"
          icon="◫"
          tone="blue"
        />

        <SummaryCard
          label="Recently Updated"
          value="96"
          description="Updated this month"
          icon="↻"
          tone="orange"
        />

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-[16px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.04)]">

        {/* Filters */}

        <div className="flex items-center justify-between gap-4 border-b border-[#EDF2F0] px-6 py-4">

          <div className="flex flex-1 items-center gap-3">

            {/* Search */}

            <div className="relative w-[330px]">

              <SearchIcon />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search CPT code or description..."
                className="h-10 w-full rounded-[9px] border border-[#DFE8E5] bg-[#FAFCFB] pl-9 pr-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A3AEAA] focus:border-[#77BDB4] focus:ring-2 focus:ring-[#0F766E]/10"
              />

            </div>


            {/* Category */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 rounded-[9px] border border-[#DFE8E5] bg-white px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >
              <option value="All">All Categories</option>
              <option value="Evaluation & Management">
                Evaluation & Management
              </option>
              <option value="Laboratory">
                Laboratory
              </option>
              <option value="Radiology">
                Radiology
              </option>
              <option value="Medicine">
                Medicine
              </option>
              <option value="Surgery">
                Surgery
              </option>
            </select>


            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-[9px] border border-[#DFE8E5] bg-white px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>


          <p className="text-[10px] text-[#8A9995]">

            <span className="font-semibold text-[#53625E]">
              {filteredCodes.length}
            </span>{" "}
            results

          </p>

        </div>


        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1150px]">

            <thead>

              <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB]">

                <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  CPT Code
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Description
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Fee
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Updated
                </th>

                <th className="px-6 py-3 text-right text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCodes.length > 0 ? (

                filteredCodes.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-[#F0F3F2] transition hover:bg-[#F8FBFA]"
                  >

                    {/* CPT Code */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#E7F4F1] text-[9px] font-bold text-[#0F766E]">
                          CPT
                        </div>

                        <div>

                          <p className="text-[11px] font-bold text-[#263833]">
                            {item.code}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#9AA5A1]">
                            CPT / HCPCS
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Description */}

                    <td className="max-w-[350px] px-4 py-4">

                      <p className="text-[10px] font-medium leading-4 text-[#53625E]">
                        {item.description}
                      </p>

                      <p className="mt-1 text-[8px] text-[#9CA7A3]">
                        {item.subcategory}
                      </p>

                    </td>


                    {/* Category */}

                    <td className="px-4 py-4">

                      <span className="rounded-[6px] bg-[#F1F5F4] px-2 py-1 text-[8px] font-medium text-[#667570]">
                        {item.category}
                      </span>

                    </td>


                    {/* Fee */}

                    <td className="px-4 py-4">

                      <span className="text-[10px] font-semibold text-[#465550]">
                        {item.fee}
                      </span>

                    </td>


                    {/* Status */}

                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>


                    {/* Updated */}

                    <td className="px-4 py-4">

                      <span className="text-[9px] text-[#6D7A75]">
                        {item.updated}
                      </span>

                    </td>


                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-1">

                        <Link
                          href={`/super-admin/cpt/${item.id}`}
                          title="View"
                          className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E]"
                        >
                          <EyeIcon />
                        </Link>

                        <Link
                          href={`/super-admin/cpt/${item.id}/edit`}
                          title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E]"
                        >
                          <EditIcon />
                        </Link>

                        <button
                          title="More"
                          className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#71807B] hover:bg-[#F1F4F3]"
                        >
                          <MoreIcon />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-[12px] font-semibold text-[#596964]">
                      No CPT codes found
                    </p>

                    <p className="mt-1 text-[9px] text-[#9AA5A1]">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Footer */}

        <div className="flex items-center justify-between border-t border-[#EDF2F0] px-6 py-3.5">

          <p className="text-[9px] text-[#98A49F]">

            Showing{" "}

            <span className="font-semibold text-[#52615D]">
              1–{filteredCodes.length}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-[#52615D]">
              10,482
            </span>{" "}

            codes

          </p>


          <div className="flex items-center gap-1">

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#A4AEAA]">
              ←
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0F766E] text-[10px] font-semibold text-white">
              1
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#63716D]">
              2
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#63716D]">
              3
            </button>

            <span className="px-1 text-[9px] text-[#A0AAA6]">
              ...
            </span>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#63716D]">
              →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  label,
  value,
  description,
  icon,
  tone,
}: {
  label: string;
  value: string;
  description: string;
  icon: string;
  tone: string;
}) {
  const tones: Record<string, string> = {
    mint: "bg-[#E5F5F1] text-[#0F766E]",
    green: "bg-[#E8F6EF] text-[#2B8A67]",
    blue: "bg-[#EAF3F7] text-[#527B99]",
    orange: "bg-[#FFF0DF] text-[#BD7730]",
  };

  return (
    <div className="rounded-[14px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8B9893]">
            {label}
          </p>

          <p className="mt-3 text-[24px] font-semibold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-[#98A49F]">
            {description}
          </p>

        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-[9px] text-[13px] ${tones[tone]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   STATUS
============================================================ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold ${
        status === "Active"
          ? "bg-[#E7F6EF] text-[#278260]"
          : "bg-[#F0F2F1] text-[#7A8581]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}


/* ============================================================
   ICONS
============================================================ */

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A09B]"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}