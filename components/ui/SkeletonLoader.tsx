"use client";

import React from "react";

interface SkeletonLoaderProps {
  type?: "card" | "table" | "text" | "grid";
  count?: number;
  className?: string;
}

/**
 * Reusable Shimmering Skeleton Loader Component for 3D Glassmorphism UI
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "card",
  count = 4,
  className = "",
}) => {
  const items = Array.from({ length: count });

  if (type === "table") {
    return (
      <div className={`w-full space-y-3 ${className}`}>
        {items.map((_, idx) => (
          <div
            key={idx}
            className="h-12 w-full rounded-2xl bg-gradient-to-r from-teal-50/60 via-slate-100/80 to-teal-50/60 animate-pulse border border-teal-100/60 shadow-xs"
          />
        ))}
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className={`space-y-2 ${className}`}>
        {items.map((_, idx) => (
          <div
            key={idx}
            className="h-4 rounded-lg bg-slate-200/70 animate-pulse"
            style={{ width: `${80 - (idx % 3) * 15}%` }}
          />
        ))}
      </div>
    );
  }

  // Grid / Card Layout (Default)
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${className}`}>
      {items.map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl border-2 border-teal-200/50 bg-gradient-to-br from-teal-50/60 via-emerald-50/20 to-white p-5 space-y-4 shadow-sm animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-200/60 shrink-0" />
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-teal-200/60" />
                <div className="h-4 w-36 rounded bg-slate-300/70" />
              </div>
            </div>
            <div className="h-8 w-16 rounded-xl bg-slate-200/60" />
          </div>

          <div className="h-16 w-full rounded-2xl bg-teal-50/70 border border-teal-100/50" />

          <div className="grid grid-cols-4 gap-2">
            <div className="h-10 rounded-xl bg-slate-100" />
            <div className="h-10 rounded-xl bg-slate-100" />
            <div className="h-10 rounded-xl bg-slate-100" />
            <div className="h-10 rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
};
