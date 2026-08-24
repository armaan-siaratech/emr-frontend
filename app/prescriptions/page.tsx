"use client";

import { Plus, Search, Filter } from "lucide-react";


export default function PrescriptionsPage() {
  const prescriptions = [
    { id: "RX-9082", patient: "Robert Johnson", medication: "Lisinopril 10mg Tablet", dosage: "1 tablet daily", status: "Active", doctor: "Dr. John Smith", date: "Today" },
    { id: "RX-9083", patient: "Sarah Williams", medication: "Metformin 500mg Extended Release", dosage: "2 tablets twice daily", status: "Active", doctor: "Dr. John Smith", date: "Yesterday" },
    { id: "RX-9084", patient: "Michael Brown", medication: "Amoxicillin 500mg Capsule", dosage: "1 capsule 3x daily", status: "Completed", doctor: "Dr. Emily Davis", date: "Aug 10, 2026" },
    { id: "RX-9085", patient: "Emily Davis", medication: "Atorvastatin 20mg Tablet", dosage: "1 tablet at bedtime", status: "Active", doctor: "Dr. John Smith", date: "Aug 08, 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="badge badge-teal mb-1">e-Prescriptions (eRx)</span>
          <h1 className="text-2xl font-bold tracking-tight text-[#172522]">Prescriptions & Pharmacy Orders</h1>
          <p className="text-xs text-[#667570] mt-0.5">Manage electronic medical prescriptions, refills, and pharmacy sync.</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4" />
          <span>New e-Prescription</span>
        </button>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9aa7a3]" />
          <input
            type="text"
            placeholder="Search patient, medication name, or Rx ID..."
            className="field-input pl-10"
          />
        </div>
        <button className="btn-secondary w-full sm:w-auto">
          <Filter className="h-4 w-4" />
          <span>Filter Status</span>
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f6faf8] border-b border-[#e4ebe8] text-[#52635d] uppercase font-bold text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Rx ID</th>
                <th className="px-6 py-3.5">Patient</th>
                <th className="px-6 py-3.5">Medication & Dosage</th>
                <th className="px-6 py-3.5">Prescriber</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Prescribed</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4ebe8]">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-[#f0f7f5] transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#0f766e]">{rx.id}</td>
                  <td className="px-6 py-4 font-semibold text-[#172522]">{rx.patient}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#172522]">{rx.medication}</p>
                    <p className="text-[11px] text-[#667570]">{rx.dosage}</p>
                  </td>
                  <td className="px-6 py-4 text-[#667570]">{rx.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${rx.status === 'Active' ? 'badge-success' : 'badge-info'}`}>
                      {rx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#667570]">{rx.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-[#0f766e] hover:underline">Print / Send eRx</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
