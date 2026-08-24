"use client";

import { useState } from "react";

export default function CreateBedPage() {
  const [facility, setFacility] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [ward, setWard] = useState("");
  const [room, setRoom] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [bedType, setBedType] = useState("Standard");
  const [status, setStatus] = useState("Available");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      facility,
      building,
      floor,
      ward,
      room,
      bedNumber,
      bedType,
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
              <span>Bed Management</span>
              <span>›</span>
              <span className="text-[#0d9b91]">
                Create Bed
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Create Bed
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Add a new bed and assign it to a room or ward
            </p>
          </div>

          <button
            type="button"
            className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#53645f] transition hover:bg-[#f5f9f7]"
          >
            ← Back to Bed Management
          </button>

        </div>
      </div>


      {/* CONTENT */}
      <div className="px-6 py-6">

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-[1fr_310px] gap-6">

            {/* LEFT */}
            <div className="space-y-5">

              {/* LOCATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Bed Location
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Select where this bed will be located
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  {/* FACILITY */}
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


                  {/* BUILDING */}
                  <SelectField
                    label="Building"
                    required
                    value={building}
                    onChange={setBuilding}
                    placeholder="Select building"
                    options={[
                      "Main Building",
                      "North Wing",
                      "South Wing",
                      "Emergency Building",
                    ]}
                  />


                  {/* FLOOR */}
                  <SelectField
                    label="Floor"
                    required
                    value={floor}
                    onChange={setFloor}
                    placeholder="Select floor"
                    options={[
                      "Ground Floor",
                      "1st Floor",
                      "2nd Floor",
                      "3rd Floor",
                      "4th Floor",
                    ]}
                  />


                  {/* WARD */}
                  <SelectField
                    label="Ward"
                    required
                    value={ward}
                    onChange={setWard}
                    placeholder="Select ward"
                    options={[
                      "General Ward",
                      "Private Ward",
                      "ICU",
                      "Emergency",
                      "Pediatric Ward",
                      "Maternity Ward",
                      "Rehabilitation",
                    ]}
                  />


                  {/* ROOM */}
                  <TextField
                    label="Room Number"
                    required
                    value={room}
                    onChange={setRoom}
                    placeholder="e.g. 101"
                  />


                  {/* BED */}
                  <TextField
                    label="Bed Number"
                    required
                    value={bedNumber}
                    onChange={setBedNumber}
                    placeholder="e.g. A-101"
                  />

                </div>

              </div>


              {/* BED DETAILS */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Bed Details
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Configure the type and status of this bed
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  {/* BED TYPE */}
                  <SelectField
                    label="Bed Type"
                    required
                    value={bedType}
                    onChange={setBedType}
                    placeholder="Select bed type"
                    options={[
                      "Standard",
                      "Private",
                      "Semi-Private",
                      "ICU",
                      "Emergency",
                      "Pediatric",
                      "Maternity",
                      "Rehabilitation",
                    ]}
                  />


                  {/* STATUS */}
                  <SelectField
                    label="Initial Status"
                    required
                    value={status}
                    onChange={setStatus}
                    placeholder="Select status"
                    options={[
                      "Available",
                      "Reserved",
                      "Cleaning",
                      "Maintenance",
                    ]}
                  />


                  {/* DESCRIPTION */}
                  <div className="col-span-2">

                    <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                      Description
                    </label>

                    <textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      rows={4}
                      placeholder="Enter any additional information about this bed..."
                      className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 py-2.5 text-[11px] text-[#53645f] outline-none transition placeholder:text-[#a0aaa7] focus:border-[#0d9b91] focus:bg-white"
                    />

                  </div>

                </div>

              </div>


              {/* BED IDENTIFICATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Bed Identification
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Preview how this bed will appear in the system
                  </p>

                </div>


                <div className="p-5">

                  <div className="flex items-center gap-4 rounded-[11px] border border-[#e1ebe8] bg-[#f8fbfa] p-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#e5f5f1] text-[18px] text-[#0d9b91]">
                      ▦
                    </div>

                    <div className="flex-1">

                      <p className="text-[13px] font-bold text-[#273732]">
                        {bedNumber || "A-101"}
                      </p>

                      <p className="mt-1 text-[9px] text-[#899590]">
                        Room {room || "101"} ·{" "}
                        {ward || "General Ward"} ·{" "}
                        {floor || "1st Floor"}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[8px] font-semibold ${
                        status === "Available"
                          ? "bg-[#e8f6f0] text-[#278460]"
                          : status === "Reserved"
                          ? "bg-[#fff4e4] text-[#b47725]"
                          : "bg-[#f1f3f2] text-[#7c8783]"
                      }`}
                    >
                      {status}
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT */}
            <div className="space-y-5">

              {/* BED PREVIEW */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Bed Preview
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Current bed configuration
                  </p>

                </div>


                <div className="p-5">

                  <div className="flex flex-col items-center rounded-[12px] bg-[#f7faf9] p-6">

                    <div className="flex h-16 w-16 items-center justify-center rounded-[14px] bg-[#e5f5f1] text-[25px] text-[#0d9b91]">
                      ▦
                    </div>

                    <p className="mt-4 text-[16px] font-bold text-[#172522]">
                      {bedNumber || "A-101"}
                    </p>

                    <p className="mt-1 text-[10px] text-[#899590]">
                      {bedType} Bed
                    </p>

                    <div className="mt-4 flex items-center gap-2">

                      <span className="h-2 w-2 rounded-full bg-[#4ca88f]" />

                      <span className="text-[9px] font-semibold text-[#53645f]">
                        {status}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* LOCATION SUMMARY */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Location Summary
                  </h2>

                </div>


                <div className="space-y-4 p-5">

                  <SummaryItem
                    label="Facility"
                    value={facility || "Not selected"}
                  />

                  <SummaryItem
                    label="Building"
                    value={building || "Not selected"}
                  />

                  <SummaryItem
                    label="Floor"
                    value={floor || "Not selected"}
                  />

                  <SummaryItem
                    label="Ward"
                    value={ward || "Not selected"}
                  />

                  <SummaryItem
                    label="Room"
                    value={room || "Not entered"}
                  />

                  <SummaryItem
                    label="Bed"
                    value={bedNumber || "Not entered"}
                  />

                </div>

              </div>


              {/* INFORMATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f6f3] text-[13px] font-bold text-[#0d9b91]">
                    i
                  </div>

                  <div>

                    <p className="text-[10px] font-semibold text-[#53645f]">
                      Bed Management
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#899590]">
                      Once created, this bed can be assigned
                      to patients during admission and can be
                      managed from Bed Management.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ACTIONS */}
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
              Create Bed
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
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
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
        type="text"
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

      <span className="max-w-[170px] text-right text-[10px] font-semibold text-[#53645f]">
        {value}
      </span>

    </div>
  );
}