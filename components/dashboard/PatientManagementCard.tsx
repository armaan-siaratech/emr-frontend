"use client";

import { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, User, UserPlus, Check, X } from "lucide-react";

interface PatientRecord {
  id: string;
  name: string;
  dob: string;
  contact: string;
  lastVisit: string;
  assignedDoctor: string;
  primaryDiagnosis: string;
  avatar: string;
}

const initialPatients: PatientRecord[] = [
  {
    id: "P-1234",
    name: "James Wilson",
    dob: "04/13/1988",
    contact: "+1 5056 2869",
    lastVisit: "04/19/2021",
    assignedDoctor: "Dr. Arisara",
    primaryDiagnosis: "General Medicine",
    avatar: "JW",
  },
  {
    id: "P-1224",
    name: "Janes Smith",
    dob: "05/14/1989",
    contact: "+1 5656 7868",
    lastVisit: "04/19/2021",
    assignedDoctor: "Dr. Arisara",
    primaryDiagnosis: "General Medicine",
    avatar: "JS",
  },
  {
    id: "P-1235",
    name: "James Wilson",
    dob: "10/15/1983",
    contact: "+1 5656 7068",
    lastVisit: "04/19/2021",
    assignedDoctor: "Dr. Arisara",
    primaryDiagnosis: "Orthopedics",
    avatar: "JW",
  },
  {
    id: "P-1226",
    name: "James Wilson",
    dob: "12/12/1989",
    contact: "+1 5656 7069",
    lastVisit: "04/19/2021",
    assignedDoctor: "Dr. Arisara",
    primaryDiagnosis: "Orthopedics",
    avatar: "JW",
  },
  {
    id: "P-1237",
    name: "Janes Smith",
    dob: "18/12/1999",
    contact: "+1 5656 7808",
    lastVisit: "04/19/2021",
    assignedDoctor: "Dr. Arisara",
    primaryDiagnosis: "General Medicine",
    avatar: "JS",
  },
];

