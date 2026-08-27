"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, HeartPulse } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isSuperAdmin, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (isSuperAdmin) {
          router.replace("/super-admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        router.replace("/login");
      }
    }
  }, [isLoading, isAuthenticated, isSuperAdmin, router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b1317] text-white p-6">
      <div className="flex flex-col items-center max-w-sm text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0f766e] p-0.5 shadow-lg animate-bounce">
            <div className="w-full h-full bg-[#0b1317] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#2dd4bf]" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0f766e] border-2 border-[#0b1317] flex items-center justify-center">
            <HeartPulse className="w-3 h-3 text-white animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-bold text-white tracking-wide">
          MediCare EMR System Loading...
        </p>
      </div>
    </div>
  );
}
