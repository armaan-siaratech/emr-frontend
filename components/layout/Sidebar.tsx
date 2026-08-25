"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  FileText,
  Pill,
  HeartPulse,
  Stethoscope,
  Activity,
  ClipboardList,
  FolderKanban,
  LogOut,
  X
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebar = useSidebar();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name
      ? user.first_name
      : user?.email || "Facility User";

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.email
      ? user.email.substring(0, 2).toUpperCase()
      : "US";

  const designation =
    user?.designation ||
    (user?.roles?.length ? user.roles.join(", ") : "Hospital Operations");

  const collapsed = sidebar?.collapsed ?? false;
  const toggle = sidebar?.toggle ?? (() => {});
  const mobileOpen = sidebar?.mobileOpen ?? false;
  const setMobileOpen = sidebar?.setMobileOpen ?? (() => {});

  const isNavActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href === "/admin" && pathname === "/admin") return true;
    if (href !== "/dashboard" && href !== "/admin" && pathname.startsWith(href)) return true;
    return false;
  };

  const navSections: Array<{
    title: string;
    items: Array<{
      name: string;
      href: string;
      icon: any;
      badge?: string;
    }>;
  }> = [
    {
      title: "Dashboards",
      items: [
        {
          name: "Tenant Admin Dashboard",
          href: "/admin",
          icon: ShieldCheck,
        },
        {
          name: "Clinical Workspace",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Patient Care",
      items: [
        {
          name: "Patient Registry",
          href: "/patients",
          icon: Users,
        },
        {
          name: "Appointments",
          href: "/appointments",
          icon: Calendar,
        },
        {
          name: "Clinical Encounters",
          href: "/encounters",
          icon: Activity,
        },
      ],
    },
    {
      title: "Medical Operations",
      items: [
        {
          name: "Clinical Notes",
          href: "/clinical-notes",
          icon: FileText,
        },
        {
          name: "Prescriptions",
          href: "/prescriptions",
          icon: Pill,
        },
        {
          name: "Diagnoses Catalog",
          href: "/diagnoses",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Facility Administration",
      items: [
        {
          name: "Doctors & Staff",
          href: "/doctors",
          icon: UserCheck,
        },
        {
          name: "Facility Units",
          href: "/admin/facilities",
          icon: Building2,
        },
        {
          name: "Clinical Reports",
          href: "/reports",
          icon: FileBarChart,
        },
        {
          name: "System Settings",
          href: "/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Main Admin Sidebar Element */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col border-r border-[#0f766e]/20 bg-[#081816] text-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          collapsed ? "w-[80px]" : "w-[260px]"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`flex h-[76px] items-center border-b border-[#14b8a6]/15 ${
            collapsed ? "justify-center px-0" : "px-5 justify-between"
          }`}
        >
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 overflow-hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#14b8a6] via-[#0d9488] to-[#0f766e] text-white shadow-lg shadow-teal-900/50 transition-all duration-300 group-hover:scale-105">
              <HeartPulse className="h-5 w-5 text-white animate-pulse" />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              <h1 className="whitespace-nowrap text-[17px] font-black tracking-tight text-white group-hover:text-teal-300 transition-colors">
                MediCare <span className="text-[#2dd4bf]">HMS</span>
              </h1>
              <p className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.14em] text-teal-400/90">
                Hospital System
              </p>
            </div>
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggle}
            className={`hidden lg:flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-950 border border-teal-700/40 text-teal-300 hover:bg-teal-900 hover:text-white transition-all cursor-pointer ${
              collapsed ? "rotate-180" : "rotate-0"
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-xl bg-teal-950 border border-teal-800 text-teal-300 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-teal-900">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              {!collapsed && (
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.15em] text-teal-400/70">
                  {section.title}
                </p>
              )}
              {section.items.map((item, iIdx) => {
                const active = isNavActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={iIdx}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                      active
                        ? "bg-gradient-to-r from-[#0f766e] to-[#0d9488] text-white shadow-md shadow-teal-950/60"
                        : "text-slate-300 hover:bg-teal-950/70 hover:text-white"
                    } ${collapsed ? "justify-center px-0" : ""}`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                        active ? "text-teal-200" : "text-teal-400/80"
                      }`}
                    />
                    {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                    {!collapsed && item.badge && (
                      <span className="rounded-full bg-teal-400/20 text-teal-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Admin Badge & Logout */}
        <div className="border-t border-[#14b8a6]/15 p-3 space-y-2">
          <div
            className={`flex items-center gap-3 rounded-xl p-2 bg-teal-950/40 border border-teal-800/30 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0f766e] font-black text-xs text-white border border-teal-400/30 shadow-xs">
              {initials}
            </div>
            {!collapsed && (
              <div className="truncate flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {displayName}
                </p>
                <p className="text-[10px] text-teal-400 font-semibold truncate">
                  {designation}
                </p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-950/60 border border-rose-800/50 text-rose-300 hover:bg-rose-900 hover:text-white transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
          {collapsed && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex w-full h-9 items-center justify-center rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-300 hover:bg-rose-900 hover:text-white transition-all cursor-pointer"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

