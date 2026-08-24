"use client";

import { useState } from "react";

export default function CreateAppointmentPage() {
  const [appointmentType, setAppointmentType] =
    useState("In-Person");

  const [priority, setPriority] =
    useState("Routine");

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* Header */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Admin</span>
              <span>›</span>
              <span>Appointments</span>
              <span>›</span>
              <span className="text-[#0d9b91]">
                Create Appointment
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold text-[#172522]">
              Create Appointment
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Schedule a new patient appointment
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


        {/* Patient & Provider */}
        <div className="rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Patient & Provider
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Select the patient and healthcare provider
            </p>

          </div>


          <div className="grid grid-cols-2 gap-5 p-6">

            <SelectInput
              label="Patient"
              placeholder="Search or select patient"
              required
            />

            <SelectInput
              label="Doctor / Provider"
              placeholder="Select provider"
              required
            />

            <SelectInput
              label="Department"
              placeholder="Select department"
            />

            <SelectInput
              label="Facility"
              placeholder="Select facility"
              required
            />

          </div>

        </div>


        {/* Appointment Details */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Appointment Details
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Set the appointment date, time and type
            </p>

          </div>


          <div className="grid grid-cols-3 gap-5 p-6">

            <Input
              label="Appointment Date"
              type="date"
              required
            />

            <Input
              label="Start Time"
              type="time"
              required
            />

            <Input
              label="End Time"
              type="time"
              required
            />


            <div className="col-span-2">

              <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
                Appointment Type
              </label>

              <div className="flex gap-2">

                {[
                  "In-Person",
                  "Telehealth",
                  "Follow-up",
                ].map((item) => (

                  <button
                    type="button"
                    key={item}
                    onClick={() =>
                      setAppointmentType(item)
                    }
                    className={`rounded-[8px] border px-5 py-2.5 text-[10px] font-medium transition ${
                      appointmentType === item
                        ? "border-[#0d9b91] bg-[#e8f6f3] text-[#0d9b91]"
                        : "border-[#dce8e5] bg-white text-[#71807c] hover:bg-[#f7faf9]"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            <SelectInput
              label="Duration"
              placeholder="30 minutes"
            />

          </div>

        </div>


        {/* Priority */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Priority
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Set the priority for this appointment
            </p>

          </div>


          <div className="flex gap-3 p-6">

            {[
              {
                name: "Routine",
                color: "normal",
              },
              {
                name: "Urgent",
                color: "urgent",
              },
              {
                name: "Emergency",
                color: "emergency",
              },
            ].map((item) => (

              <button
                type="button"
                key={item.name}
                onClick={() =>
                  setPriority(item.name)
                }
                className={`flex items-center gap-2 rounded-[8px] border px-5 py-2.5 text-[10px] font-medium transition ${
                  priority === item.name
                    ? "border-[#0d9b91] bg-[#e8f6f3] text-[#0d9b91]"
                    : "border-[#dce8e5] text-[#71807c]"
                }`}
              >

                <span
                  className={`h-2 w-2 rounded-full ${
                    item.color === "normal"
                      ? "bg-[#58a987]"
                      : item.color === "urgent"
                      ? "bg-[#e3a13d]"
                      : "bg-[#df6262]"
                  }`}
                />

                {item.name}

              </button>

            ))}

          </div>

        </div>


        {/* Reason */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Visit Information
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Add information about the appointment
            </p>

          </div>


          <div className="p-6">

            <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">
              Reason for Visit
            </label>

            <textarea
              rows={3}
              placeholder="Enter reason for appointment..."
              className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 py-3 text-[10px] text-[#53645f] outline-none placeholder:text-[#a8b1ae] focus:border-[#0d9b91] focus:bg-white"
            />


            <label className="mb-2 mt-5 block text-[10px] font-semibold text-[#53645f]">
              Notes
            </label>

            <textarea
              rows={4}
              placeholder="Add appointment notes..."
              className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 py-3 text-[10px] text-[#53645f] outline-none placeholder:text-[#a8b1ae] focus:border-[#0d9b91] focus:bg-white"
            />

          </div>

        </div>


        {/* Reminder */}
        <div className="mt-5 rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="border-b border-[#e4ece9] px-6 py-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Appointment Reminder
            </h2>

            <p className="mt-1 text-[10px] text-[#899590]">
              Configure patient notification preferences
            </p>

          </div>


          <div className="grid grid-cols-3 gap-5 p-6">

            <SelectInput
              label="Reminder"
              placeholder="24 hours before"
            />

            <SelectInput
              label="Notification Method"
              placeholder="Email & SMS"
            />

            <SelectInput
              label="Confirmation"
              placeholder="Required"
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
            Create Appointment
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
          <span className="ml-1 text-[#e05d5d]">
            *
          </span>
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


/* =========================================================
   SELECT INPUT
========================================================= */

function SelectInput({
  label,
  placeholder,
  required = false,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-semibold text-[#53645f]">

        {label}

        {required && (
          <span className="ml-1 text-[#e05d5d]">
            *
          </span>
        )}

      </label>


      <select
        defaultValue=""
        className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none transition focus:border-[#0d9b91] focus:bg-white"
      >

        <option value="" disabled>
          {placeholder || "Select"}
        </option>

        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>

      </select>

    </div>
  );
}