"use client";

import { Send, Search } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState("Dr. Emily Davis");
  const threads = [
    { name: "Dr. Emily Davis", role: "Cardiologist", lastMessage: "Patient Robert's ECG chart looks clear.", time: "10:45 AM", unread: 2 },
    { name: "Nurse Sarah", role: "ER Chief Nurse", lastMessage: "Vitals update for Room 302.", time: "09:30 AM", unread: 0 },
    { name: "Pharmacy Admin", role: "Central Pharmacy", lastMessage: "eRx prescription approved.", time: "Yesterday", unread: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-teal mb-1">Inter-Departmental Messaging</span>
        <h1 className="text-2xl font-bold tracking-tight text-[#172522]">Clinical Communication</h1>
        <p className="text-xs text-[#667570] mt-0.5">Secure messaging between doctors, nurses, and hospital departments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] card overflow-hidden">
        {/* Threads List */}
        <div className="border-r border-[#e4ebe8] bg-[#fafcfb] p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9aa7a3]" />
            <input type="text" placeholder="Search staff or chat..." className="field-input pl-9 h-9 text-xs" />
          </div>

          <div className="space-y-1.5">
            {threads.map((t) => (
              <button
                key={t.name}
                onClick={() => setActiveThread(t.name)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${activeThread === t.name ? 'bg-white shadow-sm border border-[#c5e8e2]' : 'hover:bg-white/60'}`}
              >
                <div className="h-9 w-9 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {t.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#172522] truncate">{t.name}</p>
                    <span className="text-[10px] text-[#9aa7a3]">{t.time}</span>
                  </div>
                  <p className="text-[11px] text-[#0f766e] font-medium">{t.role}</p>
                  <p className="text-[11px] text-[#667570] truncate mt-0.5">{t.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Box */}
        <div className="lg:col-span-2 flex flex-col h-full bg-white">
          <div className="p-4 border-b border-[#e4ebe8] flex items-center justify-between bg-[#f8faf9]">
            <div>
              <h3 className="text-sm font-bold text-[#172522]">{activeThread}</h3>
              <p className="text-[11px] text-[#0f766e]">Active Now · Encrypted Clinical Channel</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            <div className="flex flex-col items-start gap-1">
              <div className="bg-[#f0f7f5] p-3 rounded-2xl max-w-[80%] text-[#172522]">
                Hello Dr. John, I examined patient Robert&apos;s ECG chart. Everything appears normal after the Lisinopril dose.
              </div>

              <span className="text-[9px] text-[#9aa7a3] ml-1">10:42 AM</span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="bg-[#0f766e] text-white p-3 rounded-2xl max-w-[80%] shadow-sm">
                Thank you Dr. Emily! I will schedule his follow-up visit for next Tuesday.
              </div>
              <span className="text-[9px] text-[#9aa7a3] mr-1">10:45 AM</span>
            </div>
          </div>

          <div className="p-3 border-t border-[#e4ebe8] flex items-center gap-2 bg-[#f8faf9]">
            <input type="text" placeholder="Type clinical message..." className="field-input flex-1 h-10 text-xs" />
            <button className="btn-primary h-10 px-4">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
