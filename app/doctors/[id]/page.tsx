"use client";

import { useState } from "react";
import Link from "next/link";

const appointments = [
  {
    time: "09:00 AM",
    patient: "Robert Johnson",
    type: "Follow-up",
    status: "Completed",
  },
  {
    time: "10:00 AM",
    patient: "Sarah Williams",
    type: "Consultation",
    status: "Completed",
  },
  {
    time: "11:30 AM",
    patient: "Michael Brown",
    type: "New Patient",
    status: "Upcoming",
  },
  {
    time: "01:00 PM",
    patient: "Emma Davis",
    type: "Follow-up",
    status: "Upcoming",
  },
  {
    time: "03:00 PM",
    patient: "David Wilson",
    type: "Consultation",
    status: "Upcoming",
  },
];

const patients = [
  {
    name: "Robert Johnson",
    mrn: "MRN-10241",
    age: 54,
    condition: "Hypertension",
    lastVisit: "Aug 08, 2026",
  },
  {
    name: "Sarah Williams",
    mrn: "MRN-10256",
    age: 46,
    condition: "Hypertension",
    lastVisit: "Aug 05, 2026",
  },
  {
    name: "Michael Brown",
    mrn: "MRN-10301",
    age: 61,
    condition: "Hyperlipidemia",
    lastVisit: "Aug 01, 2026",
  },
  {
    name: "Emma Davis",
    mrn: "MRN-10312",
    age: 38,
    condition: "Arrhythmia",
    lastVisit: "Jul 28, 2026",
  },
];

