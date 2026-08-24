"use client";

import { useState } from "react";
import {
  Building2,
  Bed,
  Search,
  X,
  Plus,
  Check,
  ChevronRight,
  Layers,
  Activity,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function WardsAndRoomsCard() {
  const [activeWardLevel, setActiveWardLevel] = useState("L1 Ward A");
  const [activeModalTab, setActiveModalTab] = useState<"floorplan" | "configurator">("floorplan");
  const [selectedRoom, setSelectedRoom] = useState("Room A101");
  const [searchQuery, setSearchQuery] = useState("");

  const wardLevels = ["L1 Ward A", "L2 Ward B", "L3 Ward C", "L4 Ward D", "L5 Ward E"];

  const roomsData = [
    { id: "Room A101", status: "Available", statusColor: "green", bedLevel: 348, icu: 10, maintenance: 0 },
    { id: "Room A102", status: "Occupied", statusColor: "red", bedLevel: 280, icu: 5, maintenance: 0 },
    { id: "Room A103", status: "Maintenance", statusColor: "yellow", bedLevel: 120, icu: 0, maintenance: 1 },
    { id: "Room A104", status: "Occupied", statusColor: "red", bedLevel: 310, icu: 12, maintenance: 0 },
    { id: "Room A105", status: "Available", statusColor: "green", bedLevel: 290, icu: 4, maintenance: 0 },
    { id: "ICU Room", status: "Occupied", statusColor: "red", bedLevel: 500, icu: 20, maintenance: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/75 p-5 backdrop-blur-2xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0f766e]">
              FACILITIES & ANALYTICS CENTER
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f2d28] tracking-tight">
            Interactive Floor Plan & Capacity Analytics
          </h2>
          <p className="text-xs font-semibold text-[#54736b]">
            Monitor live ward bed availability, utilization heatmaps, and room configurations.
          </p>
        </div>

        {/* Modal Switcher Pills */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#bfe0d6] bg-white/90 p-1.5 shadow-xs">
          <button
            onClick={() => setActiveModalTab("floorplan")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeModalTab === "floorplan"
                ? "bg-[#0f766e] text-white shadow-sm scale-105"
                : "text-[#4b6660] hover:bg-[#eaf4f1]"
            }`}
          >
            Interactive Floor Plan (Level 1)
          </button>

          <button
            onClick={() => setActiveModalTab("configurator")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeModalTab === "configurator"
                ? "bg-[#0f766e] text-white shadow-sm scale-105"
                : "text-[#4b6660] hover:bg-[#eaf4f1]"
            }`}
          >
            Room Configurator
          </button>
        </div>
      </div>

      {/* CAPACITY UTILIZATION ANALYTICS CARDS & HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ward Bed Status Bar Chart & Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bed Status Overview Card */}
          <div className="rounded-3xl border border-white/70 bg-white/75 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-[#c8e2da]/60 pb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#0f2d28] flex items-center gap-2">
                <Bed className="h-4 w-4 text-[#0f766e]" />
                Ward Bed Status Overview
              </h3>
              <span className="text-[10px] font-extrabold text-[#0f766e] bg-[#e0f2fe] px-3 py-1 rounded-full">
                Live Capacity
              </span>
            </div>

            {/* Custom Bar Graph */}
            <div className="relative h-44 flex items-end justify-around px-4 pt-6 border-b border-[#e2efe9]">
              {/* Y Axis markings */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] font-bold text-[#8ba39c]">
                <span>250</span>
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              {/* Total Bars */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-10 bg-gradient-to-t from-[#0f766e] to-[#14b8a6] rounded-t-xl h-36 flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                  256
                </div>
                <span className="text-[10px] font-extrabold text-[#44635b]">Total</span>
              </div>

              {/* Occupied Bars */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-10 bg-gradient-to-t from-[#a34e36] to-[#d96b43] rounded-t-xl h-28 flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                  198
                </div>
                <span className="text-[10px] font-extrabold text-[#44635b]">Occupied</span>
              </div>

              {/* Available Bars */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-10 bg-gradient-to-t from-[#10b981] to-[#34d399] rounded-t-xl h-16 flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                  58
                </div>
                <span className="text-[10px] font-extrabold text-[#44635b]">Available</span>
              </div>

              {/* Maintenance Bars */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-10 bg-gradient-to-t from-[#f59e0b] to-[#fbbf24] rounded-t-xl h-8 flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                  12
                </div>
                <span className="text-[10px] font-extrabold text-[#44635b]">Maintenance</span>
              </div>
            </div>
          </div>

          {/* Utilization Heatmap */}
          <div className="rounded-3xl border border-white/70 bg-white/75 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#0f2d28] flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#0284c7]" />
                Utilization Heatmap
              </h3>
              <span className="text-[10px] font-bold text-[#0284c7] bg-white px-2.5 py-0.5 rounded-full border border-[#bfe0d6]">
                24-Hour Scan
              </span>
            </div>

            <div className="space-y-2">
              {["Room", "Modules", "Isolation", "Critical", "Usage"].map((row, rIdx) => (
                <div key={row} className="flex items-center gap-3 text-[11px] font-bold text-[#3d5952]">
                  <span className="w-20 text-left">{row}</span>
                  <div className="flex-1 grid grid-cols-10 gap-1.5 h-6">
                    {Array.from({ length: 10 }).map((_, cIdx) => {
                      const heatVal = (rIdx * 2 + cIdx * 3) % 4;
                      return (
                        <div
                          key={cIdx}
                          className={`rounded-md transition-all hover:scale-110 cursor-pointer ${
                            heatVal === 0
                              ? "bg-[#dcfce7] border border-[#a7f3d0]"
                              : heatVal === 1
                              ? "bg-[#6ee7b7]"
                              : heatVal === 2
                              ? "bg-[#0d9488]"
                              : "bg-[#a34e36]"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Metrics Cards */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/70 bg-white/75 p-5 backdrop-blur-xl shadow-lg space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#0f2d28] border-b border-[#c8e2da]/60 pb-2">
              Key Metrics
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white bg-white/80 p-3.5 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Total Beds</span>
                <p className="text-2xl font-black text-[#0f2d28] mt-1">256</p>
                <div className="mt-1 flex items-center text-[10px] font-bold text-[#10b981]">
                  <span>📈 +4 this week</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white bg-white/80 p-3.5 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Occupied</span>
                <p className="text-2xl font-black text-[#a34e36] mt-1">198</p>
                <div className="mt-1 flex items-center text-[10px] font-bold text-[#a34e36]">
                  <span>📈 77.3% Rate</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white bg-white/80 p-3.5 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Availability</span>
                <p className="text-2xl font-black text-[#10b981] mt-1">58</p>
                <div className="mt-1 flex items-center text-[10px] font-bold text-[#10b981]">
                  <span>✓ 12 ICU Ready</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white bg-white/80 p-3.5 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase text-[#5c7a72]">Utilization</span>
                <p className="text-2xl font-black text-[#0f766e] mt-1">77.3%</p>
                <div className="mt-1 flex items-center text-[10px] font-bold text-[#0f766e]">
                  <span>⚡ Optimal Range</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModalTab("configurator")}
              className="w-full rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] py-3 text-xs font-black text-white shadow-md hover:shadow-lg transition-all"
            >
              CONFIGURE ROOM LAYOUT
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          FLOATING OVERLAY MODAL DISPLAY (Matching Screenshot 1 & 2)
      ========================================================= */}
      {activeModalTab === "floorplan" && (
        <div className="relative rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/60 p-6 backdrop-blur-3xl shadow-[0_25px_65px_rgba(15,118,110,0.2)]">
          {/* Top Modal Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/80 pb-4 mb-6">
            <div>
              <h3 className="text-lg font-black text-[#0f2d28] uppercase tracking-tight flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#0f766e]" />
                Interactive Floor Plan (Level 1)
              </h3>
              <p className="text-xs font-bold text-[#5c7a72]">
                Click any ward or room block to inspect live bed level metrics and occupancy status.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Room..."
                className="h-10 w-full rounded-xl border border-white bg-white/90 pl-9 pr-3 text-xs font-bold text-[#132a26] outline-none shadow-xs"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78968e]" />
            </div>
          </div>

          {/* Level Selector Tabs (L1 Ward A, L2 Ward B, etc.) */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {wardLevels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveWardLevel(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeWardLevel === lvl
                    ? "bg-[#0f766e] text-white shadow-md scale-105"
                    : "bg-white/70 border border-white text-[#4b6660] hover:bg-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Floorplan Layout Canvas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            {/* Rooms Grid Blueprint */}
            <div className="rounded-3xl border border-white bg-gradient-to-br from-[#d9ebe5] to-[#c7e2da] p-5 shadow-inner">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {roomsData.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md ${
                      selectedRoom === room.id
                        ? "border-[#0f766e] bg-white scale-105 shadow-xl"
                        : "border-white/80 bg-white/75 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#0f2d28]">{room.id}</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          room.statusColor === "green"
                            ? "bg-[#10b981]"
                            : room.statusColor === "red"
                            ? "bg-[#ef4444]"
                            : "bg-[#f59e0b]"
                        }`}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-[#5c7a72]">{room.status}</p>
                    <div className="mt-2 text-[9px] font-bold text-[#0f766e] bg-[#e0f2fe] px-2 py-0.5 rounded-md inline-block">
                      Bed Level: {room.bedLevel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Room Details Tooltip Drawer (Matching Screenshot 1) */}
            <div className="rounded-3xl border border-white bg-white/90 p-5 shadow-xl space-y-4">
              <div className="border-b border-[#e2efe9] pb-3">
                <span className="text-[10px] font-extrabold uppercase text-[#0f766e]">Room Detail Viewer</span>
                <h4 className="text-lg font-black text-[#0f2d28]">{selectedRoom}</h4>
              </div>

              <div className="space-y-2.5 text-xs font-bold text-[#3d5952]">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2faf7] border border-[#d6ece6]">
                  <span>Bed Level</span>
                  <span className="text-sm font-black text-[#0f766e]">348</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2faf7] border border-[#d6ece6]">
                  <span>ICU Level</span>
                  <span className="text-sm font-black text-[#0284c7]">10</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2faf7] border border-[#d6ece6]">
                  <span>Bed Maintenance</span>
                  <span className="text-sm font-black text-[#d97706]">0</span>
                </div>
              </div>

              <button className="w-full rounded-xl bg-[#0f766e] py-2.5 text-xs font-black text-white shadow-md hover:bg-[#0d5c56]">
                ASSIGN PATIENT TO ROOM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          ADVANCED FACILITY / ROOM CONFIGURATOR (Screenshot 2)
      ========================================================= */}
      {activeModalTab === "configurator" && (
        <div className="relative rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/60 p-6 backdrop-blur-3xl shadow-[0_25px_65px_rgba(15,118,110,0.2)]">
          <div className="border-b border-white/80 pb-4 mb-6">
            <h3 className="text-lg font-black text-[#0f2d28] uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#0f766e]" />
              Advanced Facility / Room Configurator
            </h3>
            <p className="text-xs font-bold text-[#5c7a72]">
              Interactive ward map, room block builder, OT schedule, and asset configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side: Module Builder Controls */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                <h4 className="text-xs font-extrabold uppercase text-[#0f2d28] mb-3">Room Modules Picker</h4>
                <div className="flex flex-wrap gap-2">
                  {["Bed (General)", "Monitor (High)", "ICU Station", "Isolation Door", "Storage"].map((mod) => (
                    <button
                      key={mod}
                      className="px-3 py-1.5 rounded-xl bg-[#e4f2ee] hover:bg-[#0f766e] hover:text-white border border-[#bcdad1] text-xs font-bold text-[#0f766e] transition-all"
                    >
                      + {mod}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Configuration Table */}
              <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                <h4 className="text-xs font-extrabold uppercase text-[#0f2d28] mb-3">Configuration Table</h4>
                <div className="space-y-2 text-xs font-bold">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#f4faf8] text-[#0f766e]">
                    <span>Bed General</span>
                    <span>Standard Frame</span>
                    <span className="text-[#10b981]">✓</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#f4faf8] text-[#0f766e]">
                    <span>Ventilator Model</span>
                    <span>ICU-Grade</span>
                    <span className="text-[#10b981]">✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Blueprint Canvas & Confirm CTA */}
            <div className="rounded-3xl border border-white bg-gradient-to-br from-[#d9ebe5] to-[#c7e2da] p-5 shadow-inner flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-[#0f2d28] mb-3">Room Layout Preview</h4>
                <div className="h-44 rounded-2xl border-2 border-dashed border-[#0f766e]/40 bg-white/80 p-4 flex items-center justify-center text-center">
                  <div>
                    <Bed className="h-10 w-10 text-[#0f766e] mx-auto mb-2" />
                    <p className="text-xs font-extrabold text-[#0f2d28]">ICU Room Configuration Active</p>
                    <p className="text-[10px] text-[#5c7a72]">Ventilator + High Monitor Assigned</p>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] py-3 text-xs font-black text-white shadow-lg hover:shadow-xl transition-all">
                CONFIRM ROOM CONFIGURATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
