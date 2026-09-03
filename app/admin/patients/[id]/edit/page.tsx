"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  UserCheck,
  Save,
  Lock,
  RotateCcw,
  Sliders,
  Check,
} from "lucide-react";
import {
  getPatientByIdApi,
  updatePatientApi,
  uploadPatientImageApi,
  PatientItem,
} from "@/lib/api/patientApi";
import { getFacilitiesApi, FacilityRecordItem } from "@/lib/api/facilityApi";

export default function EditPatientPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params?.id as string;

  // Active section tab for quick jump
  const [activeTab, setActiveTab] = useState<string>("facility");

  // Facilities list
  const [facilities, setFacilities] = useState<FacilityRecordItem[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>("");

  // Original patient item for reset
  const [originalPatient, setOriginalPatient] = useState<PatientItem | null>(null);

  // MRN (Read only)
  const [mrn, setMrn] = useState<string>("");

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
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const populatePatientData = (patient: PatientItem, facData: FacilityRecordItem[]) => {
    setOriginalPatient(patient);
    setSelectedFacilityId(patient.facility_id || (facData?.[0]?.id ?? ""));
    setMrn(patient.mrn || "");
    setFirstName(patient.first_name || "");
    setMiddleName(patient.middle_name || "");
    setLastName(patient.last_name || "");
    setDob(patient.date_of_birth || "");
    setGender(patient.gender || "Male");
    setPhone(patient.phone || "");
    setEmail(patient.email || "");
    setMaritalStatus(patient.marital_status || "");
    setPreferredLanguage(patient.preferred_language || "");
    setAddressLine1(patient.address_line1 || patient.address || "");
    setAddressLine2(patient.address_line2 || "");
    setCity(patient.city || "");
    setState(patient.state || "");
    setPostalCode(patient.postal_code || patient.zip_code || "");
    setCountry(patient.country || "USA");
    setEmergencyName(patient.emergency_contact_name || "");
    setEmergencyRelationship(patient.emergency_contact_relationship || "");
    setEmergencyPhone(patient.emergency_contact_phone || "");
    setInsuranceProvider(patient.insurance_provider || "");
    setPolicyNumber(patient.insurance_policy_number || "");
    setMemberId(patient.insurance_member_id || "");
    setGroupNumber(patient.insurance_group_number || "");
    setPolicyHolder(patient.insurance_policy_holder || "");
    setRelationshipToPatient(patient.insurance_relationship || "");
    setNotes(patient.notes || "");
    setStatus(patient.status || "Active");
    setPreviewUrl(patient.image_url || null);
  };

  useEffect(() => {
    if (!patientId) return;

    Promise.all([getFacilitiesApi(), getPatientByIdApi(patientId)])
      .then(([facData, patient]) => {
        setFacilities(facData || []);
        if (patient) {
          populatePatientData(patient, facData || []);
        }
      })
      .catch((err) => {
        console.error("Could not load patient profile for edit:", err);
        setError(err?.message || "Failed to load patient record.");
      })
      .finally(() => {
        setFetching(false);
      });
  }, [patientId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReset = () => {
    if (originalPatient) {
      populatePatientData(originalPatient, facilities);
      setSelectedFile(null);
      showToast("Form fields reset to saved values.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !dob || !phone.trim()) {
      setError("Please fill in all mandatory fields marked with an asterisk (*).");
      return;
    }

    setLoading(true);

    try {
      // 1. Update Patient Record in Backend
      await updatePatientApi(patientId, {
        facility_id: selectedFacilityId || undefined,
        first_name: firstName.trim(),
        middle_name: middleName.trim() || undefined,
        last_name: lastName.trim(),
        date_of_birth: dob,
        gender: gender,
        phone: phone.trim(),
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

      // 2. Upload Profile Image to AWS S3 if changed
      if (selectedFile) {
        await uploadPatientImageApi(patientId, selectedFile);
      }

      showToast(`Patient profile '${firstName} ${lastName}' saved successfully!`);
      setTimeout(() => {
        router.push("/admin/patients");
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Failed to save profile changes. Please check backend log.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
        <Sparkles className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
        <p className="font-bold text-[#172522]">Loading 3D patient profile editor...</p>
      </div>
    );
  }

  const sectionTabs = [
    { id: "facility", label: "Facility & MRN", icon: Building },
    { id: "demographics", label: "Personal Info & Photo", icon: User },
    { id: "address", label: "Residential Address", icon: MapPin },
    { id: "emergency", label: "Emergency & Insurance", icon: Phone },
    { id: "notes", label: "Notes & Status", icon: FileText },
  ];

  return (
    <div className="relative w-full space-y-6 font-sans pb-28">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl"
          >
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Glass Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.25)] text-white backdrop-blur-3xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7ee8d5]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-2xl" />

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
              <span className="text-white font-black">3D Glass Edit Profile</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-1.5">
              <Sparkles className="w-6 h-6 text-teal-300 animate-pulse" />
              Editing Patient: <span className="text-teal-200 font-mono underline decoration-teal-400/50">{mrn}</span>
            </h1>
            <p className="text-xs text-teal-100/90 mt-1 font-medium">
              Update demographics, clinical contact parameters, and AWS S3 record photo under tenant facility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded-2xl border border-white/30 bg-white/15 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-white px-6 py-2.5 text-xs font-black text-[#0F766E] shadow-xl hover:bg-teal-50 hover:shadow-2xl transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-[#0F766E]" />
              <span>{loading ? "Saving Profile..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Glass Quick Jump Tab Bar */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max p-1.5 rounded-2xl border-2 border-[#7ee8d5]/50 bg-white/80 backdrop-blur-xl shadow-sm">
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                    : "text-[#596964] hover:bg-teal-50/80 hover:text-[#0F766E]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-teal-200" : "text-[#0F766E]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/95 p-4 text-xs font-bold text-rose-800 flex items-center gap-3 shadow-md">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Facility & MRN 3D Glass Container */}
        <motion.div
          id="section-facility"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-4"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7ee8d5]/20 blur-2xl" />

          <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <Building className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-sm font-black text-[#172522]">Facility Assignment & Permanent MRN</h2>
            </div>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
              Step 1 of 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#596964] mb-1.5 flex items-center gap-1">
                Hospital / Clinic Branch <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="h-11 w-full rounded-2xl border-2 border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 shadow-xs transition"
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
              <label className="block text-xs font-bold text-[#596964] mb-1.5">Medical Record Number (MRN)</label>
              <div className="h-11 w-full rounded-2xl border-2 border-[#7ee8d5]/90 bg-gradient-to-r from-teal-50 to-emerald-50 px-3.5 text-xs font-bold text-[#0F766E] flex items-center justify-between shadow-xs">
                <span className="flex items-center gap-2 font-mono text-sm">
                  <Hash className="w-4 h-4 text-[#0F766E]" />
                  {mrn}
                </span>
                <span className="text-[10px] font-mono bg-white px-2.5 py-1 rounded-xl border border-teal-300 text-teal-800 shadow-2xs font-bold">
                  🔒 Chart ID Locked
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Photo & Demographics 3D Glass Container */}
        <motion.div
          id="section-demographics"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-6"
        >
          <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-2xl" />

          <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <User className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-sm font-black text-[#172522]">Personal Information & AWS S3 Photo</h2>
            </div>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
              Step 2 of 5
            </span>
          </div>

          {/* Photo Upload Box */}
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border-2 border-dashed border-[#0F766E]/40 bg-gradient-to-br from-teal-50/80 to-emerald-50/40 p-4">
            <div className="relative h-22 w-22 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0F766E] bg-white shadow-md flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-[#0F766E]/60" />
              )}
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <label className="block text-xs font-black text-[#172522]">Update Patient Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs text-[#596964] file:mr-3 file:rounded-xl file:border-0 file:bg-[#0F766E] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-[#0c5c56] cursor-pointer"
              />
              <p className="text-[11px] text-[#71807c]">
                Photo saved directly to AWS S3 bucket: <code className="font-mono text-[#0F766E] font-bold">healthcaresiara</code>
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
                    className={`h-11 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer ${
                      gender === g
                        ? "border-[#0F766E] bg-[#0F766E] text-white shadow-md scale-[1.02]"
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

            {/* EMAIL READ ONLY / NON-EDITABLE */}
            <div>
              <label className="block text-xs font-bold text-[#596964] mb-1.5 flex items-center justify-between">
                <span>Email Address (Account Identity)</span>
                <span className="text-amber-800 font-bold text-[10px] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-600" /> Non-editable
                </span>
              </label>
              <input
                type="email"
                value={email}
                disabled
                readOnly
                className="h-11 w-full rounded-2xl border-2 border-slate-200 bg-slate-100/90 px-3.5 font-mono text-xs font-bold text-slate-500 cursor-not-allowed outline-none shadow-2xs"
              />
              <p className="text-[10px] text-amber-700 font-medium mt-1">
                Patient account email is permanently bound to login credentials and cannot be edited.
              </p>
            </div>

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
          id="section-address"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-4"
        >
          <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <MapPin className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-sm font-black text-[#172522]">Residential Address Details</h2>
            </div>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
              Step 3 of 5
            </span>
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
        <div id="section-emergency" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-4"
          >
            <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#0F766E]">
                <Phone className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-sm font-black text-[#172522]">Emergency Contact</h2>
              </div>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-lg">
                Step 4a
              </span>
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
            className="rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-4"
          >
            <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#0F766E]">
                <CreditCard className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-sm font-black text-[#172522]">Insurance Details</h2>
              </div>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-lg">
                Step 4b
              </span>
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

        {/* Section 5: Notes & Status */}
        <motion.div
          id="section-notes"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 sm:p-7 shadow-[0_20px_50px_rgba(15,118,110,0.08)] backdrop-blur-3xl space-y-4"
        >
          <div className="border-b border-[#DFE8E5] pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <FileText className="w-5 h-5 text-[#0F766E]" />
              <h2 className="text-sm font-black text-[#172522]">Administrative Notes & Record Status</h2>
            </div>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
              Step 5 of 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#596964] mb-1.5">Clinical / Administrative Observations</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add clinical or administrative notes regarding patient history..."
                className="w-full rounded-2xl border-2 border-[#DFE8E5] bg-white p-3.5 text-xs text-[#172522] outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 shadow-xs resize-none font-medium transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#596964] mb-1.5">Record Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-2xl border-2 border-[#DFE8E5] bg-white px-3 text-xs font-semibold text-[#172522] outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 shadow-xs"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </motion.div>
      </form>

      {/* 3D Glass Floating Bottom Dock (Sticky Action Bar) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 p-3.5 text-white shadow-[0_20px_60px_rgba(12,36,32,0.45)] backdrop-blur-2xl flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-teal-200">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Patient Record ID: <span className="font-mono text-white">{mrn}</span></span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-teal-100 font-bold text-xs transition cursor-pointer"
            title="Reset Form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0c2420] font-black text-xs shadow-lg hover:brightness-110 transition cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-[#0c2420]" />
            <span>{loading ? "Saving Profile..." : "Save Patient Profile"}</span>
          </button>
        </div>
      </div>
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
        className="h-11 w-full rounded-2xl border-2 border-[#DFE8E5] bg-white px-3.5 text-xs font-semibold text-[#172522] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 shadow-xs transition"
      />
    </div>
  );
}
