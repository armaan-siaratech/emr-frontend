"use client";

import { Bell, AlertTriangle, Clock } from "lucide-react";


export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: "Critical Lab Result Alert", detail: "Patient Sarah Williams (MRN-10242) blood potassium levels elevated.", type: "danger", time: "10 mins ago" },
    { id: 2, title: "New Appointment Request", detail: "Robert Johnson requested a consultation for tomorrow at 9:00 AM.", type: "info", time: "1 hour ago" },
    { id: 3, title: "eRx Refill Request", detail: "Pharmacy requested authorization for Lisinopril 10mg refill.", type: "warning", time: "2 hours ago" },
    { id: 4, title: "System Maintenance Scheduled", detail: "MediCare HMS cloud sync maintenance at 02:00 AM UTC.", type: "system", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="badge badge-teal mb-1">Alert Center</span>
          <h1 className="text-2xl font-bold tracking-tight text-[#172522]">Clinical Notifications</h1>
          <p className="text-xs text-[#667570] mt-0.5">Real-time alerts, lab updates, and system notifications.</p>
        </div>
        <button className="btn-secondary text-xs">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="card p-4 flex items-start gap-4 hover:border-[#b5dfd6] transition-all">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'danger' ? 'bg-[#fee2e2] text-[#991b1b]' : n.type === 'warning' ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-[#e0f2fe] text-[#075985]'}`}>
              {n.type === 'danger' ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#172522]">{n.title}</h4>
                <span className="text-[10px] text-[#9aa7a3] flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {n.time}
                </span>
              </div>
              <p className="text-xs text-[#667570] mt-1">{n.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
