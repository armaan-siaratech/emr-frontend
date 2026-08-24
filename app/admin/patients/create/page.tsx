"use client";

import { useState } from "react";

export default function CreatePatientPage() {
  const [gender, setGender] = useState("Male");

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* Header */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">
        <div className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Admin</span>
              <span>›</span>
              <span>Patients</span>
              <span>›</span>
              <span className="text-[#0d9b91]">Create Patient</span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold text-[#172522]">
              Create Patient
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Register a new patient in the healthcare system
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#53645f] hover:bg-[#f5f9f7]"
          >
            ← Back
          </button>

        </div>
      </div>


      {/* Content */}
      <div className="mx-auto max-w-[1100px] px-6 py-6">

        {/* Personal Information */}
        <div className="rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">
            <h2 className="text-[14px] font-semibold text-[#172522]">
              Personal Information
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Enter the patient&apos;s basic personal information
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 p-6">

            <Input
              label="First Name"
              placeholder="Enter first name"
              required
            />

            <Input
              label="Middle Name"
              placeholder="Enter middle name"
            />

            <Input
              label="Last Name"
              placeholder="Enter last name"
              required
            />

            <Input
              label="Date of Birth"
              type="date"
              required
            />

            <div>
              <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                Gender <span className="text-[#e05d5d]">*</span>
              </label>

              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setGender(item)}
                    className={`flex-1 rounded-[8px] border px-3 py-2.5 text-[10px] font-medium ${
                      gender === item
                        ? "border-[#0d9b91] bg-[#e8f6f3] text-[#0d9b91]"
                        : "border-[#dce8e5] text-[#71807c]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Phone Number"
              placeholder="+1 (000) 000-0000"
              required
            />

            <Input
              label="Email Address"
              placeholder="patient@example.com"
              type="email"
            />

            <Input
              label="Marital Status"
              placeholder="Select status"
            />

            <Input
              label="Preferred Language"
              placeholder="Select language"
            />

          </div>
        </div>


        {/* Contact Information */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">
            <h2 className="text-[14px] font-semibold text-[#172522]">
              Contact Information
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Patient address and contact details
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 p-6">

            <Input
              label="Address Line 1"
              placeholder="Enter street address"
            />

            <Input
              label="Address Line 2"
              placeholder="Apartment, suite, etc."
            />

            <Input
              label="City"
              placeholder="Enter city"
            />

            <Input
              label="State"
              placeholder="Select state"
            />

            <Input
              label="ZIP / Postal Code"
              placeholder="Enter ZIP code"
            />

            <Input
              label="Country"
              placeholder="Select country"
            />

          </div>
        </div>


        {/* Emergency Contact */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">
            <h2 className="text-[14px] font-semibold text-[#172522]">
              Emergency Contact
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Add an emergency contact for this patient
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 p-6">

            <Input
              label="Contact Name"
              placeholder="Enter full name"
            />

            <Input
              label="Relationship"
              placeholder="e.g. Spouse, Parent"
            />

            <Input
              label="Phone Number"
              placeholder="+1 (000) 000-0000"
            />

          </div>
        </div>


        {/* Insurance */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">
            <h2 className="text-[14px] font-semibold text-[#172522]">
              Insurance Information
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Add patient&apos;s insurance information
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 p-6">

            <Input
              label="Insurance Provider"
              placeholder="Select provider"
            />

            <Input
              label="Policy Number"
              placeholder="Enter policy number"
            />

            <Input
              label="Member ID"
              placeholder="Enter member ID"
            />

            <Input
              label="Group Number"
              placeholder="Enter group number"
            />

            <Input
              label="Policy Holder"
              placeholder="Enter policy holder"
            />

            <Input
              label="Relationship to Patient"
              placeholder="Select relationship"
            />

          </div>
        </div>


        {/* Additional Information */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">
            <h2 className="text-[14px] font-semibold text-[#172522]">
              Additional Information
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Additional patient information
            </p>
          </div>

          <div className="p-6">

            <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
              Notes
            </label>

            <textarea
              rows={4}
              placeholder="Enter any additional information..."
              className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 py-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
            />

          </div>
        </div>


        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-[8px] border border-[#dce8e5] bg-white px-5 py-3 text-[10px] font-semibold text-[#53645f] hover:bg-[#f5f9f7]"
          >
            Cancel
          </button>

          <button
            type="button"
            className="rounded-[8px] bg-[#0d9b91] px-6 py-3 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.15)] hover:bg-[#078a81]"
          >
            Create Patient
          </button>

        </div>

      </div>
    </div>
  );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
        {label}

        {required && (
          <span className="ml-1 text-[#e05d5d]">*</span>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#53645f] outline-none transition placeholder:text-[#a8b1ae] focus:border-[#0d9b91] focus:bg-white"
      />
    </div>
  );
}