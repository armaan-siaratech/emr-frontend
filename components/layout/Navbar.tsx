"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Search, User, ChevronDown, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const { sidebarWidth, setMobileOpen } = useSidebar();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name
      ? user.first_name
      : user?.email || "User Profile";

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.email
      ? user.email.substring(0, 2).toUpperCase()
      : "US";

  const designation =
    user?.designation ||
    (user?.roles?.length ? user.roles.join(", ") : "Clinical Operations");

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

        {/* Search Input */}
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
      <div className="flex items-center gap-3 sm:gap-4">
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

        {/* User Pill Dropdown Avatar */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 rounded-2xl border border-[#bce0d5] bg-white/90 px-3 py-1.5 shadow-xs transition-all hover:bg-white cursor-pointer focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f766e] text-white font-bold text-xs shadow-xs">
              {initials}
            </div>

            <div className="hidden sm:block text-left max-w-[140px]">
              <p className="text-[12px] font-bold text-[#0f2d28] leading-tight truncate">
                {displayName}
              </p>
              <p className="text-[10px] font-medium text-[#0f766e] leading-tight truncate">
                {designation}
              </p>
            </div>

            <ChevronDown className={`h-3.5 w-3.5 text-[#62827a] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#bce0d5] bg-white shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-[#e3ebe8]">
                <p className="text-xs font-bold text-[#0f2d28] truncate">{displayName}</p>
                <p className="text-[11px] text-[#5a7a72] truncate">{user?.email}</p>
                {user?.roles && (
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-[#d9f0ea] text-[#0f766e] text-[9px] font-bold uppercase tracking-wider">
                    {user.roles.join(", ")}
                  </span>
                )}
              </div>

              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#172522] hover:bg-[#edf5f2] transition-colors"
                >
                  <Settings className="w-4 h-4 text-[#0f766e]" />
                  <span>Account Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Header Logout Button */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

