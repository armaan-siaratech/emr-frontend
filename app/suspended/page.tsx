"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ShieldAlert, Lock, LogOut, Mail, Building2, PhoneCall, AlertTriangle } from "lucide-react";

export default function SuspendedPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_) {
    } finally {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        router.replace("/login");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070e12] text-white p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient Red/Amber Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full rounded-3xl border-2 border-rose-500/30 bg-gradient-to-b from-[#111c24]/95 via-[#0e171e]/95 to-[#0b1218]/95 p-6 sm:p-8 shadow-[0_25px_60px_rgba(225,29,72,0.25)] backdrop-blur-2xl text-center space-y-6">
        
        {/* Animated Warning Emblem */}
        <div className="relative mx-auto w-20 h-20">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 p-0.5 shadow-[0_0_40px_rgba(225,29,72,0.4)] flex items-center justify-center animate-pulse">
            <div className="w-full h-full bg-[#0b1218] rounded-[14px] flex items-center justify-center">
              <ShieldAlert className="w-10 h-10 text-rose-500" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-600 border-2 border-[#0b1218] flex items-center justify-center shadow-md">
            <Lock className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Heading & Notice */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Organization Access Restricted</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tenant Account Suspended
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-md mx-auto">
            Access to this healthcare facility organization has been suspended by the platform administrator. All clinical workspace modules, patient charts, and record workflows are temporarily locked.
          </p>
        </div>

        {/* Tenant Information Box */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-4 text-left space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
            <span className="text-slate-400 flex items-center gap-1.5 font-sans font-bold">
              <Building2 className="w-4 h-4 text-rose-400" />
              Organization:
            </span>
            <span className="text-rose-300 font-bold font-sans">
              {user?.tenant_name || user?.tenant_id || "Medical Tenant"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-rose-500/20 pb-2 pt-1">
            <span className="text-slate-400 font-sans font-bold">Account User:</span>
            <span className="text-slate-200">{user?.email}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400 font-sans font-bold">Status:</span>
            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-black uppercase text-[10px] border border-rose-500/40">
              {user?.tenant_status || "SUSPENDED"}
            </span>
          </div>
        </div>

        {/* Support Advice */}
        <p className="text-[11px] text-slate-400 font-medium">
          If you believe this suspension is an error or need immediate billing/compliance assistance, please contact your hospital administrator or MediCare Platform Support.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/40 cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Account</span>
          </button>

          <a
            href="mailto:support@medicare-emr.com?subject=Tenant%20Account%20Suspension%20Inquiry"
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-black transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer active:scale-95"
          >
            <Mail className="w-4 h-4 text-teal-400" />
            <span>Contact Support</span>
          </a>
        </div>

        <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase pt-2 border-t border-slate-800">
          MediCare EMR Platform • HIPAA Security Standard Section 164.312
        </p>

      </div>
    </div>
  );
}
