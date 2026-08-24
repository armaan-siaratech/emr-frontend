"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CreatePatientModal from "@/components/dashboard/CreatePatientModal";
import GlassCard3D from "@/components/common/GlassCard3D";
import {
  Users,
  Search,
  Filter,
  Plus,
  UserCheck,
  UserPlus,
  ArrowRight,
  Eye,
  Activity,
  HeartPulse,
} from "lucide-react";

const initialPatients = [
  {
    name: "Robert Johnson",
    mrn: "MRN-10241",
    age: 54,
    gender: "Male",
    phone: "(555) 123-4567",
    condition: "Hypertension",
    lastVisit: "Today, 09:00 AM",
    status: "Active",
    initials: "RJ",
    doctor: "Dr. Arisara",
  },
  {
    name: "Sarah Williams",
    mrn: "MRN-10242",
    age: 42,
    gender: "Female",
    phone: "(555) 234-5678",
    condition: "Type 2 Diabetes",
    lastVisit: "Yesterday",
    status: "Active",
    initials: "SW",
    doctor: "Dr. Arisara",
  },
  {
    name: "Michael Brown",
    mrn: "MRN-10243",
    age: 67,
    gender: "Male",
    phone: "(555) 345-6789",
    condition: "Heart Failure",
    lastVisit: "Aug 05, 2026",
    status: "Active",
    initials: "MB",
    doctor: "Dr. John Smith",
  },
  {
    name: "Emily Davis",
    mrn: "MRN-10244",
    age: 31,
    gender: "Female",
    phone: "(555) 456-7890",
    condition: "Migraine",
    lastVisit: "Aug 03, 2026",
    status: "Active",
    initials: "ED",
    doctor: "Dr. John Smith",
  },
  {
    name: "David Wilson",
    mrn: "MRN-10245",
    age: 59,
    gender: "Male",
    phone: "(555) 567-8901",
    condition: "Asthma",
    lastVisit: "Jul 29, 2026",
    status: "Inactive",
    initials: "DW",
    doctor: "Dr. Arisara",
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchText = search.toLowerCase().trim();
      const matchesSearch =
        patient.name.toLowerCase().includes(searchText) ||
        patient.mrn.toLowerCase().includes(searchText) ||
        patient.condition.toLowerCase().includes(searchText) ||
        patient.phone.toLowerCase().includes(searchText);

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Active" && patient.status === "Active") ||
        (activeTab === "Inactive" && patient.status === "Inactive");

      return matchesSearch && matchesTab;
    });
  }, [patients, search, activeTab]);

  const activeCount = patients.filter((p) => p.status === "Active").length;
  const inactiveCount = patients.filter((p) => p.status === "Inactive").length;

  const handleCreatePatient = (newPatientData: Record<string, unknown>) => {
    const name = newPatientData.name as string | undefined;
    const gender = newPatientData.gender as string | undefined;
    const conditions = newPatientData.conditions as string[] | undefined;
    const created = {
      name: name || "New Patient",
      mrn: `MRN-${10250 + patients.length}`,
      age: 35,
      gender: gender && gender !== "Select Gender" ? gender : "Female",
      phone: (newPatientData.contact as string) || "(555) 019-2834",
      condition: conditions?.[0] || "General Checkup",
      lastVisit: "Today",
      status: "Active",
      initials: name
        ? name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : "NP",
      doctor: (newPatientData.doctor as string) || "Dr. Arisara",
    };
    setPatients([created, ...patients]);
  };

  return (
    <div className="w-full space-y-6 pb-10">
      {/* 3D Top Header Banner */}
      <GlassCard3D depth={15}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f2d28] tracking-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-[#0f766e]" />
              Patient Management Directory
            </h1>
            <p className="text-xs font-semibold text-[#54736b]">
              Manage patient records, clinical charts, and enrollment for the practice.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </GlassCard3D>

      {/* Summary Stat Cards with 3D Depth */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5c7a72]">
                Total Patients
              </p>
              <p className="mt-1 text-2xl font-black text-[#0f2d28]">248</p>
              <span className="text-[10px] font-bold text-[#10b981]">+12.4% vs last month</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e0f2fe] text-[#0284c7] font-bold">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5c7a72]">
                Active Care
              </p>
              <p className="mt-1 text-2xl font-black text-[#0f766e]">{activeCount}</p>
              <span className="text-[10px] font-bold text-[#0f766e]">Currently Under Care</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dcfce7] text-[#166534] font-bold">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>

        <GlassCard3D depth={20}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5c7a72]">
                New Registrations
              </p>
              <p className="mt-1 text-2xl font-black text-[#d97706]">16</p>
              <span className="text-[10px] font-bold text-[#d97706]">Added this month</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fef3c7] text-[#d97706] font-bold">
              <UserPlus className="h-5 w-5" />
            </div>
          </div>
        </GlassCard3D>
      </div>

      {/* Main Patient Directory Card in 3D */}
      <GlassCard3D depth={30}>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#cbe3db]">
          <div>
            <h2 className="text-base font-bold text-[#0f2d28]">Patient Records</h2>
            <p className="text-xs text-[#5c7a72] font-semibold">
              Displaying {filteredPatients.length} patient records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5e7d76]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients..."
                className="h-9 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-medium text-[#0f2d28] outline-none focus:border-[#0f766e]"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                showFilter
                  ? "border-[#0f766e] bg-[#d9f0ea] text-[#0f766e]"
                  : "border-[#bfe0d6] bg-white text-[#4d6b63] hover:bg-[#eaf4f1]"
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 mb-5">
          {["All", "Active", "Inactive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#0f766e] text-white shadow-xs"
                  : "bg-white border border-[#bfe0d6] text-[#4d6b63] hover:bg-[#eaf4f1]"
              }`}
            >
              {tab} (
              {tab === "All"
                ? patients.length
                : tab === "Active"
                ? activeCount
                : inactiveCount}
              )
            </button>
          ))}
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#cbe3db] bg-white/90 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#cbe3db] bg-[#edf6f3] text-[#0f766e] font-bold">
                <th className="p-3.5">Patient Name</th>
                <th className="p-3.5">MRN Code</th>
                <th className="p-3.5">Age / Gender</th>
                <th className="p-3.5">Assigned Doctor</th>
                <th className="p-3.5">Condition</th>
                <th className="p-3.5">Last Visit</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4f2ee]">
              {filteredPatients.map((patient) => (
                <tr key={patient.mrn} className="hover:bg-[#f2faf7] transition-colors">
                  <td className="p-3.5 font-bold text-[#0f2d28] flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#d6ece6] text-[#0f766e] text-xs font-black flex items-center justify-center">
                      {patient.initials}
                    </div>
                    <div>
                      <p className="font-bold text-[#0f2d28]">{patient.name}</p>
                      <p className="text-[10px] text-[#5c7a72] font-mono">{patient.phone}</p>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#0f766e]">{patient.mrn}</td>
                  <td className="p-3.5 text-[#527068] font-medium">
                    {patient.age} yrs / {patient.gender}
                  </td>
                  <td className="p-3.5 font-semibold text-[#0284c7]">{patient.doctor}</td>
                  <td className="p-3.5">
                    <span className="badge badge-info">{patient.condition}</span>
                  </td>
                  <td className="p-3.5 text-[#527068] font-medium">{patient.lastVisit}</td>
                  <td className="p-3.5">
                    <span
                      className={`badge ${
                        patient.status === "Active" ? "badge-success" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-[#0f766e] font-bold hover:underline focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-sm outline-none"
                    >
                      View / Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard3D>

      {/* Translucent Glass Create Patient Modal */}
      <CreatePatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreatePatient}
      />
    </div>
  );
}