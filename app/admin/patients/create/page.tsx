"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Building,
  Hash,
  User,
  Camera,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ShieldCheck,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Upload,
  UserPlus,
} from "lucide-react";
import { createPatientApi, uploadPatientImageApi } from "@/lib/api/patientApi";
import { getFacilitiesApi, FacilityRecordItem } from "@/lib/api/facilityApi";

export default function CreatePatientPage() {
  const router = useRouter();

  // Facilities list
  const [facilities, setFacilities] = useState<FacilityRecordItem[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>("");

  // MRN Toggle
  const [showCustomMrn, setShowCustomMrn] = useState(false);
  const [customMrn, setCustomMrn] = useState("");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");

  // Address
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("USA");

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Insurance
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [memberId, setMemberId] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [policyHolder, setPolicyHolder] = useState("");
  const [relationshipToPatient, setRelationshipToPatient] = useState("");

  // Photo / Avatar
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Notes & Status
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Active");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    getFacilitiesApi()
      .then((data) => {
        setFacilities(data || []);
        if (data && data.length > 0) {
          setSelectedFacilityId(data[0].id);
        }
      })
      .catch((err) => console.error("Could not load facilities:", err));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !dob || !phone.trim() || !email.trim()) {
      setError("Please fill in all mandatory fields marked with an asterisk (*) including Email Address.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Patient in Backend
      const createdPatient = await createPatientApi({
        facility_id: selectedFacilityId || undefined,
        mrn: showCustomMrn && customMrn.trim() ? customMrn.trim() : undefined,
        first_name: firstName.trim(),
        middle_name: middleName.trim() || undefined,
        last_name: lastName.trim(),
        date_of_birth: dob,
        gender: gender,
        phone: phone.trim(),
        email: email.trim() || undefined,
        address_line1: addressLine1.trim() || undefined,
        address_line2: addressLine2.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        postal_code: postalCode.trim() || undefined,
        country: country.trim() || undefined,
        marital_status: maritalStatus.trim() || undefined,
        preferred_language: preferredLanguage.trim() || undefined,
        emergency_contact_name: emergencyName.trim() || undefined,
        emergency_contact_relationship: emergencyRelationship.trim() || undefined,
        emergency_contact_phone: emergencyPhone.trim() || undefined,
        insurance_provider: insuranceProvider.trim() || undefined,
        insurance_policy_number: policyNumber.trim() || undefined,
        insurance_member_id: memberId.trim() || undefined,
        insurance_group_number: groupNumber.trim() || undefined,
        insurance_policy_holder: policyHolder.trim() || undefined,
        insurance_relationship: relationshipToPatient.trim() || undefined,
        notes: notes.trim() || undefined,
        status: status,
      });

      // 2. Upload Profile Image to AWS S3 if selected
      if (selectedFile && createdPatient?.id) {
        await uploadPatientImageApi(createdPatient.id, selectedFile);
      }

      showToast(`Patient registered! Assigned MRN: ${createdPatient.mrn}`);
      setTimeout(() => {
        router.push("/admin/patients");
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check backend log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl"
          >
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek 3D Glass Header Bar */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-6 py-4 shadow-xl text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#7ee8d5]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />

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
              <span className="text-white">New Registration</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-1">
              <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
              Register Patient Record
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded-2xl border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2 text-xs font-black text-[#0F766E] shadow-md hover:bg-teal-50 hover:shadow-lg transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4 text-[#0F766E]" />
              <span>{loading ? "Registering..." : "Save Patient"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 p-4 text-xs font-bold text-rose-800 flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Facility & MRN 3D Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-4"
        >
          <div className="border-b border-[#DFE8E5] pb-3 flex items-center gap-2 text-[#0F766E]">
            <Building className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-sm font-black text-[#172522]">Facility Assignment & MRN</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#596964] mb-1.5 flex items-center gap-1">
                Hospital / Clinic Branch <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs"
              >
                {facilities.length > 0 ? (
                  facilities.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name} ({fac.code}) — {fac.city || "Main Facility"}
                    </option>
                  ))
                ) : (
                  <option value="">Primary Tenant Facility</option>
                )}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#596964]">Medical Record Number (MRN)</label>
                <button
                  type="button"
                  onClick={() => setShowCustomMrn(!showCustomMrn)}
                  className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
                >
                  {showCustomMrn ? "Use System Auto-Generation" : "+ Enter Custom MRN"}
                </button>
              </div>

              {showCustomMrn ? (
                <input
                  type="text"
                  value={customMrn}
                  onChange={(e) => setCustomMrn(e.target.value)}
                  placeholder="Enter custom chart MRN..."
                  className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 font-mono text-xs text-[#172522] outline-none focus:border-[#0F766E] shadow-xs"
                />
              ) : (
                <div className="h-10 w-full rounded-2xl border border-[#7ee8d5]/80 bg-gradient-to-r from-teal-50 to-emerald-50 px-3 text-xs font-bold text-[#0F766E] flex items-center justify-between shadow-xs">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
                    Auto-assigned on creation (e.g. MRN-2026-810482)
                  </span>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-lg border border-teal-200 text-teal-800">Unique</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section 2: Photo & Demographics 3D Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-6"
        >
          <div className="border-b border-[#DFE8E5] pb-3 flex items-center gap-2 text-[#0F766E]">
            <User className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-sm font-black text-[#172522]">Personal Information & AWS S3 Photo</h2>
          </div>

          {/* Photo Upload Box */}
          <div className="flex items-center gap-6 rounded-2xl border-2 border-dashed border-[#0F766E]/40 bg-gradient-to-br from-teal-50/80 to-emerald-50/40 p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0F766E] bg-white shadow-md flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-[#0F766E]/60" />
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#172522]">Choose Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs text-[#596964] file:mr-3 file:rounded-xl file:border-0 file:bg-[#0F766E] file:px-3.5 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-[#0c5c56] cursor-pointer"
              />
              <p className="text-[11px] text-[#71807c]">
                File stored directly in AWS S3 bucket: <code className="font-mono text-[#0F766E] font-bold">healthcaresiara</code>
              </p>
            </div>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <GlassInputField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              required
            />
            <GlassInputField
              label="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Enter middle name"
            />
            <GlassInputField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              required
            />

            <GlassInputField
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-bold text-[#596964] mb-1.5">
                Gender <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGender(g)}
                    className={`h-10 rounded-2xl border font-bold text-xs transition cursor-pointer ${
                      gender === g
                        ? "border-[#0F766E] bg-[#0F766E] text-white shadow-md"
                        : "border-[#DFE8E5] bg-white text-[#596964] hover:bg-teal-50/50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <GlassInputField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
            />

            <GlassInputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@example.com"
              required
            />

            <GlassInputField
              label="Marital Status"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              placeholder="Single, Married, etc."
            />

            <GlassInputField
              label="Preferred Language"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              placeholder="English, Spanish, etc."
            />
          </div>
        </motion.div>

        {/* Section 3: Contact & Address */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-4"
        >
          <div className="border-b border-[#DFE8E5] pb-3 flex items-center gap-2 text-[#0F766E]">
            <MapPin className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-sm font-black text-[#172522]">Residential Address Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassInputField
              label="Street Address Line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="123 Health Blvd"
            />
            <GlassInputField
              label="Address Line 2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              placeholder="Suite, Apartment #"
            />
            <GlassInputField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
            <GlassInputField
              label="State / Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
            />
            <GlassInputField
              label="ZIP / Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="ZIP code"
            />
            <GlassInputField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="USA"
            />
          </div>
        </motion.div>

        {/* Section 4: Emergency & Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-4"
          >
            <div className="border-b border-[#DFE8E5] pb-3 flex items-center gap-2 text-[#0F766E]">
              <Phone className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-sm font-black text-[#172522]">Emergency Contact</h2>
            </div>
            <div className="space-y-4">
              <GlassInputField
                label="Contact Name"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="Full name"
              />
              <GlassInputField
                label="Relationship"
                value={emergencyRelationship}
                onChange={(e) => setEmergencyRelationship(e.target.value)}
                placeholder="Spouse, Parent, etc."
              />
              <GlassInputField
                label="Emergency Phone"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-4"
          >
            <div className="border-b border-[#DFE8E5] pb-3 flex items-center gap-2 text-[#0F766E]">
              <CreditCard className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-sm font-black text-[#172522]">Insurance Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GlassInputField
                label="Provider"
                value={insuranceProvider}
                onChange={(e) => setInsuranceProvider(e.target.value)}
                placeholder="Blue Cross, Aetna"
              />
              <GlassInputField
                label="Policy Number"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                placeholder="Policy #"
              />
              <GlassInputField
                label="Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Member ID"
              />
              <GlassInputField
                label="Group Number"
                value={groupNumber}
                onChange={(e) => setGroupNumber(e.target.value)}
                placeholder="Group #"
              />
            </div>
          </motion.div>
        </div>

        {/* Section 5: Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-3"
        >
          <div className="flex items-center gap-2 text-[#0F766E]">
            <FileText className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-sm font-black text-[#172522]">Administrative Notes</h2>
          </div>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add clinical or administrative notes regarding patient history..."
            className="w-full rounded-2xl border border-[#DFE8E5] bg-white p-3 text-xs text-[#172522] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs resize-none font-medium"
          />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-2xl border border-[#DFE8E5] bg-white px-6 py-2.5 text-xs font-bold text-[#596964] hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#115e59] px-7 py-2.5 text-xs font-black text-white shadow-lg hover:shadow-xl transition cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {loading ? "Registering Patient..." : "Complete Registration"}
          </button>
        </div>
      </form>
    </div>
  );
}

function GlassInputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#596964] mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs transition"
      />
    </div>
  );
}