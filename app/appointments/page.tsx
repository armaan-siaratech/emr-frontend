"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import GlassCard3D from "@/components/common/GlassCard3D";
import CreateAppointmentModal from "@/components/dashboard/CreateAppointmentModal";

const appointments = [
  {
    time: "09:00",
    period: "AM",
    patient: "Robert Johnson",
    initials: "RJ",
    type: "General Consultation",
    provider: "Dr. John",
    status: "Checked in",
    duration: "30 min",
    room: "Exam Room 1",
  },
  {
    time: "09:30",
    period: "AM",
    patient: "Sarah Williams",
    initials: "SW",
    type: "Follow-up Visit",
    provider: "Dr. John",
    status: "Upcoming",
    duration: "30 min",
    room: "Exam Room 2",
  },
  {
    time: "10:30",
    period: "AM",
    patient: "Michael Brown",
    initials: "MB",
    type: "Routine Checkup",
    provider: "Dr. John",
    status: "Upcoming",
    duration: "45 min",
    room: "Exam Room 1",
  },
  {
    time: "11:30",
    period: "AM",
    patient: "Emily Davis",
    initials: "ED",
    type: "Consultation",
    provider: "Dr. John",
    status: "Upcoming",
    duration: "30 min",
    room: "Exam Room 3",
  },
];

const weekDays = [
  { day: "MON", date: "10" },
  { day: "TUE", date: "11" },
  { day: "WED", date: "12" },
  { day: "THU", date: "13" },
  { day: "FRI", date: "14" },
  { day: "SAT", date: "15" },
  { day: "SUN", date: "16" },
];

export default function AppointmentsPage() {
  const [view, setView] = useState<"day" | "week">("day");
  const [selectedDate, setSelectedDate] = useState("14");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full space-y-6 pb-10">
      {/* 3D Header Banner */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f2d28] tracking-tight">
              Appointment Scheduler & Calendar
            </h1>
            <p className="text-xs font-semibold text-[#54736b]">
              Manage daily clinical appointments, room schedules, and patient bookings.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </GlassCard3D>

      {/* Stats Strip with 3D Depth */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard3D depth={20}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#5c7a72]">
            Today Appointments
          </p>
          <p className="mt-1 text-2xl font-black text-[#0f2d28]">18</p>
          <span className="text-[10px] font-bold text-[#0f766e]">Scheduled today</span>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#5c7a72]">
            Completed
          </p>
          <p className="mt-1 text-2xl font-black text-[#10b981]">07</p>
          <span className="text-[10px] font-bold text-[#10b981]">Completed today</span>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#5c7a72]">
            Upcoming
          </p>
          <p className="mt-1 text-2xl font-black text-[#0284c7]">09</p>
          <span className="text-[10px] font-bold text-[#0284c7]">Remaining today</span>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#5c7a72]">
            Cancelled
          </p>
          <p className="mt-1 text-2xl font-black text-[#d97706]">02</p>
          <span className="text-[10px] font-bold text-[#d97706]">Rescheduled</span>
        </GlassCard3D>
      </div>

      {/* Main Calendar Card in 3D */}
      <GlassCard3D depth={30}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#cbe3db]">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-[#0f2d28]">August 14, 2026</h2>
            <span className="text-xs font-bold text-[#0f766e] bg-white px-3 py-1 rounded-full border border-[#bfe0d6]">
              Today
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("day")}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                view === "day"
                  ? "bg-[#0f766e] text-white shadow-xs"
                  : "bg-white border border-[#bfe0d6] text-[#4d6b63]"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                view === "week"
                  ? "bg-[#0f766e] text-white shadow-xs"
                  : "bg-white border border-[#bfe0d6] text-[#4d6b63]"
              }`}
            >
              Week
            </button>
          </div>
        </div>

        {/* Appointment List */}
        <div className="space-y-3">
          {appointments.map((appt) => (
            <div
              key={appt.patient}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#d6ece6] text-[#0f766e] font-black flex items-center justify-center">
                  {appt.initials}
                </div>
                <div>
                  <p className="font-bold text-[#0f2d28]">{appt.patient}</p>
                  <p className="text-[10px] text-[#5c7a72]">
                    {appt.type} · {appt.room}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-[#0f766e]">
                  {appt.time} {appt.period} ({appt.duration})
                </span>
                <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-bold text-[#166534]">
                  {appt.status}
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[#0f766e] font-extrabold hover:underline text-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard3D>

      {/* Appointment Booking Modal */}
      <CreateAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
