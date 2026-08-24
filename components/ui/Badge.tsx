type BadgeVariant = "success" | "warning" | "info" | "neutral" | "danger" | "draft";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
}

const styles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  success: { bg: "bg-[#e8f6f0]", text: "text-[#278460]", dot: "bg-[#35a878]" },
  warning: { bg: "bg-[#fff3e5]", text: "text-[#bd7730]", dot: "bg-[#d69348]" },
  info: { bg: "bg-[#edf4f8]", text: "text-[#557e9d]", dot: "bg-[#6994b2]" },
  neutral: { bg: "bg-[#f1f3f2]", text: "text-[#7d8985]", dot: "bg-[#a2aca8]" },
  danger: { bg: "bg-[#fff0ed]", text: "text-[#c26559]", dot: "bg-[#d46c5f]" },
  draft: { bg: "bg-[#fff3e5]", text: "text-[#bd7730]", dot: "bg-[#d69348]" },
};

export default function Badge({ children, variant = "neutral", dot = true }: BadgeProps) {
  const s = styles[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold transition-all duration-200 ${s.bg} ${s.text}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />}
      {children}
    </span>
  );
}

export function statusToBadge(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Active: "success",
    Signed: "success",
    Completed: "neutral",
    "Checked in": "success",
    Upcoming: "info",
    Draft: "draft",
    Inactive: "neutral",
    Cancelled: "danger",
    "In Progress": "info",
    Available: "success",
    "In Consultation": "warning",
    Confirmed: "success",
  };
  return map[status] ?? "neutral";
}
