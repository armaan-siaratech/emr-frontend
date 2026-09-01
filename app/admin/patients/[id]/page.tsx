"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ShieldCheck,
  CreditCard,
  FileText,
  Building,
  Hash,
  AlertCircle,
} from "lucide-react";
import { getPatientByIdApi, PatientItem } from "@/lib/api/patientApi";

export default function AdminPatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params?.id as string;

  const [patient, setPatient] = useState<PatientItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!patientId) return;

    setLoading(true);
    getPatientByIdApi(patientId)
      .then((data) => {
        setPatient(data);
      })
      .catch((err) => {
        console.error("Failed to load patient detail:", err);
        setError(err?.message || "Could not load patient record.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]);

  if (loading) {
    return (
      <div className="w-full rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
        <Sparkles className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
        <p className="font-bold text-[#172522]">Loading patient administrative record...</p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 p-8 text-center shadow-md">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-600" />
          <p className="font-bold text-rose-800">{error || "Patient record not found."}</p>
          <button
            onClick={() => router.push("/admin/patients")}
            className="mt-4 rounded-2xl bg-[#0F766E] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#0c5c56] transition"
          >
            Return to Patients
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${patient.first_name} ${patient.middle_name ? patient.middle_name + " " : ""}${patient.last_name}`;
  const initials = `${patient.first_name?.[0] || ""}${patient.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className="w-full space-y-6 font-sans pb-16">
      {/* Sleek 3D Glass Header Bar */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-6 py-4 shadow-xl text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#7ee8d5]/25 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Link href="/admin" className="hover:text-white transition">
                Admin
              </Link>
              <span>/</span>
              <Link href="/admin/patients" className="hover:text-white transition">
                Patients
              </Link>
              <span>/</span>
              <span className="text-white">{patient.mrn}</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
                {fullName}
              </h1>
              <span className="bg-white/20 border border-white/30 text-white font-mono font-black text-xs px-3 py-0.5 rounded-xl">
                {patient.mrn}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 rounded-2xl border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="space-y-6">
        {/* Profile Banner 3D Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-white p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          <div className="h-24 w-24 shrink-0 rounded-2xl border-2 border-[#0F766E] bg-white overflow-hidden shadow-md flex items-center justify-center font-black text-xl text-[#0F766E]">
            {patient.image_url ? (
              <img src={patient.image_url} alt={fullName} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">DOB</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{patient.date_of_birth}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Gender</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{patient.gender}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Phone</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{patient.phone}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Email</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{patient.email || "N/A"}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Marital Status</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{patient.marital_status || "N/A"}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Language</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{patient.preferred_language || "N/A"}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Registered Date</span>
              <p className="text-xs font-bold text-[#172522] mt-0.5">{new Date(patient.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#63827a] uppercase tracking-wider block">Status</span>
              <span className="inline-block mt-0.5 rounded-full bg-[#E7F6EF] px-2.5 py-0.5 text-[10px] font-bold text-[#278260] border border-[#a3e4c9]">
                {patient.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Address & Emergency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-3"
          >
            <div className="border-b border-[#DFE8E5] pb-2 flex items-center gap-2 text-[#0F766E]">
              <MapPin className="w-4 h-4 text-[#0F766E]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-[#0F766E]">Residential Address</h2>
            </div>
            <div className="text-xs space-y-1.5 text-[#596964]">
              <p><strong>Address Line 1:</strong> {patient.address_line1 || "N/A"}</p>
              <p><strong>Address Line 2:</strong> {patient.address_line2 || "N/A"}</p>
              <p><strong>City / State / ZIP:</strong> {[patient.city, patient.state, patient.postal_code].filter(Boolean).join(", ") || "N/A"}</p>
              <p><strong>Country:</strong> {patient.country || "USA"}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-3"
          >
            <div className="border-b border-[#DFE8E5] pb-2 flex items-center gap-2 text-[#0F766E]">
              <Phone className="w-4 h-4 text-[#0F766E]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-[#0F766E]">Emergency Contact</h2>
            </div>
            <div className="text-xs space-y-1.5 text-[#596964]">
              <p><strong>Contact Name:</strong> {patient.emergency_contact_name || "N/A"}</p>
              <p><strong>Relationship:</strong> {patient.emergency_contact_relationship || "N/A"}</p>
              <p><strong>Phone:</strong> {patient.emergency_contact_phone || "N/A"}</p>
            </div>
          </motion.div>
        </div>

        {/* Insurance Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-3"
        >
          <div className="border-b border-[#DFE8E5] pb-2 flex items-center gap-2 text-[#0F766E]">
            <CreditCard className="w-4 h-4 text-[#0F766E]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F766E]">Insurance Information</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-[#596964]">
            <div><strong className="block text-[#172522]">Provider:</strong> {patient.insurance_provider || "N/A"}</div>
            <div><strong className="block text-[#172522]">Policy Number:</strong> {patient.insurance_policy_number || "N/A"}</div>
            <div><strong className="block text-[#172522]">Member ID:</strong> {patient.insurance_member_id || "N/A"}</div>
            <div><strong className="block text-[#172522]">Group Number:</strong> {patient.insurance_group_number || "N/A"}</div>
            <div><strong className="block text-[#172522]">Policy Holder:</strong> {patient.insurance_policy_holder || "N/A"}</div>
            <div><strong className="block text-[#172522]">Relationship:</strong> {patient.insurance_relationship || "N/A"}</div>
          </div>
        </motion.div>

        {/* Notes */}
        {patient.notes && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-2"
          >
            <div className="flex items-center gap-2 text-[#0F766E]">
              <FileText className="w-4 h-4 text-[#0F766E]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-[#0F766E]">Administrative Notes</h2>
            </div>
            <p className="text-xs text-[#596964] whitespace-pre-wrap">{patient.notes}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
