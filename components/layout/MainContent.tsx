"use client";

import { ReactNode } from "react";
import { useSidebar } from "./SidebarContext";

export default function MainContent({ children }: { children: ReactNode }) {
  const { sidebarWidth } = useSidebar();

  return (
    <div
      className="min-h-screen transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ marginLeft: `${sidebarWidth}px` }}
    >
      <main className="pt-[76px] min-h-screen">
        <div className="animate-fade-in px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1800px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
