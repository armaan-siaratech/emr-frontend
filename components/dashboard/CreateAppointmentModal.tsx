"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CalendarClock,
  Search,
  Stethoscope,
  Clock,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (appointmentData: Record<string, unknown>) => void;
}

const appointmentTypes = [
  "General Consultation",
  "Follow-up Visit",
  "Routine Checkup",
  "Consultation",
  "Emergency Visit",
  "Lab Review",
];

const durations = ["15 min", "30 min", "45 min", "60 min"];

const statuses = ["Upcoming", "Checked in", "Completed", "Cancelled"];

export default function CreateAppointmentModal({
  isOpen,
  onClose,
  onSave,
}: CreateAppointmentModalProps) {
  const [patientName, setPatientName] = useState("");
  const [provider, setProvider] = useState("Dr. John");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [duration, setDuration] = useState("30 min");
  const [appointmentType, setAppointmentType] = useState(appointmentTypes[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        patient: patientName || "New Patient",
        provider,
        date: appointmentDate,
        time: appointmentTime,
        duration,
        type: appointmentType,
        status,
        notes,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with translucent blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
          />

          {/* Translucent Glass Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/40 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto"
          >
            {/* Ambient cyan corner highlights */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

            {/* Modal Header */}
            <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                <CalendarClock className="h-6 w-6 text-[#0f766e]" />
                New Appointment
              </h2>

              <button
                onClick={onClose}
                className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* SECTION 1: PATIENT & PROVIDER */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                  Patient & Provider
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Patient Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Search patient..."
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 pl-3 pr-9 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#63827a]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Doctor / Provider
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        placeholder="Search doctor..."
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 pl-3 pr-9 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                      <Stethoscope className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#63827a]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: SCHEDULE */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Schedule
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs cursor-pointer"
                    >
                      {durations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: VISIT DETAILS */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Visit Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Appointment Type / Reason
                    </label>
                    <select
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs cursor-pointer"
                    >
                      {appointmentTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional notes for this visit..."
                      rows={3}
                      className="w-full rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* FOOTER ACTION BUTTONS */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button type="submit" className="btn-primary w-48 justify-center py-3">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Save Appointment</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary w-48 justify-center py-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
