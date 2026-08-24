type Tone = "mint" | "blue" | "orange" | "purple" | "green";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  description?: string;
  icon?: string;
  tone?: Tone;
  delay?: number;
}

const toneStyles: Record<Tone, string> = {
  mint: "bg-gradient-to-br from-[#e5f5f1] to-[#d0ede6] text-[#0f766e]",
  blue: "bg-gradient-to-br from-[#edf4f8] to-[#dceaf2] text-[#557e9d]",
  orange: "bg-gradient-to-br from-[#fff3e5] to-[#ffe8cc] text-[#bd7730]",
  purple: "bg-gradient-to-br from-[#f1eef8] to-[#e4ddf0] text-[#7967a5]",
  green: "bg-gradient-to-br from-[#e9f6ef] to-[#d4f0e4] text-[#2d8b67]",
};

export default function StatCard({
  label,
  value,
  change,
  description,
  icon,
  tone = "mint",
  delay = 1,
}: StatCardProps) {
  return (
    <div className={`card card-hover animate-fade-in-up p-5 stagger-${delay}`}>
      <div className="flex items-start justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-[0.11em] text-[#8b9893]">
          {label}
        </p>
        {icon && (
          <span className={`flex h-8 w-8 items-center justify-center rounded-[9px] text-[14px] transition-transform duration-300 group-hover:scale-110 ${toneStyles[tone]}`}>
            {icon}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-[26px] font-semibold tracking-[-0.04em] text-[#172522]">
          {value}
        </span>
        {change && (
          <span className="mb-1 rounded-full bg-[#edf8f4] px-2 py-0.5 text-[8px] font-semibold text-[#2d906d]">
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-[10px] text-[#9aa5a1]">{description}</p>
      )}
    </div>
  );
}
