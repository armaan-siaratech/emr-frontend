"use client";

import { useState } from "react";

const TABS = ["Doctor Profile", "Clinical Security", "Notification Rules", "EHR Integration"] as const;
type Tab = (typeof TABS)[number];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Doctor Profile");

  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-teal mb-1">System Configuration</span>
        <h1 className="text-2xl font-bold tracking-tight text-[#172522]">Clinical & User Settings</h1>
        <p className="text-xs text-[#667570] mt-0.5">Manage physician profile, security credentials, and EHR notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === item ? 'bg-[#0f766e] text-white shadow-sm' : 'text-[#667570] hover:bg-white'}`}
            >
              {item}
            </button>
          ))}
        </div>

        {activeTab === "Doctor Profile" && (
          <div className="md:col-span-3 card p-6 space-y-5">
            <h3 className="text-base font-bold text-[#172522]">Physician Account Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#52635d]">Full Name</label>
                <input type="text" defaultValue="Dr. John Smith" className="field-input mt-1" />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#52635d]">Specialization</label>
                <input type="text" defaultValue="General Physician & Internal Medicine" className="field-input mt-1" />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#52635d]">NPI / Medical License Number</label>
                <input type="text" defaultValue="NPI-98402148" className="field-input mt-1" />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#52635d]">Work Email</label>
                <input type="email" defaultValue="dr.john@medicarehms.com" className="field-input mt-1" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="btn-primary">Save Settings</button>
            </div>
          </div>
        )}

        {activeTab === "Clinical Security" && (
          <div className="md:col-span-3 card p-6 space-y-5">
            <h3 className="text-base font-bold text-[#172522]">Security & Access Credentials</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#52635d]">Current Password</label>
                <input type="password" defaultValue="••••••••••••" className="field-input mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#52635d]">New Password</label>
                <input type="password" placeholder="Enter new password" className="field-input mt-1" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { label: "Two-Factor Authentication (2FA)", desc: "Require a one-time code at every sign-in.", on: true },
                { label: "Biometric Sign-In", desc: "Allow fingerprint / face unlock on supported devices.", on: true },
                { label: "Auto Lock After Inactivity (15 min)", desc: "Lock the workstation automatically during idle periods.", on: false },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-xl border border-[#dfe8e4] bg-[#fafcfb] px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-[#172522]">{row.label}</p>
                    <p className="text-[11px] text-[#78968e] mt-0.5">{row.desc}</p>
                  </div>
                  <span className={`h-5 w-9 rounded-full p-0.5 flex items-center transition-colors ${row.on ? "bg-[#0f766e] justify-end" : "bg-[#d8e2df] justify-start"}`}>
                    <span className="h-4 w-4 rounded-full bg-white shadow-xs" />
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button className="btn-primary">Update Security Settings</button>
            </div>
          </div>
        )}

        {activeTab === "Notification Rules" && (
          <div className="md:col-span-3 card p-6 space-y-5">
            <h3 className="text-base font-bold text-[#172522]">Notification Preferences</h3>

            <div className="space-y-3">
              {[
                { label: "Critical Lab Result Alerts", desc: "Immediate push + email for out-of-range results.", on: true },
                { label: "Appointment Reminders", desc: "Notify 30 minutes before scheduled appointments.", on: true },
                { label: "eRx Refill Requests", desc: "Pharmacy authorization requests routed to your inbox.", on: true },
                { label: "System Maintenance Notices", desc: "Scheduled downtime and sync maintenance alerts.", on: false },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-xl border border-[#dfe8e4] bg-[#fafcfb] px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-[#172522]">{row.label}</p>
                    <p className="text-[11px] text-[#78968e] mt-0.5">{row.desc}</p>
                  </div>
                  <span className={`h-5 w-9 rounded-full p-0.5 flex items-center transition-colors ${row.on ? "bg-[#0f766e] justify-end" : "bg-[#d8e2df] justify-start"}`}>
                    <span className="h-4 w-4 rounded-full bg-white shadow-xs" />
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button className="btn-primary">Save Preferences</button>
            </div>
          </div>
        )}

        {activeTab === "EHR Integration" && (
          <div className="md:col-span-3 card p-6 space-y-5">
            <h3 className="text-base font-bold text-[#172522]">Connected Systems</h3>

            <div className="space-y-3">
              {[
                { label: "Pharmacy Network (eRx)", desc: "Electronic prescription routing to partner pharmacies.", status: "Connected" },
                { label: "Lab Information System (LIS)", desc: "Automatic import of lab results into patient charts.", status: "Connected" },
                { label: "Insurance Clearinghouse", desc: "Real-time eligibility checks and claims submission.", status: "Pending Setup" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-xl border border-[#dfe8e4] bg-[#fafcfb] px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-[#172522]">{row.label}</p>
                    <p className="text-[11px] text-[#78968e] mt-0.5">{row.desc}</p>
                  </div>
                  <span className={`badge ${row.status === "Connected" ? "badge-success" : "badge-warning"}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button className="btn-primary">Manage Integrations</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
