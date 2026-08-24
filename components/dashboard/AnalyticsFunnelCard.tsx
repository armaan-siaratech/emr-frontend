"use client";

import { User } from "lucide-react";

export default function AnalyticsFunnelCard() {
  return (
    <div className="card-medicare p-5 sm:p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-[17px] sm:text-[19px] font-bold text-[#0f2d28]">
          Facilities / Analytics Funnel
        </h2>

        <div className="flex items-center gap-2 rounded-full border border-[#bcdad1] bg-white px-3 py-1 text-xs text-[#0f766e] font-semibold">
          <User className="h-3.5 w-3.5" />
          <span>Admin User (Super Administrator)</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-bold text-[#0f766e]">Hospital Analytics</h3>
      </div>

      {/* Grid for Funnel & Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Financial Performance Funnel */}
        <div className="rounded-2xl border border-[#c3e3d9] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0f2d28]">Financial Performance Funnel</h4>
            <span className="text-[10px] font-bold text-[#0f766e]">Revenue Analysis</span>
          </div>

          <div className="space-y-2 py-2">
            {/* Stage 1 */}
            <div className="relative mx-auto w-full max-w-[280px] bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-2 px-3 text-center text-white font-bold text-xs rounded-t-xl shadow-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span>23.90A</span>
                <span>Financial Revenue $23.90M</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative mx-auto w-[85%] bg-gradient-to-r from-[#0d9488] to-[#0f766e] py-1.5 px-3 text-center text-white font-bold text-xs shadow-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span>23.9%</span>
                <span>Service Revenue $18.25M</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative mx-auto w-[70%] bg-gradient-to-r from-[#14b8a6] to-[#0d9488] py-1.5 px-3 text-center text-white font-bold text-xs shadow-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span>100%</span>
                <span>Surplus Revenue $15.00M</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative mx-auto w-[55%] bg-gradient-to-r from-[#f59e0b] to-[#d97706] py-1.5 px-3 text-center text-white font-bold text-xs shadow-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span>20%</span>
                <span>Others $3.50M</span>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="relative mx-auto w-[40%] bg-gradient-to-r from-[#ef4444] to-[#dc2626] py-1.5 px-3 text-center text-white font-bold text-xs rounded-b-xl shadow-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span>0%</span>
                <span>Cumulative $7.3M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Revenue Breakdown Donut Pie */}
        <div className="rounded-2xl border border-[#c3e3d9] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0f2d28]">Service Revenue Breakdown</h4>
            <span className="text-[10px] font-bold text-[#0f766e]">Percentages</span>
          </div>

          <div className="flex items-center justify-center gap-6 py-3">
            {/* SVG Donut Chart */}
            <div className="relative h-32 w-32 shrink-0">
              <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Donut Segments */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e0f2fe" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray="22, 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#0f766e" strokeWidth="4" strokeDasharray="19, 100" strokeDashoffset="-22" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-41" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="22, 100" strokeDashoffset="-56" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="22, 100" strokeDashoffset="-78" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-[#5c7a72]">Service</span>
                <span className="text-xs font-black text-[#0f766e]">Revenue</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-1.5 text-[11px] font-bold">
              <div className="flex items-center gap-2 text-[#0284c7]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0284c7]" />
                <span>HA 19%</span>
              </div>
              <div className="flex items-center gap-2 text-[#0f766e]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
                <span>DGN 15%</span>
              </div>
              <div className="flex items-center gap-2 text-[#14b8a6]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#14b8a6]" />
                <span>DOG 22%</span>
              </div>
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <span>GOV 22%</span>
              </div>
              <div className="flex items-center gap-2 text-[#8b5cf6]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8b5cf6]" />
                <span>Other 22%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid for Patient Demographics & Departmental Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Patient Demographics Heatmap */}
        <div className="rounded-2xl border border-[#c3e3d9] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0f2d28]">Patient Demographics</h4>
            <span className="text-[10px] font-bold text-[#0f766e]">Floor Map</span>
          </div>

          <div className="relative rounded-xl border border-[#d6ece6] bg-[#f2faf7] p-3">
            <div className="grid grid-cols-4 gap-2 h-24">
              <div className="rounded-lg bg-[#ccfbf1] p-2 text-center text-[10px] font-bold text-[#0f766e]">
                Zone A
                <div className="mt-1 h-2 w-2 rounded-full bg-[#10b981] mx-auto animate-ping" />
              </div>
              <div className="rounded-lg bg-[#e0f2fe] p-2 text-center text-[10px] font-bold text-[#0284c7]">
                Zone B
                <div className="mt-1 h-2 w-2 rounded-full bg-[#0284c7] mx-auto" />
              </div>
              <div className="rounded-lg bg-[#fef3c7] p-2 text-center text-[10px] font-bold text-[#d97706]">
                Zone C
                <div className="mt-1 h-2 w-2 rounded-full bg-[#f59e0b] mx-auto" />
              </div>
              <div className="rounded-lg bg-[#fee2e2] p-2 text-center text-[10px] font-bold text-[#dc2626]">
                ICU Hot
                <div className="mt-1 h-2 w-2 rounded-full bg-[#ef4444] mx-auto animate-pulse" />
              </div>
            </div>

            <div className="mt-3 flex justify-around text-[10px] font-bold text-[#4a6b63]">
              <div>Activity <span className="text-[#0f766e]">2,168</span></div>
              <div>Activity # <span className="text-[#0284c7]">4,226</span></div>
              <div>Hot Zone <span className="text-[#dc2626]">14</span></div>
            </div>
          </div>
        </div>

        {/* Departmental Efficiency Chart */}
        <div className="rounded-2xl border border-[#c3e3d9] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0f2d28]">Departmental Efficiency</h4>
            <span className="text-[10px] font-bold text-[#0f766e]">Daily Scale</span>
          </div>

          <div className="relative h-28 flex items-end justify-between px-2 pt-4 border-b border-[#e2f0ed]">
            {/* Bar & Line combo representation */}
            {[
              { day: "Sun", bar: 40, line: 30 },
              { day: "Mon", bar: 65, line: 50 },
              { day: "Tue", bar: 50, line: 70 },
              { day: "Wed", bar: 80, line: 95 },
              { day: "Thu", bar: 75, line: 85 },
              { day: "Fri", bar: 100, line: 90 },
            ].map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <div className="relative w-6 bg-[#e0f2fe] rounded-t-md flex items-end justify-center" style={{ height: `${d.bar}px` }}>
                  <div className="w-full bg-[#0284c7] rounded-t-md" style={{ height: `${d.line}px` }} />
                </div>
                <span className="text-[9px] font-bold text-[#5c7a72]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
