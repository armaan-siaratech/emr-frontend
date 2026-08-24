"use client";

import { useState } from "react";
import Link from "next/link";

const vitals = [
  { label: "Blood Pressure", value: "138/86", unit: "mmHg" },
  { label: "Heart Rate", value: "74", unit: "bpm" },
  { label: "Temperature", value: "98.4", unit: "°F" },
  { label: "Weight", value: "82", unit: "kg" },
];

const diagnoses = [
  {
    name: "Essential Hypertension",
    type: "Primary",
  },
  {
    name: "Hyperlipidemia",
    type: "Secondary",
  },
];

const medications = [
  {
    name: "Lisinopril",
    dose: "10 mg",
    frequency: "Once daily",
  },
  {
    name: "Amlodipine",
    dose: "5 mg",
    frequency: "Once daily",
  },
];

export default function EncounterDetailsPage() {
  const [activeSection, setActiveSection] = useState("Clinical Note");
  const [showComplete, setShowComplete] = useState(false);

  const sections = [
    "Overview",
    "Clinical Note",
    "Diagnosis",
    "Medications",
  ];

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* TOP BREADCRUMB */}
      <div className="mb-5 flex items-center gap-2">

        <Link
          href="/encounters"
          className="text-[10px] font-semibold text-[#899691] hover:text-[#0f766e]"
        >
          Encounters
        </Link>

        <span className="text-[10px] text-[#c2cbc7]">
          /
        </span>

        <span className="text-[10px] text-[#596963]">
          ENC-10021
        </span>

      </div>

      {/* ENCOUNTER HEADER */}
      <section className="mb-5 overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        <div className="bg-[#103f3a] px-6 py-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              {/* PATIENT AVATAR */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#d9f0eb] text-[13px] font-bold text-[#0f766e]">
                RJ

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#103f3a] bg-[#49b987]" />
              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h1 className="text-[20px] font-semibold tracking-[-0.03em] text-white">
                    Robert Johnson
                  </h1>

                  <span className="rounded-full bg-[#e9f6f2]/10 px-2.5 py-1 text-[8px] font-semibold text-[#bde4dc]">
                    Follow-up Visit
                  </span>

                </div>

                <div className="mt-1.5 flex items-center gap-3 text-[9px] text-[#a9cbc5]">

                  <span>MRN-10241</span>

                  <span>•</span>

                  <span>54 years</span>

                  <span>•</span>

                  <span>Male</span>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <span className="inline-flex items-center gap-2 rounded-full bg-[#dff4ea]/10 px-3 py-1.5 text-[8px] font-semibold text-[#9de0c5]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#59c995]" />
                In Progress
              </span>

              <button className="rounded-[9px] border border-white/15 bg-white/5 px-3.5 py-2 text-[9px] font-semibold text-[#d5e7e3] hover:bg-white/10">
                Save Draft
              </button>

            </div>

          </div>

        </div>

        {/* ENCOUNTER META */}
        <div className="grid grid-cols-5 divide-x divide-[#edf2f0]">

          <Meta label="Encounter ID" value="ENC-10021" />

          <Meta label="Date" value="Aug 08, 2026" />

          <Meta label="Time" value="10:30 AM" />

          <Meta label="Provider" value="Dr. John" />

          <Meta label="Duration" value="28 min" />

        </div>

      </section>

      {/* NAVIGATION */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-1 rounded-[10px] border border-[#e4ebe8] bg-white p-1 shadow-[0_4px_15px_rgba(30,60,52,0.025)]">

          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`rounded-[8px] px-4 py-2 text-[9px] font-semibold transition ${
                activeSection === section
                  ? "bg-[#e5f5f1] text-[#0f766e]"
                  : "text-[#899691] hover:text-[#0f766e]"
              }`}
            >
              {section}
            </button>
          ))}

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-3.5 py-2 text-[9px] font-semibold text-[#667570] hover:bg-[#f7faf9]">
            Print
          </button>

          <button className="rounded-[9px] border border-[#e1e9e5] bg-white px-3.5 py-2 text-[9px] font-semibold text-[#667570] hover:bg-[#f7faf9]">
            More
          </button>

        </div>

      </div>

      {/* MAIN WORKSPACE */}
      <div className="grid grid-cols-[1fr_320px] gap-5">

        {/* LEFT */}
        <main className="space-y-5">

          {/* CHIEF COMPLAINT */}
          <SectionCard
            number="01"
            title="Chief Complaint"
            subtitle="Reason for today's visit"
          >

            <textarea
              defaultValue="Patient presents for follow-up of hypertension and medication management."
              className="min-h-[80px] w-full resize-none rounded-[10px] border border-[#e3ebe8] bg-[#fbfcfc] px-4 py-3 text-[11px] leading-6 text-[#596963] outline-none transition focus:border-[#9bcfc5] focus:bg-white"
            />

          </SectionCard>

          {/* SUBJECTIVE */}
          <SectionCard
            number="02"
            title="Subjective"
            subtitle="Patient reported symptoms and history"
          >

            <textarea
              defaultValue="Patient reports taking medications regularly. Denies chest pain, shortness of breath, dizziness, or headache. No new complaints reported today. Patient states that blood pressure readings at home have been within acceptable range."
              className="min-h-[130px] w-full resize-none rounded-[10px] border border-[#e3ebe8] bg-[#fbfcfc] px-4 py-3 text-[11px] leading-6 text-[#596963] outline-none transition focus:border-[#9bcfc5] focus:bg-white"
            />

          </SectionCard>

          {/* OBJECTIVE */}
          <SectionCard
            number="03"
            title="Objective"
            subtitle="Clinical findings and examination"
          >

            <textarea
              defaultValue="Patient appears alert and oriented and is in no acute distress. Vital signs reviewed. Blood pressure is 138/86 mmHg, heart rate 74 bpm, temperature 98.4°F, and weight 82 kg."
              className="min-h-[120px] w-full resize-none rounded-[10px] border border-[#e3ebe8] bg-[#fbfcfc] px-4 py-3 text-[11px] leading-6 text-[#596963] outline-none transition focus:border-[#9bcfc5] focus:bg-white"
            />

          </SectionCard>

          {/* ASSESSMENT */}
          <SectionCard
            number="04"
            title="Assessment"
            subtitle="Clinical assessment"
          >

            <textarea
              defaultValue="Essential hypertension, currently stable on existing medication regimen. Blood pressure remains mildly elevated but improved compared with previous visit. Hyperlipidemia remains stable on current therapy."
              className="min-h-[120px] w-full resize-none rounded-[10px] border border-[#e3ebe8] bg-[#fbfcfc] px-4 py-3 text-[11px] leading-6 text-[#596963] outline-none transition focus:border-[#9bcfc5] focus:bg-white"
            />

          </SectionCard>

          {/* PLAN */}
          <SectionCard
            number="05"
            title="Plan"
            subtitle="Treatment and follow-up plan"
          >

            <textarea
              defaultValue="Continue current antihypertensive medications. Continue low-sodium diet and regular physical activity. Monitor blood pressure at home and maintain a blood pressure log. Continue lipid-lowering therapy. Follow up in four weeks or earlier if symptoms worsen."
              className="min-h-[140px] w-full resize-none rounded-[10px] border border-[#e3ebe8] bg-[#fbfcfc] px-4 py-3 text-[11px] leading-6 text-[#596963] outline-none transition focus:border-[#9bcfc5] focus:bg-white"
            />

          </SectionCard>

          {/* DIAGNOSIS */}
          <SectionCard
            number="06"
            title="Diagnosis"
            subtitle="Problems addressed during this encounter"
          >

            <div className="space-y-2">

              {diagnoses.map((diagnosis, index) => (
                <div
                  key={diagnosis.name}
                  className="flex items-center justify-between rounded-[10px] border border-[#e5ece9] bg-[#fbfcfc] px-4 py-3"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#e8f5f2] text-[11px] font-bold text-[#0f766e]">
                      {index === 0 ? "P" : "S"}
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold text-[#52615c]">
                        {diagnosis.name}
                      </p>

                      <p className="mt-1 text-[8px] text-[#9aa5a1]">
                        {diagnosis.type} diagnosis
                      </p>

                    </div>

                  </div>

                  <button className="text-[13px] text-[#a2aca8] hover:text-[#d16b65]">
                    ×
                  </button>

                </div>
              ))}

              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-[9px] border border-dashed border-[#bcd8d2] py-3 text-[9px] font-semibold text-[#0f766e] hover:bg-[#f5faf8]">
                <span className="text-[14px]">+</span>
                Add Diagnosis
              </button>

            </div>

          </SectionCard>

          {/* MEDICATIONS */}
          <SectionCard
            number="07"
            title="Medications"
            subtitle="Medications associated with this encounter"
          >

            <div className="overflow-hidden rounded-[10px] border border-[#e4ebe8]">

              <div className="grid grid-cols-[1.5fr_0.8fr_1fr_40px] border-b border-[#edf2f0] bg-[#fafcfb] px-4 py-3">

                <TableHead text="MEDICATION" />
                <TableHead text="DOSE" />
                <TableHead text="FREQUENCY" />
                <div />

              </div>

              {medications.map((medication) => (
                <div
                  key={medication.name}
                  className="grid grid-cols-[1.5fr_0.8fr_1fr_40px] items-center border-b border-[#edf2f0] px-4 py-3 last:border-0"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#e8f5f2] text-[9px] font-bold text-[#0f766e]">
                      Rx
                    </div>

                    <span className="text-[10px] font-semibold text-[#52615c]">
                      {medication.name}
                    </span>

                  </div>

                  <span className="text-[9px] text-[#667570]">
                    {medication.dose}
                  </span>

                  <span className="text-[9px] text-[#667570]">
                    {medication.frequency}
                  </span>

                  <button className="text-[12px] text-[#a2aca8] hover:text-[#d16b65]">
                    ×
                  </button>

                </div>
              ))}

            </div>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-[9px] border border-dashed border-[#bcd8d2] py-3 text-[9px] font-semibold text-[#0f766e] hover:bg-[#f5faf8]">
              <span className="text-[14px]">+</span>
              Add Medication
            </button>

          </SectionCard>

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-5">

          {/* PATIENT */}
          <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Patient"
              subtitle="Patient information"
            />

            <div className="px-5 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e2f3ef] text-[11px] font-bold text-[#0f766e]">
                  RJ
                </div>

                <div>

                  <p className="text-[11px] font-semibold text-[#35453f]">
                    Robert Johnson
                  </p>

                  <p className="mt-1 text-[8px] text-[#9aa5a1]">
                    MRN-10241
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                <PatientInfo
                  label="Age"
                  value="54 years"
                />

                <PatientInfo
                  label="Gender"
                  value="Male"
                />

                <PatientInfo
                  label="Blood Group"
                  value="O+"
                  highlight
                />

                <PatientInfo
                  label="Allergies"
                  value="No known allergies"
                />

              </div>

            </div>

          </section>

          {/* VITALS */}
          <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Vitals"
              subtitle="Current encounter vitals"
            />

            <div className="grid grid-cols-2 gap-px bg-[#edf2f0]">

              {vitals.map((vital) => (
                <div
                  key={vital.label}
                  className="bg-white p-4"
                >

                  <p className="text-[8px] font-semibold uppercase tracking-[0.06em] text-[#9aa5a1]">
                    {vital.label}
                  </p>

                  <div className="mt-2 flex items-baseline gap-1">

                    <span className="text-[17px] font-semibold tracking-[-0.03em] text-[#263833]">
                      {vital.value}
                    </span>

                  </div>

                  <p className="mt-0.5 text-[8px] text-[#9aa5a1]">
                    {vital.unit}
                  </p>

                </div>
              ))}

            </div>

            <button className="w-full border-t border-[#edf2f0] py-3 text-[9px] font-semibold text-[#0f766e] hover:bg-[#f7faf9]">
              Edit Vitals
            </button>

          </section>

          {/* ALLERGIES */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Alerts"
              subtitle="Important patient information"
            />

            <div className="space-y-3 px-5 py-5">

              <div className="flex gap-3 rounded-[10px] border border-[#f2dfdc] bg-[#fff8f7] p-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fbe7e4] text-[10px] text-[#c86c63]">
                  !
                </div>

                <div>

                  <p className="text-[9px] font-semibold text-[#a65750]">
                    No Known Drug Allergies
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-[#9b7c78]">
                    Verify allergies before prescribing new medication.
                  </p>

                </div>

              </div>

              <div className="flex gap-3 rounded-[10px] border border-[#e1ece9] bg-[#f7fbfa] p-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e4f3ef] text-[10px] text-[#0f766e]">
                  i
                </div>

                <div>

                  <p className="text-[9px] font-semibold text-[#52615c]">
                    Follow-up Required
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-[#9aa5a1]">
                    Recommended follow-up in four weeks.
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* ENCOUNTER PROGRESS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Encounter Progress"
              subtitle="Documentation status"
            />

            <div className="px-5 py-5">

              <ProgressStep
                number="1"
                title="Patient Check-in"
                completed
              />

              <ProgressStep
                number="2"
                title="Vitals Recorded"
                completed
              />

              <ProgressStep
                number="3"
                title="Clinical Documentation"
                active
              />

              <ProgressStep
                number="4"
                title="Diagnosis & Treatment"
              />

              <ProgressStep
                number="5"
                title="Complete Encounter"
                last
              />

            </div>

          </section>

        </aside>

      </div>

      {/* BOTTOM ACTION */}
      <div className="sticky bottom-4 z-20 mt-6 flex items-center justify-between rounded-[14px] border border-[#dfe9e5] bg-white/95 px-5 py-3 shadow-[0_10px_35px_rgba(30,60,52,0.12)] backdrop-blur">

        <div>

          <p className="text-[9px] font-semibold text-[#52615c]">
            Encounter in progress
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            Save your changes before completing the encounter.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="rounded-[9px] border border-[#dfe7e4] px-4 py-2.5 text-[9px] font-semibold text-[#667570] hover:bg-[#f7faf9]">
            Save Draft
          </button>

          <button
            onClick={() => setShowComplete(true)}
            className="rounded-[9px] bg-[#0f766e] px-5 py-2.5 text-[9px] font-semibold text-white shadow-[0_5px_15px_rgba(15,118,110,0.16)] hover:bg-[#0b665f]"
          >
            Complete Encounter
          </button>

        </div>

      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172522]/30 px-4 backdrop-blur-[3px]">

          <div className="w-full max-w-[440px] rounded-[18px] bg-white p-6 shadow-[0_25px_70px_rgba(20,50,45,0.18)]">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f5f0] text-[17px] text-[#278460]">
                ✓
              </div>

              <div>

                <h2 className="text-[15px] font-semibold text-[#263833]">
                  Complete Encounter?
                </h2>

                <p className="mt-2 text-[10px] leading-5 text-[#7c8985]">
                  Once completed, this encounter will be marked as complete.
                  Make sure the clinical documentation, diagnosis and treatment
                  information are correct.
                </p>

              </div>

            </div>

            <div className="mt-6 flex justify-end gap-2">

              <button
                onClick={() => setShowComplete(false)}
                className="rounded-[9px] border border-[#dfe7e4] px-4 py-2 text-[9px] font-semibold text-[#667570] hover:bg-[#f7faf9]"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowComplete(false)}
                className="rounded-[9px] bg-[#0f766e] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#0b665f]"
              >
                Yes, Complete
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

function SectionCard({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[17px] border border-[#e4ebe8] bg-white p-5 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

      <div className="mb-4 flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#edf5f3] text-[8px] font-bold text-[#0f766e]">
          {number}
        </div>

        <div>

          <h2 className="text-[12px] font-semibold text-[#263833]">
            {title}
          </h2>

          <p className="mt-1 text-[8px] text-[#98a49f]">
            {subtitle}
          </p>

        </div>

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

function PatientInfo({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">

      <span className="text-[9px] text-[#98a49f]">
        {label}
      </span>

      <span
        className={`text-right text-[9px] font-semibold ${
          highlight ? "text-[#0f766e]" : "text-[#596963]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

function ProgressStep({
  number,
  title,
  completed = false,
  active = false,
  last = false,
}: {
  number: string;
  title: string;
  completed?: boolean;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-3">

      {!last && (
        <div
          className={`absolute left-[13px] top-[28px] h-[28px] w-px ${
            completed
              ? "bg-[#91cfc2]"
              : "bg-[#e4ebe8]"
          }`}
        />
      )}

      <div
        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${
          completed
            ? "bg-[#0f766e] text-white"
            : active
            ? "border-2 border-[#0f766e] bg-[#e7f5f1] text-[#0f766e]"
            : "bg-[#f1f4f3] text-[#9aa5a1]"
        }`}
      >
        {completed ? "✓" : number}
      </div>

      <div className="pb-5">

        <p
          className={`pt-1 text-[9px] font-semibold ${
            active
              ? "text-[#0f766e]"
              : completed
              ? "text-[#52615c]"
              : "text-[#9aa5a1]"
          }`}
        >
          {title}
        </p>

        {active && (
          <p className="mt-1 text-[7px] text-[#a0aaa6]">
            Current step
          </p>
        )}

      </div>

    </div>
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