"use client";

import { useState } from "react";
import PatientManagementCard from "@/components/dashboard/PatientManagementCard";
import AnalyticsFunnelCard from "@/components/dashboard/AnalyticsFunnelCard";
import WardsAndRoomsCard from "@/components/dashboard/WardsAndRoomsCard";
import FinancialOverviewCard from "@/components/dashboard/FinancialOverviewCard";
import Interactive3DHealthcareHub from "@/components/dashboard/Interactive3DHealthcareHub";
import { LayoutGrid, Users, BarChart3, Building2, PieChart, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "3d-modal" | "all" | "patients" | "analytics" | "wards" | "financial"
  >("3d-modal");

  return (
    <div className="w-full space-y-6 pb-10">
      {/* Top Banner / View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#bcdad1] bg-[#f4faf8]/95 p-4 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f2d28] tracking-tight">
            MediCare <span className="text-[#0284c7]">HMS</span> Clinical Dashboard
          </h1>
          <p className="text-xs font-semibold text-[#54736b]">
            Real-time patient records, ward status, and financial insights — all in one place.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#bfe0d6] bg-white p-1 shadow-2xs">
          <button
            onClick={() => setActiveTab("3d-modal")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "3d-modal"
                ? "bg-[#0284c7] text-white shadow-xs"
                : "text-[#4d6b63] hover:bg-[#eaf4f1] hover:text-[#0284c7]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Care Hub</span>
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#0f766e] text-white shadow-xs"
                : "text-[#4d6b63] hover:bg-[#eaf4f1] hover:text-[#0f766e]"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Full Overview (4 Cards)</span>
          </button>

          <button
            onClick={() => setActiveTab("patients")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "patients"
                ? "bg-[#0f766e] text-white shadow-xs"
                : "text-[#4d6b63] hover:bg-[#eaf4f1] hover:text-[#0f766e]"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Patient Records</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "analytics"
                ? "bg-[#0f766e] text-white shadow-xs"
                : "text-[#4d6b63] hover:bg-[#eaf4f1] hover:text-[#0f766e]"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Analytics Funnel</span>
          </button>

          <button
            onClick={() => setActiveTab("wards")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "wards"
                ? "bg-[#0f766e] text-white shadow-xs"
                : "text-[#4d6b63] hover:bg-[#eaf4f1] hover:text-[#0f766e]"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Wards & Rooms</span>
          </button>

          <button
            onClick={() => setActiveTab("financial")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "financial"
                ? "bg-[#0f766e] text-white shadow-xs"
                : "text-[#4d6b63] hover:bg-[#eaf4f1] hover:text-[#0f766e]"
            }`}
          >
            <PieChart className="h-3.5 w-3.5" />
            <span>Financial Overview</span>
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === "3d-modal" && <Interactive3DHealthcareHub />}

      {activeTab === "all" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PatientManagementCard />
          <AnalyticsFunnelCard />
          <WardsAndRoomsCard />
          <FinancialOverviewCard />
        </div>
      )}

      {activeTab === "patients" && (
        <div className="max-w-6xl mx-auto">
          <PatientManagementCard />
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="max-w-6xl mx-auto">
          <AnalyticsFunnelCard />
        </div>
      )}

      {activeTab === "wards" && (
        <div className="max-w-6xl mx-auto">
          <WardsAndRoomsCard />
        </div>
      )}

      {activeTab === "financial" && (
        <div className="max-w-6xl mx-auto">
          <FinancialOverviewCard />
        </div>
      )}
    </div>
  );
}
