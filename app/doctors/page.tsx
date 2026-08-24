"use client";

import { useState } from "react";
import Link from "next/link";
import CreateStaffModal from "@/components/dashboard/CreateStaffModal";
import GlassCard3D from "@/components/common/GlassCard3D";
import { UserCheck, Search, Filter, Plus, Stethoscope, ArrowRight, User } from "lucide-react";

const initialDoctors = [
  {
    id: "DOC-1001",
    name: "Dr. Sarah Mitchell",
    initials: "SM",
    specialty: "Cardiology",
    department: "Cardiology",
    experience: "14 years",
    patients: 324,
    appointments: 18,
    status: "Available",
    email: "sarah.mitchell@clinic.com",
  },
  {
    id: "DOC-1002",
    name: "Dr. Michael Anderson",
    initials: "MA",
    specialty: "Internal Medicine",
    department: "Medicine",
    experience: "11 years",
    patients: 287,
    appointments: 14,
    status: "Available",
    email: "michael.anderson@clinic.com",
  },
  {
    id: "DOC-1003",
    name: "Dr. Emily Carter",
    initials: "EC",
    specialty: "Dermatology",
    department: "Dermatology",
    experience: "9 years",
    patients: 192,
    appointments: 11,
    status: "In Consultation",
    email: "emily.carter@clinic.com",
  },
  {
    id: "DOC-1004",
    name: "Dr. James Wilson",
    initials: "JW",
    specialty: "Orthopedics",
    department: "Orthopedics",
    experience: "16 years",
    patients: 356,
    appointments: 16,
    status: "Available",
    email: "james.wilson@clinic.com",
  },
  {
    id: "DOC-1005",
    name: "Dr. Olivia Brown",
    initials: "OB",
    specialty: "Pediatrics",
    department: "Pediatrics",
    experience: "8 years",
    patients: 241,
    appointments: 13,
    status: "Offline",
    email: "olivia.brown@clinic.com",
  },
];

const specialties = [
  "All Specialties",
  "Cardiology",
  "Internal Medicine",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Neurology",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDoctors = doctors.filter((doctor) => {
    const searchMatch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.id.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase());

    const specialtyMatch =
      specialty === "All Specialties" || doctor.specialty === specialty;

    const statusMatch = statusFilter === "All" || doctor.status === statusFilter;

    return searchMatch && specialtyMatch && statusMatch;
  });

  const handleCreateStaff = (staffData: Record<string, unknown>) => {
    const name = (staffData.name as string) || "";
    const created = {
      id: (staffData.id as string) || `DOC-${1006 + doctors.length}`,
      name,
      initials: name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      specialty: staffData.specialty as string,
      department: staffData.department as string,
      experience: staffData.experience as string,
      patients: 120,
      appointments: 10,
      status: (staffData.status as string) || "Available",
      email: staffData.email as string,
    };
    setDoctors([created, ...doctors]);
  };

  return (
    <div className="w-full space-y-6 pb-10">
      {/* 3D Header Banner */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f2d28] tracking-tight flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-[#0f766e]" />
              Staff & Doctor Directory
            </h1>
            <p className="text-xs font-semibold text-[#54736b]">
              Manage hospital staff, clinical specialties, and consultation schedules.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Add Doctor</span>
          </button>
        </div>
      </GlassCard3D>

      {/* Summary Stat Strip with 3D Depth */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase text-[#5c7a72]">Total Doctors</p>
              <p className="mt-1 text-2xl font-black text-[#0f2d28]">42</p>
              <span className="text-[10px] font-bold text-[#0f766e]">Registered Staff</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7] font-bold">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase text-[#5c7a72]">Available Now</p>
              <p className="mt-1 text-2xl font-black text-[#10b981]">28</p>
              <span className="text-[10px] font-bold text-[#10b981]">Ready for consult</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcfce7] text-[#166534] font-bold">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase text-[#5c7a72]">Departments</p>
              <p className="mt-1 text-2xl font-black text-[#0284c7]">12</p>
              <span className="text-[10px] font-bold text-[#0284c7]">Specialty units</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7] font-bold">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase text-[#5c7a72]">Today Consults</p>
              <p className="mt-1 text-2xl font-black text-[#d97706]">81</p>
              <span className="text-[10px] font-bold text-[#d97706]">Scheduled today</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fef3c7] text-[#d97706] font-bold">
              <User className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>
      </div>

      {/* Staff Table in 3D Card */}
      <GlassCard3D depth={30}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#cbe3db]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5e7d76]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor..."
                className="h-9 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-medium text-[#0f2d28] outline-none focus:border-[#0f766e]"
              />
            </div>

            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="h-9 rounded-xl border border-[#bfe0d6] bg-white px-3 text-xs font-bold text-[#0f766e] outline-none cursor-pointer"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {["All", "Available", "Offline"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  statusFilter === status
                    ? "bg-[#0f766e] text-white shadow-xs"
                    : "bg-white border border-[#bfe0d6] text-[#4d6b63] hover:bg-[#eaf4f1]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#cbe3db] bg-white/90 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#cbe3db] bg-[#edf6f3] text-[#0f766e] font-bold">
                <th className="p-3.5">Doctor Name</th>
                <th className="p-3.5">Specialty & Dept</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Patients Care</th>
                <th className="p-3.5">Today Consults</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4f2ee]">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#f2faf7] transition-colors">
                  <td className="p-3.5 font-bold text-[#0f2d28] flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#d6ece6] text-[#0f766e] font-black flex items-center justify-center">
                      {doc.initials}
                    </div>
                    <div>
                      <p className="font-bold text-[#0f2d28]">{doc.name}</p>
                      <p className="text-[10px] text-[#5c7a72] font-mono">{doc.email}</p>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-[#0f766e]">{doc.specialty}</p>
                    <p className="text-[10px] text-[#5c7a72]">{doc.department}</p>
                  </td>
                  <td className="p-3.5 text-[#527068] font-medium">{doc.experience}</td>
                  <td className="p-3.5 font-bold text-[#0284c7]">{doc.patients} patients</td>
                  <td className="p-3.5 font-bold text-[#0f766e]">{doc.appointments} appts</td>
                  <td className="p-3.5">
                    <span
                      className={`badge ${
                        doc.status === "Available"
                          ? "badge-success"
                          : doc.status === "In Consultation"
                          ? "badge-warning"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-[#0f766e] font-bold hover:underline focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-sm outline-none"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard3D>

      {/* 3D Translucent Glass Create Staff Modal */}
      <CreateStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateStaff}
      />
    </div>
  );
}