"use client";

import Link from "next/link";
import { useState } from "react";

const icdCodes = [
  {
    id: 1,
    code: "E11.9",
    description: "Type 2 diabetes mellitus without complications",
    category: "Endocrine",
    subcategory: "Diabetes Mellitus",
    billable: true,
    status: "Active",
    updated: "Aug 08, 2026",
  },
  {
    id: 2,
    code: "I10",
    description: "Essential (primary) hypertension",
    category: "Circulatory",
    subcategory: "Hypertensive Diseases",
    billable: true,
    status: "Active",
    updated: "Aug 07, 2026",
  },
  {
    id: 3,
    code: "J06.9",
    description: "Acute upper respiratory infection, unspecified",
    category: "Respiratory",
    subcategory: "Acute Respiratory Infections",
    billable: true,
    status: "Active",
    updated: "Aug 06, 2026",
  },
  {
    id: 4,
    code: "M54.50",
    description: "Low back pain, unspecified",
    category: "Musculoskeletal",
    subcategory: "Dorsalgia",
    billable: true,
    status: "Active",
    updated: "Aug 05, 2026",
  },
  {
    id: 5,
    code: "R51.9",
    description: "Headache, unspecified",
    category: "Symptoms",
    subcategory: "Neurological Symptoms",
    billable: true,
    status: "Active",
    updated: "Aug 04, 2026",
  },
  {
    id: 6,
    code: "E78.5",
    description: "Hyperlipidemia, unspecified",
    category: "Endocrine",
    subcategory: "Metabolic Disorders",
    billable: true,
    status: "Inactive",
    updated: "Aug 02, 2026",
  },
  {
    id: 7,
    code: "J18.9",
    description: "Pneumonia, unspecified organism",
    category: "Respiratory",
    subcategory: "Pneumonia",
    billable: true,
    status: "Active",
    updated: "Jul 30, 2026",
  },
  {
    id: 8,
    code: "N18.30",
    description: "Chronic kidney disease, stage 3 unspecified",
    category: "Genitourinary",
    subcategory: "Chronic Kidney Disease",
    billable: true,
    status: "Active",
    updated: "Jul 28, 2026",
  },
];

export default function ICD10Page() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredCodes = icdCodes.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
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
              ICD-10 Codes
            </span>

          </div>

          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
            ICD-10 Codes
          </h1>

          <p className="mt-1 text-[11px] text-[#8A9995]">
            Manage diagnosis codes used across the healthcare platform.
          </p>

        </div>


        <Link
          href="/super-admin/icd10/create"
          className="flex items-center gap-2 rounded-[10px] bg-[#0F766E] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#0B625C]"
        >
          <span className="text-[15px]">
            +
          </span>

          Add ICD-10 Code
        </Link>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Codes"
          value="72,481"
          description="All ICD-10 codes"
          icon="⌘"
          tone="mint"
        />

        <SummaryCard
          label="Active Codes"
          value="71,926"
          description="Currently available"
          icon="✓"
          tone="green"
        />

        <SummaryCard
          label="Categories"
          value="22"
          description="Diagnosis categories"
          icon="◫"
          tone="blue"
        />

        <SummaryCard
          label="Recently Updated"
          value="184"
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
                placeholder="Search code or description..."
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
              <option value="Endocrine">Endocrine</option>
              <option value="Circulatory">Circulatory</option>
              <option value="Respiratory">Respiratory</option>
              <option value="Musculoskeletal">Musculoskeletal</option>
              <option value="Symptoms">Symptoms</option>
              <option value="Genitourinary">Genitourinary</option>
            </select>


            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-[9px] border border-[#DFE8E5] bg-white px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB]">

                <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  ICD-10 Code
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Description
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Billable
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

              {filteredCodes.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-[#F0F3F2] transition hover:bg-[#F8FBFA]"
                >

                  {/* Code */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#E7F4F1] text-[10px] font-bold text-[#0F766E]">
                        ICD
                      </div>

                      <div>

                        <p className="text-[11px] font-bold text-[#263833]">
                          {item.code}
                        </p>

                        <p className="mt-0.5 text-[8px] text-[#9AA5A1]">
                          ICD-10-CM
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


                  {/* Billable */}

                  <td className="px-4 py-4">

                    {item.billable ? (
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#278260]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#278260]" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-[9px] text-[#8A9995]">
                        No
                      </span>
                    )}

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

                      <button
                        title="View"
                        className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E]"
                      >
                        <EyeIcon />
                      </button>

                      <button
                        title="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E]"
                      >
                        <EditIcon />
                      </button>

                      <button
                        title="More"
                        className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#71807B] hover:bg-[#F1F4F3]"
                      >
                        <MoreIcon />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

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
              72,481
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