"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateICD10Page() {
  const [billable, setBillable] = useState(true);

  return (
    <div className="w-full max-w-[1100px]">

      {/* Header */}

      <div className="mb-7">

        <div className="mb-2 flex items-center gap-2">

          <Link
            href="/super-admin"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            Super Admin
          </Link>

          <span className="text-[10px] text-[#B3BCB8]">
            /
          </span>

          <Link
            href="/super-admin/icd10"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            ICD-10 Codes
          </Link>

          <span className="text-[10px] text-[#B3BCB8]">
            /
          </span>

          <span className="text-[10px] text-[#596964]">
            Create
          </span>

        </div>


        <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
          Add ICD-10 Code
        </h1>

        <p className="mt-1 text-[11px] text-[#8A9995]">
          Add a new diagnosis code to the healthcare coding library.
        </p>

      </div>


      <form className="space-y-5">

        {/* =================================================
            CODE INFORMATION
        ================================================= */}

        <FormSection
          title="Code Information"
          description="Enter the ICD-10 code and its clinical description."
        >

          <div className="grid grid-cols-2 gap-5">

            <Input
              label="ICD-10 Code"
              placeholder="Example: E11.9"
              required
            />

            <Select
              label="Status"
              options={[
                "Active",
                "Inactive",
              ]}
              required
            />

            <div className="col-span-2">

              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Description
                <span className="ml-1 text-[#D45D55]">
                  *
                </span>
              </label>

              <textarea
                rows={3}
                placeholder="Enter diagnosis description..."
                className="w-full resize-none rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 py-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
              />

            </div>

          </div>

        </FormSection>


        {/* =================================================
            CLASSIFICATION
        ================================================= */}

        <FormSection
          title="Classification"
          description="Organize the diagnosis code into the appropriate category."
        >

          <div className="grid grid-cols-2 gap-5">

            <Select
              label="Category"
              options={[
                "Endocrine",
                "Circulatory",
                "Respiratory",
                "Musculoskeletal",
                "Symptoms",
                "Genitourinary",
                "Neurological",
                "Digestive",
              ]}
              required
            />

            <Select
              label="Subcategory"
              options={[
                "Diabetes Mellitus",
                "Hypertensive Diseases",
                "Acute Respiratory Infections",
                "Dorsalgia",
                "Neurological Symptoms",
                "Chronic Kidney Disease",
              ]}
              required
            />

          </div>

        </FormSection>


        {/* =================================================
            BILLING
        ================================================= */}

        <FormSection
          title="Billing & Coding"
          description="Configure how this code can be used for billing."
        >

          <div className="rounded-[10px] border border-[#E5ECEA] bg-[#FAFCFB] p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-semibold text-[#465550]">
                  Billable / Specific Code
                </p>

                <p className="mt-1 text-[9px] text-[#98A49F]">
                  Mark this code as billable and specific for claim submission.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setBillable(!billable)}
                className={`relative h-6 w-11 rounded-full transition ${
                  billable
                    ? "bg-[#0F766E]"
                    : "bg-[#CBD5D2]"
                }`}
              >

                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    billable
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

          </div>

        </FormSection>


        {/* =================================================
            NOTES
        ================================================= */}

        <FormSection
          title="Additional Information"
          description="Optional notes related to this diagnosis code."
        >

          <textarea
            rows={4}
            placeholder="Add internal notes..."
            className="w-full resize-none rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 py-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
          />

        </FormSection>


        {/* Actions */}

        <div className="flex items-center justify-end gap-3 border-t border-[#E5ECEA] pt-5">

          <Link
            href="/super-admin/icd10"
            className="rounded-[9px] border border-[#DDE6E3] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-[9px] bg-[#0F766E] px-6 py-2.5 text-[10px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.18)] hover:bg-[#0B625C]"
          >
            Add ICD-10 Code
          </button>

        </div>

      </form>

    </div>
  );
}


/* ============================================================
   FORM SECTION
============================================================ */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

      <div className="border-b border-[#EDF2F0] px-6 py-5">

        <h2 className="text-[13px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[9px] text-[#98A49F]">
          {description}
        </p>

      </div>

      <div className="p-6">
        {children}
      </div>

    </section>
  );
}


/* ============================================================
   INPUT
============================================================ */

function Input({
  label,
  placeholder,
  required = false,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">

        {label}

        {required && (
          <span className="ml-1 text-[#D45D55]">
            *
          </span>
        )}

      </label>

      <input
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
      />

    </div>
  );
}


/* ============================================================
   SELECT
============================================================ */

function Select({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">

        {label}

        {required && (
          <span className="ml-1 text-[#D45D55]">
            *
          </span>
        )}

      </label>

      <select
        defaultValue=""
        required={required}
        className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#65736F] outline-none focus:border-[#77BDB4] focus:ring-2 focus:ring-[#0F766E]/10"
      >

        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}