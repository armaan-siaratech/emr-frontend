"use client";

import { useState } from "react";

export default function CreatePharmacyPage() {
  const [pharmacyName, setPharmacyName] = useState("");
  const [facility, setFacility] = useState("");
  const [pharmacyType, setPharmacyType] = useState("Hospital Pharmacy");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pharmacist, setPharmacist] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      pharmacyName,
      facility,
      pharmacyType,
      licenseNumber,
      licenseExpiry,
      phone,
      email,
      pharmacist,
      location,
      status,
      description,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* HEADER */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Pharmacy</span>
              <span>›</span>
              <span className="text-[#0d9b91]">
                Create Pharmacy
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Create Pharmacy
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Add and configure a new pharmacy for your healthcare facility
            </p>
          </div>

          <button
            type="button"
            className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#53645f] transition hover:bg-[#f5f9f7]"
          >
            ← Back to Pharmacy
          </button>

        </div>

      </div>


      {/* CONTENT */}
      <div className="px-6 py-6">

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-[1fr_310px] gap-6">

            {/* LEFT */}
            <div className="space-y-5">

              {/* BASIC INFORMATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Pharmacy Information
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Basic information about the pharmacy
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  <TextField
                    label="Pharmacy Name"
                    required
                    value={pharmacyName}
                    onChange={setPharmacyName}
                    placeholder="e.g. Main Hospital Pharmacy"
                  />

                  <SelectField
                    label="Facility"
                    required
                    value={facility}
                    onChange={setFacility}
                    placeholder="Select facility"
                    options={[
                      "Sunrise Healthcare Center",
                      "Green Valley Medical Center",
                      "Harmony Care Clinic",
                      "Westside Rehabilitation",
                    ]}
                  />

                  <SelectField
                    label="Pharmacy Type"
                    required
                    value={pharmacyType}
                    onChange={setPharmacyType}
                    placeholder="Select pharmacy type"
                    options={[
                      "Hospital Pharmacy",
                      "Outpatient Pharmacy",
                      "Inpatient Pharmacy",
                      "Retail Pharmacy",
                      "Specialty Pharmacy",
                    ]}
                  />

                  <SelectField
                    label="Status"
                    required
                    value={status}
                    onChange={setStatus}
                    placeholder="Select status"
                    options={[
                      "Active",
                      "Inactive",
                      "Under Maintenance",
                    ]}
                  />

                  <TextField
                    label="License Number"
                    required
                    value={licenseNumber}
                    onChange={setLicenseNumber}
                    placeholder="e.g. PH-2026-00125"
                  />

                  <TextField
                    label="License Expiry"
                    type="date"
                    value={licenseExpiry}
                    onChange={setLicenseExpiry}
                    placeholder=""
                  />

                </div>

              </div>


              {/* CONTACT INFORMATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Contact Information
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Pharmacy contact and responsible staff information
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  <TextField
                    label="Phone Number"
                    value={phone}
                    onChange={setPhone}
                    placeholder="+1 (555) 000-0000"
                  />

                  <TextField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="pharmacy@example.com"
                  />

                  <SelectField
                    label="Responsible Pharmacist"
                    value={pharmacist}
                    onChange={setPharmacist}
                    placeholder="Select pharmacist"
                    options={[
                      "Dr. Sarah Wilson",
                      "Dr. Michael Brown",
                      "Dr. Emily Johnson",
                      "Dr. David Miller",
                    ]}
                  />

                  <TextField
                    label="Pharmacy Location"
                    value={location}
                    onChange={setLocation}
                    placeholder="e.g. Ground Floor, Main Building"
                  />

                </div>

              </div>


              {/* DESCRIPTION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Additional Information
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Add any additional information about this pharmacy
                  </p>

                </div>


                <div className="p-5">

                  <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Enter pharmacy description or additional notes..."
                    className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 py-3 text-[11px] text-[#53645f] outline-none transition placeholder:text-[#a0aaa7] focus:border-[#0d9b91] focus:bg-white"
                  />

                </div>

              </div>

            </div>


            {/* RIGHT */}
            <div className="space-y-5">

              {/* PHARMACY PREVIEW */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Pharmacy Preview
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Preview how the pharmacy will appear
                  </p>

                </div>


                <div className="p-5">

                  <div className="rounded-[12px] bg-[#f7faf9] p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[11px] bg-[#e5f5f1] text-[21px] font-bold text-[#0d9b91]">
                        +
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[13px] font-bold text-[#172522]">
                          {pharmacyName || "Main Hospital Pharmacy"}
                        </p>

                        <p className="mt-1 text-[9px] text-[#899590]">
                          {pharmacyType}
                        </p>

                      </div>

                    </div>


                    <div className="mt-5 space-y-3">

                      <PreviewItem
                        label="Facility"
                        value={facility || "Not selected"}
                      />

                      <PreviewItem
                        label="Location"
                        value={location || "Not entered"}
                      />

                      <PreviewItem
                        label="Pharmacist"
                        value={pharmacist || "Not selected"}
                      />

                      <PreviewItem
                        label="License"
                        value={licenseNumber || "Not entered"}
                      />

                    </div>


                    <div className="mt-5 border-t border-[#e3ebe8] pt-4">

                      <span
                        className={`rounded-full px-3 py-1 text-[8px] font-semibold ${
                          status === "Active"
                            ? "bg-[#e8f6f0] text-[#278460]"
                            : status === "Inactive"
                            ? "bg-[#fbeaea] text-[#b75d5d]"
                            : "bg-[#fff4e4] text-[#b47725]"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* QUICK SUMMARY */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Configuration Summary
                  </h2>

                </div>


                <div className="space-y-4 p-5">

                  <SummaryItem
                    label="Pharmacy Type"
                    value={pharmacyType}
                  />

                  <SummaryItem
                    label="Status"
                    value={status}
                  />

                  <SummaryItem
                    label="Contact"
                    value={phone || "Not entered"}
                  />

                  <SummaryItem
                    label="Email"
                    value={email || "Not entered"}
                  />

                </div>

              </div>


              {/* INFO */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f6f3] text-[13px] font-bold text-[#0d9b91]">
                    i
                  </div>

                  <div>

                    <p className="text-[10px] font-semibold text-[#53645f]">
                      Pharmacy Management
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#899590]">
                      After creating the pharmacy, medicines,
                      inventory, suppliers and stock transactions
                      can be managed from the pharmacy section.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ACTION BAR */}
          <div className="mt-6 flex items-center justify-end gap-3 rounded-[14px] border border-[#dce8e5] bg-white px-5 py-4">

            <button
              type="button"
              className="rounded-[8px] border border-[#dce8e5] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#687771] transition hover:bg-[#f5f9f7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-[8px] bg-[#0d9b91] px-6 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.16)] transition hover:bg-[#078a81]"
            >
              Create Pharmacy
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


/* =========================================================
   TEXT FIELD
========================================================= */

function TextField({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">

        {label}

        {required && (
          <span className="ml-1 text-[#0d9b91]">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none transition placeholder:text-[#a0aaa7] focus:border-[#0d9b91] focus:bg-white"
      />

    </div>
  );
}


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">

        {label}

        {required && (
          <span className="ml-1 text-[#0d9b91]">
            *
          </span>
        )}

      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none transition focus:border-[#0d9b91] focus:bg-white"
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


/* =========================================================
   PREVIEW ITEM
========================================================= */

function PreviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[8px] uppercase tracking-[0.06em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-1 truncate text-[10px] font-semibold text-[#53645f]">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#edf2f0] pb-3 last:border-0 last:pb-0">

      <span className="text-[10px] text-[#899590]">
        {label}
      </span>

      <span className="max-w-[170px] truncate text-right text-[10px] font-semibold text-[#53645f]">
        {value}
      </span>

    </div>
  );
}