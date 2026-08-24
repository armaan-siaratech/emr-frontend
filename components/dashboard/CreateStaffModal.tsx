"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  Barcode,
  Search,
  Upload,
  UserCheck,
  Stethoscope,
  Shield,
  Activity,
  Award,
  ScanLine,
} from "lucide-react";

interface CreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (staffData: Record<string, unknown>) => void;
}

export default function CreateStaffModal({
  isOpen,
  onClose,
  onSave,
}: CreateStaffModalProps) {
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("Cardiology");
  const [department, setDepartment] = useState("Cardiology");
  const [experience, setExperience] = useState("10 years");
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("MD-984710");

  const [barcodeCode, setBarcodeCode] = useState("STAFF-DOC-8941");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [docUploaded, setDocUploaded] = useState(false);

  const handleGenerateStaffBarcode = () => {
    setBarcodeCode(`STAFF-DOC-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        name: doctorName || "Dr. Sarah Mitchell",
        specialty,
        department,
        experience,
        email: email || "doctor@hospital.com",
        id: barcodeCode,
        status: "Available",
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

          {/* Translucent Glass Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-4xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/40 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto"
          >
            {/* Corner glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

            {/* Modal Header */}
            <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                <UserCheck className="h-6 w-6 text-[#0f766e]" />
                CREATE STAFF & DOCTOR FORM (3D GLASS)
              </h2>

              <button
                onClick={onClose}
                className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* SECTION 1: STAFF BIO-ID & BARCODE */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                  STAFF CREDENTIAL & BARCODE GENERATOR
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#cadbd5] text-[#35544d] ring-2 ring-white shadow-inner">
                      <Stethoscope className="h-7 w-7 text-[#0f766e]" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPhotoUploaded(!photoUploaded)}
                        className="flex items-center gap-1.5 rounded-xl bg-[#0f766e] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0d5c56]"
                      >
                        <Camera className="h-3.5 w-3.5" />
                        <span>{photoUploaded ? "PHOTO UPLOADED ✓" : "UPLOAD STAFF PHOTO"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleGenerateStaffBarcode}
                        className="flex items-center gap-1.5 rounded-xl bg-[#0f766e] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0d5c56]"
                      >
                        <Barcode className="h-3.5 w-3.5" />
                        <span>GENERATE STAFF ID BARCODE</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/70 px-4 py-2.5 shadow-xs w-full md:w-auto">
                    <div className="space-y-0.5 text-center">
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
                  </div>
                </div>
              </div>

              {/* SECTION 2: FORM FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Doctor / Staff Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Mitchell"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@hospital.com"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Specialty
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none focus:border-[#0f766e]"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2e4741] mb-1">
                    Medical License Number
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="MD-984710"
                    className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none focus:border-[#0f766e]"
                  />
                </div>
              </div>

              {/* SECTION 3: DOCUMENT UPLOAD */}
              <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-2">
                  STAFF LICENSE & CERTIFICATION SCANNER
                </h3>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed border-[#0f766e]/40 rounded-2xl p-4 bg-[#f0faf8]/80">
                  <div className="flex items-center gap-3">
                    <Upload className="h-7 w-7 text-[#0f766e]" />
                    <div>
                      <p className="text-xs font-bold text-[#0f766e]">
                        UPLOAD MEDICAL LICENSE & CREDENTIALS
                      </p>
                      <p className="text-[10px] text-[#63827a]">
                        Drag & Drop PDF or Image License Scans
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDocUploaded(!docUploaded)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#0f766e] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0d5c56]"
                  >
                    <ScanLine className="h-3.5 w-3.5" />
                    <span>{docUploaded ? "DOCUMENT VERIFIED ✓" : "SCAN LICENSE"}</span>
                  </button>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-48 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] py-3 text-xs font-extrabold text-white shadow-lg hover:shadow-[#0f766e]/40 hover:scale-105 active:scale-95"
                >
                  SAVE STAFF PROFILE
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-48 rounded-2xl bg-[#9ca3af] py-3 text-xs font-extrabold text-white shadow-md hover:bg-[#6b7280]"
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
