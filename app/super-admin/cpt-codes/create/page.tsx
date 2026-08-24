"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateCPTPage() {


  return (
    <div className="w-full max-w-[1100px]">

      {/* =====================================================
          HEADER
      ===================================================== */}

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
            href="/super-admin/cpt"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            CPT Codes
          </Link>

          <span className="text-[10px] text-[#B3BCB8]">
            /
          </span>

          <span className="text-[10px] text-[#596964]">
            Create
          </span>

        </div>

        <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
          Add CPT Code
        </h1>

        <p className="mt-1 text-[11px] text-[#8A9995]">
          Add a new procedure or service code to the coding library.
        </p>

      </div>


      <form className="space-y-5">

        {/* =================================================
            CODE INFORMATION
        ================================================= */}

        <FormSection
          title="Code Information"
          description="Enter the CPT code and procedure description."
        >

          <div className="grid grid-cols-2 gap-5">

            <Input
              label="CPT Code"
              placeholder="Example: 99213"
              required
            />

            <Input
              label="Code Name"
              placeholder="Example: Established patient office visit"
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
                placeholder="Enter detailed procedure or service description..."
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
          description="Organize the CPT code by procedure category."
        >

          <div className="grid grid-cols-2 gap-5">

            <Select
              label="Category"
              options={[
                "Evaluation & Management",
                "Anesthesia",
                "Surgery",
                "Radiology",
                "Pathology & Laboratory",
                "Medicine",
                "Other Services",
              ]}
              required
            />

            <Select
              label="Subcategory"
              options={[
                "New Patient",
                "Established Patient",
                "Preventive Medicine",
                "Diagnostic Imaging",
                "Hematology",
                "Chemistry",
                "Cardiovascular",
                "Specimen Collection",
              ]}
              required
            />

          </div>

        </FormSection>


        {/* =================================================
            PRICING
        ================================================= */}

        <FormSection
          title="Pricing"
          description="Set the default fee associated with this CPT code."
        >

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Default Fee
                <span className="ml-1 text-[#D45D55]">
                  *
                </span>
              </label>

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8A9995]">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] pl-7 pr-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
                />

              </div>

            </div>


            <Select
              label="Status"
              options={[
                "Active",
                "Inactive",
              ]}
              required
            />

          </div>

        </FormSection>


        {/* =================================================
            MODIFIERS
        ================================================= */}

        <FormSection
          title="Modifiers"
          description="Configure modifiers that may be associated with this CPT code."
        >

          <div className="flex items-center justify-between rounded-[10px] border border-[#E5ECEA] bg-[#FAFCFB] p-4">

            <div>

              <p className="text-[11px] font-semibold text-[#465550]">
                Allow Modifiers
              </p>

              <p className="mt-1 text-[9px] text-[#98A49F]">
                Allow providers to attach modifiers to this procedure code.
              </p>

            </div>

            <button
              type="button"
              className="relative h-6 w-11 rounded-full bg-[#0F766E]"
            >

              <span className="absolute left-6 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />

            </button>

          </div>

          <div className="mt-4">

            <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
              Common Modifiers
            </label>

            <input
              placeholder="Example: 25, 26, 50, 59"
              className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
            />

            <p className="mt-1.5 text-[8px] text-[#9AA5A1]">
              Enter modifier codes separated by commas.
            </p>

          </div>

        </FormSection>


        {/* =================================================
            ADDITIONAL INFORMATION
        ================================================= */}

        <FormSection
          title="Additional Information"
          description="Optional internal information about this CPT code."
        >

          <textarea
            rows={4}
            placeholder="Add internal notes..."
            className="w-full resize-none rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 py-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
          />

        </FormSection>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center justify-end gap-3 border-t border-[#E5ECEA] pt-5">

          <Link
            href="/super-admin/cpt"
            className="rounded-[9px] border border-[#DDE6E3] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-[9px] bg-[#0F766E] px-6 py-2.5 text-[10px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.18)] hover:bg-[#0B625C]"
          >
            Add CPT Code
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