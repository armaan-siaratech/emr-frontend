import Link from "next/link";
import { Plus } from "lucide-react";

const patient = {
  name: "Robert Johnson",
  initials: "RJ",
  mrn: "MRN-10241",
  age: 54,
  gender: "Male",
  dob: "June 14, 1972",
  bloodGroup: "O+",
  phone: "(555) 123-4567",
};

const vitals = [
  {
    label: "Blood Pressure",
    value: "138/86",
    unit: "mmHg",
  },
  {
    label: "Heart Rate",
    value: "74",
    unit: "bpm",
  },
  {
    label: "Temperature",
    value: "98.4",
    unit: "°F",
  },
  {
    label: "Weight",
    value: "82",
    unit: "kg",
  },
];

const diagnoses = [
  {
    name: "Essential Hypertension",
    type: "Primary",
    status: "Active",
  },
  {
    name: "Hyperlipidemia",
    type: "Secondary",
    status: "Active",
  },
];

const medications = [
  {
    name: "Lisinopril",
    dosage: "10 mg",
    frequency: "Once daily",
    route: "Oral",
  },
  {
    name: "Amlodipine",
    dosage: "5 mg",
    frequency: "Once daily",
    route: "Oral",
  },
  {
    name: "Atorvastatin",
    dosage: "20 mg",
    frequency: "Once at night",
    route: "Oral",
  },
];

