"use client";

import { useState } from "react";

const monthlyData = [
  { month: "Jan", patients: 420, visits: 680, revenue: 82000 },
  { month: "Feb", patients: 465, visits: 720, revenue: 88000 },
  { month: "Mar", patients: 510, visits: 790, revenue: 94000 },
  { month: "Apr", patients: 490, visits: 750, revenue: 91000 },
  { month: "May", patients: 560, visits: 850, revenue: 103000 },
  { month: "Jun", patients: 610, visits: 920, revenue: 112000 },
  { month: "Jul", patients: 645, visits: 980, revenue: 121000 },
  { month: "Aug", patients: 690, visits: 1040, revenue: 128000 },
];

const departmentData = [
  {
    name: "Cardiology",
    patients: 248,
    percentage: 28,
  },
  {
    name: "General Medicine",
    patients: 214,
    percentage: 24,
  },
  {
    name: "Orthopedics",
    patients: 156,
    percentage: 18,
  },
  {
    name: "Pediatrics",
    patients: 128,
    percentage: 14,
  },
  {
    name: "Neurology",
    patients: 96,
    percentage: 11,
  },
  {
    name: "Other",
    patients: 45,
    percentage: 5,
  },
];

const recentReports = [
  {
    id: "RPT-1001",
    name: "Monthly Patient Summary",
    type: "Patient",
    generatedBy: "Admin",
    date: "Aug 08, 2026",
    status: "Ready",
  },
  {
    id: "RPT-1002",
    name: "Revenue & Billing Report",
    type: "Financial",
    generatedBy: "Admin",
    date: "Aug 07, 2026",
    status: "Ready",
  },
  {
    id: "RPT-1003",
    name: "Department Performance",
    type: "Operational",
    generatedBy: "Admin",
    date: "Aug 06, 2026",
    status: "Ready",
  },
  {
    id: "RPT-1004",
    name: "Pharmacy Inventory Report",
    type: "Pharmacy",
    generatedBy: "Admin",
    date: "Aug 05, 2026",
    status: "Ready",
  },
  {
    id: "RPT-1005",
    name: "Bed Occupancy Report",
    type: "Facility",
    generatedBy: "Admin",
    date: "Aug 04, 2026",
    status: "Ready",
  },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("This Year");
  const [reportType, setReportType] = useState("All Reports");

  const totalPatients = 4280;
  const totalVisits = 6030;
  const totalRevenue = 719000;
  const averageVisits = Math.round(totalVisits / 8);

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2 text-[10px] text-[#899590]">
              <span>Admin</span>
              <span>›</span>
              <span className="text-[#0d9b91]">
                Reports
              </span>
            </div>

            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Reports Dashboard
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Monitor healthcare operations, patients, revenue and facility
              performance
            </p>

          </div>


          <div className="flex items-center gap-2">

            <button
              type="button"
              className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#53645f] transition hover:bg-[#f5f9f7]"
            >
              Export Report
            </button>

            <button
              type="button"
              className="rounded-[8px] bg-[#0d9b91] px-4 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.16)] transition hover:bg-[#078a81]"
            >
              + Generate Report
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-6 py-6">


        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="mb-6 flex items-center justify-between rounded-[14px] border border-[#dce8e5] bg-white px-5 py-4">

          <div>

            <p className="text-[11px] font-semibold text-[#53645f]">
              Report Overview
            </p>

            <p className="mt-1 text-[9px] text-[#929e99]">
              Select a period to view your healthcare analytics
            </p>

          </div>


          <div className="flex items-center gap-2">

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
              <option>Last Year</option>
            </select>


            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
            >
              <option>All Reports</option>
              <option>Patient Reports</option>
              <option>Financial Reports</option>
              <option>Operational Reports</option>
              <option>Pharmacy Reports</option>
              <option>Facility Reports</option>
            </select>

          </div>

        </div>


        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid grid-cols-4 gap-4">

          <ReportStatCard
            title="Total Patients"
            value={totalPatients.toLocaleString()}
            change="+12.8%"
            subtitle="vs previous period"
            icon="♙"
          />

          <ReportStatCard
            title="Total Visits"
            value={totalVisits.toLocaleString()}
            change="+9.4%"
            subtitle="vs previous period"
            icon="◫"
          />

          <ReportStatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="+14.6%"
            subtitle="vs previous period"
            icon="$"
          />

          <ReportStatCard
            title="Average Visits"
            value={averageVisits.toLocaleString()}
            change="+6.2%"
            subtitle="monthly average"
            icon="↗"
          />

        </div>


        {/* =====================================================
            PATIENT TREND + DEPARTMENT
        ===================================================== */}

        <div className="mt-6 grid grid-cols-[1.65fr_1fr] gap-5">


          {/* PATIENT & VISIT TREND */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white">

            <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

              <div>

                <h2 className="text-[14px] font-semibold text-[#172522]">
                  Patient & Visit Trends
                </h2>

                <p className="mt-1 text-[10px] text-[#8a9692]">
                  Monthly patient activity overview
                </p>

              </div>


              <div className="flex items-center gap-4">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-[#0d9b91]" />

                  <span className="text-[9px] text-[#71807c]">
                    Patients
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-[#9accc5]" />

                  <span className="text-[9px] text-[#71807c]">
                    Visits
                  </span>

                </div>

              </div>

            </div>


            <div className="p-5">

              <div className="relative h-[280px]">

                {/* GRID */}

                <div className="absolute inset-0 flex flex-col justify-between">

                  {[1000, 750, 500, 250, 0].map((value) => (

                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >

                      <span className="w-8 text-right text-[8px] text-[#a0aaa7]">
                        {value}
                      </span>

                      <div className="h-px flex-1 bg-[#edf2f0]" />

                    </div>

                  ))}

                </div>


                {/* BARS */}

                <div className="absolute bottom-0 left-[45px] right-0 top-0 flex items-end justify-between gap-3">

                  {monthlyData.map((item) => {

                    const patientHeight =
                      (item.patients / 1000) * 100;

                    const visitHeight =
                      (item.visits / 1000) * 100;

                    return (

                      <div
                        key={item.month}
                        className="flex h-full flex-1 items-end justify-center gap-1"
                      >

                        <div className="relative flex h-full items-end">

                          <div
                            className="w-[14px] rounded-t-[4px] bg-[#0d9b91] transition hover:opacity-80"
                            style={{
                              height: `${patientHeight}%`,
                            }}
                          />

                        </div>


                        <div className="relative flex h-full items-end">

                          <div
                            className="w-[14px] rounded-t-[4px] bg-[#b5d9d4] transition hover:opacity-80"
                            style={{
                              height: `${visitHeight}%`,
                            }}
                          />

                        </div>

                      </div>

                    );
                  })}

                </div>


                {/* MONTH LABELS */}

                <div className="absolute bottom-[-22px] left-[45px] right-0 flex justify-between">

                  {monthlyData.map((item) => (

                    <span
                      key={item.month}
                      className="flex-1 text-center text-[8px] text-[#929e99]"
                    >
                      {item.month}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>


          {/* DEPARTMENT DISTRIBUTION */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white">

            <div className="border-b border-[#e4ece9] px-5 py-4">

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Patients by Department
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                Patient distribution across departments
              </p>

            </div>


            <div className="p-5">

              <div className="space-y-5">

                {departmentData.map((department) => (

                  <div key={department.name}>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-[10px] font-semibold text-[#53645f]">
                        {department.name}
                      </span>

                      <span className="text-[9px] text-[#929e99]">
                        {department.patients} patients
                      </span>

                    </div>


                    <div className="h-[6px] overflow-hidden rounded-full bg-[#edf2f0]">

                      <div
                        className="h-full rounded-full bg-[#0d9b91]"
                        style={{
                          width: `${department.percentage * 3.5}%`,
                        }}
                      />

                    </div>


                    <div className="mt-1 text-right text-[8px] text-[#929e99]">
                      {department.percentage}%
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            REVENUE + FACILITY
        ===================================================== */}

        <div className="mt-6 grid grid-cols-[1fr_1fr] gap-5">


          {/* REVENUE */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white">

            <div className="border-b border-[#e4ece9] px-5 py-4">

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Revenue Overview
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                Monthly revenue performance
              </p>

            </div>


            <div className="p-5">

              <div className="mb-5 flex items-end justify-between">

                <div>

                  <p className="text-[9px] text-[#929e99]">
                    Total Revenue
                  </p>

                  <p className="mt-1 text-[24px] font-bold tracking-[-0.03em] text-[#172522]">
                    $719,000
                  </p>

                </div>


                <span className="rounded-full bg-[#e8f6f0] px-3 py-1 text-[8px] font-semibold text-[#278460]">
                  +14.6%
                </span>

              </div>


              <div className="flex h-[150px] items-end gap-3">

                {monthlyData.map((item) => {

                  const height =
                    (item.revenue / 130000) * 100;

                  return (

                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >

                      <div className="flex h-full w-full items-end">

                        <div
                          className="w-full rounded-t-[5px] bg-[#9accc5] transition hover:bg-[#0d9b91]"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <span className="text-[8px] text-[#929e99]">
                        {item.month}
                      </span>

                    </div>

                  );
                })}

              </div>

            </div>

          </div>


          {/* FACILITY PERFORMANCE */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white">

            <div className="border-b border-[#e4ece9] px-5 py-4">

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Facility Performance
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                Current facility utilization
              </p>

            </div>


            <div className="grid grid-cols-2 gap-4 p-5">

              <PerformanceCard
                title="Bed Occupancy"
                value="78%"
                change="+5.2%"
                icon="▦"
              />

              <PerformanceCard
                title="Appointments"
                value="1,248"
                change="+11.4%"
                icon="◷"
              />

              <PerformanceCard
                title="Active Doctors"
                value="84"
                change="+3"
                icon="♙"
              />

              <PerformanceCard
                title="Pharmacy Items"
                value="2,486"
                change="+8.7%"
                icon="+"
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            RECENT REPORTS
        ===================================================== */}

        <div className="mt-6 overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white">

          <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

            <div>

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Recent Reports
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                Recently generated administrative reports
              </p>

            </div>


            <button
              type="button"
              className="text-[9px] font-semibold text-[#0d9b91] hover:underline"
            >
              View All Reports →
            </button>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-[#f7faf9]">

                  <TableHead text="REPORT" />
                  <TableHead text="TYPE" />
                  <TableHead text="GENERATED BY" />
                  <TableHead text="DATE" />
                  <TableHead text="STATUS" />
                  <TableHead text="ACTION" />

                </tr>

              </thead>


              <tbody>

                {recentReports.map((report) => (

                  <tr
                    key={report.id}
                    className="border-t border-[#edf2f0] transition hover:bg-[#fbfdfc]"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#e8f6f3] text-[12px] text-[#0d9b91]">
                          ▤
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#53645f]">
                            {report.name}
                          </p>

                          <p className="mt-1 text-[8px] text-[#a0aaa7]">
                            {report.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    <td className="px-5 py-4">

                      <span className="rounded-full bg-[#edf5f3] px-2.5 py-1 text-[8px] font-semibold text-[#536f68]">
                        {report.type}
                      </span>

                    </td>


                    <td className="px-5 py-4 text-[9px] text-[#687771]">
                      {report.generatedBy}
                    </td>


                    <td className="px-5 py-4 text-[9px] text-[#687771]">
                      {report.date}
                    </td>


                    <td className="px-5 py-4">

                      <span className="rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[8px] font-semibold text-[#278460]">
                        {report.status}
                      </span>

                    </td>


                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1">

                        <button
                          type="button"
                          title="View"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
                        >
                          ◉
                        </button>

                        <button
                          type="button"
                          title="Download"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
                        >
                          ↓
                        </button>

                        <button
                          type="button"
                          title="More"
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] transition hover:bg-[#f1f5f3]"
                        >
                          ⋮
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <div className="mt-6">

          <div className="mb-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Quick Actions
            </h2>

            <p className="mt-1 text-[10px] text-[#8a9692]">
              Quickly access commonly used admin functions
            </p>

          </div>


          <div className="grid grid-cols-4 gap-4">

            <QuickAction
              title="Create Patient"
              description="Register a new patient"
              icon="+"
              href="/admin/patients/create"
            />

            <QuickAction
              title="Create User"
              description="Add a new system user"
              icon="♙"
              href="/admin/users/new"
            />

            <QuickAction
              title="Create Facility"
              description="Add a new healthcare facility"
              icon="⌂"
              href="/admin/facilities/create"
            />

            <QuickAction
              title="Create Department"
              description="Add a new department"
              icon="▦"
              href="/admin/departments/create"
            />

            <QuickAction
              title="Bed Management"
              description="Manage rooms and beds"
              icon="▤"
              href="/admin/bed"
            />

            <QuickAction
              title="Create Pharmacy"
              description="Add a new pharmacy"
              icon="+"
              href="/admin/pharmacy/create"
            />

            <QuickAction
              title="Appointments"
              description="View appointment activity"
              icon="◷"
              href="/admin/appointments"
            />

            <QuickAction
              title="Generate Report"
              description="Create a custom report"
              icon="↗"
              href="/admin/reports/create"
            />

          </div>

        </div>


        {/* =====================================================
            REPORT CATEGORIES
        ===================================================== */}

        <div className="mt-7">

          <div className="mb-4">

            <h2 className="text-[14px] font-semibold text-[#172522]">
              Report Categories
            </h2>

            <p className="mt-1 text-[10px] text-[#8a9692]">
              Quickly access commonly used administrative reports
            </p>

          </div>


          <div className="grid grid-cols-5 gap-4">

            <ReportCategory
              title="Patient Reports"
              description="Patient demographics, visits and activity"
              icon="♙"
            />

            <ReportCategory
              title="Financial Reports"
              description="Revenue, billing and payment analytics"
              icon="$"
            />

            <ReportCategory
              title="Operational Reports"
              description="Appointments and department performance"
              icon="◫"
            />

            <ReportCategory
              title="Pharmacy Reports"
              description="Inventory, stock and medicine usage"
              icon="+"
            />

            <ReportCategory
              title="Facility Reports"
              description="Beds, rooms and facility utilization"
              icon="▦"
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   REPORT STAT CARD
========================================================= */

function ReportStatCard({
  title,
  value,
  change,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-[13px] border border-[#dce8e5] bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] font-semibold text-[#71807c]">
            {title}
          </p>

          <p className="mt-2 text-[24px] font-bold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <div className="mt-2 flex items-center gap-2">

            <span className="text-[9px] font-semibold text-[#278460]">
              {change}
            </span>

            <span className="text-[8px] text-[#a0aaa7]">
              {subtitle}
            </span>

          </div>

        </div>


        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[15px] font-bold text-[#0d9b91]">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PERFORMANCE CARD
========================================================= */

function PerformanceCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: string;
}) {
  return (
    <div className="rounded-[11px] border border-[#e4ece9] bg-[#f8fbfa] p-4">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#e5f5f1] text-[13px] font-bold text-[#0d9b91]">
          {icon}
        </div>

        <span className="text-[8px] font-semibold text-[#278460]">
          {change}
        </span>

      </div>


      <p className="mt-4 text-[9px] text-[#899590]">
        {title}
      </p>

      <p className="mt-1 text-[19px] font-bold text-[#273732]">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-[13px] border border-[#dce8e5] bg-white p-4 transition hover:-translate-y-[1px] hover:border-[#b9dcd6] hover:shadow-[0_6px_20px_rgba(25,70,65,0.06)]"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e8f6f3] text-[16px] font-bold text-[#0d9b91] transition group-hover:bg-[#0d9b91] group-hover:text-white">
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <p className="text-[10px] font-semibold text-[#53645f]">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-[#929e99]">
          {description}
        </p>

      </div>


      <span className="text-[13px] text-[#a0aaa7] transition group-hover:translate-x-1 group-hover:text-[#0d9b91]">
        →
      </span>

    </a>
  );
}


/* =========================================================
   REPORT CATEGORY
========================================================= */

function ReportCategory({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      className="group rounded-[13px] border border-[#dce8e5] bg-white p-5 text-left transition hover:-translate-y-[1px] hover:border-[#b9dcd6] hover:shadow-[0_6px_20px_rgba(25,70,65,0.06)]"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e8f6f3] text-[16px] font-bold text-[#0d9b91] transition group-hover:bg-[#0d9b91] group-hover:text-white">
        {icon}
      </div>


      <p className="mt-4 text-[11px] font-semibold text-[#53645f]">
        {title}
      </p>


      <p className="mt-1.5 text-[9px] leading-4 text-[#929e99]">
        {description}
      </p>


      <p className="mt-4 text-[9px] font-semibold text-[#0d9b91]">
        View Reports →
      </p>

    </button>
  );
}


/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({
  text,
}: {
  text: string;
}) {
  return (
    <th className="px-5 py-3 text-left">

      <span className="text-[8px] font-semibold tracking-[0.08em] text-[#929e99]">
        {text}
      </span>

    </th>
  );
}