export default function DoctorDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* BREADCRUMB */}
      <div className="mb-5 flex items-center gap-2">

        <Link
          href="/doctors"
          className="text-[10px] font-semibold text-[#899691] hover:text-[#0f766e]"
        >
          Doctors
        </Link>

        <span className="text-[10px] text-[#c2cbc7]">
          /
        </span>

        <span className="text-[10px] text-[#596963]">
          Dr. Sarah Mitchell
        </span>

      </div>

      {/* PROFILE HEADER */}
      <section className="mb-5 overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        <div className="bg-[#103f3a] px-6 py-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              {/* AVATAR */}
              <div className="relative">

                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[16px] bg-[#d9f0eb] text-[17px] font-bold text-[#0f766e]">
                  SM
                </div>

                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-[#103f3a] bg-[#35a878]" />

              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h1 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
                    Dr. Sarah Mitchell
                  </h1>

                  <span className="rounded-full bg-[#dff4ea]/10 px-2.5 py-1 text-[8px] font-semibold text-[#9de0c5]">
                    Available
                  </span>

                </div>

                <p className="mt-1.5 text-[10px] text-[#a9cbc5]">
                  Cardiology • Cardiology Department • DOC-1001
                </p>

                <p className="mt-1 text-[9px] text-[#7fa49d]">
                  sarah.mitchell@clinic.com
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <button className="rounded-[9px] border border-white/15 bg-white/5 px-3.5 py-2 text-[9px] font-semibold text-[#d5e7e3] hover:bg-white/10">
                Edit Profile
              </button>

              <button
                onClick={() => setShowSchedule(true)}
                className="rounded-[9px] bg-[#e0f4ef] px-4 py-2 text-[9px] font-semibold text-[#0f766e] hover:bg-white"
              >
                View Schedule
              </button>

            </div>

          </div>

        </div>

        {/* PROFILE META */}
        <div className="grid grid-cols-5 divide-x divide-[#edf2f0]">

          <Meta
            label="Specialty"
            value="Cardiology"
          />

          <Meta
            label="Experience"
            value="14 Years"
          />

          <Meta
            label="Patients"
            value="324"
          />

          <Meta
            label="Today"
            value="18 Appointments"
          />

          <Meta
            label="Rating"
            value="4.9 / 5"
          />

        </div>

      </section>

      {/* TABS */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-1 rounded-[10px] border border-[#e4ebe8] bg-white p-1">

          {[
            "Overview",
            "Appointments",
            "Patients",
            "Schedule",
            "Activity",
          ].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-[8px] px-4 py-2 text-[9px] font-semibold transition ${
                activeTab === tab
                  ? "bg-[#e5f5f1] text-[#0f766e]"
                  : "text-[#899691] hover:text-[#0f766e]"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>

        <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-3.5 py-2 text-[9px] font-semibold text-[#667570] hover:bg-[#f7faf9]">
          More Actions
        </button>

      </div>

      {/* =========================
          OVERVIEW
      ========================== */}

      {activeTab === "Overview" && (

        <div className="grid grid-cols-[1fr_340px] gap-5">

          {/* LEFT */}
          <div className="space-y-5">

            {/* ABOUT */}
            <Section
              title="About Doctor"
              subtitle="Professional information"
            >

              <p className="text-[10px] leading-6 text-[#687771]">
                Dr. Sarah Mitchell is a board-certified cardiologist with
                extensive experience in preventive cardiology, hypertension
                management and cardiovascular disease. She provides
                comprehensive cardiac care and focuses on personalized
                treatment plans for every patient.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-4">

                <InfoCard
                  label="Medical School"
                  value="Harvard Medical School"
                />

                <InfoCard
                  label="Specialization"
                  value="Cardiology"
                />

                <InfoCard
                  label="License"
                  value="MD-458921"
                />

              </div>

            </Section>

            {/* TODAY'S SCHEDULE */}
            <Section
              title="Today's Schedule"
              subtitle="Appointments for August 09, 2026"
            >

              <div className="space-y-2">

                {appointments.map((appointment, index) => (

                  <div
                    key={index}
                    className="flex items-center rounded-[11px] border border-[#e5ece9] px-4 py-3 transition hover:bg-[#f9fbfa]"
                  >

                    <div className="w-[85px]">

                      <p className="text-[10px] font-semibold text-[#52615c]">
                        {appointment.time}
                      </p>

                    </div>

                    <div className="flex flex-1 items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f5f1] text-[8px] font-bold text-[#0f766e]">
                        {appointment.patient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>

                        <p className="text-[10px] font-semibold text-[#52615c]">
                          {appointment.patient}
                        </p>

                        <p className="mt-1 text-[8px] text-[#9aa5a1]">
                          {appointment.type}
                        </p>

                      </div>

                    </div>

                    <AppointmentStatus
                      status={appointment.status}
                    />

                    <button className="ml-4 flex h-7 w-7 items-center justify-center rounded-[7px] text-[12px] text-[#9aa5a1] hover:bg-[#e9f5f2] hover:text-[#0f766e]">
                      →
                    </button>

                  </div>

                ))}

              </div>

            </Section>

            {/* RECENT PATIENTS */}
            <Section
              title="Recent Patients"
              subtitle="Patients recently seen by this doctor"
            >

              <div className="overflow-hidden rounded-[10px] border border-[#e5ece9]">

                <div className="grid grid-cols-[1.5fr_0.7fr_1fr_1fr] border-b border-[#edf2f0] bg-[#fafcfb] px-4 py-3">

                  <TableHead text="PATIENT" />

                  <TableHead text="AGE" />

                  <TableHead text="CONDITION" />

                  <TableHead text="LAST VISIT" />

                </div>

                {patients.map((patient) => (

                  <div
                    key={patient.mrn}
                    className="grid grid-cols-[1.5fr_0.7fr_1fr_1fr] items-center border-b border-[#edf2f0] px-4 py-3 last:border-0"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f5f3] text-[8px] font-bold text-[#687771]">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>

                        <p className="text-[9px] font-semibold text-[#52615c]">
                          {patient.name}
                        </p>

                        <p className="mt-1 text-[7px] text-[#a0aaa6]">
                          {patient.mrn}
                        </p>

                      </div>

                    </div>

                    <span className="text-[9px] text-[#687771]">
                      {patient.age}
                    </span>

                    <span className="rounded-full bg-[#f1f5f3] px-2 py-1 text-[7px] text-[#687771] w-fit">
                      {patient.condition}
                    </span>

                    <span className="text-[9px] text-[#687771]">
                      {patient.lastVisit}
                    </span>

                  </div>

                ))}

              </div>

            </Section>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* QUICK ACTIONS */}
            <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#899691]">
                Quick Actions
              </p>

              <ActionButton
                icon="◷"
                title="View Schedule"
                description="Check doctor's availability"
                onClick={() => setShowSchedule(true)}
              />

              <ActionButton
                icon="+"
                title="Book Appointment"
                description="Create appointment"
              />

              <ActionButton
                icon="▣"
                title="View Patients"
                description="Open patient list"
              />

            </section>

            {/* PERFORMANCE */}
            <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

              <SectionHeader
                title="Performance"
                subtitle="Current statistics"
              />

              <div className="grid grid-cols-2 gap-px bg-[#edf2f0]">

                <Stat
                  value="324"
                  label="Total Patients"
                />

                <Stat
                  value="18"
                  label="Today's Visits"
                />

                <Stat
                  value="96%"
                  label="Attendance"
                />

                <Stat
                  value="4.9"
                  label="Rating"
                />

              </div>

            </section>

            {/* AVAILABILITY */}
            <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

              <SectionHeader
                title="Availability"
                subtitle="Weekly working hours"
              />

              <div className="space-y-3 px-5 py-5">

                <Day
                  day="Monday"
                  time="09:00 AM - 05:00 PM"
                />

                <Day
                  day="Tuesday"
                  time="09:00 AM - 05:00 PM"
                />

                <Day
                  day="Wednesday"
                  time="09:00 AM - 05:00 PM"
                />

                <Day
                  day="Thursday"
                  time="09:00 AM - 05:00 PM"
                />

                <Day
                  day="Friday"
                  time="09:00 AM - 03:00 PM"
                />

                <Day
                  day="Saturday"
                  time="09:00 AM - 01:00 PM"
                />

                <Day
                  day="Sunday"
                  time="Off"
                  off
                />

              </div>

            </section>

          </div>

        </div>

      )}

      {/* =========================
          APPOINTMENTS
      ========================== */}

      {activeTab === "Appointments" && (

        <div className="rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-5">

            <div>

              <h2 className="text-[13px] font-semibold text-[#263833]">
                Doctor Appointments
              </h2>

              <p className="mt-1 text-[9px] text-[#98a49f]">
                Today&apos;s appointment schedule
              </p>

            </div>

            <button className="rounded-[9px] bg-[#0f766e] px-4 py-2.5 text-[9px] font-semibold text-white">
              + New Appointment
            </button>

          </div>

          <div className="p-6">

            <div className="space-y-3">

              {appointments.map((appointment, index) => (

                <AppointmentRow
                  key={index}
                  appointment={appointment}
                />

              ))}

            </div>

          </div>

        </div>

      )}

      {/* =========================
          PATIENTS
      ========================== */}

      {activeTab === "Patients" && (

        <div className="rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-5">

            <div>

              <h2 className="text-[13px] font-semibold text-[#263833]">
                Doctor&apos;s Patients
              </h2>

              <p className="mt-1 text-[9px] text-[#98a49f]">
                Patients currently assigned to this doctor
              </p>

            </div>

            <div className="flex h-9 w-[220px] items-center gap-2 rounded-[9px] border border-[#e1e9e5] px-3">

              <span className="text-[#9aa5a1]">
                ⌕
              </span>

              <input
                placeholder="Search patients..."
                className="w-full bg-transparent text-[9px] outline-none placeholder:text-[#a5afab]"
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 p-6">

            {patients.map((patient) => (

              <PatientCard
                key={patient.mrn}
                patient={patient}
              />

            ))}

          </div>

        </div>

      )}

      {/* =========================
          SCHEDULE
      ========================== */}

      {activeTab === "Schedule" && (

        <div className="rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <div className="border-b border-[#edf2f0] px-6 py-5">

            <h2 className="text-[13px] font-semibold text-[#263833]">
              Weekly Schedule
            </h2>

            <p className="mt-1 text-[9px] text-[#98a49f]">
              Doctor availability and working hours
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 p-6">

            <ScheduleCard
              day="Monday"
              time="09:00 AM - 05:00 PM"
              appointments="18 appointments"
            />

            <ScheduleCard
              day="Tuesday"
              time="09:00 AM - 05:00 PM"
              appointments="16 appointments"
            />

            <ScheduleCard
              day="Wednesday"
              time="09:00 AM - 05:00 PM"
              appointments="20 appointments"
            />

            <ScheduleCard
              day="Thursday"
              time="09:00 AM - 05:00 PM"
              appointments="15 appointments"
            />

            <ScheduleCard
              day="Friday"
              time="09:00 AM - 03:00 PM"
              appointments="12 appointments"
            />

            <ScheduleCard
              day="Saturday"
              time="09:00 AM - 01:00 PM"
              appointments="8 appointments"
            />

            <ScheduleCard
              day="Sunday"
              time="Not Available"
              appointments="No appointments"
              off
            />

          </div>

        </div>

      )}

      {/* =========================
          ACTIVITY
      ========================== */}

      {activeTab === "Activity" && (

        <div className="rounded-[18px] border border-[#e4ebe8] bg-white p-6 shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <h2 className="text-[13px] font-semibold text-[#263833]">
            Recent Activity
          </h2>

          <p className="mt-1 text-[9px] text-[#98a49f]">
            Recent actions performed by this doctor
          </p>

          <div className="mt-6">

            <Timeline
              title="Completed consultation"
              description="Completed consultation for Robert Johnson."
              date="Today • 09:45 AM"
            />

            <Timeline
              title="Updated patient record"
              description="Updated clinical information for Sarah Williams."
              date="Today • 10:35 AM"
            />

            <Timeline
              title="Created prescription"
              description="Created a new prescription for Michael Brown."
              date="Aug 08, 2026 • 03:20 PM"
            />

            <Timeline
              title="Schedule updated"
              description="Doctor's availability was updated."
              date="Aug 07, 2026 • 11:10 AM"
              last
            />

          </div>

        </div>

      )}

      {/* SCHEDULE MODAL */}

      {showSchedule && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172522]/30 px-4 backdrop-blur-[3px]">

          <div className="w-full max-w-[620px] overflow-hidden rounded-[18px] bg-white shadow-[0_25px_70px_rgba(20,50,45,0.18)]">

            <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-5">

              <div>

                <h2 className="text-[15px] font-semibold text-[#263833]">
                  Dr. Sarah Mitchell&apos;s Schedule
                </h2>

                <p className="mt-1 text-[9px] text-[#98a49f]">
                  Weekly availability
                </p>

              </div>

              <button
                onClick={() => setShowSchedule(false)}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[16px] text-[#98a49f] hover:bg-[#f4f7f6]"
              >
                ×
              </button>

            </div>

            <div className="space-y-2 px-6 py-5">

              <ScheduleLine
                day="Monday"
                time="09:00 AM - 05:00 PM"
              />

              <ScheduleLine
                day="Tuesday"
                time="09:00 AM - 05:00 PM"
              />

              <ScheduleLine
                day="Wednesday"
                time="09:00 AM - 05:00 PM"
              />

              <ScheduleLine
                day="Thursday"
                time="09:00 AM - 05:00 PM"
              />

              <ScheduleLine
                day="Friday"
                time="09:00 AM - 03:00 PM"
              />

              <ScheduleLine
                day="Saturday"
                time="09:00 AM - 01:00 PM"
              />

              <ScheduleLine
                day="Sunday"
                time="Off"
                off
              />

            </div>

            <div className="flex justify-end border-t border-[#edf2f0] bg-[#fafcfb] px-6 py-4">

              <button
                onClick={() => setShowSchedule(false)}
                className="rounded-[9px] bg-[#0f766e] px-5 py-2.5 text-[9px] font-semibold text-white"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function Meta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-5 py-4">

      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-1.5 text-[10px] font-semibold text-[#52615c]">
        {value}
      </p>

    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

      <div className="mb-5">

        <h2 className="text-[12px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[8px] text-[#98a49f]">
          {subtitle}
        </p>

      </div>

      {children}

    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-[#edf2f0] px-5 py-4">

      <h2 className="text-[12px] font-semibold text-[#263833]">
        {title}
      </h2>

      <p className="mt-1 text-[8px] text-[#98a49f]">
        {subtitle}
      </p>

    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[10px] border border-[#e5ece9] bg-[#fbfcfc] p-3.5">

      <p className="text-[8px] uppercase tracking-[0.06em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-2 text-[10px] font-semibold text-[#52615c]">
        {value}
      </p>

    </div>
  );
}

function TableHead({
  text,
}: {
  text: string;
}) {
  return (
    <span className="text-[8px] font-semibold tracking-[0.1em] text-[#9aa5a1]">
      {text}
    </span>
  );
}

function AppointmentStatus({
  status,
}: {
  status: string;
}) {
  if (status === "Completed") {
    return (
      <span className="rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[8px] font-semibold text-[#278460]">
        Completed
      </span>
    );
  }

  return (
    <span className="rounded-full bg-[#e8f1f5] px-2.5 py-1 text-[8px] font-semibold text-[#527b8a]">
      Upcoming
    </span>
  );
}

function ActionButton({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-3 flex w-full items-center gap-3 rounded-[11px] border border-[#e5ece9] p-3 text-left transition hover:bg-[#f8fbfa]"
    >

      <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e7f5f1] text-[11px] font-bold text-[#0f766e]">
        {icon}
      </div>

      <div>

        <p className="text-[10px] font-semibold text-[#52615c]">
          {title}
        </p>

        <p className="mt-1 text-[8px] text-[#9aa5a1]">
          {description}
        </p>

      </div>

      <span className="ml-auto text-[#a0aaa6]">
        →
      </span>

    </button>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white p-4">

      <p className="text-[19px] font-semibold tracking-[-0.03em] text-[#263833]">
        {value}
      </p>

      <p className="mt-1 text-[8px] text-[#9aa5a1]">
        {label}
      </p>

    </div>
  );
}

function Day({
  day,
  time,
  off = false,
}: {
  day: string;
  time: string;
  off?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[9px] font-medium text-[#667570]">
        {day}
      </span>

      <span
        className={`text-[8px] font-semibold ${
          off ? "text-[#a0aaa6]" : "text-[#52615c]"
        }`}
      >
        {time}
      </span>

    </div>
  );
}

function PatientCard({
  patient,
}: {
  patient: {
    name: string;
    mrn: string;
    age: number;
    condition: string;
    lastVisit: string;
  };
}) {
  return (
    <div className="rounded-[12px] border border-[#e5ece9] p-4 transition hover:bg-[#f9fbfa]">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f5f1] text-[9px] font-bold text-[#0f766e]">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>

          <p className="text-[10px] font-semibold text-[#52615c]">
            {patient.name}
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            {patient.mrn}
          </p>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-[8px] text-[#9aa5a1]">
          {patient.age} years
        </span>

        <span className="rounded-full bg-[#f0f5f3] px-2 py-1 text-[7px] text-[#667570]">
          {patient.condition}
        </span>

      </div>

      <p className="mt-3 text-[8px] text-[#9aa5a1]">
        Last visit: {patient.lastVisit}
      </p>

    </div>
  );
}

function AppointmentRow({
  appointment,
}: {
  appointment: {
    time: string;
    patient: string;
    type: string;
    status: string;
  };
}) {
  return (
    <div className="flex items-center rounded-[12px] border border-[#e5ece9] p-4 hover:bg-[#f9fbfa]">

      <div className="w-[100px]">

        <p className="text-[11px] font-semibold text-[#52615c]">
          {appointment.time}
        </p>

      </div>

      <div className="flex flex-1 items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f5f1] text-[9px] font-bold text-[#0f766e]">
          {appointment.patient
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>

          <p className="text-[10px] font-semibold text-[#52615c]">
            {appointment.patient}
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            {appointment.type}
          </p>

        </div>

      </div>

      <AppointmentStatus
        status={appointment.status}
      />

      <button className="ml-5 rounded-[8px] border border-[#e1e9e5] px-3 py-2 text-[8px] font-semibold text-[#687771] hover:bg-[#f7faf9]">
        View
      </button>

    </div>
  );
}

function ScheduleCard({
  day,
  time,
  appointments,
  off = false,
}: {
  day: string;
  time: string;
  appointments: string;
  off?: boolean;
}) {
  return (
    <div
      className={`rounded-[12px] border p-4 ${
        off
          ? "border-[#edf0ef] bg-[#fafbfb]"
          : "border-[#e5ece9] bg-white"
      }`}
    >

      <div className="flex items-center justify-between">

        <p className="text-[10px] font-semibold text-[#52615c]">
          {day}
        </p>

        {!off && (
          <span className="h-2 w-2 rounded-full bg-[#35a878]" />
        )}

      </div>

      <p
        className={`mt-3 text-[10px] font-semibold ${
          off ? "text-[#a0aaa6]" : "text-[#0f766e]"
        }`}
      >
        {time}
      </p>

      <p className="mt-1 text-[8px] text-[#9aa5a1]">
        {appointments}
      </p>

    </div>
  );
}

function ScheduleLine({
  day,
  time,
  off = false,
}: {
  day: string;
  time: string;
  off?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#e5ece9] px-4 py-3">

      <span className="text-[9px] font-semibold text-[#52615c]">
        {day}
      </span>

      <span
        className={`text-[9px] font-semibold ${
          off ? "text-[#a0aaa6]" : "text-[#0f766e]"
        }`}
      >
        {time}
      </span>

    </div>
  );
}

function Timeline({
  title,
  description,
  date,
  last = false,
}: {
  title: string;
  description: string;
  date: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">

      {!last && (
        <div className="absolute left-[10px] top-[25px] h-[70px] w-px bg-[#dce8e4]" />
      )}

      <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f5f1] text-[7px] text-[#0f766e]">
        •
      </div>

      <div className="pb-8">

        <p className="text-[10px] font-semibold text-[#52615c]">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-5 text-[#8b9893]">
          {description}
        </p>

        <p className="mt-1 text-[8px] text-[#a0aaa6]">
          {date}
        </p>

      </div>

    </div>
  );
}