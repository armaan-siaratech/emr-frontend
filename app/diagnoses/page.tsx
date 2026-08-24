"use client";

import { Search, Plus, Filter } from "lucide-react";

export default function DiagnosesPage() {
  const diagnoses = [
    { code: "I10", description: "Essential (primary) hypertension", category: "Cardiovascular", activeCases: 142, riskLevel: "Moderate" },
    { code: "E11.9", description: "Type 2 diabetes mellitus without complications", category: "Endocrine", activeCases: 98, riskLevel: "Moderate" },
    { code: "J45.909", description: "Unspecified asthma, uncomplicated", category: "Respiratory", activeCases: 64, riskLevel: "Mild" },
    { code: "M54.5", description: "Low back pain, unspecified", category: "Musculoskeletal", activeCases: 89, riskLevel: "Low" },
    { code: "F41.1", description: "Generalized anxiety disorder", category: "Psychiatry", activeCases: 53, riskLevel: "Mild" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="badge badge-teal mb-1">EHR ICD-10 Directory</span>
          <h1 className="text-2xl font-bold tracking-tight text-[#172522]">Diagnoses & ICD-10 Codes</h1>
          <p className="text-xs text-[#667570] mt-0.5">Track diagnostic classifications and active clinical conditions.</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4" />
          <span>Add Diagnosis Code</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="card p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9aa7a3]" />
          <input
            type="text"
            placeholder="Search ICD-10 code, condition name or category..."
            className="field-input pl-10"
          />
        </div>
        <button className="btn-secondary w-full sm:w-auto">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* List Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f6faf8] border-b border-[#e4ebe8] text-[#52635d] uppercase font-bold text-[10px]">
              <tr>
                <th className="px-6 py-3.5">ICD-10 Code</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Active Cases</th>
                <th className="px-6 py-3.5">Risk Level</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4ebe8]">
              {diagnoses.map((item) => (

                <tr key={item.code} className="hover:bg-[#f0f7f5] transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#0f766e]">{item.code}</td>
                  <td className="px-6 py-4 font-medium text-[#172522]">{item.description}</td>
                  <td className="px-6 py-4 text-[#667570]">{item.category}</td>
                  <td className="px-6 py-4 font-semibold text-[#172522]">{item.activeCases} patients</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${item.riskLevel === 'High' ? 'badge-danger' : item.riskLevel === 'Moderate' ? 'badge-warning' : 'badge-success'}`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-[#0f766e] hover:underline">View Chart</button>
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