export default function PatientManagementCard() {
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDiag, setFilterDiag] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Patient Form State
  const [newPatient, setNewPatient] = useState({
    name: "",
    dob: "",
    contact: "",
    assignedDoctor: "Dr. Arisara",
    primaryDiagnosis: "General Medicine",
  });

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiag = filterDiag === "All" || p.primaryDiagnosis === filterDiag;
    return matchesSearch && matchesDiag;
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name) return;

    const created: PatientRecord = {
      id: `P-${1238 + patients.length}`,
      name: newPatient.name,
      dob: newPatient.dob || "01/01/1990",
      contact: newPatient.contact || "+1 5550 0199",
      lastVisit: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      assignedDoctor: newPatient.assignedDoctor,
      primaryDiagnosis: newPatient.primaryDiagnosis,
      avatar: newPatient.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };

    setPatients([created, ...patients]);
    setNewPatient({
      name: "",
      dob: "",
      contact: "",
      assignedDoctor: "Dr. Arisara",
      primaryDiagnosis: "General Medicine",
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="card-medicare p-5 sm:p-6 transition-all duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px] sm:text-[19px] font-bold text-[#0f2d28]">
            Patient Management Dashboard
          </h2>
        </div>

        {/* Top Right Header Pills */}
        <div className="flex items-center gap-3">
          <button className="h-8 w-8 rounded-full border border-[#bcdad1] bg-white flex items-center justify-center text-[#0f766e] hover:bg-[#d9f0ea]">
            <span className="h-2 w-2 rounded-full bg-[#10b981]" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-[#bcdad1] bg-white px-3 py-1 text-xs text-[#0f766e] font-semibold">
            <User className="h-3.5 w-3.5" />
            <span>Admin User (Super Administrator)</span>
          </div>
        </div>
      </div>

      {/* Action Bar: + Add Patient, Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#0f766e] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#0d5c56] hover:shadow-md active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Patient</span>
          </button>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5e7d76]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="h-9 w-full rounded-xl border border-[#bfe0d6] bg-white pl-9 pr-3 text-xs font-medium text-[#0f2d28] outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-[#bfe0d6] bg-white px-3 py-1.5 text-xs font-semibold text-[#0f766e]">
            <Filter className="h-3.5 w-3.5 text-[#0f766e]" />
            <span>Filter by</span>
            <select
              value={filterDiag}
              onChange={(e) => setFilterDiag(e.target.value)}
              className="bg-transparent font-bold text-[#0f766e] outline-none cursor-pointer"
            >
              <option value="All">All Diagnoses</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
            </select>
          </div>
        </div>
      </div>

      {/* Performance Flow / Sankey Node Diagram */}
      <div className="mb-6 rounded-2xl border border-[#c3e3d9] bg-gradient-to-r from-[#eef8f5] via-[#e4f5f0] to-[#eef8f5] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#0f766e] uppercase tracking-wider">
            Performance Flow
          </span>
          <span className="text-xs font-bold text-[#0f766e] bg-white px-2.5 py-1 rounded-full border border-[#bfe0d6]">
            36 Admitted
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-around gap-4 py-2">
          {/* Node 1 */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0f766e] bg-white font-bold text-xs text-[#0f766e] shadow-sm">
              Overall
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Overall Status</span>
          </div>

          <div className="hidden sm:block h-1 w-12 bg-gradient-to-r from-[#0f766e] to-[#14b8a6] rounded-full" />

          {/* Node 2 */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#0f766e] to-[#14b8a6] font-bold text-xs text-white shadow-sm">
              Patients
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Flex Admitted (36)</span>
          </div>

          <div className="hidden sm:block h-1 w-12 bg-gradient-to-r from-[#14b8a6] to-[#0284c7] rounded-full" />

          {/* Node 3 */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-20 items-center justify-center rounded-full bg-[#0284c7] font-bold text-xs text-white shadow-sm">
              Staff
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Staff Utilization</span>
          </div>

          <div className="hidden sm:block h-1 w-12 bg-gradient-to-r from-[#0284c7] to-[#0f766e] rounded-full" />

          {/* Node 4 */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0284c7] bg-white font-bold text-xs text-[#0284c7] shadow-sm">
              Wards
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Wards & Resources</span>
          </div>
        </div>
      </div>

      {/* Patient Records Table */}
      <div className="overflow-x-auto rounded-xl border border-[#cbe3db] bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#cbe3db] bg-[#edf6f3] text-[#0f766e] font-bold">
              <th className="p-3 w-10">
                <input type="checkbox" className="rounded border-[#a5cdc2]" />
              </th>
              <th className="p-3">Patient ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Last Visit</th>
              <th className="p-3">Assigned Doctor</th>
              <th className="p-3">Primary Diagnosis</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4f2ee]">
            {filteredPatients.map((p) => (
              <tr key={p.id} className="hover:bg-[#f2faf7] transition-colors">
                <td className="p-3">
                  <input type="checkbox" className="rounded border-[#a5cdc2]" />
                </td>
                <td className="p-3 font-bold text-[#0f766e]">{p.id}</td>
                <td className="p-3 font-bold text-[#0f2d28] flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#d6ece6] text-[#0f766e] text-[10px] font-extrabold flex items-center justify-center">
                    {p.avatar}
                  </div>
                  <span>{p.name}</span>
                </td>
                <td className="p-3 text-[#527068] font-medium">{p.dob}</td>
                <td className="p-3 text-[#527068] font-mono">{p.contact}</td>
                <td className="p-3 text-[#527068] font-medium">{p.lastVisit}</td>
                <td className="p-3 font-semibold text-[#0f766e]">{p.assignedDoctor}</td>
                <td className="p-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      p.primaryDiagnosis === "General Medicine"
                        ? "bg-[#e0f2fe] text-[#0369a1]"
                        : "bg-[#dcfce7] text-[#15803d]"
                    }`}
                  >
                    {p.primaryDiagnosis}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className="text-[#0f766e] font-bold hover:underline">
                    View / Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Add Patient */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#bfe0d6] animate-scale-in">
            <div className="flex items-center justify-between mb-4 border-b border-[#e4f2ee] pb-3">
              <h3 className="text-base font-bold text-[#0f2d28]">Add New Patient</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#64857d] hover:text-[#0f766e]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#35544d] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="e.g. James Wilson"
                  className="w-full rounded-xl border border-[#bfe0d6] p-2.5 text-xs outline-none focus:border-[#0f766e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#35544d] mb-1">DOB</label>
                  <input
                    type="text"
                    value={newPatient.dob}
                    onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                    placeholder="04/13/1988"
                    className="w-full rounded-xl border border-[#bfe0d6] p-2.5 text-xs outline-none focus:border-[#0f766e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#35544d] mb-1">Contact</label>
                  <input
                    type="text"
                    value={newPatient.contact}
                    onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
                    placeholder="+1 5056 2869"
                    className="w-full rounded-xl border border-[#bfe0d6] p-2.5 text-xs outline-none focus:border-[#0f766e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#35544d] mb-1">Primary Diagnosis</label>
                <select
                  value={newPatient.primaryDiagnosis}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, primaryDiagnosis: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#bfe0d6] p-2.5 text-xs outline-none focus:border-[#0f766e]"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Cardiology">Cardiology</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#bfe0d6] text-xs font-bold text-[#54736b] hover:bg-[#edf6f3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0f766e] text-xs font-bold text-white hover:bg-[#0d5c56]"
                >
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
