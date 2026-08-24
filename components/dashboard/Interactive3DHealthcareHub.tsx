"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CreatePatientModal from "./CreatePatientModal";
import {
  UserPlus,
  Activity,
  Building2,
  FileCheck,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  Bed,
  HeartPulse,
} from "lucide-react";

export default function Interactive3DHealthcareHub() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 40);
    setRotateY(x / 40);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[85vh] w-full overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/40 bg-[#d9ebe5]/80 p-4 sm:p-8 backdrop-blur-3xl shadow-[0_20px_60px_rgba(15,118,110,0.15)] perspective-container"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#7ee8d5]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#0284c7]/25 blur-3xl" />

      {/* Top Banner Control Strip */}
      <div className="relative z-20 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/40 p-4 backdrop-blur-xl shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#132a26] tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#0f766e] animate-pulse" />
            MediCare HMS Interactive Care Hub
          </h2>
          <p className="text-xs font-semibold text-[#527068]">
            Live patient intake, hospital analytics, and real-time room status — all in one view.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-5 py-3 text-xs font-black text-white shadow-lg shadow-[#0f766e]/30 transition-all hover:shadow-[#0f766e]/45 hover:scale-105 active:scale-95"
        >
          <UserPlus className="h-4 w-4" />
          <span>New Patient</span>
        </button>
      </div>

      {/* 3D Background Cards Grid (Matching the exact floating background layout in screenshot) */}
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 py-4"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Left 3D Vertical Patient Chart Card */}
        <div
          className="glass-card-3d rounded-3xl p-5 border border-white/70 bg-white/35 shadow-xl relative overflow-hidden"
          style={{ transform: "rotateY(-8deg) rotateX(4deg) translateZ(30px)" }}
        >
          <div className="flex items-center justify-between mb-4 border-b border-white/60 pb-3">
            <h3 className="text-sm font-bold text-[#132a26] uppercase flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#0f766e]" />
              Intake & Bio-ID
            </h3>
            <span className="text-[10px] font-bold text-[#0f766e] bg-white px-2.5 py-0.5 rounded-full border border-white">
              Personal
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white/50 p-3 border border-white">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center text-white font-bold text-xs shadow-md">
                JW
              </div>
              <div>
                <p className="text-xs font-bold text-[#132a26]">Patient Photo</p>
                <p className="text-[10px] text-[#527068]">Fingerprint Placement Active</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-bold text-[#35544d]">
              <div className="rounded-xl bg-white/60 p-2.5 border border-white/80">
                Personal Info · <span className="text-[#0f766e]">James Wilson</span>
              </div>
              <div className="rounded-xl bg-white/60 p-2.5 border border-white/80">
                Medical Timeline · <span className="text-[#0284c7]">Active Timeline</span>
              </div>
              <div className="rounded-xl bg-white/60 p-2.5 border border-white/80">
                Insurance & Billing · <span className="text-[#d97706]">Scanned Card</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Card: Analytics Flow */}
        <div
          className="glass-card-3d rounded-3xl p-5 border border-white/70 bg-white/35 shadow-xl relative overflow-hidden"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="flex items-center justify-between mb-4 border-b border-white/60 pb-3">
            <h3 className="text-sm font-bold text-[#132a26] uppercase flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#0284c7]" />
              Analytics Center
            </h3>
            <span className="text-[10px] font-bold text-[#0284c7] bg-white px-2.5 py-0.5 rounded-full border border-white">
              Live Stream
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/70 bg-white/50 p-4 text-center">
              <span className="text-[10px] font-bold uppercase text-[#527068]">Performance Flow</span>
              <p className="text-2xl font-black text-[#0f766e] mt-1">36 Admitted</p>
              <div className="mt-2 h-2 w-full rounded-full bg-[#dcfce7] overflow-hidden">
                <div className="h-full bg-[#10b981] w-3/4 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
              <div className="rounded-xl bg-white/60 p-2.5 text-center text-[#0f766e]">
                Staffing: <span className="font-black text-xs">48</span>
              </div>
              <div className="rounded-xl bg-white/60 p-2.5 text-center text-[#0284c7]">
                Resource: <span className="font-black text-xs">2.35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 3D Isometric Hospital Room Floor Plan Card */}
        <div
          className="glass-card-3d rounded-3xl p-5 border border-white/70 bg-white/35 shadow-xl relative overflow-hidden"
          style={{ transform: "rotateY(8deg) rotateX(4deg) translateZ(30px)" }}
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/60 pb-3">
            <h3 className="text-sm font-bold text-[#132a26] uppercase flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#0f766e]" />
              3D Hospital Room Model
            </h3>
            <span className="text-[10px] font-bold text-[#166534] bg-[#dcfce7] px-2.5 py-0.5 rounded-full">
              ICU Ready
            </span>
          </div>

          {/* 3D Isometric Room Graphics Box */}
          <div className="relative rounded-2xl border border-white/80 bg-gradient-to-br from-[#d6ece6] to-[#b3e2d6] p-3 mb-3 shadow-inner">
            <div className="grid grid-cols-2 gap-2 h-28">
              <div className="rounded-xl border border-white bg-white/80 p-2 text-center flex flex-col items-center justify-center">
                <Bed className="h-6 w-6 text-[#0f766e] mb-1" />
                <span className="text-[10px] font-bold text-[#0f766e]">Bed Unit 1</span>
              </div>
              <div className="rounded-xl border border-white bg-white/80 p-2 text-center flex flex-col items-center justify-center">
                <HeartPulse className="h-6 w-6 text-[#ef4444] mb-1 animate-pulse" />
                <span className="text-[10px] font-bold text-[#dc2626]">ICU Room</span>
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-1.5 text-xs font-bold text-[#35544d]">
            <div className="flex items-center justify-between rounded-xl bg-white/60 px-3 py-1.5 border border-white">
              <span>✓ Clean in checklist</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/60 px-3 py-1.5 border border-white">
              <span>✓ Check in checklist</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
            </div>
          </div>

          <button className="mt-3 w-full rounded-xl bg-[#0f766e] py-2 text-xs font-bold text-white shadow-md hover:bg-[#0d5c56]">
            Resource Allocation
          </button>
        </div>
      </motion.div>

      {/* CREATE PATIENT FORM MODAL OVERLAY */}
      <CreatePatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
