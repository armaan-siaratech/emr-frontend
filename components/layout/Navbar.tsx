"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import { Bell, Search, User, ChevronDown, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const { sidebarWidth, toggle, setMobileOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header
      className="fixed right-0 top-0 z-40 flex h-[76px] items-center justify-between border-b border-[#c2e0d7]/80 bg-[#edf5f2]/90 px-4 lg:px-8 backdrop-blur-2xl shadow-[0_2px_15px_rgba(15,70,60,0.04)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ left: `${sidebarWidth}px` }}
    >
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#bce0d5] bg-white text-[#0f766e] transition-all duration-200 hover:bg-[#d9f0ea] lg:hidden"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Search Input matching MediCare HMS header in screenshot */}
        <div className="group relative w-full max-w-[480px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a7a72] transition-colors group-focus-within:text-[#0f766e]">
            <Search className="h-4 w-4" />
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="h-11 w-full rounded-2xl border border-[#bfe0d6] bg-white/95 pl-11 pr-4 text-[13px] font-medium text-[#132a26] outline-none transition-all duration-200 placeholder:text-[#78968e] focus:border-[#0f766e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)]"
          />
        </div>
      </div>

      {/* Right User & Notification Bar */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#bce0d5] bg-white text-[#4a6b63] transition-all duration-200 hover:bg-[#d9f0ea] hover:text-[#0f766e] shadow-xs"
          title="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#ef4444] animate-ping" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#ef4444]" />
        </Link>

        {/* User Pill Avatar (Matching 'Admin User - Super Administrator' from screenshot) */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#bce0d5] bg-white/90 px-3.5 py-1.5 shadow-xs transition-all hover:bg-white cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d6ece6] text-[#0f766e] ring-2 ring-[#a8dcd0]">
            <User className="h-4.5 w-4.5 text-[#0f766e]" />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-[12px] font-bold text-[#0f2d28] leading-tight flex items-center gap-1">
              Admin User
            </p>
            <p className="text-[10px] font-medium text-[#0f766e] leading-tight">
              Super Administrator
            </p>
          </div>

          <ChevronDown className="h-3.5 w-3.5 text-[#62827a] ml-1 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
