"use client";

import { useState } from "react";
import Link from "next/link";

const patients = [
  {
    name: "Robert Johnson",
    mrn: "MRN-10241",
    age: 54,
    condition: "Hypertension",
  },
  {
    name: "Sarah Williams",
    mrn: "MRN-10256",
    age: 46,
    condition: "Hypertension",
  },
  {
    name: "Michael Brown",
    mrn: "MRN-10301",
    age: 61,
    condition: "Hyperlipidemia",
  },
];

const prescriptionHistory = [
  {
    patient: "Robert Johnson",
    mrn: "MRN-10241",
    dose: "10 mg",
    frequency: "Once daily",
    prescribed: "Aug 08, 2026",
    status: "Active",
  },
  {
    patient: "Sarah Williams",
    mrn: "MRN-10256",
    dose: "5 mg",
    frequency: "Once daily",
    prescribed: "Aug 05, 2026",
    status: "Active",
  },
  {
    patient: "Michael Brown",
    mrn: "MRN-10301",
    dose: "10 mg",
    frequency: "Once daily",
    prescribed: "Jul 28, 2026",
    status: "Completed",
  },
];

export default function MedicationDetailPage() {
  const [showPrescription, setShowPrescription] = useState(false);
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* BREADCRUMB */}
      <div className="mb-5 flex items-center gap-2">

        <Link
          href="/medications"
          className="text-[10px] font-semibold text-[#899691] hover:text-[#0f766e]"
        >
          Medications
        </Link>

        <span className="text-[10px] text-[#c2cbc7]">
          /
        </span>

        <span className="text-[10px] text-[#596963]">
          Lisinopril
        </span>

      </div>

      {/* HEADER */}
      <section className="mb-5 overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        <div className="bg-[#103f3a] px-6 py-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-[13px] bg-[#d9f0eb] text-[15px] font-bold text-[#0f766e]">
                Rx
              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h1 className="text-[21px] font-semibold tracking-[-0.03em] text-white">
                    Lisinopril
                  </h1>

                  <span className="rounded-full bg-[#dff4ea]/10 px-2.5 py-1 text-[8px] font-semibold text-[#9de0c5]">
                    Active
                  </span>

                </div>

                <p className="mt-1.5 text-[10px] text-[#a9cbc5]">
                  Lisinopril • Antihypertensive • MED-1001
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <button className="rounded-[9px] border border-white/15 bg-white/5 px-3.5 py-2 text-[9px] font-semibold text-[#d5e7e3] hover:bg-white/10">
                Edit Medication
              </button>

              <button
                onClick={() => setShowPrescription(true)}
                className="rounded-[9px] bg-[#e0f4ef] px-4 py-2 text-[9px] font-semibold text-[#0f766e] hover:bg-white"
              >
                + Prescribe
              </button>

            </div>

          </div>

        </div>

        {/* META */}
        <div className="grid grid-cols-5 divide-x divide-[#edf2f0]">

          <Meta label="Strength" value="10 mg" />

          <Meta label="Form" value="Tablet" />

          <Meta label="Route" value="Oral" />

          <Meta label="Category" value="Antihypertensive" />

          <Meta label="Patients" value="48 Active" />

        </div>

      </section>

      {/* TABS */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-1 rounded-[10px] border border-[#e4ebe8] bg-white p-1">

          {["Overview", "Prescriptions", "Patients", "History"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-[8px] px-4 py-2 text-[9px] font-semibold transition ${
                  activeTab === tab
                    ? "bg-[#e5f5f1] text-[#0f766e]"
                    : "text-[#899691] hover:text-[#0f766e]"
                }`}
              >
                {tab}
              </button>
            )
          )}

        </div>

        <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-3.5 py-2 text-[9px] font-semibold text-[#667570] hover:bg-[#f7faf9]">
          More Actions
        </button>

      </div>

      {/* CONTENT */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-[1fr_340px] gap-5">

          {/* LEFT */}
          <div className="space-y-5">

            {/* MEDICATION INFORMATION */}
            <Section
              title="Medication Information"
              subtitle="Basic medication details"
            >

              <div className="grid grid-cols-3 gap-4">

                <InfoCard
                  label="Generic Name"
                  value="Lisinopril"
                />

                <InfoCard
                  label="Brand Name"
                  value="Prinivil / Zestril"
                />

                <InfoCard
                  label="Strength"
                  value="10 mg"
                />

                <InfoCard
                  label="Dosage Form"
                  value="Tablet"
                />

                <InfoCard
                  label="Route"
                  value="Oral"
                />

                <InfoCard
                  label="Drug Class"
                  value="ACE Inhibitor"
                />

              </div>

            </Section>

            {/* DOSAGE */}
            <Section
              title="Dosage & Administration"
              subtitle="Recommended prescribing information"
            >

              <div className="grid grid-cols-3 gap-4">

                <InfoCard
                  label="Typical Dose"
                  value="10 mg"
                />

                <InfoCard
                  label="Frequency"
                  value="Once daily"
                />

                <InfoCard
                  label="Administration"
                  value="With or without food"
                />

              </div>

              <div className="mt-4 rounded-[10px] border border-[#e4ebe8] bg-[#f8fbfa] p-4">

                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8d9995]">
                  Clinical Notes
                </p>

                <p className="mt-2 text-[10px] leading-5 text-[#667570]">
                  Monitor blood pressure and renal function during treatment.
                  Dosage should be individualized based on clinical response
                  and patient tolerance.
                </p>

              </div>

            </Section>

            {/* WARNINGS */}
            <Section
              title="Warnings & Precautions"
              subtitle="Important prescribing considerations"
            >

              <div className="grid grid-cols-2 gap-3">

                <Alert
                  title="Pregnancy"
                  text="Contraindicated during pregnancy."
                  type="danger"
                />

                <Alert
                  title="Renal Function"
                  text="Monitor renal function and potassium."
                  type="warning"
                />

                <Alert
                  title="Hypotension"
                  text="Monitor blood pressure after initiation."
                  type="warning"
                />

                <Alert
                  title="Drug Interactions"
                  text="Review concurrent medications."
                  type="info"
                />

              </div>

            </Section>

            {/* PRESCRIPTION HISTORY */}
            <Section
              title="Recent Prescriptions"
              subtitle="Latest patient prescriptions"
            >

              <div className="overflow-hidden rounded-[10px] border border-[#e4ebe8]">

                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr] border-b border-[#edf2f0] bg-[#fafcfb] px-4 py-3">

                  <TableHead text="PATIENT" />

                  <TableHead text="DOSE" />

                  <TableHead text="FREQUENCY" />

                  <TableHead text="DATE" />

                  <TableHead text="STATUS" />

                </div>

                {prescriptionHistory.map((item) => (

                  <div
                    key={item.mrn}
                    className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr] items-center border-b border-[#edf2f0] px-4 py-3 last:border-0"
                  >

                    <div>

                      <p className="text-[10px] font-semibold text-[#52615c]">
                        {item.patient}
                      </p>

                      <p className="mt-1 text-[8px] text-[#9aa5a1]">
                        {item.mrn}
                      </p>

                    </div>

                    <span className="text-[9px] text-[#667570]">
                      {item.dose}
                    </span>

                    <span className="text-[9px] text-[#667570]">
                      {item.frequency}
                    </span>

                    <span className="text-[9px] text-[#667570]">
                      {item.prescribed}
                    </span>

                    <Status status={item.status} />

                  </div>

                ))}

              </div>

            </Section>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">

            {/* QUICK ACTION */}
            <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#899691]">
                Quick Action
              </p>

              <button
                onClick={() => setShowPrescription(true)}
                className="mt-4 flex w-full items-center gap-3 rounded-[11px] bg-[#e7f5f1] p-4 text-left transition hover:bg-[#dff1ec]"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-white text-[12px] font-bold text-[#0f766e]">
                  Rx
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#31524b]">
                    Prescribe Medication
                  </p>

                  <p className="mt-1 text-[8px] text-[#79918a]">
                    Create a new prescription
                  </p>

                </div>

                <span className="ml-auto text-[#0f766e]">
                  →
                </span>

              </button>

              <button
                onClick={() => setShowPatientSearch(true)}
                className="mt-2 flex w-full items-center gap-3 rounded-[11px] border border-[#e4ebe8] p-4 text-left transition hover:bg-[#f8fbfa]"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#f1f5f3] text-[12px] text-[#687771]">
                  +
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#52615c]">
                    Add Patient
                  </p>

                  <p className="mt-1 text-[8px] text-[#9aa5a1]">
                    Add medication to patient
                  </p>

                </div>

              </button>

            </section>

            {/* STATISTICS */}
            <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

              <SectionHeader
                title="Medication Statistics"
                subtitle="Current usage"
              />

              <div className="grid grid-cols-2 gap-px bg-[#edf2f0]">

                <Stat
                  value="48"
                  label="Active Patients"
                />

                <Stat
                  value="207"
                  label="Prescriptions"
                />

                <Stat
                  value="96%"
                  label="Adherence"
                />

                <Stat
                  value="4.8"
                  label="Avg. Rating"
                />

              </div>

            </section>

            {/* DETAILS */}
            <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

              <SectionHeader
                title="Additional Details"
                subtitle="Medication metadata"
              />

              <div className="space-y-4 px-5 py-5">

                <Detail label="Medication ID" value="MED-1001" />

                <Detail label="Created" value="Jan 12, 2025" />

                <Detail label="Last Updated" value="Aug 08, 2026" />

                <Detail label="Created By" value="Dr. John" />

                <Detail label="Status" value="Active" green />

              </div>

            </section>

          </div>

        </div>
      )}

      {/* PRESCRIPTIONS TAB */}
      {activeTab === "Prescriptions" && (
        <div className="rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-5">

            <div>

              <h2 className="text-[13px] font-semibold text-[#263833]">
                Prescription History
              </h2>

              <p className="mt-1 text-[9px] text-[#98a49f]">
                All prescriptions for this medication
              </p>

            </div>

            <button
              onClick={() => setShowPrescription(true)}
              className="rounded-[9px] bg-[#0f766e] px-4 py-2.5 text-[9px] font-semibold text-white"
            >
              + New Prescription
            </button>

          </div>

          <div className="p-6">

            <div className="space-y-3">

              {prescriptionHistory.map((item) => (
                <PrescriptionCard
                  key={item.mrn}
                  item={item}
                />
              ))}

            </div>

          </div>

        </div>
      )}

      {/* PATIENTS TAB */}
      {activeTab === "Patients" && (
        <div className="rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <div className="border-b border-[#edf2f0] px-6 py-5">

            <h2 className="text-[13px] font-semibold text-[#263833]">
              Patients Using This Medication
            </h2>

            <p className="mt-1 text-[9px] text-[#98a49f]">
              Currently active patients
            </p>

          </div>

          <div className="grid grid-cols-3 gap-4 p-6">

            {patients.map((patient) => (
              <PatientCard
                key={patient.mrn}
                patient={patient}
              />
            ))}

          </div>

        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === "History" && (
        <div className="rounded-[18px] border border-[#e4ebe8] bg-white p-6 shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

          <h2 className="text-[13px] font-semibold text-[#263833]">
            Medication Activity
          </h2>

          <p className="mt-1 text-[9px] text-[#98a49f]">
            Recent changes and activities
          </p>

          <div className="mt-6">

            <Timeline
              title="Medication updated"
              description="Strength and prescribing information were updated."
              date="Aug 08, 2026 • 10:15 AM"
            />

            <Timeline
              title="Prescription created"
              description="Lisinopril prescribed to Robert Johnson."
              date="Aug 08, 2026 • 10:30 AM"
            />

            <Timeline
              title="Medication created"
              description="Medication was added to the clinical formulary."
              date="Jan 12, 2025 • 09:20 AM"
              last
            />

          </div>

        </div>
      )}

      {/* PRESCRIBE MODAL */}
      {showPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172522]/30 px-4 backdrop-blur-[3px]">

          <div className="w-full max-w-[560px] overflow-hidden rounded-[18px] bg-white shadow-[0_25px_70px_rgba(20,50,45,0.18)]">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-5">

              <div>

                <h2 className="text-[15px] font-semibold text-[#263833]">
                  New Prescription
                </h2>

                <p className="mt-1 text-[9px] text-[#98a49f]">
                  Prescribe Lisinopril to a patient
                </p>

              </div>

              <button
                onClick={() => setShowPrescription(false)}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[16px] text-[#98a49f] hover:bg-[#f4f7f6]"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <div className="space-y-4 px-6 py-5">

              <Field label="Patient">

                <select className="input">

                  <option>
                    Select patient
                  </option>

                  {patients.map((patient) => (
                    <option key={patient.mrn}>
                      {patient.name} — {patient.mrn}
                    </option>
                  ))}

                </select>

              </Field>

              <div className="grid grid-cols-2 gap-4">

                <Field label="Medication">

                  <div className="flex h-10 items-center rounded-[9px] border border-[#e2eae7] bg-[#f8fbfa] px-3 text-[10px] font-semibold text-[#52615c]">
                    Lisinopril
                  </div>

                </Field>

                <Field label="Strength">

                  <select className="input">

                    <option>5 mg</option>
                    <option selected>10 mg</option>
                    <option>20 mg</option>

                  </select>

                </Field>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <Field label="Frequency">

                  <select className="input">

                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Every other day</option>

                  </select>

                </Field>

                <Field label="Route">

                  <select className="input">

                    <option>Oral</option>

                  </select>

                </Field>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <Field label="Duration">

                  <div className="flex gap-2">

                    <input
                      defaultValue="30"
                      className="input"
                    />

                    <select className="input w-[100px]">

                      <option>Days</option>
                      <option>Weeks</option>
                      <option>Months</option>

                    </select>

                  </div>

                </Field>

                <Field label="Refills">

                  <select className="input">

                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>

                  </select>

                </Field>

              </div>

              <Field label="Instructions">

                <textarea
                  placeholder="Enter patient instructions..."
                  className="min-h-[80px] w-full resize-none rounded-[9px] border border-[#e2eae7] bg-white px-3 py-2.5 text-[10px] text-[#52615c] outline-none placeholder:text-[#a5afab] focus:border-[#9bcfc5]"
                />

              </Field>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 border-t border-[#edf2f0] bg-[#fafcfb] px-6 py-4">

              <button
                onClick={() => setShowPrescription(false)}
                className="rounded-[9px] border border-[#dfe7e4] px-4 py-2.5 text-[9px] font-semibold text-[#667570] hover:bg-white"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowPrescription(false)}
                className="rounded-[9px] bg-[#0f766e] px-5 py-2.5 text-[9px] font-semibold text-white hover:bg-[#0b665f]"
              >
                Create Prescription
              </button>

            </div>

          </div>

        </div>
      )}

      {/* PATIENT SEARCH MODAL */}
      {showPatientSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172522]/30 px-4 backdrop-blur-[3px]">

          <div className="w-full max-w-[500px] rounded-[18px] bg-white p-6 shadow-[0_25px_70px_rgba(20,50,45,0.18)]">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-[15px] font-semibold text-[#263833]">
                  Add Patient
                </h2>

                <p className="mt-1 text-[9px] text-[#98a49f]">
                  Select a patient for this medication
                </p>

              </div>

              <button
                onClick={() => setShowPatientSearch(false)}
                className="text-[17px] text-[#98a49f]"
              >
                ×
              </button>

            </div>

            <div className="mt-5 flex h-10 items-center gap-2 rounded-[9px] border border-[#e2eae7] px-3">

              <span className="text-[#9aa5a1]">
                ⌕
              </span>

              <input
                placeholder="Search patient..."
                className="w-full bg-transparent text-[10px] outline-none placeholder:text-[#a5afab]"
              />

            </div>

            <div className="mt-4 space-y-2">

              {patients.map((patient) => (

                <button
                  key={patient.mrn}
                  onClick={() => setSelectedPatient(patient.mrn)}
                  className={`flex w-full items-center gap-3 rounded-[10px] border p-3 text-left transition ${
                    selectedPatient === patient.mrn
                      ? "border-[#9bcfc5] bg-[#f2faf8]"
                      : "border-[#e5ece9] hover:bg-[#f8fbfa]"
                  }`}
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f5f1] text-[9px] font-bold text-[#0f766e]">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>

                    <p className="text-[10px] font-semibold text-[#52615c]">
                      {patient.name}
                    </p>

                    <p className="mt-1 text-[8px] text-[#9aa5a1]">
                      {patient.mrn} • {patient.age} years •{" "}
                      {patient.condition}
                    </p>

                  </div>

                </button>

              ))}

            </div>

            <div className="mt-5 flex justify-end gap-2">

              <button
                onClick={() => setShowPatientSearch(false)}
                className="rounded-[9px] border border-[#dfe7e4] px-4 py-2.5 text-[9px] font-semibold text-[#667570]"
              >
                Cancel
              </button>

              <button
                disabled={!selectedPatient}
                onClick={() => setShowPatientSearch(false)}
                className="rounded-[9px] bg-[#0f766e] px-4 py-2.5 text-[9px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add Patient
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function Meta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-5 py-4">

      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-1.5 text-[10px] font-semibold text-[#52615c]">
        {value}
      </p>

    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

      <div className="mb-5">

        <h2 className="text-[12px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[8px] text-[#98a49f]">
          {subtitle}
        </p>

      </div>

      {children}

    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-[#edf2f0] px-5 py-4">

      <h2 className="text-[12px] font-semibold text-[#263833]">
        {title}
      </h2>

      <p className="mt-1 text-[8px] text-[#98a49f]">
        {subtitle}
      </p>

    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[10px] border border-[#e5ece9] bg-[#fbfcfc] p-3.5">

      <p className="text-[8px] uppercase tracking-[0.06em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-2 text-[10px] font-semibold text-[#52615c]">
        {value}
      </p>

    </div>
  );
}

function Alert({
  title,
  text,
  type,
}: {
  title: string;
  text: string;
  type: "danger" | "warning" | "info";
}) {
  const styles = {
    danger: "border-[#f1ddda] bg-[#fff8f7] text-[#a65750]",
    warning: "border-[#f0e2ce] bg-[#fffaf3] text-[#a2733f]",
    info: "border-[#dce9ee] bg-[#f7fbfd] text-[#5d7d8d]",
  };

  return (
    <div className={`rounded-[10px] border p-4 ${styles[type]}`}>

      <p className="text-[9px] font-semibold">
        {title}
      </p>

      <p className="mt-1.5 text-[8px] leading-4 opacity-80">
        {text}
      </p>

    </div>
  );
}

function Status({
  status,
}: {
  status: string;
}) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold ${
        active
          ? "bg-[#e8f6f0] text-[#278460]"
          : "bg-[#f1f3f2] text-[#8a9390]"
      }`}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[#35a878]" : "bg-[#9ca5a2]"
        }`}
      />

      {status}

    </span>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white p-4">

      <p className="text-[19px] font-semibold tracking-[-0.03em] text-[#263833]">
        {value}
      </p>

      <p className="mt-1 text-[8px] text-[#9aa5a1]">
        {label}
      </p>

    </div>
  );
}

function Detail({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[9px] text-[#98a49f]">
        {label}
      </span>

      <span
        className={`text-[9px] font-semibold ${
          green ? "text-[#278460]" : "text-[#596963]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

function PrescriptionCard({
  item,
}: {
  item: {
    patient: string;
    mrn: string;
    dose: string;
    frequency: string;
    prescribed: string;
    status: string;
  };
}) {
  return (
    <div className="flex items-center justify-between rounded-[12px] border border-[#e5ece9] p-4 hover:bg-[#f9fbfa]">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f5f1] text-[9px] font-bold text-[#0f766e]">
          {item.patient
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>

          <p className="text-[10px] font-semibold text-[#52615c]">
            {item.patient}
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            {item.mrn}
          </p>

        </div>

      </div>

      <div className="text-right">

        <p className="text-[9px] font-semibold text-[#52615c]">
          {item.dose} • {item.frequency}
        </p>

        <p className="mt-1 text-[8px] text-[#9aa5a1]">
          {item.prescribed}
        </p>

      </div>

      <Status status={item.status} />

    </div>
  );
}

function PatientCard({
  patient,
}: {
  patient: {
    name: string;
    mrn: string;
    age: number;
    condition: string;
  };
}) {
  return (
    <div className="rounded-[12px] border border-[#e5ece9] p-4 hover:bg-[#f9fbfa]">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f5f1] text-[9px] font-bold text-[#0f766e]">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>

          <p className="text-[10px] font-semibold text-[#52615c]">
            {patient.name}
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            {patient.mrn}
          </p>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-[8px] text-[#9aa5a1]">
          {patient.age} years
        </span>

        <span className="rounded-full bg-[#f0f5f3] px-2 py-1 text-[7px] text-[#667570]">
          {patient.condition}
        </span>

      </div>

    </div>
  );
}

function Timeline({
  title,
  description,
  date,
  last = false,
}: {
  title: string;
  description: string;
  date: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">

      {!last && (
        <div className="absolute left-[10px] top-[25px] h-[60px] w-px bg-[#dce8e4]" />
      )}

      <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f5f1] text-[7px] text-[#0f766e]">
        •
      </div>

      <div className="pb-7">

        <p className="text-[10px] font-semibold text-[#52615c]">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-5 text-[#8b9893]">
          {description}
        </p>

        <p className="mt-1 text-[8px] text-[#a0aaa6]">
          {date}
        </p>

      </div>

    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.06em] text-[#8d9995]">
        {label}
      </span>

      {children}

    </label>
  );
}



function TableHead({
  text,
}: {
  text: string;
}) {
  return (
    <span className="text-[8px] font-semibold tracking-[0.1em] text-[#9aa5a1]">
      {text}
    </span>
  );
}