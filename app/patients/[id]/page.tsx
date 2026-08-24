import Link from "next/link";

const patient = {
  name: "Robert Johnson",
  mrn: "MRN-10241",
  age: 54,
  gender: "Male",
  dob: "June 14, 1972",
  phone: "(555) 123-4567",
  email: "robert.johnson@example.com",
  address: "245 Main Street, New York, NY",
  bloodGroup: "O+",
  height: "178 cm",
  weight: "82 kg",
  primaryCondition: "Hypertension",
};

const medications = [
  {
    name: "Lisinopril",
    dosage: "10 mg",
    frequency: "Once daily",
    status: "Active",
  },
  {
    name: "Amlodipine",
    dosage: "5 mg",
    frequency: "Once daily",
    status: "Active",
  },
  {
    name: "Atorvastatin",
    dosage: "20 mg",
    frequency: "Once at night",
    status: "Active",
  },
];

const diagnoses = [
  {
    name: "Essential Hypertension",
    date: "Aug 08, 2026",
    status: "Active",
  },
  {
    name: "Hyperlipidemia",
    date: "Jul 15, 2026",
    status: "Active",
  },
  {
    name: "Type 2 Diabetes Mellitus",
    date: "May 20, 2026",
    status: "Active",
  },
];

const appointments = [
  {
    date: "Aug 10, 2026",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    date: "Aug 08, 2026",
    time: "10:30 AM",
    type: "General Consultation",
    status: "Completed",
  },
  {
    date: "Jul 15, 2026",
    time: "11:00 AM",
    type: "Routine Checkup",
    status: "Completed",
  },
];

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2">
        <Link
          href="/patients"
          className="text-[10px] font-semibold text-[#8b9893] transition hover:text-[#0f766e]"
        >
          Patients
        </Link>

        <span className="text-[10px] text-[#c2cbc7]">/</span>

        <span className="text-[10px] font-medium text-[#56655f]">
          {id}
        </span>
      </div>

      {/* Patient Hero */}
      <section className="mb-5 overflow-hidden rounded-[18px] border border-[#e4ebe8] bg-white shadow-[0_6px_24px_rgba(30,60,52,0.035)]">

        {/* Top */}
        <div className="relative overflow-hidden bg-[#103f3a] px-6 py-6">
          <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#4da99b]/15 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="relative flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#d9f0eb] text-[17px] font-bold text-[#0f766e] ring-4 ring-white/10">
                RJ

                <span className="absolute bottom-1 right-0 h-3 w-3 rounded-full border-2 border-[#103f3a] bg-[#49b987]" />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-white">
                    {patient.name}
                  </h1>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[8px] font-semibold text-[#bce6dd]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#52c49a]" />
                    Active
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[#a9cbc5]">
                  <span>{patient.mrn}</span>
                  <span>•</span>
                  <span>{patient.age} years</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="rounded-[9px] border border-white/15 bg-white/5 px-3.5 py-2 text-[10px] font-semibold text-[#d5e7e3] transition hover:bg-white/10">
                Edit Patient
              </button>

              <button className="rounded-[9px] bg-white px-3.5 py-2 text-[10px] font-semibold text-[#0f766e] transition hover:-translate-y-0.5 hover:shadow-lg">
                + New Clinical Note
              </button>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-5 divide-x divide-[#edf2f0]">

          <QuickInfo
            label="Date of Birth"
            value={patient.dob}
          />

          <QuickInfo
            label="Phone"
            value={patient.phone}
          />

          <QuickInfo
            label="Blood Group"
            value={patient.bloodGroup}
            highlight
          />

          <QuickInfo
            label="Primary Condition"
            value={patient.primaryCondition}
          />

          <QuickInfo
            label="Last Visit"
            value="Aug 08, 2026"
          />

        </div>
      </section>

      {/* Tabs */}
      <div className="mb-5 flex items-center gap-7 border-b border-[#e3ebe8]">

        <Tab active>
          Overview
        </Tab>

        <Tab>
          Clinical Notes
        </Tab>

        <Tab>
          Medications
        </Tab>

        <Tab>
          Diagnoses
        </Tab>

        <Tab>
          Appointments
        </Tab>

      </div>

      {/* Content */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-5">

        {/* LEFT */}
        <div className="space-y-5">

          {/* Vitals */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Latest Vitals"
              subtitle="Recorded on August 08, 2026"
            />

            <div className="grid grid-cols-4 divide-x divide-[#edf2f0]">

              <Vital
                label="Blood Pressure"
                value="138/86"
                note="Slightly elevated"
                noteClass="text-[#c47c36]"
              />

              <Vital
                label="Heart Rate"
                value="74"
                unit="bpm"
                note="Normal"
                noteClass="text-[#2d906d]"
              />

              <Vital
                label="Weight"
                value="82"
                unit="kg"
                note="BMI 25.9"
                noteClass="text-[#8d9995]"
              />

              <Vital
                label="Temperature"
                value="98.4"
                unit="°F"
                note="Normal"
                noteClass="text-[#2d906d]"
              />

            </div>
          </section>

          {/* Medications */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Current Medications"
              subtitle="Active medications"
              action="View All"
            />

            <div>
              {medications.map((medication, index) => (
                <div
                  key={medication.name}
                  className={`group flex items-center justify-between px-6 py-4 transition hover:bg-[#f8fbfa] ${
                    index !== medications.length - 1
                      ? "border-b border-[#edf2f0]"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f5f2] text-[13px] text-[#0f766e]">
                      Rx
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-[#263833]">
                        {medication.name}
                      </p>

                      <p className="mt-1 text-[9px] text-[#98a49f]">
                        {medication.dosage} • {medication.frequency}
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[8px] font-semibold text-[#278460]">
                    {medication.status}
                  </span>

                </div>
              ))}
            </div>
          </section>

          {/* Diagnoses */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Diagnoses"
              subtitle="Patient's active diagnoses"
              action="View All"
            />

            <div>
              {diagnoses.map((diagnosis, index) => (
                <div
                  key={diagnosis.name}
                  className={`flex items-center justify-between px-6 py-4 transition hover:bg-[#f8fbfa] ${
                    index !== diagnoses.length - 1
                      ? "border-b border-[#edf2f0]"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#f0f5f4] text-[13px] text-[#60726b]">
                      +
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-[#263833]">
                        {diagnosis.name}
                      </p>

                      <p className="mt-1 text-[9px] text-[#98a49f]">
                        Diagnosed on {diagnosis.date}
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-[#e8f5f2] px-2.5 py-1 text-[8px] font-semibold text-[#0f766e]">
                    {diagnosis.status}
                  </span>

                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT */}
        <div className="space-y-5">

          {/* Patient Information */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Patient Information"
              subtitle="Personal and contact details"
            />

            <div className="grid grid-cols-2 gap-x-5 gap-y-5 px-6 py-5">

              <Info label="Email" value={patient.email} />

              <Info label="Phone" value={patient.phone} />

              <Info
                label="Address"
                value={patient.address}
                full
              />

              <Info label="Height" value={patient.height} />

              <Info label="Weight" value={patient.weight} />

              <Info label="Blood Group" value={patient.bloodGroup} />

            </div>
          </section>

          {/* Appointment */}
          <section className="overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Upcoming Appointment"
              subtitle="Next scheduled visit"
            />

            <div className="p-5">

              <div className="relative overflow-hidden rounded-[13px] bg-[#103f3a] p-5 text-white">

                <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#4ca99c]/15 blur-2xl" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <span className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#a9d4cd]">
                      August 10, 2026
                    </span>

                    <span className="rounded-full bg-[#4db78d]/15 px-2 py-1 text-[8px] font-semibold text-[#a9ddce]">
                      Confirmed
                    </span>

                  </div>

                  <p className="mt-4 text-[22px] font-semibold tracking-[-0.03em]">
                    09:00 AM
                  </p>

                  <p className="mt-1 text-[10px] text-[#b1d0ca]">
                    Follow-up consultation
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[9px] text-[#a9cbc5]">
                    <span>30 min</span>
                    <span>•</span>
                    <span>Dr. John</span>
                  </div>

                </div>
              </div>

              <Link
                href="/appointments"
                className="mt-3 flex w-full items-center justify-center rounded-[9px] border border-[#dfe8e5] py-2.5 text-[9px] font-semibold text-[#63726c] transition hover:bg-[#f7faf9] hover:text-[#0f766e]"
              >
                View Appointment
              </Link>

            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

            <SectionHeader
              title="Recent Activity"
              subtitle="Latest patient updates"
            />

            <div className="px-6 py-5">

              <Activity
                title="Clinical note updated"
                date="Aug 08, 2026 • 10:42 AM"
                tone="teal"
              />

              <Activity
                title="Medication added"
                date="Aug 08, 2026 • 10:35 AM"
                tone="green"
              />

              <Activity
                title="Appointment completed"
                date="Aug 08, 2026 • 10:30 AM"
                tone="orange"
                last
              />

            </div>
          </section>

        </div>
      </div>

      {/* Appointment History */}
      <section className="mt-5 overflow-hidden rounded-[17px] border border-[#e4ebe8] bg-white shadow-[0_5px_20px_rgba(30,60,52,0.025)]">

        <SectionHeader
          title="Appointment History"
          subtitle="Recent patient appointments"
          action="View All"
        />

        <div>

          <div className="grid grid-cols-[1.2fr_1fr_2fr_1fr] border-b border-[#edf2f0] bg-[#fafcfb] px-6 py-3">
            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9aa5a1]">
              Date
            </span>

            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9aa5a1]">
              Time
            </span>

            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9aa5a1]">
              Appointment
            </span>

            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9aa5a1]">
              Status
            </span>
          </div>

          {appointments.map((appointment, index) => (
            <div
              key={`${appointment.date}-${appointment.time}`}
              className={`grid grid-cols-[1.2fr_1fr_2fr_1fr] items-center px-6 py-4 transition hover:bg-[#f8fbfa] ${
                index !== appointments.length - 1
                  ? "border-b border-[#edf2f0]"
                  : ""
              }`}
            >

              <p className="text-[10px] font-medium text-[#64736d]">
                {appointment.date}
              </p>

              <p className="text-[10px] font-semibold text-[#52615c]">
                {appointment.time}
              </p>

              <p className="text-[10px] text-[#667570]">
                {appointment.type}
              </p>

              <div>
                {appointment.status === "Confirmed" ? (
                  <span className="rounded-full bg-[#edf4f8] px-2.5 py-1 text-[8px] font-semibold text-[#557e9d]">
                    Confirmed
                  </span>
                ) : (
                  <span className="rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[8px] font-semibold text-[#278460]">
                    Completed
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function QuickInfo({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="px-6 py-4">
      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <p
        className={`mt-1.5 text-[10px] font-semibold ${
          highlight ? "text-[#0f766e]" : "text-[#52615c]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Tab({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`relative pb-3 text-[10px] font-semibold transition ${
        active
          ? "text-[#0f766e]"
          : "text-[#899691] hover:text-[#0f766e]"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#0f766e]" />
      )}
    </button>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#edf2f0] px-6 py-4">
      <div>
        <h2 className="text-[13px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[9px] text-[#98a49f]">
          {subtitle}
        </p>
      </div>

      {action && (
        <button className="text-[9px] font-semibold text-[#0f766e] transition hover:text-[#095e58]">
          {action} →
        </button>
      )}
    </div>
  );
}

function Vital({
  label,
  value,
  unit,
  note,
  noteClass,
}: {
  label: string;
  value: string;
  unit?: string;
  note: string;
  noteClass: string;
}) {
  return (
    <div className="p-5">
      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-3 text-[21px] font-semibold tracking-[-0.04em] text-[#263833]">
        {value}

        {unit && (
          <span className="ml-1 text-[9px] font-medium text-[#9aa5a1]">
            {unit}
          </span>
        )}
      </p>

      <p className={`mt-1.5 text-[8px] font-medium ${noteClass}`}>
        {note}
      </p>
    </div>
  );
}

function Info({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#9aa5a1]">
        {label}
      </p>

      <p className="mt-1.5 break-words text-[10px] font-medium leading-4 text-[#52615c]">
        {value}
      </p>
    </div>
  );
}

function Activity({
  title,
  date,
  tone,
  last = false,
}: {
  title: string;
  date: string;
  tone: "teal" | "green" | "orange";
  last?: boolean;
}) {
  const dot = {
    teal: "bg-[#0f766e]",
    green: "bg-[#38a879]",
    orange: "bg-[#d18a42]",
  };

  return (
    <div className={`flex gap-3 ${last ? "" : "pb-5"}`}>
      <div className="relative flex flex-col items-center">
        <span
          className={`mt-1.5 h-2 w-2 rounded-full ${dot[tone]}`}
        />

        {!last && (
          <span className="mt-1 h-full w-px bg-[#e8eeeb]" />
        )}
      </div>

      <div>
        <p className="text-[10px] font-semibold text-[#52615c]">
          {title}
        </p>

        <p className="mt-1 text-[8px] text-[#9aa5a1]">
          {date}
        </p>
      </div>
    </div>
  );
}