"use client";

import { useState } from "react";

const appointments = [
  {
    id: "APT-1001",
    patient: "Arman Alam",
    patientId: "PT-10021",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    facility: "Main Hospital",
    date: "Aug 10, 2026",
    time: "09:30 AM",
    type: "In-Person",
    priority: "Routine",
    status: "Confirmed",
  },
  {
    id: "APT-1002",
    patient: "John Carter",
    patientId: "PT-10022",
    doctor: "Dr. Michael Brown",
    department: "General Medicine",
    facility: "Main Hospital",
    date: "Aug 10, 2026",
    time: "10:00 AM",
    type: "Follow-up",
    priority: "Routine",
    status: "Pending",
  },
  {
    id: "APT-1003",
    patient: "Emily Johnson",
    patientId: "PT-10023",
    doctor: "Dr. David Miller",
    department: "Orthopedics",
    facility: "North Facility",
    date: "Aug 10, 2026",
    time: "11:30 AM",
    type: "In-Person",
    priority: "Urgent",
    status: "Confirmed",
  },
  {
    id: "APT-1004",
    patient: "Robert Williams",
    patientId: "PT-10024",
    doctor: "Dr. Lisa Anderson",
    department: "Neurology",
    facility: "Main Hospital",
    date: "Aug 11, 2026",
    time: "01:00 PM",
    type: "Telehealth",
    priority: "Routine",
    status: "Completed",
  },
  {
    id: "APT-1005",
    patient: "Sophia Davis",
    patientId: "PT-10025",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    facility: "Main Hospital",
    date: "Aug 11, 2026",
    time: "02:30 PM",
    type: "Follow-up",
    priority: "Routine",
    status: "Cancelled",
  },
  {
    id: "APT-1006",
    patient: "James Wilson",
    patientId: "PT-10026",
    doctor: "Dr. Michael Brown",
    department: "General Medicine",
    facility: "South Facility",
    date: "Aug 12, 2026",
    time: "09:00 AM",
    type: "In-Person",
    priority: "Emergency",
    status: "Confirmed",
  },
  {
    id: "APT-1007",
    patient: "Olivia Martinez",
    patientId: "PT-10027",
    doctor: "Dr. David Miller",
    department: "Pediatrics",
    facility: "Children's Facility",
    date: "Aug 12, 2026",
    time: "11:00 AM",
    type: "In-Person",
    priority: "Routine",
    status: "Pending",
  },
  {
    id: "APT-1008",
    patient: "William Taylor",
    patientId: "PT-10028",
    doctor: "Dr. Lisa Anderson",
    department: "Neurology",
    facility: "Main Hospital",
    date: "Aug 13, 2026",
    time: "03:00 PM",
    type: "Telehealth",
    priority: "Routine",
    status: "Confirmed",
  },
];

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [department, setDepartment] = useState("All Departments");
  const [date, setDate] = useState("");

  const filteredAppointments = appointments.filter((appointment) => {
    const searchMatch =
      appointment.patient
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.patientId
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.doctor
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      status === "All Status" ||
      appointment.status === status;

    const departmentMatch =
      department === "All Departments" ||
      appointment.department === department;

    const dateMatch =
      date === "" ||
      appointment.date === date;

    return (
      searchMatch &&
      statusMatch &&
      departmentMatch &&
      dateMatch
    );
  });

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Admin</span>
              <span>›</span>

              <span className="text-[#0d9b91]">
                Appointments
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Appointments
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Manage and monitor all patient appointments
            </p>

          </div>


          <a
            href="/admin/appointments/create"
            className="rounded-[8px] bg-[#0d9b91] px-5 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.15)] transition hover:bg-[#078a81]"
          >
            + Create Appointment
          </a>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-6 py-6">


        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="grid grid-cols-4 gap-4">

          <SummaryCard
            title="Total Appointments"
            value="1,248"
            change="+12.4%"
            icon="◷"
          />

          <SummaryCard
            title="Confirmed"
            value="824"
            change="+8.6%"
            icon="✓"
          />

          <SummaryCard
            title="Pending"
            value="186"
            change="+4.2%"
            icon="◌"
          />

          <SummaryCard
            title="Cancelled"
            value="74"
            change="-2.8%"
            icon="×"
          />

        </div>


        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="mt-6 rounded-[14px] border border-[#dce8e5] bg-white p-5">

          <div className="mb-4">

            <h2 className="text-[12px] font-semibold text-[#172522]">
              Search & Filters
            </h2>

            <p className="mt-1 text-[9px] text-[#929e99]">
              Find appointments by patient, provider, department or status
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
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search patient, provider or appointment ID..."
                className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] pl-9 pr-3 text-[10px] text-[#53645f] outline-none placeholder:text-[#a8b1ae] focus:border-[#0d9b91]"
              />

            </div>


            {/* Status */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
            >

              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>

            </select>


            {/* Department */}

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
            >

              <option>All Departments</option>
              <option>Cardiology</option>
              <option>General Medicine</option>
              <option>Orthopedics</option>
              <option>Neurology</option>
              <option>Pediatrics</option>

            </select>


            {/* Date */}

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
            />


            {/* Clear */}

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("All Status");
                setDepartment("All Departments");
                setDate("");
              }}
              className="h-10 rounded-[8px] border border-[#dce8e5] bg-white px-4 text-[10px] font-semibold text-[#687771] hover:bg-[#f5f9f7]"
            >
              Clear
            </button>

          </div>

        </div>


        {/* =====================================================
            APPOINTMENT TABLE
        ===================================================== */}

        <div className="mt-6 overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white">


          {/* Table Header */}

          <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

            <div>

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Appointment List
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                {filteredAppointments.length} appointments found
              </p>

            </div>


            <div className="flex items-center gap-2">

              <button
                type="button"
                className="rounded-[7px] border border-[#dce8e5] px-3 py-2 text-[9px] font-semibold text-[#687771] hover:bg-[#f5f9f7]"
              >
                Export
              </button>

              <button
                type="button"
                className="rounded-[7px] border border-[#dce8e5] px-3 py-2 text-[9px] font-semibold text-[#687771] hover:bg-[#f5f9f7]"
              >
                Columns
              </button>

            </div>

          </div>


          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-[#f7faf9]">

                  <TableHead text="APPOINTMENT" />
                  <TableHead text="PATIENT" />
                  <TableHead text="PROVIDER" />
                  <TableHead text="DEPARTMENT" />
                  <TableHead text="DATE & TIME" />
                  <TableHead text="TYPE" />
                  <TableHead text="PRIORITY" />
                  <TableHead text="STATUS" />
                  <TableHead text="ACTION" />

                </tr>

              </thead>


              <tbody>

                {filteredAppointments.map((appointment) => (

                  <tr
                    key={appointment.id}
                    className="border-t border-[#edf2f0] transition hover:bg-[#fbfdfc]"
                  >


                    {/* Appointment */}

                    <td className="px-5 py-4">

                      <div>

                        <p className="text-[10px] font-semibold text-[#0d9b91]">
                          {appointment.id}
                        </p>

                        <p className="mt-1 text-[8px] text-[#9aa6a2]">
                          Created recently
                        </p>

                      </div>

                    </td>


                    {/* Patient */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f6f3] text-[10px] font-bold text-[#0d9b91]">
                          {appointment.patient
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>


                        <div>

                          <p className="text-[10px] font-semibold text-[#53645f]">
                            {appointment.patient}
                          </p>

                          <p className="mt-1 text-[8px] text-[#9aa6a2]">
                            {appointment.patientId}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Provider */}

                    <td className="px-5 py-4">

                      <p className="text-[10px] font-medium text-[#53645f]">
                        {appointment.doctor}
                      </p>

                      <p className="mt-1 text-[8px] text-[#9aa6a2]">
                        Healthcare Provider
                      </p>

                    </td>


                    {/* Department */}

                    <td className="px-5 py-4">

                      <span className="rounded-full bg-[#edf5f3] px-2.5 py-1 text-[8px] font-semibold text-[#536f68]">
                        {appointment.department}
                      </span>

                    </td>


                    {/* Date */}

                    <td className="px-5 py-4">

                      <p className="text-[9px] font-semibold text-[#53645f]">
                        {appointment.date}
                      </p>

                      <p className="mt-1 text-[8px] text-[#929e99]">
                        {appointment.time}
                      </p>

                    </td>


                    {/* Type */}

                    <td className="px-5 py-4">

                      <span className="text-[9px] text-[#687771]">
                        {appointment.type}
                      </span>

                    </td>


                    {/* Priority */}

                    <td className="px-5 py-4">

                      <PriorityBadge
                        priority={appointment.priority}
                      />

                    </td>


                    {/* Status */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={appointment.status}
                      />

                    </td>


                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1">

                        <button
                          type="button"
                          title="View Appointment"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
                        >
                          ◉
                        </button>

                        <button
                          type="button"
                          title="Edit Appointment"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
                        >
                          ✎
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


                {filteredAppointments.length === 0 && (

                  <tr>

                    <td
                      colSpan={9}
                      className="px-5 py-16 text-center"
                    >

                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f6f3] text-[18px] text-[#0d9b91]">
                        ⌕
                      </div>

                      <p className="mt-4 text-[11px] font-semibold text-[#53645f]">
                        No appointments found
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


          {/* Pagination */}

          <div className="flex items-center justify-between border-t border-[#e4ece9] px-5 py-4">

            <p className="text-[9px] text-[#929e99]">
              Showing{" "}
              <span className="font-semibold text-[#53645f]">
                1
              </span>{" "}
              to{" "}
              <span className="font-semibold text-[#53645f]">
                {filteredAppointments.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#53645f]">
                1,248
              </span>{" "}
              appointments
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
                3
              </button>

              <span className="px-1 text-[9px] text-[#929e99]">
                ...
              </span>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#687771]"
              >
                ›
              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM QUICK ACTIONS
        ===================================================== */}

        <div className="mt-6 grid grid-cols-3 gap-4">

          <QuickAction
            title="Create Appointment"
            description="Schedule a new patient appointment"
            icon="+"
            href="/admin/appointments/create"
          />

          <QuickAction
            title="Patient Management"
            description="View and manage registered patients"
            icon="♙"
            href="/admin/patients"
          />

          <QuickAction
            title="Reports"
            description="View appointment analytics and reports"
            icon="▤"
            href="/admin/reports"
          />

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
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
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

          <p className="mt-2 text-[9px] font-semibold text-[#278460]">
            {change}
            <span className="ml-1 font-normal text-[#a0aaa7]">
              vs previous period
            </span>
          </p>

        </div>


        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[15px] font-bold text-[#0d9b91]">
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
  status: string;
}) {
  const styles: Record<string, string> = {
    Confirmed:
      "bg-[#e8f6f0] text-[#278460]",
    Pending:
      "bg-[#fff5df] text-[#b47b1d]",
    Completed:
      "bg-[#eaf1f7] text-[#54728b]",
    Cancelled:
      "bg-[#fdecec] text-[#c45c5c]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
        styles[status] || "bg-[#edf2f0] text-[#687771]"
      }`}
    >
      {status}
    </span>
  );
}


/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<string, string> = {
    Routine: "text-[#4d8e70]",
    Urgent: "text-[#c18a32]",
    Emergency: "text-[#d15c5c]",
  };

  const dots: Record<string, string> = {
    Routine: "bg-[#58a987]",
    Urgent: "bg-[#e3a13d]",
    Emergency: "bg-[#df6262]",
  };

  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2 w-2 rounded-full ${
          dots[priority] || "bg-[#9aa6a2]"
        }`}
      />

      <span
        className={`text-[9px] font-semibold ${
          styles[priority] || "text-[#687771]"
        }`}
      >
        {priority}
      </span>

    </div>
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


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-[13px] border border-[#dce8e5] bg-white p-4 transition hover:-translate-y-[1px] hover:border-[#b9dcd6] hover:shadow-[0_6px_20px_rgba(25,70,65,0.06)]"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8f6f3] text-[16px] font-bold text-[#0d9b91] transition group-hover:bg-[#0d9b91] group-hover:text-white">
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <p className="text-[10px] font-semibold text-[#53645f]">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-[#929e99]">
          {description}
        </p>

      </div>


      <span className="text-[13px] text-[#a0aaa7] transition group-hover:translate-x-1 group-hover:text-[#0d9b91]">
        →
      </span>

    </a>
  );
}