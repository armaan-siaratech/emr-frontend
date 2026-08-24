"use client";

import { useState } from "react";

export default function CreateDepartmentPage() {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentType, setDepartmentType] = useState("Clinical");
  const [departmentHead, setDepartmentHead] = useState("");
  const [facility, setFacility] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // UI only - API will be added later
    console.log({
      departmentName,
      departmentCode,
      departmentType,
      departmentHead,
      facility,
      description,
      phone,
      email,
      location,
      status,
      startTime,
      endTime,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* HEADER */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">
        <div className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Departments</span>
              <span>›</span>
              <span className="text-[#0d9b91]">
                Create Department
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Create Department
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Add a new department to your healthcare facility
            </p>
          </div>

          <button
            type="button"
            className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#53645f] transition hover:bg-[#f5f9f7]"
          >
            ← Back to Departments
          </button>

        </div>
      </div>


      {/* CONTENT */}
      <div className="px-6 py-6">

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-[1fr_300px] gap-6">

            {/* LEFT SIDE */}
            <div className="space-y-5">

              {/* BASIC INFORMATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">
                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Basic Information
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Enter the basic details of the department
                  </p>
                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  <FormField
                    label="Department Name"
                    required
                    value={departmentName}
                    onChange={setDepartmentName}
                    placeholder="e.g. Cardiology"
                  />

                  <FormField
                    label="Department Code"
                    required
                    value={departmentCode}
                    onChange={setDepartmentCode}
                    placeholder="e.g. CARD"
                  />


                  {/* TYPE */}
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                      Department Type
                      <span className="ml-1 text-[#0d9b91]">*</span>
                    </label>

                    <select
                      value={departmentType}
                      onChange={(e) =>
                        setDepartmentType(e.target.value)
                      }
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none transition focus:border-[#0d9b91] focus:bg-white"
                    >
                      <option>Clinical</option>
                      <option>Diagnostic</option>
                      <option>Support</option>
                      <option>Administrative</option>
                    </select>
                  </div>


                  {/* DEPARTMENT HEAD */}
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                      Department Head
                      <span className="ml-1 text-[#0d9b91]">*</span>
                    </label>

                    <select
                      value={departmentHead}
                      onChange={(e) =>
                        setDepartmentHead(e.target.value)
                      }
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none transition focus:border-[#0d9b91] focus:bg-white"
                    >
                      <option value="">
                        Select department head
                      </option>
                      <option>Dr. Sarah Mitchell</option>
                      <option>Dr. Michael Anderson</option>
                      <option>Dr. David Miller</option>
                      <option>Dr. Robert Wilson</option>
                      <option>Emily Johnson</option>
                    </select>
                  </div>


                  {/* FACILITY */}
                  <div className="col-span-2">
                    <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                      Facility
                      <span className="ml-1 text-[#0d9b91]">*</span>
                    </label>

                    <select
                      value={facility}
                      onChange={(e) =>
                        setFacility(e.target.value)
                      }
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none transition focus:border-[#0d9b91] focus:bg-white"
                    >
                      <option value="">
                        Select facility
                      </option>
                      <option>
                        Sunrise Healthcare Center
                      </option>
                      <option>
                        Green Valley Medical Center
                      </option>
                      <option>
                        Harmony Care Clinic
                      </option>
                      <option>
                        Westside Rehabilitation
                      </option>
                      <option>
                        Lakeside Long Term Care
                      </option>
                    </select>
                  </div>


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
                      placeholder="Enter department description..."
                      className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 py-2.5 text-[11px] text-[#53645f] outline-none transition placeholder:text-[#a0aaa7] focus:border-[#0d9b91] focus:bg-white"
                    />

                  </div>

                </div>

              </div>


              {/* CONTACT INFORMATION */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Contact Information
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Add contact details for this department
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  <FormField
                    label="Contact Number"
                    value={phone}
                    onChange={setPhone}
                    placeholder="e.g. (555) 123-4567"
                  />

                  <FormField
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    placeholder="department@example.com"
                  />

                  <div className="col-span-2">

                    <FormField
                      label="Location"
                      value={location}
                      onChange={setLocation}
                      placeholder="e.g. Building A, 2nd Floor"
                    />

                  </div>

                </div>

              </div>


              {/* OPERATING HOURS */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Operating Hours
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Set the regular working hours for this department
                  </p>

                </div>


                <div className="grid grid-cols-2 gap-5 p-5">

                  <div>
                    <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                      Opening Time
                    </label>

                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) =>
                        setStartTime(e.target.value)
                      }
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none focus:border-[#0d9b91] focus:bg-white"
                    />
                  </div>


                  <div>
                    <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                      Closing Time
                    </label>

                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) =>
                        setEndTime(e.target.value)
                      }
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none focus:border-[#0d9b91] focus:bg-white"
                    />
                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="space-y-5">

              {/* STATUS */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Department Status
                  </h2>

                  <p className="mt-1 text-[10px] text-[#8a9692]">
                    Control department availability
                  </p>

                </div>


                <div className="p-5">

                  <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[11px] text-[#53645f] outline-none focus:border-[#0d9b91] focus:bg-white"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>


                  <div className="mt-4 rounded-[9px] bg-[#eaf7f4] p-3">

                    <div className="flex gap-2">

                      <div className="mt-0.5 text-[12px] text-[#0d9b91]">
                        ✓
                      </div>

                      <div>

                        <p className="text-[9px] font-semibold text-[#277c73]">
                          Active Department
                        </p>

                        <p className="mt-1 text-[9px] leading-4 text-[#69908b]">
                          Active departments are available
                          for patient and provider assignments.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* QUICK SUMMARY */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white">

                <div className="border-b border-[#e4ece9] px-5 py-4">

                  <h2 className="text-[14px] font-semibold text-[#172522]">
                    Department Summary
                  </h2>

                </div>


                <div className="space-y-4 p-5">

                  <SummaryItem
                    label="Type"
                    value={departmentType}
                  />

                  <SummaryItem
                    label="Status"
                    value={status}
                  />

                  <SummaryItem
                    label="Opening"
                    value={startTime}
                  />

                  <SummaryItem
                    label="Closing"
                    value={endTime}
                  />

                </div>

              </div>


              {/* INFO */}
              <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

                <div className="flex gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f6f3] text-[13px] text-[#0d9b91]">
                    i
                  </div>

                  <div>

                    <p className="text-[10px] font-semibold text-[#53645f]">
                      Department Setup
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#899590]">
                      After creating the department, providers
                      and users can be assigned to it.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* FORM ACTIONS */}
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
              Create Department
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
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
    <div className="flex items-center justify-between border-b border-[#edf2f0] pb-3 last:border-0 last:pb-0">

      <span className="text-[10px] text-[#899590]">
        {label}
      </span>

      <span className="text-[10px] font-semibold text-[#53645f]">
        {value}
      </span>

    </div>
  );
}