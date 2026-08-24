"use client";

interface GlassCard3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export default function GlassCard3D({
  children,
  className = "",
}: GlassCard3DProps) {
  return (
    <div className={`glass-card-3d rounded-3xl border-2 border-white/80 bg-white/65 p-6 shadow-[0_20px_50px_rgba(15,118,110,0.12)] backdrop-blur-3xl transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)] ${className}`}>
      {children}
    </div>
  );
}
