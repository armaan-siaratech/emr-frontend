"use client";

import Link from "next/link";
import GlassCard3D from "@/components/common/GlassCard3D";
import { AlertTriangle, ArrowLeft, HeartPulse, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8f7] via-[#e6f2ef] to-[#daf0eb] flex items-center justify-center p-4 font-sans">
      <div className="max-w-lg w-full space-y-6 animate-fade-in text-center">
        {/* BRAND HEADER */}
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#0f766e] to-[#14b8a6] text-white flex items-center justify-center shadow-lg">
            <HeartPulse className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-[#0f2d28] tracking-tight">Ethizo EHR</span>
        </div>

        <GlassCard3D depth={30}>
          <div className="py-8 px-6 space-y-5">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-300 shadow-md">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <div>
              <span className="text-4xl font-black text-[#0f766e] tracking-tight">404</span>
              <h1 className="text-xl font-black text-[#0f2d28] mt-1">Page Not Found</h1>
              <p className="mt-2 text-xs font-semibold text-[#54736b] leading-relaxed max-w-sm mx-auto">
                The clinical path or requested resource does not exist or has been moved.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#0f766e] via-[#0d5c56] to-[#042f2c] text-white text-xs font-black shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Login</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-white border border-[#bfe0d6] text-xs font-black text-[#0f766e] hover:bg-[#e6f4f0] transition-colors flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </GlassCard3D>
      </div>
    </div>
  );
}
