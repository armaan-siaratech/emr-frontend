"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  FileCode2,
  Receipt,
  Ticket,
  Bell,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
  Hospital,
  KeyRound,
  Activity,
  X
} from "lucide-react";

interface SuperAdminSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function SuperAdminSidebar({
  mobileOpen = false,
  setMobileOpen = () => {},
}: SuperAdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isNavActive = (href: string) => {
    if (href === "/super-admin" && pathname === "/super-admin") return true;
    if (href !== "/super-admin" && pathname.startsWith(href)) return true;
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
      title: "Core Platform",
      items: [
        {
          name: "Dashboard",
          href: "/super-admin",
          icon: LayoutDashboard,
          badge: "Live",
        },
      ],
    },
    {
      title: "Multi-Tenancy & Structure",
      items: [
        {
          name: "Tenants",
          href: "/super-admin/tenants",
          icon: Hospital,
        },
        {
          name: "System Admins",
          href: "/super-admin/admins",
          icon: Users,
        },
      ],
    },
    {
      title: "Clinical Catalogs",
      items: [
        {
          name: "ICD-10 Codes",
          href: "/super-admin/icd-10",
          icon: FileCode2,
        },
        {
          name: "CPT Coding Catalog",
          href: "/super-admin/cpt-codes",
          icon: Receipt,
        },
      ],
    },
    {
      title: "Governance & Support",
      items: [
        {
          name: "Roles & RBAC",
          href: "/super-admin/roles",
          icon: KeyRound,
        },
        {
          name: "HIPAA Audit Logs",
          href: "/super-admin/audit-logs",
          icon: Activity,
          badge: "HIPAA",
        },
        {
          name: "Support Tickets",
          href: "/super-admin/support-tickets",
          icon: Ticket,
        },
        {
          name: "Notifications",
          href: "/super-admin/notifications",
          icon: Bell,
        },
      ],
    },
    {
      title: "System & Account",
      items: [
        {
          name: "SuperAdmin Profile",
          href: "/super-admin/profile",
          icon: User,
        },
        {
          name: "Platform Settings",
          href: "/super-admin/settings",
          icon: Settings,
        },
      ],
    },
  ];

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email || "Platform SuperAdmin";

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : "SA";

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Main Sidebar Element */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#0f766e]/20 bg-[#081816] text-white shadow-2xl transition-all duration-300 lg:static lg:z-30 ${
          collapsed ? "lg:w-[80px]" : "lg:w-[270px]"
        } w-[270px] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header / Brand */}
        <div className="flex h-14 sm:h-16 items-center justify-between border-b border-[#14b8a6]/15 px-4">
          <Link
            href="/super-admin"
            className="flex items-center gap-3 overflow-hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#14b8a6] to-[#0f766e] text-white shadow-lg shadow-teal-900/50">
              <Shield className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1">
                  MediCare <span className="text-[#2dd4bf]">EHR</span>
                </h1>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-teal-400/90">
                  SuperAdmin Console
                </p>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-950 border border-teal-700/40 text-teal-300 hover:bg-teal-900 hover:text-white transition-all cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-xl bg-teal-950 border border-teal-800 text-teal-300 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Links List */}
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
                    } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                        active ? "text-teal-200" : "text-teal-400/80"
                      }`}
                    />
                    {(!collapsed || typeof window !== "undefined") && (
                      <span className={`truncate flex-1 ${collapsed ? "lg:hidden" : ""}`}>
                        {item.name}
                      </span>
                    )}
                    {(!collapsed || typeof window !== "undefined") && item.badge && (
                      <span className={`rounded-full bg-teal-400/20 text-teal-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${collapsed ? "lg:hidden" : ""}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Profile Box & Logout */}
        <div className="border-t border-[#14b8a6]/15 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Link
              href="/super-admin/profile"
              onClick={() => setMobileOpen(false)}
              className={`flex flex-1 items-center gap-3 rounded-xl p-2 transition-all hover:bg-teal-950/80 min-w-0 ${
                collapsed ? "lg:justify-center" : ""
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0f766e] font-black text-xs text-white border border-teal-400/30 shadow-xs">
                {initials}
              </div>
              <div className={`truncate flex-1 ${collapsed ? "lg:hidden" : ""}`}>
                <p className="text-xs font-bold text-white truncate">
                  {displayName}
                </p>
                <p className="text-[10px] text-teal-400 font-semibold truncate">
                  SuperAdmin Profile
                </p>
              </div>
            </Link>
            {!collapsed && (
              <button
                onClick={async () => {
                  await logout();
                  if (typeof window !== "undefined") window.location.href = "/login";
                }}
                title="Logout"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-950/60 border border-rose-800/50 text-rose-300 hover:bg-rose-900 hover:text-white transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
          {collapsed && (
            <button
              onClick={async () => {
                await logout();
                if (typeof window !== "undefined") window.location.href = "/login";
              }}
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

