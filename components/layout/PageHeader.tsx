interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="animate-fade-in-up mb-7 flex items-end justify-between">
      <div>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#172522]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-[13px] text-[#667570]">{description}</p>
        )}
      </div>

      {action && <div className="animate-scale-in stagger-2">{action}</div>}
    </div>
  );
}
