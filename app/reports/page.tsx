"use client";

import AnalyticsFunnelCard from "@/components/dashboard/AnalyticsFunnelCard";
import FinancialOverviewCard from "@/components/dashboard/FinancialOverviewCard";

export default function ReportsPage() {
  return (
    <div className="w-full space-y-6 pb-10">
      <div>
        <span className="badge badge-teal mb-1">Hospital Analytics</span>
        <h1 className="text-2xl font-bold tracking-tight text-[#172522]">Reports & Analytics</h1>
        <p className="text-xs text-[#667570] mt-0.5">
          Financial performance, revenue breakdown, and departmental efficiency at a glance.
        </p>
      </div>

      <AnalyticsFunnelCard />
      <FinancialOverviewCard />
    </div>
  );
}
