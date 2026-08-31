"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Database,
  CheckCircle2,
  XCircle,
  FileText,
  Tag,
  Hash,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Upload,
  Eye,
  X,
  FileSpreadsheet,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  List,
  DollarSign,
  Download,
  Zap,
} from "lucide-react";
import {
  getCPTCodesApi,
  createCPTCodeApi,
  updateCPTCodeApi,
  deleteCPTCodeApi,
  restoreCPTCodeApi,
  uploadCPTExcelApi,
  CPTItem,
} from "@/lib/api/cptApi";

interface PreviewRow {
  code: string;
  description: string;
  category?: string;
  subcategory?: string;
  fee?: string;
  version?: string;
}

interface FilePreviewData {
  totalRows: number;
  headers: string[];
  sampleRows: PreviewRow[];
}

const parseFilePreview = async (file: File): Promise<FilePreviewData> => {
  const text = await file.text();
  let headers: string[] = [];
  let sampleRows: PreviewRow[] = [];
  let totalRows = 0;

  const normalizeKey = (k: string) => k.toLowerCase().replace(/[^a-z0-9]/g, "");

  // 1. XML Spreadsheet (.xls)
  if (text.includes("<?xml") || text.includes("<Workbook")) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const rows = Array.from(xmlDoc.querySelectorAll("Row"));
      if (rows.length > 0) {
        const firstRowCells = Array.from(rows[0].querySelectorAll("Cell"));
        headers = firstRowCells.map((c) => {
          const d = c.querySelector("Data");
          return d?.textContent?.trim() || "";
        });

        const dataRows = rows.slice(1);
        totalRows = dataRows.length;

        for (let i = 0; i < Math.min(dataRows.length, 6); i++) {
          const cells = Array.from(dataRows[i].querySelectorAll("Cell"));
          const rowVals: string[] = cells.map((c) => {
            const dataEl = c.querySelector("Data");
            return dataEl?.textContent?.trim() || "";
          });

          const rowObj: Record<string, string> = {};
          headers.forEach((h, idx) => {
            if (h && rowVals[idx] !== undefined) {
              rowObj[normalizeKey(h)] = rowVals[idx];
            }
          });

          const code = rowObj.code || rowObj.cptcode || rowObj.cpt || rowVals[0] || "";
          const description = rowObj.description || rowObj.desc || rowObj.procedure || rowVals[1] || "";

          if (code || description) {
            sampleRows.push({
              code,
              description,
              category: rowObj.category || rowVals[2] || "",
              subcategory: rowObj.subcategory || rowObj.subcat || rowVals[3] || "",
              fee: rowObj.fee || rowObj.price || rowVals[4] || "",
              version: rowObj.version || rowVals[5] || "2026",
            });
          }
        }
        if (sampleRows.length > 0) {
          return { totalRows, headers, sampleRows };
        }
      }
    } catch (_) {}
  }

  // 2. CSV / Text
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length > 0) {
    const parseCSVLine = (line: string) => {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    headers = parseCSVLine(lines[0]);
    totalRows = Math.max(0, lines.length - 1);

    for (let i = 1; i < Math.min(lines.length, 7); i++) {
      const vals = parseCSVLine(lines[i]);
      if (vals.length === 0 || !vals.some((v) => v)) continue;

      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        if (h && vals[idx] !== undefined) {
          rowObj[normalizeKey(h)] = vals[idx];
        }
      });

      const code = rowObj.code || rowObj.cptcode || rowObj.cpt || vals[0] || "";
      const description = rowObj.description || rowObj.desc || rowObj.procedure || vals[1] || "";

      if (code || description) {
        sampleRows.push({
          code,
          description,
          category: rowObj.category || vals[2] || "",
          subcategory: rowObj.subcategory || rowObj.subcat || vals[3] || "",
          fee: rowObj.fee || rowObj.price || vals[4] || "",
          version: rowObj.version || vals[5] || "2026",
        });
      }
    }
  }

  return { totalRows, headers, sampleRows };
};

