"use client";

import { useEffect } from "react";

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ title, subtitle, onClose, children, footer }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#172522]/40 px-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="animate-scale-in w-full max-w-[500px] overflow-hidden rounded-[18px] bg-white shadow-[0_25px_70px_rgba(20,50,45,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#edf1ef] px-6 py-5">
          <div>
            <h2 className="text-[15px] font-semibold text-[#263833]">{title}</h2>
            {subtitle && <p className="mt-1 text-[10px] text-[#98a49f]">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[16px] text-[#9ba6a2] transition hover:bg-[#f3f6f5] hover:text-[#52615c] hover:rotate-90 duration-200"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2 border-t border-[#edf1ef] bg-[#fbfcfc] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
