"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  Barcode,
  Search,
  Upload,
  Plus,
  CheckCircle2,
  Activity,
  Shield,
  User,
  ScanLine,
} from "lucide-react";

interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (patientData: Record<string, unknown>) => void;
}

export default function CreatePatientModal({
  isOpen,
  onClose,
  onSave,
}: CreatePatientModalProps) {
  // Form States
  const [patientName, setPatientName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [contactNumber, setContactNumber] = useState("");
  const [primaryDoctor, setPrimaryDoctor] = useState("Dr. Arisara");
  
  // Insurance & Barcode States
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");

  const [barcodeGenerated, setBarcodeGenerated] = useState(true);
  const [barcodeCode, setBarcodeCode] = useState("BIO-98472910482");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([
    "Asthma",
    "Insomnia",
    "Surgery",
  ]);

  const [isScannerActive, setIsScannerActive] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [cardUploaded, setCardUploaded] = useState(false);

  const handleGenerateBarcode = () => {
    const randomCode = `BIO-${Math.floor(10000000000 + Math.random() * 90000000000)}`;
    setBarcodeCode(randomCode);
    setBarcodeGenerated(true);
  };

  const handleToggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        name: patientName || "James Wilson",
        email: emailAddress,
        dob,
        gender,
        contact: contactNumber,
        doctor: primaryDoctor,
        barcode: barcodeCode,
        conditions: selectedConditions,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with translucent blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
          />

          {/* Main Translucent Glass Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-4xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/40 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto"
          >
            {/* Ambient cyan corner highlights */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

            {/* Modal Header */}
            <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase">
                CREATE PATIENT FORM
              </h2>

              <button
                onClick={onClose}
                className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* SECTION 1: BIO-ID BARCODE GENERATOR */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                  BIO-ID BARCODE GENERATOR
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Photo Avatar & Buttons */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#cadbd5] text-[#35544d] ring-2 ring-white shadow-inner">
                      <User className="h-7 w-7 text-[#4d6e67]" />
                      {photoUploaded && (
                        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#10b981] ring-2 ring-white flex items-center justify-center text-[9px] text-white">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPhotoUploaded(!photoUploaded)}
                        className="flex items-center gap-1.5 rounded-xl bg-[#0f766e] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#0d5c56] active:scale-95"
                      >
                        <Camera className="h-3.5 w-3.5" />
                        <span>{photoUploaded ? "PHOTO UPLOADED" : "SCAN or UPLOAD PHOTO"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleGenerateBarcode}
                        className="flex items-center gap-1.5 rounded-xl bg-[#0f766e] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#0d5c56] active:scale-95"
                      >
                        <Barcode className="h-3.5 w-3.5" />
                        <span>AUTO-GENERATE BARCODE</span>
                      </button>
                    </div>
                  </div>

                  {/* Barcode Graphic Block */}
                  <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/70 px-4 py-2.5 shadow-xs w-full md:w-auto">
                    <div className="space-y-0.5 text-center">
                      {/* Live SVG Barcode graphic */}
                      <svg className="h-7 w-36 mx-auto" viewBox="0 0 140 30">
                        {Array.from({ length: 28 }).map((_, i) => (
                          <rect
                            key={i}
                            x={i * 5}
                            y="0"
                            width={i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2}
                            height="30"
                            fill="#1e293b"
                          />
                        ))}
                      </svg>
                      <p className="font-mono text-[10px] font-bold text-[#1e293b]">
                        {barcodeCode}
                      </p>
                    </div>

                    <div className="border-l border-[#c0dad2] pl-3 text-[10px] font-semibold text-[#54736b]">
                      <p className="leading-tight">Placeholder for Multi-Factor Enrollment Status</p>
                      <span className="mt-1 inline-block rounded-full bg-[#dcfce7] px-2 py-0.5 text-[9px] font-bold text-[#166534]">
                        Enrolled & Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PATIENT FORM INPUTS (2-Column Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. James Wilson"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="patient@example.com"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Date of Birth (MM/DD/YYYY)
                  </label>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Gender (Dropdown)
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs cursor-pointer"
                  >
                    <option value="Select Gender">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+1 5056 2869"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Primary Doctor
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={primaryDoctor}
                      onChange={(e) => setPrimaryDoctor(e.target.value)}
                      placeholder="Search doctor..."
                      className="h-10 w-full rounded-xl border border-white/80 bg-white/80 pl-3 pr-9 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#63827a]" />
                  </div>
                </div>
              </div>

              {/* SECTION 3: MEDICAL HISTORY TIMELINE */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-2">
                  MEDICAL HISTORY TIMELINE
                </h3>

                {/* Condition Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {["Asthma", "Insomnia", "Surgery", "Diabetes", "Hypertension"].map((cond) => {
                    const isSelected = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => handleToggleCondition(cond)}
                        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-[#0f766e] text-white shadow-xs scale-105"
                            : "bg-white/70 border border-white text-[#527068] hover:bg-white"
                        }`}
                      >
                        <Activity className="h-3 w-3" />
                        <span>{cond}</span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => handleToggleCondition("Diabetes")}
                    className="flex items-center gap-1 rounded-full border border-dashed border-[#0f766e] bg-white/60 px-3 py-1 text-xs font-bold text-[#0f766e] hover:bg-white"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Select to add conditions</span>
                  </button>
                </div>

                {/* Timeline Graphic Bar */}
                <div className="relative py-4 px-2">
                  <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#0284c7]" />

                  {/* Nodes */}
                  <div className="absolute inset-x-0 top-1.5 flex items-center justify-between px-6">
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0f766e] text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white shadow-md">
                        2018
                      </div>
                      <span className="mt-1 text-[9px] font-bold text-[#35544d]">Asthma</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0f766e] text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white shadow-md">
                        2021
                      </div>
                      <span className="mt-1 text-[9px] font-bold text-[#35544d]">Surgery</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0f766e] text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white shadow-md">
                        2024
                      </div>
                      <span className="mt-1 text-[9px] font-bold text-[#35544d]">Checkup</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0284c7] text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white shadow-md">
                        2026
                      </div>
                      <span className="mt-1 text-[9px] font-bold text-[#0284c7]">Active EHR</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: INSURANCE CARD UPLOAD BLOCK */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                  INSURANCE CARD UPLOAD BLOCK
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4">
                  {/* Left Upload Dashed Box */}
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0f766e]/50 bg-[#f0faf8]/80 p-4 text-center transition-all hover:bg-white">
                    <Upload className="h-7 w-7 text-[#0f766e] mb-1 animate-bounce" />
                    <p className="text-xs font-bold text-[#0f766e]">
                      UPLOAD CARD IMAGE (Front & Back)
                    </p>
                    <p className="text-[10px] text-[#63827a] mt-0.5 mb-2">
                      CLICK TO UPLOAD or DRAG & DROP
                    </p>

                    <button
                      type="button"
                      onClick={() => setCardUploaded(!cardUploaded)}
                      className="flex items-center gap-1.5 rounded-xl bg-[#0f766e] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#0d5c56]"
                    >
                      <ScanLine className="h-3.5 w-3.5" />
                      <span>{cardUploaded ? "CARD SCANNED ✓" : "Insurance Card Scanner"}</span>
                    </button>
                  </div>

                  {/* Right Insurance Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#2e4741] mb-1">
                        Insurance Provider
                      </label>
                      <input
                        type="text"
                        value={insuranceProvider}
                        onChange={(e) => setInsuranceProvider(e.target.value)}
                        placeholder="Blue Cross / Aetna"
                        className="h-9 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs outline-none focus:border-[#0f766e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#2e4741] mb-1">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        placeholder="Contact Name"
                        className="h-9 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs outline-none focus:border-[#0f766e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#2e4741] mb-1">
                        Policy Number
                      </label>
                      <input
                        type="text"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        placeholder="POL-849201"
                        className="h-9 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs outline-none focus:border-[#0f766e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#2e4741] mb-1">
                        Emergency Contact Number
                      </label>
                      <input
                        type="text"
                        value={emergencyNumber}
                        onChange={(e) => setEmergencyNumber(e.target.value)}
                        placeholder="+1 555-0199"
                        className="h-9 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs outline-none focus:border-[#0f766e]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER ACTION BUTTONS */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-48 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] py-3 text-xs font-extrabold text-white shadow-lg shadow-[#0f766e]/30 transition-all hover:shadow-[#0f766e]/45 hover:scale-105 active:scale-95"
                >
                  SAVE PROFILE
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-48 rounded-2xl bg-[#9ca3af] py-3 text-xs font-extrabold text-white shadow-md transition-all hover:bg-[#6b7280] hover:scale-105 active:scale-95"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
