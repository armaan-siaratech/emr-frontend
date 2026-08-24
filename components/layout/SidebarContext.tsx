"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  sidebarWidth: number;
};

const FALLBACK: SidebarContextType = {
  collapsed: false,
  toggle: () => {},
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  sidebarWidth: 260,
};

const SidebarContext = createContext<SidebarContextType>(FALLBACK);

const DESKTOP_COLLAPSED = 76;
const DESKTOP_EXPANDED = 260;

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Always start collapsed=false to match the server-rendered HTML — the
  // persisted value is applied after mount (below) so it never causes a
  // hydration mismatch.
  const [collapsed, setCollapsedState] = useState<boolean>(false);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("medicare-sidebar-collapsed");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        // One-time sync from localStorage after mount, intentionally outside
        // render — reading it during render/useState-init would mismatch the
        // server-rendered HTML (localStorage isn't available server-side).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (typeof parsed === "boolean") setCollapsedState(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const check = () => {
      const desktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop) {
        setMobileOpen(false);
      }
    };
    check();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", check);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", check);
      }
    };
  }, []);

  const toggle = () => {
    setCollapsedState((prev) => {
      const next = !prev;
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("medicare-sidebar-collapsed", JSON.stringify(next));
        }
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const setCollapsed = (v: boolean) => {
    setCollapsedState(v);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("medicare-sidebar-collapsed", JSON.stringify(v));
      }
    } catch {
      /* ignore */
    }
  };

  const sidebarWidth = isDesktop ? (collapsed ? DESKTOP_COLLAPSED : DESKTOP_EXPANDED) : 0;

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggle,
        setCollapsed,
        mobileOpen,
        setMobileOpen,
        sidebarWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
