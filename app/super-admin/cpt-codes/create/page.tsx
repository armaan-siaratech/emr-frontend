"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCPTCodeApi } from "@/lib/api/cptApi";

export default function CreateCPTPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    category: "",
    subcategory: "",
    fee: "",
    version: "2026",
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.code.trim() || !formData.description.trim()) {
      setError("CPT Code and Description are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createCPTCodeApi({
        code: formData.code.trim(),
        description: formData.description.trim(),
        category: formData.category.trim() || null,
        subcategory: formData.subcategory.trim() || null,
        fee: formData.fee.trim() || null,
        version: formData.version.trim() || "2026",
        is_active: formData.is_active,
      });
      router.push("/super-admin/cpt-codes");
    } catch (err: any) {
      setError(err?.message || "Failed to create CPT code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1100px]">
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-2">
          <Link
            href="/super-admin"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            Super Admin
          </Link>
          <span className="text-[10px] text-[#B3BCB8]">/</span>
          <Link
            href="/super-admin/cpt-codes"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            CPT Codes
          </Link>
          <span className="text-[10px] text-[#B3BCB8]">/</span>
          <span className="text-[10px] text-[#596964]">Create</span>
        </div>

        <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
          Add CPT Code
        </h1>
        <p className="mt-1 text-[11px] text-[#8A9995]">
          Add a new procedure or service code to the coding library.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        <FormSection
          title="Code Information"
          description="Enter the CPT code and procedure description."
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                CPT Code <span className="ml-1 text-[#D45D55]">*</span>
              </label>
              <input
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Example: 99213"
                className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Version
              </label>
              <input
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="Example: 2026"
                className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white"
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Description <span className="ml-1 text-[#D45D55]">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter detailed procedure or service description..."
                className="w-full resize-none rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 py-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white"
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Classification & Pricing"
          description="Organize the CPT code by category and set fee."
        >
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Category
              </label>
              <input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Evaluation & Management"
                className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Subcategory
              </label>
              <input
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                placeholder="e.g. Established Patient"
                className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold text-[#4E5D58]">
                Default Fee
              </label>
              <input
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                placeholder="e.g. $95.00"
                className="h-10 w-full rounded-[9px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[11px] text-[#263833] outline-none focus:border-[#77BDB4] focus:bg-white"
              />
            </div>
          </div>
        </FormSection>

        <div className="flex items-center justify-end gap-3 border-t border-[#E5ECEA] pt-5">
          <Link
            href="/super-admin/cpt-codes"
            className="rounded-[9px] border border-[#DDE6E3] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[9px] bg-[#0F766E] px-6 py-2.5 text-[10px] font-semibold text-white shadow-[0_5px_18px_rgba(15,118,110,0.18)] hover:bg-[#0B625C] disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add CPT Code"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">
      <div className="border-b border-[#EDF2F0] px-6 py-5">
        <h2 className="text-[13px] font-semibold text-[#263833]">{title}</h2>
        <p className="mt-1 text-[9px] text-[#98A49F]">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}