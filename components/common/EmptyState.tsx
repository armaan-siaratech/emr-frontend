interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon = "⌕", title, description, action }: EmptyStateProps) {
  return (
    <div className="animate-scale-in flex flex-col items-center justify-center py-16">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#edf6f3] to-[#d5ede8] text-[#0f766e] text-lg animate-float">
        {icon}
      </div>
      <p className="text-[13px] font-semibold text-[#52615c]">{title}</p>
      {description && (
        <p className="mt-1 text-[11px] text-[#9aa5a1]">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