export default function CPTPage() {
  const [items, setItems] = useState<CPTItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(16);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // View Mode: 'grid' (3D Colorized Cards) or 'table' (Elevated Glass Table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CPTItem | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    category: "",
    subcategory: "",
    fee: "",
    version: "2026",
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // File Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<FilePreviewData | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);

  // Load Data from Backend API
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const is_active_param =
        selectedStatus === "Active" ? true : selectedStatus === "Inactive" ? false : undefined;

      const include_deleted_param =
        selectedStatus === "Soft-Deleted" || selectedStatus === "All";

      const res = await getCPTCodesApi({
        search: search || undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        is_active: is_active_param,
        include_deleted: include_deleted_param,
        page,
        page_size: pageSize,
      });

      let loadedItems = res.items || [];
      if (selectedStatus === "Soft-Deleted") {
        loadedItems = loadedItems.filter((i) => i.is_deleted);
      }

      setItems(loadedItems);
      setTotalCount(selectedStatus === "Soft-Deleted" ? loadedItems.length : res.total || 0);
    } catch (err: any) {
      setError(err?.message || "Failed to load CPT procedure codes from backend.");
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedCategory, selectedStatus, page, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Handle Create Code
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.code.trim() || !formData.description.trim()) {
      setFormError("CPT Code and Description are required.");
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
      showToast(`CPT Code '${formData.code.toUpperCase()}' created successfully!`);
      setShowAddModal(false);
      resetForm();
      await loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to create CPT code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Edit Modal
  const openEdit = (item: CPTItem) => {
    setSelectedItem(item);
    setFormData({
      code: item.code,
      description: item.description,
      category: item.category || "",
      subcategory: item.subcategory || "",
      fee: item.fee || "",
      version: item.version || "2026",
      is_active: item.is_active,
    });
    setFormError(null);
    setShowEditModal(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setFormError(null);
    if (!formData.code.trim() || !formData.description.trim()) {
      setFormError("CPT Code and Description are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateCPTCodeApi(selectedItem.id, {
        code: formData.code.trim(),
        description: formData.description.trim(),
        category: formData.category.trim() || null,
        subcategory: formData.subcategory.trim() || null,
        fee: formData.fee.trim() || null,
        version: formData.version.trim() || "2026",
        is_active: formData.is_active,
      });
      showToast(`CPT Code '${formData.code.toUpperCase()}' updated successfully!`);
      setShowEditModal(false);
      setSelectedItem(null);
      await loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to update CPT code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Soft Delete Confirm (NO HARD DELETE)
  const handleSoftDeleteConfirm = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await deleteCPTCodeApi(selectedItem.id);
      showToast(`CPT Code '${selectedItem.code}' soft-deleted successfully.`);
      setShowDeleteModal(false);
      setSelectedItem(null);
      await loadData();
    } catch (err: any) {
      showToast(err?.message || "Failed to soft delete CPT code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Restore (Restores Soft-Deleted Code)
  const handleRestore = async (item: CPTItem) => {
    setIsLoading(true);
    try {
      await restoreCPTCodeApi(item.id);
      showToast(`CPT Code '${item.code}' restored successfully!`);
      await loadData();
    } catch (err: any) {
      showToast(err?.message || "Failed to restore CPT code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle File Select & Preview Generation
  const handleFileChange = async (file: File | null) => {
    setUploadFile(file);
    setFormError(null);
    if (!file) {
      setPreviewData(null);
      return;
    }
    setIsPreviewLoading(true);
    try {
      const data = await parseFilePreview(file);
      setPreviewData(data);
    } catch (err) {
      console.warn("File preview generation warning:", err);
      setPreviewData(null);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Handle Excel/CSV Upload
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setFormError("Please select a valid .xlsx, .xls or .csv file to upload.");
      return;
    }
    setFormError(null);
    setUploadProgress(true);
    try {
      const res = await uploadCPTExcelApi(uploadFile);
      showToast(res.message || "File uploaded and processed successfully!");
      setShowUploadModal(false);
      setUploadFile(null);
      setPreviewData(null);
      await loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to process uploaded file.");
    } finally {
      setUploadProgress(false);
    }
  };

  // Handle Sample CSV / XLSX Template Download
  const handleDownloadSampleFile = (format: "csv" | "xlsx" = "csv") => {
    const headers = ["code", "description", "category", "subcategory", "fee", "version"];
    const sampleRows = [
      ["99213", "Office or other outpatient visit for established patient", "Evaluation & Management", "Established Patient", "$95.00", "2026"],
      ["99214", "Office or other outpatient visit for established patient, detailed", "Evaluation & Management", "Established Patient", "$145.00", "2026"],
      ["99203", "Office or other outpatient visit for new patient", "Evaluation & Management", "New Patient", "$120.00", "2026"],
      ["80053", "Comprehensive metabolic panel", "Laboratory", "Chemistry", "$48.00", "2026"],
      ["85025", "Complete blood count with automated differential", "Laboratory", "Hematology", "$32.00", "2026"],
      ["71046", "Radiologic examination, chest, two views", "Radiology", "Diagnostic Imaging", "$85.00", "2026"],
      ["93000", "Electrocardiogram, routine ECG", "Medicine", "Cardiovascular", "$55.00", "2026"],
      ["36415", "Collection of venous blood by venipuncture", "Laboratory", "Specimen Collection", "$18.00", "2026"],
    ];

    if (format === "xlsx") {
      let xmlContent = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="CPT Sample Data">
  <Table>
   <Row>`;
      headers.forEach((h) => {
        xmlContent += `<Cell><Data ss:Type="String">${h}</Data></Cell>`;
      });
      xmlContent += `</Row>`;
      sampleRows.forEach((row) => {
        xmlContent += `<Row>`;
        row.forEach((cell) => {
          xmlContent += `<Cell><Data ss:Type="String">${cell.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Data></Cell>`;
        });
        xmlContent += `</Row>`;
      });
      xmlContent += `</Table>
 </Worksheet>
</Workbook>`;
      const blob = new Blob([xmlContent], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "cpt_sample_template.xls");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Sample CPT Excel (.xls) template downloaded!");
    } else {
      const csvLines = [
        headers.join(","),
        ...sampleRows.map((row) =>
          row
            .map((cell) => {
              const escaped = String(cell).replace(/"/g, '""');
              return `"${escaped}"`;
            })
            .join(",")
        ),
      ];

      const csvContent = "\uFEFF" + csvLines.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "cpt_sample_template.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Sample CPT CSV template downloaded!");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      category: "",
      subcategory: "",
      fee: "",
      version: "2026",
      is_active: true,
    });
    setFormError(null);
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  // Extract unique categories for filter
  const availableCategories = Array.from(
    new Set(items.map((i) => i.category).filter(Boolean))
  ) as string[];

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Ultra-Compact Header Bar */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-5 py-3.5 shadow-md text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#7ee8d5]/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Breadcrumb + Title in Single Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-teal-200 text-[11px] font-bold uppercase tracking-wider">
              <Link href="/super-admin" className="hover:text-white transition">
                Super Admin
              </Link>
              <span>/</span>
            </div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-300 animate-pulse" />
              CPT Procedure Codes Catalog
            </h1>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Sample Data Download Pill */}
            <div className="flex items-center gap-1.5 rounded-xl bg-white/10 p-1 border border-white/20 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-teal-200 pl-2 pr-0.5 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Download className="w-3.5 h-3.5 text-teal-300" />
                Sample:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDownloadSampleFile("csv")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/15 text-white hover:bg-white hover:text-[#0F766E] transition-all cursor-pointer active:scale-95"
                  title="Download Sample CSV"
                >
                  <FileText className="w-3 h-3" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => handleDownloadSampleFile("xlsx")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/15 text-white hover:bg-white hover:text-[#0F766E] transition-all cursor-pointer active:scale-95"
                  title="Download Sample Excel (.xls)"
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>Excel</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setUploadFile(null);
                setFormError(null);
                setShowUploadModal(true);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-white hover:text-[#0F766E] transition cursor-pointer active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>

            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-black text-[#0F766E] shadow-sm hover:bg-teal-50 transition cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Add CPT Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vibrant 3D Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard3D
          title="Total CPT Codes"
          value={totalCount.toLocaleString()}
          subtitle="Backend database records"
          icon="⌘"
          cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
          badge="bg-teal-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(15,118,110,0.15)]"
        />

        <GlassCard3D
          title="Active CPT Codes"
          value={items.filter((i) => i.is_active && !i.is_deleted).length.toLocaleString()}
          subtitle="Currently active for billing"
          icon="✓"
          cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
          badge="bg-emerald-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
        />

        <GlassCard3D
          title="Categories Loaded"
          value={availableCategories.length > 0 ? `${availableCategories.length} Categories` : "Multiple Categories"}
          subtitle="Procedure classifications"
          icon="◫"
          cardBg="bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-blue-50/60 border-sky-300/60"
          badge="bg-sky-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(14,165,233,0.15)]"
        />

        <GlassCard3D
          title="Active Version"
          value="2026 CPT"
          subtitle="Current Procedural Terminology"
          icon="↻"
          cardBg="bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-orange-50/60 border-amber-300/60"
          badge="bg-amber-700 text-white"
          shadow="shadow-[0_10px_25px_rgba(245,158,11,0.15)]"
        />
      </div>

      {/* Main Content & Controls Container */}
      <div className="space-y-4">
        {/* Search, Filters & View Switcher Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91A09B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search CPT code, description, category..."
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-3 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full sm:w-auto rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none focus:border-[#0F766E] font-medium shadow-xs"
            >
              <option value="All">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full sm:w-auto rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none focus:border-[#0F766E] font-medium shadow-xs"
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
              <option value="Soft-Deleted">Soft-Deleted Only</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center rounded-2xl border border-[#DFE8E5] bg-[#FAFCFB] p-1 shadow-inner">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${viewMode === "grid"
                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                  : "text-[#596964] hover:text-[#0F766E]"
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards View</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${viewMode === "table"
                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                  : "text-[#596964] hover:text-[#0F766E]"
                  }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>

            <button
              onClick={loadData}
              className="p-2.5 rounded-2xl border border-[#DFE8E5] bg-white hover:bg-[#EAF5F2] hover:text-[#0F766E] text-[#596964] transition cursor-pointer shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0F766E]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid / Table View */}
        {isLoading ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
            <p className="font-bold text-[#172522]">Loading live CPT procedure codes from backend...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 p-12 text-center text-rose-700 shadow-md">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-bold">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-16 text-center shadow-lg backdrop-blur-xl">
            <Database className="w-10 h-10 mx-auto text-[#0F766E] mb-3 opacity-60" />
            <h3 className="font-black text-lg text-[#172522]">No CPT Codes Found</h3>
            <p className="text-xs text-[#63827a] mt-1 max-w-sm mx-auto">
              Upload an Excel/CSV file or click &quot;Add CPT Code&quot; to populate procedure codes.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* ============================================================
             3D COLORIZED GLASS CARDS GRID VIEW
          ============================================================ */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative group rounded-2xl border-2 p-3.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-xl flex flex-col justify-between overflow-hidden ${item.is_deleted
                  ? "bg-gradient-to-br from-rose-50/90 via-rose-100/30 to-white border-rose-300/80"
                  : "bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-white border-[#7ee8d5]/70 hover:border-[#0f766e]"
                  }`}
              >
                {/* Ambient Top Card Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7ee8d5]/30 blur-xl group-hover:bg-[#0f766e]/20 transition-all duration-300" />

                <div className="space-y-2 relative z-10">
                  {/* Top Bar: CPT Code Pill + Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-gradient-to-r from-[#0F766E] to-[#115e59] text-white shadow-xs font-mono font-black text-xs px-2.5 py-1 rounded-xl flex items-center gap-1 border border-teal-400/40">
                      <Hash className="w-3 h-3 text-teal-200" />
                      {item.code}
                    </span>

                    <div>
                      {item.is_deleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-200">
                          <XCircle className="w-2.5 h-2.5 text-rose-600" />
                          Deleted
                        </span>
                      ) : item.is_active ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F6EF] px-2 py-0.5 text-[9px] font-bold text-[#278260] border border-[#a3e4c9]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F2F1] px-2 py-0.5 text-[9px] font-semibold text-[#7A8581]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7A8581]" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3
                      className={`text-xs font-bold leading-tight font-sans line-clamp-2 ${item.is_deleted ? "line-through text-slate-400" : "text-[#132a26]"}`}
                      title={item.description}
                    >
                      {item.description}
                    </h3>
                  </div>

                  {/* Category & Tag Pills */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <span className="rounded-lg bg-[#E7F4F1] border border-[#bce4db] px-2 py-0.5 text-[9px] font-bold text-[#0F766E] truncate max-w-[130px]">
                      {item.category || "General"}
                    </span>

                    {item.subcategory && (
                      <span className="rounded-lg bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                        {item.subcategory}
                      </span>
                    )}

                    {item.fee && (
                      <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-mono font-bold text-emerald-700 flex items-center gap-0.5">
                        <DollarSign className="w-2.5 h-2.5 text-emerald-600" />
                        {item.fee.startsWith("$") ? item.fee.substring(1) : item.fee}
                      </span>
                    )}

                    <span className="rounded-lg bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-700">
                      v{item.version || "2026"}
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between border-t border-teal-100/60 pt-2 mt-2.5 relative z-10">
                  <span className="text-[9px] font-mono text-[#8A9995]">
                    ID: {item.id.substring(0, 6)}...
                  </span>

                  <div className="flex items-center gap-1">
                    {item.is_deleted ? (
                      <button
                        onClick={() => handleRestore(item)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-bold shadow-xs transition cursor-pointer active:scale-95"
                        title="Restore Soft-Deleted Code"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowViewModal(true);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#596964] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openEdit(item)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#596964] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                          title="Edit Code"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDeleteModal(true);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#596964] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer shadow-xs"
                          title="Soft Delete Code"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ============================================================
             ELEVATED 3D GLASS TABLE VIEW
          ============================================================ */
          <div className="overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-xs text-[#263833]">
                <thead>
                  <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB] text-[10px] font-bold uppercase tracking-wider text-[#8A9995]">
                    <th className="py-3.5 px-6">CPT Code</th>
                    <th className="py-3.5 px-4">Procedure Description</th>
                    <th className="py-3.5 px-4">Category / Subcategory</th>
                    <th className="py-3.5 px-4">Fee</th>
                    <th className="py-3.5 px-4">Version</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F3F2]">
                  {items.map((item) => (
                    <tr key={item.id} className={`hover:bg-[#F8FBFA] transition-colors ${item.is_deleted ? "bg-rose-50/30" : ""}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-bold shadow-xs ${item.is_deleted ? "bg-rose-100 text-rose-700" : "bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white"}`}>
                            CPT
                          </div>
                          <div>
                            <p className="font-bold text-[#172522] font-mono text-sm">{item.code}</p>
                            <p className="text-[9px] text-[#8A9995]">v{item.version || "2026"}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-sm">
                        <p className={`font-medium leading-relaxed ${item.is_deleted ? "line-through text-slate-400" : "text-[#263833]"}`}>{item.description}</p>
                      </td>

                      <td className="py-4 px-4">
                        <span className="rounded-lg bg-[#E7F4F1] px-2.5 py-1 text-[10px] font-bold text-[#0F766E]">
                          {item.category || "General Procedure"}
                        </span>
                        {item.subcategory && (
                          <p className="text-[9px] text-[#8A9995] truncate max-w-xs mt-1">{item.subcategory}</p>
                        )}
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-emerald-800">
                        {item.fee || "—"}
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-[#596964]">
                        {item.version || "2026"}
                      </td>

                      <td className="py-4 px-4">
                        {item.is_deleted ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[9px] font-bold text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            Soft-Deleted
                          </span>
                        ) : item.is_active ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EF] px-2.5 py-1 text-[9px] font-semibold text-[#278260]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F2F1] px-2.5 py-1 text-[9px] font-semibold text-[#7A8581]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7A8581]" />
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.is_deleted ? (
                            <button
                              onClick={() => handleRestore(item)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-[#0F766E]/30 text-xs font-bold transition cursor-pointer"
                              title="Restore Soft-Deleted Code"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Restore</span>
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedItem(item);
                                  setShowViewModal(true);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openEdit(item)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-[#EAF5F2] hover:text-[#0F766E] transition cursor-pointer"
                                title="Edit Code"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem(item);
                                  setShowDeleteModal(true);
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71807B] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                                title="Soft Delete Code"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="flex items-center justify-between rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 px-6 py-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
          <p className="text-xs text-[#8A9995]">
            Showing <span className="font-bold text-[#263833]">{items.length}</span> of{" "}
            <span className="font-bold text-[#263833]">{totalCount}</span> CPT codes
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 hover:text-[#0F766E] disabled:opacity-40 transition cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#52615D] font-mono font-bold px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 hover:text-[#0F766E] disabled:opacity-40 transition cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          TRANSLUCENT 3D GLASS MODALS (EXACT ICD-10 SPECIFICATION)
      ============================================================ */}

      {/* 1. View Details Modal (Read) */}
      <AnimatePresence>
        {showViewModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/50 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              {/* Ambient cyan corner highlights */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

              <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <FileText className="h-6 w-6 text-[#0f766e]" />
                  CPT Details: <span className="font-mono text-[#0f766e]">{selectedItem.code}</span>
                </h2>

                <button
                  onClick={() => setShowViewModal(false)}
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs relative z-10">
                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-2">Procedure Description</span>
                  <p className="text-[#132a26] font-medium leading-relaxed font-sans text-sm">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">Classification & Pricing</h3>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Category</span>
                      <p className="text-[#132a26] font-bold mt-1 text-sm">{selectedItem.category || "General Procedure"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Subcategory</span>
                      <p className="text-[#132a26] font-bold mt-1 text-sm">{selectedItem.subcategory || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">Default Fee</span>
                      <p className="text-[#0f766e] font-mono font-black mt-1 text-sm">{selectedItem.fee || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[#63827a] font-bold block text-[10px] uppercase tracking-wider">CPT Version</span>
                      <p className="text-[#132a26] font-mono font-bold mt-1 text-sm">{selectedItem.version || "2026"}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[#35544d] font-bold block text-xs uppercase tracking-wider mb-1">Status</span>
                    {selectedItem.is_deleted ? (
                      <span className="text-rose-600 font-bold">Soft-Deleted</span>
                    ) : selectedItem.is_active ? (
                      <span className="text-[#278260] font-bold">Active</span>
                    ) : (
                      <span className="text-slate-500 font-bold">Inactive</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">ID: {selectedItem.id}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 relative z-10">
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="w-48 py-3 rounded-2xl border border-white/80 bg-white/60 hover:bg-white text-[#35544d] font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Add / Edit Code Translucent 3D Glass Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/50 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              {/* Ambient cyan corner highlights */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0284c7]/20 blur-3xl" />

              {/* Modal Header */}
              <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-5">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-[#0f766e]" />
                  {showAddModal ? "New CPT Code" : `Edit CPT Code: ${selectedItem?.code}`}
                </h2>

                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={showAddModal ? handleCreateSubmit : handleEditSubmit} className="space-y-5 relative z-10">
                {/* SECTION 1: PRIMARY SPECIFICATIONS */}
                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                    Primary Specifications
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        CPT Code *
                      </label>
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="e.g. 99213, 80053"
                        required
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-mono font-bold uppercase text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Default Fee
                      </label>
                      <input
                        type="text"
                        value={formData.fee}
                        onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                        placeholder="e.g. $95.00"
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-mono font-bold text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="mt-3.5">
                    <label className="block text-xs font-bold text-[#2e4741] mb-1">
                      Procedure Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Official CPT procedure or service description..."
                      rows={3}
                      required
                      className="w-full rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs resize-none"
                    />
                  </div>
                </div>

                {/* SECTION 2: CLASSIFICATION & VERSIONING */}
                <div className="rounded-2xl border border-white/80 bg-white/45 p-4 shadow-sm backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#35544d] mb-3">
                    Classification & Versioning
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Category Group
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Evaluation & Management"
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        Subcategory
                      </label>
                      <input
                        type="text"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        placeholder="e.g. Established Patient"
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 text-xs font-medium text-[#132a26] outline-none transition-all placeholder:text-[#8ba39c] focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 items-center mt-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#2e4741] mb-1">
                        CPT Version
                      </label>
                      <input
                        type="text"
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                        placeholder="e.g. 2026"
                        className="h-10 w-full rounded-xl border border-white/80 bg-white/80 px-3 font-mono text-xs text-[#132a26] outline-none transition-all focus:border-[#0f766e] focus:bg-white focus:ring-2 focus:ring-[#0f766e]/15 shadow-xs"
                      />
                    </div>

                    <div className="pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-[#2e4741] font-bold text-xs">
                        <input
                          type="checkbox"
                          checked={formData.is_active}
                          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                          className="w-4 h-4 rounded text-[#0f766e] focus:ring-[#0f766e]"
                        />
                        <span>Active Status</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* FOOTER ACTION BUTTONS */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-48 py-3 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] hover:from-[#115e59] hover:to-[#0f766e] text-white text-xs font-black shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isSubmitting ? "Saving..." : showAddModal ? "Save CPT Code" : "Update CPT Code"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                    className="w-48 py-3 rounded-2xl border border-white/80 bg-white/60 hover:bg-white text-[#35544d] font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Upload Excel / CSV Translucent 3D Glass Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/50 p-5 sm:p-7 shadow-[0_25px_70px_rgba(15,118,110,0.3)] backdrop-blur-3xl overflow-hidden my-auto space-y-5"
            >
              {/* Ambient cyan corner highlights */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7ee8d5]/20 blur-3xl" />

              <div className="relative flex items-center justify-between border-b border-white/60 pb-4 mb-5">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#132a26] text-center w-full uppercase flex items-center justify-center gap-2">
                  <FileSpreadsheet className="h-6 w-6 text-[#0f766e]" />
                  Upload CPT File
                </h2>

                <button
                  onClick={() => setShowUploadModal(false)}
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#35544d] shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Sample Data Download & Header Guide Card */}
              <div className="rounded-2xl border border-[#7ee8d5]/60 bg-gradient-to-br from-teal-50/80 via-white/80 to-emerald-50/60 p-4 shadow-sm backdrop-blur-md space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-teal-100/80 pb-3">
                  <div>
                    <h3 className="text-xs font-black text-[#0f766e] uppercase tracking-wider flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-[#0f766e]" />
                      Download Sample Data Template
                    </h3>
                    <p className="text-[11px] text-[#596964] mt-0.5">
                      Includes pre-formatted sample CPT procedural records to test or reference.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDownloadSampleFile("csv")}
                      className="flex-1 sm:w-36 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-[11px] font-bold shadow-sm transition-all cursor-pointer active:scale-95 border border-teal-600"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>Sample CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadSampleFile("xlsx")}
                      className="flex-1 sm:w-36 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold shadow-sm transition-all cursor-pointer active:scale-95 border border-emerald-600"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                      <span>Sample Excel</span>
                    </button>
                  </div>
                </div>

                {/* Column Headers Visual Specs */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#63827a] block mb-2">
                    Required & Optional File Columns:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white border border-teal-200/80 p-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-[#0f766e]">code</span>
                        <span className="text-[9px] font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Required</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">e.g. 99213, 80053</span>
                    </div>

                    <div className="rounded-xl bg-white border border-teal-200/80 p-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-[#0f766e]">description</span>
                        <span className="text-[9px] font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Required</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">Procedure text</span>
                    </div>

                    <div className="rounded-xl bg-white border border-slate-200 p-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-700">category</span>
                        <span className="text-[9px] font-semibold text-slate-400">Optional</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">e.g. Evaluation</span>
                    </div>

                    <div className="rounded-xl bg-white border border-slate-200 p-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-700">subcategory</span>
                        <span className="text-[9px] font-semibold text-slate-400">Optional</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">e.g. Established</span>
                    </div>

                    <div className="rounded-xl bg-white border border-slate-200 p-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-700">fee</span>
                        <span className="text-[9px] font-semibold text-slate-400">Optional</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">e.g. $95.00</span>
                    </div>

                    <div className="rounded-xl bg-white border border-slate-200 p-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-700">version</span>
                        <span className="text-[9px] font-semibold text-slate-400">Optional</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">e.g. 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFileUpload} className="space-y-5 relative z-10">
                {!uploadFile ? (
                  <div className="rounded-2xl border-2 border-dashed border-[#7ee8d5]/80 bg-white/45 p-6 shadow-sm backdrop-blur-md text-center hover:border-[#0f766e] transition cursor-pointer relative">
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <FileSpreadsheet className="w-12 h-12 mx-auto text-[#0f766e] mb-3 animate-pulse" />
                    <div>
                      <p className="font-bold text-sm text-[#2e4741]">Click to choose or drag & drop Excel / CSV file</p>
                      <p className="text-[10px] text-[#63827a] mt-1.5 font-mono">
                        Expected Headers: <span className="font-bold text-[#0f766e]">code, description, category, subcategory, fee, version</span>
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-[10px] font-bold text-[#0f766e]">
                        <Zap className="w-3 h-3 text-[#0f766e]" />
                        <span>High-Speed Batch Import Engine</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-teal-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#0f766e]">
                          <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-[#132a26] flex items-center gap-2">
                            {uploadFile.name}
                            <span className="rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-[#0f766e]">
                              {(uploadFile.size / 1024).toFixed(1)} KB
                            </span>
                          </p>
                          <p className="text-[11px] text-[#596964] font-medium">
                            {previewData ? (
                              <>
                                Detected <span className="font-bold text-[#0f766e]">{previewData.totalRows}</span> total records in file
                              </>
                            ) : (
                              "File selected and ready for import"
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleFileChange(null)}
                        className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Change File</span>
                      </button>
                    </div>

                    {isPreviewLoading ? (
                      <div className="py-6 text-center text-xs text-[#0f766e] font-bold flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Parsing file data preview...</span>
                      </div>
                    ) : previewData && previewData.sampleRows.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#0f766e]">
                          <span className="flex items-center gap-1 uppercase tracking-wider text-[10px]">
                            <Eye className="w-3.5 h-3.5 text-[#0f766e]" />
                            Live Data Preview (First {previewData.sampleRows.length} Rows):
                          </span>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-teal-200/80 bg-white shadow-2xs">
                          <table className="w-full text-left text-xs font-sans">
                            <thead>
                              <tr className="bg-teal-50/80 text-[10px] font-black uppercase text-[#0f766e] border-b border-teal-100">
                                <th className="py-2 px-3">CPT Code</th>
                                <th className="py-2 px-3">Procedure Description</th>
                                <th className="py-2 px-3">Category</th>
                                <th className="py-2 px-3">Fee</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-teal-50">
                              {previewData.sampleRows.map((r, idx) => (
                                <tr key={idx} className="hover:bg-teal-50/30 transition-colors">
                                  <td className="py-2 px-3 font-mono font-bold text-[#0f766e]">{r.code || "—"}</td>
                                  <td className="py-2 px-3 font-medium text-[#132a26] max-w-[200px] truncate" title={r.description}>
                                    {r.description || "—"}
                                  </td>
                                  <td className="py-2 px-3 text-[#596964] text-[11px]">{r.category || "General"}</td>
                                  <td className="py-2 px-3 font-mono text-[11px] text-emerald-700 font-bold">{r.fee || "—"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={uploadProgress || !uploadFile}
                    className="w-56 py-3 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#14b8a6] hover:from-[#115e59] hover:to-[#0f766e] text-white text-xs font-black shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {uploadProgress ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing & Importing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload & Batch Process</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploadProgress}
                    className="w-44 py-3 rounded-2xl border border-white/80 bg-white/60 hover:bg-white text-[#35544d] font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Soft Delete Confirmation Translucent 3D Glass Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-md w-full rounded-3xl border-2 border-rose-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(225,29,72,0.25)] backdrop-blur-3xl text-center space-y-4 overflow-hidden my-auto"
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
                <Trash2 className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-[#132a26]">Soft Delete CPT Code</h3>

              <p className="text-xs text-[#52615D] leading-relaxed">
                Are you sure you want to soft-delete CPT Code{" "}
                <span className="font-mono font-bold text-[#0F766E]">{selectedItem.code}</span> (
                {selectedItem.description})?
              </p>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium text-left">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Soft-Delete Policy Enforcement:
                </p>
                <p className="mt-0.5 text-[#596964]">
                  This record will NOT be permanently removed from the database. It can be restored at any time.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleSoftDeleteConfirm}
                  disabled={isSubmitting}
                  className="w-44 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/30 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Confirm Soft Delete"}
                </button>

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-44 py-3 rounded-2xl border border-slate-200 bg-slate-100 text-[#35544d] font-bold text-xs hover:bg-white transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Glass Card 3D Component */
function GlassCard3D({
  title,
  value,
  subtitle,
  icon,
  cardBg,
  badge,
  shadow,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  cardBg: string;
  badge: string;
  shadow: string;
}) {
  return (
    <div
      className={`rounded-3xl border-2 ${cardBg} ${shadow} p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#63827a]">{title}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#172522]">{value}</p>
          <p className="mt-1 text-[10px] text-[#7A8581] font-medium">{subtitle}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl text-[16px] font-black shadow-md ${badge}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}