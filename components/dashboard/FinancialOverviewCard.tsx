"use client";

import { User } from "lucide-react";

export default function FinancialOverviewCard() {
  return (
    <div className="card-medicare p-5 sm:p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-[17px] sm:text-[19px] font-bold text-[#0f2d28]">
            Reports & Analytics / Financial Overview
          </h2>
          <p className="text-xs font-medium text-[#5c7a72]">
            Manage hospital rooms, beds, meds.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#bcdad1] bg-white px-3 py-1 text-xs text-[#0f766e] font-semibold">
          <User className="h-3.5 w-3.5" />
          <span>Admin User (Super Administrator)</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-bold text-[#0f766e]">Hospital Analytics</h3>
      </div>

      {/* Grid for Patient Demographics World Map & Departmental Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Patient Demographics World Map */}
        <div className="rounded-2xl border border-[#c3e3d9] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0f2d28]">Patient Demographics</h4>
            <span className="text-[10px] font-bold text-[#0f766e]">Global Distribution</span>
          </div>

          <div className="relative rounded-xl border border-[#d6ece6] bg-[#f2faf7] p-4 flex items-center justify-center h-44 overflow-hidden">
            {/* World Map SVG representation */}
            <svg viewBox="0 0 800 400" className="w-full h-full opacity-60">
              <path
                d="M150,150 Q180,100 250,120 T350,180 T250,280 Q180,300 150,250 Z"
                fill="#b3e5d8"
              />
              <path
                d="M450,100 Q550,80 620,130 T600,240 Q500,260 450,200 Z"
                fill="#94d6c6"
              />
              <path
                d="M650,250 Q720,240 750,280 T680,340 Z"
                fill="#b3e5d8"
              />
            </svg>

            {/* Pulsing Hotspot Pins */}
            <div className="absolute top-12 left-1/4 h-3 w-3 rounded-full bg-[#0284c7] animate-ping" />
            <div className="absolute top-12 left-1/4 h-3 w-3 rounded-full bg-[#0284c7]" />

            <div className="absolute top-16 right-1/3 h-3 w-3 rounded-full bg-[#10b981] animate-ping" />
            <div className="absolute top-16 right-1/3 h-3 w-3 rounded-full bg-[#10b981]" />

            <div className="absolute bottom-12 right-1/4 h-3 w-3 rounded-full bg-[#ef4444] animate-ping" />
            <div className="absolute bottom-12 right-1/4 h-3 w-3 rounded-full bg-[#ef4444]" />
          </div>
        </div>

        {/* Departmental Efficiency Trend Line */}
        <div className="rounded-2xl border border-[#c3e3d9] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0f2d28]">Departmental Efficiency</h4>
            <span className="text-[10px] font-bold text-[#0f766e]">Scale 0-160</span>
          </div>

          <div className="relative h-44 flex flex-col justify-between pt-2 pb-6 px-3 border-b border-[#e2f0ed]">
            {/* Horizontal Axis lines */}
            <div className="flex justify-between text-[8px] font-bold text-[#78968e] border-b border-dashed border-[#e2f0ed] pb-1">
              <span>160</span>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-[#78968e] border-b border-dashed border-[#e2f0ed] pb-1">
              <span>120</span>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-[#78968e] border-b border-dashed border-[#e2f0ed] pb-1">
              <span>80</span>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-[#78968e] border-b border-dashed border-[#e2f0ed] pb-1">
              <span>40</span>
            </div>
            <div className="flex justify-between text-[8px] font-bold text-[#78968e]">
              <span>0</span>
            </div>

            {/* Line Trend Overlay */}
            <svg viewBox="0 0 300 100" className="absolute inset-0 h-full w-full px-6 py-4 pointer-events-none">
              <polyline
                fill="none"
                stroke="#0f766e"
                strokeWidth="3"
                points="10,80 50,70 100,40 150,30 200,50 250,20 290,40"
              />
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="3"
                points="10,90 50,85 100,60 150,50 200,30 250,45 290,25"
              />
            </svg>

            <div className="absolute bottom-0 inset-x-0 grid grid-cols-7 text-center text-[9px] font-bold text-[#5c7a72]">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Utilization Heatmap */}
      <div className="rounded-2xl border border-[#c3e3d9] bg-gradient-to-r from-[#eef8f5] via-[#e4f5f0] to-[#eef8f5] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-[#0f766e]">Staff Utilization Heatmap</h4>
          <span className="text-[10px] font-bold text-[#0f766e] bg-white px-2.5 py-0.5 rounded-full border border-[#bfe0d6]">
            Staff Flow
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-around gap-4 py-3">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0f766e] bg-white font-bold text-xs text-[#0f766e] shadow-sm">
              Overall Status
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Status</span>
          </div>

          <div className="hidden sm:block h-1 w-16 bg-gradient-to-r from-[#0f766e] to-[#14b8a6] rounded-full" />

          <div className="flex flex-col items-center">
            <div className="flex h-12 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#0f766e] to-[#14b8a6] font-bold text-xs text-white shadow-sm">
              Patients
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Total Admitted (36)</span>
          </div>

          <div className="hidden sm:block h-1 w-16 bg-gradient-to-r from-[#14b8a6] to-[#0284c7] rounded-full" />

          <div className="flex flex-col items-center">
            <div className="flex h-12 w-24 items-center justify-center rounded-full bg-[#0284c7] font-bold text-xs text-white shadow-sm">
              Staff
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Staff Utilization (48)</span>
          </div>

          <div className="hidden sm:block h-1 w-16 bg-gradient-to-r from-[#0284c7] to-[#0f766e] rounded-full" />

          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0284c7] bg-white font-bold text-xs text-[#0284c7] shadow-sm">
              Wards
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#4b6660]">Resources (2.5%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