export default async function ClinicalNoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[1500px]">

      {/* BREADCRUMB */}
      <div className="mb-5 flex items-center gap-2">

        <Link
          href="/clinical-notes"
          className="text-[10px] font-semibold text-[#899691] transition hover:text-[#0f766e]"
        >
          Clinical Notes
        </Link>

        <span className="text-[10px] text-[#c2cbc7]">
          /
        </span>

        <span className="text-[10px] text-[#596963]">
          {id}
        </span>

      </div>

      {/* PATIENT HEADER */}
      <section className="mb-5 overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        <div className="relative overflow-hidden bg-[#103f3a] px-6 py-6">

          <div className="absolute -right-16 -top-24 h-60 w-60 rounded-full bg-[#4da99b]/15 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#d9f0eb] text-[16px] font-bold text-[#0f766e] ring-4 ring-white/10">

                {patient.initials}

                <span className="absolute bottom-1 right-0 h-3 w-3 rounded-full border-2 border-[#103f3a] bg-[#49b987]" />

              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h1 className="text-[21px] font-semibold tracking-[-0.03em] text-white">
                    {patient.name}
                  </h1>

                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[8px] font-semibold text-[#bce6dd]">
                    Active Patient
                  </span>

                </div>

                <div className="mt-1.5 flex items-center gap-3 text-[9px] text-[#a9cbc5]">

                  <span>{patient.mrn}</span>

                  <span>•</span>

                  <span>{patient.age} years</span>

                  <span>•</span>

                  <span>{patient.gender}</span>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <button className="rounded-[9px] border border-white/15 bg-white/5 px-3.5 py-2 text-[9px] font-semibold text-[#d5e7e3] transition hover:bg-white/10">
                Edit Note
              </button>

              <button className="rounded-[9px] bg-white px-3.5 py-2 text-[9px] font-semibold text-[#0f766e] transition hover:-translate-y-0.5 hover:shadow-lg">
                Print Note
              </button>

            </div>

          </div>

        </div>

        {/* NOTE META */}
        <div className="grid grid-cols-5 divide-x divide-[#edf2f0]">

          <Meta
            label="Note Type"
            value="Progress Note"
          />

          <Meta
            label="Date"
            value="Aug 08, 2026"
          />

          <Meta
            label="Time"
            value="10:42 AM"
          />

          <Meta
            label="Provider"
            value="Dr. John"
          />

          <Meta
            label="Status"
            value="Signed"
            highlight
          />

        </div>

      </section>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-[1fr_320px] gap-5">

        {/* LEFT NOTE */}
        <div className="space-y-5">

          {/* NOTE TITLE */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-5">

              <div>

                <div className="flex items-center gap-2">

                  <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#e5f5f1] text-[#0f766e]">
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>

                  <div>
                    <h2 className="text-[14px] font-semibold text-[#263833]">
                      Progress Note
                    </h2>

                    <p className="mt-1 text-[9px] text-[#98a49f]">
                      Follow-up clinical documentation
                    </p>
                  </div>

                </div>

              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f6f0] px-3 py-1.5 text-[8px] font-semibold text-[#278460]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#35a878]" />
                Signed
              </span>

            </div>

            <div className="px-6 py-6">

              <ClinicalSection
                number="01"
                title="Chief Complaint"
                text="Patient presents for follow-up of hypertension and medication management."
              />

              <ClinicalSection
                number="02"
                title="Subjective"
                text="Patient reports taking medications regularly. Denies chest pain, shortness of breath, dizziness, or headache. No new complaints reported today. Patient states that blood pressure readings at home have been within acceptable range."
              />

              <ClinicalSection
                number="03"
                title="Objective"
                text="Patient appears alert and oriented and is in no acute distress. Vital signs reviewed. Blood pressure is 138/86 mmHg, heart rate 74 bpm, temperature 98.4°F, and weight 82 kg."
              />

              <ClinicalSection
                number="04"
                title="Assessment"
                text="Essential hypertension, currently stable on existing medication regimen. Blood pressure remains mildly elevated but improved compared with previous visit. Hyperlipidemia remains stable on current therapy."
              />

              <ClinicalSection
                number="05"
                title="Plan"
                text="Continue current antihypertensive medications. Continue low-sodium diet and regular physical activity. Monitor blood pressure at home and maintain a blood pressure log. Continue lipid-lowering therapy. Follow up in four weeks or earlier if symptoms worsen."
                last
              />

            </div>

          </section>

          {/* ADDITIONAL INFORMATION */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Additional Information"
              subtitle="Other clinical documentation"
            />

            <div className="grid grid-cols-2 gap-6 px-6 py-5">

              <InfoBlock
                title="Allergies"
                value="No known drug allergies"
              />

              <InfoBlock
                title="Past Medical History"
                value="Hypertension, hyperlipidemia"
              />

              <InfoBlock
                title="Family History"
                value="Family history of hypertension"
              />

              <InfoBlock
                title="Social History"
                value="No tobacco use reported"
              />

            </div>

          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-5">

          {/* PATIENT SNAPSHOT */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Patient Snapshot"
              subtitle="Basic patient information"
            />

            <div className="space-y-4 px-5 py-5">

              <Snapshot
                label="Date of Birth"
                value={patient.dob}
              />

              <Snapshot
                label="Blood Group"
                value={patient.bloodGroup}
                highlight
              />

              <Snapshot
                label="Phone"
                value={patient.phone}
              />

            </div>

          </section>

          {/* VITALS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Vitals"
              subtitle="Recorded during this visit"
            />

            <div className="grid grid-cols-2 gap-px bg-[#edf2f0]">

              {vitals.map((vital) => (
                <div
                  key={vital.label}
                  className="bg-white p-4"
                >

                  <p className="text-[8px] font-semibold uppercase tracking-[0.07em] text-[#9aa5a1]">
                    {vital.label}
                  </p>

                  <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em] text-[#263833]">
                    {vital.value}
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#9aa5a1]">
                    {vital.unit}
                  </p>

                </div>
              ))}

            </div>

          </section>

          {/* DIAGNOSES */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Diagnoses"
              subtitle="Associated diagnoses"
            />

            <div>

              {diagnoses.map((diagnosis, index) => (
                <div
                  key={diagnosis.name}
                  className={`px-5 py-4 ${
                    index !== diagnoses.length - 1
                      ? "border-b border-[#edf2f0]"
                      : ""
                  }`}
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#edf5f3] text-[#0f766e]">
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </div>

                      <div>

                        <p className="text-[10px] font-semibold leading-4 text-[#52615c]">
                          {diagnosis.name}
                        </p>

                        <p className="mt-1 text-[8px] text-[#9aa5a1]">
                          {diagnosis.type} diagnosis
                        </p>

                      </div>

                    </div>

                    <span className="rounded-full bg-[#e8f6f0] px-2 py-1 text-[7px] font-semibold text-[#278460]">
                      {diagnosis.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </section>

          {/* MEDICATIONS */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Medications"
              subtitle="Current medications"
            />

            <div>

              {medications.map((medication, index) => (
                <div
                  key={medication.name}
                  className={`px-5 py-4 ${
                    index !== medications.length - 1
                      ? "border-b border-[#edf2f0]"
                      : ""
                  }`}
                >

                  <div className="flex gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f5f2] text-[11px] font-semibold text-[#0f766e]">
                      Rx
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold text-[#52615c]">
                        {medication.name}
                      </p>

                      <p className="mt-1 text-[8px] text-[#9aa5a1]">
                        {medication.dosage} • {medication.frequency}
                      </p>

                      <p className="mt-1 text-[8px] text-[#a4ada9]">
                        Route: {medication.route}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>

        </aside>

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="mt-5 flex items-center justify-between rounded-[14px] border border-[#e4ebe8] bg-white px-5 py-3 shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

        <div>

          <p className="text-[9px] font-semibold text-[#52615c]">
            Clinical Note Signed
          </p>

          <p className="mt-1 text-[8px] text-[#9aa5a1]">
            This note was signed by Dr. John on Aug 08, 2026.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <Link
            href="/clinical-notes"
            className="rounded-[9px] border border-[#dfe7e4] px-4 py-2 text-[9px] font-semibold text-[#667570] transition hover:bg-[#f7faf9]"
          >
            Back to Notes
          </Link>

          <button className="rounded-[9px] bg-[#0f766e] px-4 py-2 text-[9px] font-semibold text-white transition hover:bg-[#0b665f]">
            Print Note
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function Meta({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="px-5 py-4">

      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <p
        className={`mt-1.5 text-[10px] font-semibold ${
          highlight ? "text-[#278460]" : "text-[#52615c]"
        }`}
      >
        {value}
      </p>

    </div>
  );
}

function ClinicalSection({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex gap-4 ${
        last ? "" : "mb-7"
      }`}
    >

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#edf5f3] text-[8px] font-bold text-[#0f766e]">
        {number}
      </div>

      <div className="flex-1">

        <h3 className="text-[11px] font-semibold text-[#263833]">
          {title}
        </h3>

        <p className="mt-2 text-[11px] leading-[1.8] text-[#63716c]">
          {text}
        </p>

      </div>

    </div>
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

function Snapshot({
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
          highlight ? "text-[#0f766e]" : "text-[#52615c]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

function InfoBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {title}
      </p>

      <p className="mt-1.5 text-[10px] leading-5 text-[#596963]">
        {value}
      </p>

    </div>
  );
}