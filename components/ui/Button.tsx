import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white shadow-[0_4px_14px_rgba(15,118,110,0.25)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.35)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-[#dfe7e4] bg-white text-[#667570] hover:bg-[#f7faf9] hover:border-[#c5e8e2] hover:text-[#0f766e]",
  ghost:
    "text-[#667570] hover:bg-[#f0f4f2] hover:text-[#0f766e]",
  danger:
    "bg-gradient-to-r from-[#dc4c3f] to-[#e46b62] text-white shadow-sm hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[10px] rounded-[8px] gap-1.5",
  md: "h-9 px-4 text-[11px] rounded-[9px] gap-2",
  lg: "h-10 px-5 text-[12px] rounded-[10px] gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", icon, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {icon && <span className="transition-transform duration-200 group-hover:rotate-90">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
