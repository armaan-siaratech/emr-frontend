"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LifeBuoy,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
  Ticket,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Send,
} from "lucide-react";
import {
  getTicketsApi,
  createTicketApi,
  TicketItem,
} from "@/lib/api/ticketApi";

export default function TenantSupportTicketsPage() {
  const [items, setItems] = useState<TicketItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(15);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Modals
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TicketItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    subject: "",
    category: "Technical Issue",
    priority: "Medium",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getTicketsApi({
        search: search || undefined,
        status: selectedStatus !== "All" ? selectedStatus : undefined,
        priority: selectedPriority !== "All" ? selectedPriority : undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        page,
        page_size: pageSize,
      });
      setItems(res.items || []);
      setTotalCount(res.total || 0);
    } catch (err: any) {
      setError(err?.message || "Failed to load support tickets.");
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedStatus, selectedPriority, selectedCategory, page, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.subject.trim() || !formData.description.trim()) {
      setFormError("Subject and Description are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const created = await createTicketApi({
        subject: formData.subject.trim(),
        category: formData.category,
        priority: formData.priority,
        description: formData.description.trim(),
      });
      showToast(`Support Ticket ${created.ticket_number} submitted successfully!`);
      setShowCreateModal(false);
      setFormData({
        subject: "",
        category: "Technical Issue",
        priority: "Medium",
        description: "",
      });
      await loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to submit support ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] px-5 py-4 shadow-md text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#7ee8d5]/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-200">
                Hospital Operations
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <LifeBuoy className="w-6 h-6 text-teal-300" />
              Hospital Support Tickets
            </h1>
            <p className="mt-0.5 text-xs font-medium text-teal-100/90">
              Submit technical or administrative support requests to the platform SuperAdmin team.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-black text-[#0F766E] shadow-sm hover:bg-teal-50 transition cursor-pointer active:scale-95 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#0F766E]" />
            <span>Create Support Ticket</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard
          title="Total Tickets"
          value={totalCount.toLocaleString()}
          subtitle="All submitted requests"
          icon="◫"
          badge="bg-teal-700 text-white"
          cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
        />
        <GlassCard
          title="Open"
          value={items.filter((i) => i.status === "Open").length.toString()}
          subtitle="Awaiting response"
          icon="!"
          badge="bg-rose-600 text-white"
          cardBg="bg-gradient-to-br from-rose-50/90 via-rose-100/40 to-slate-50/60 border-rose-300/60"
        />
        <GlassCard
          title="In Progress"
          value={items.filter((i) => i.status === "In Progress").length.toString()}
          subtitle="Currently being resolved"
          icon="↻"
          badge="bg-amber-600 text-white"
          cardBg="bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-orange-50/60 border-amber-300/60"
        />
        <GlassCard
          title="Resolved"
          value={items.filter((i) => i.status === "Resolved" || i.status === "Closed").length.toString()}
          subtitle="Completed tickets"
          icon="✓"
          badge="bg-emerald-700 text-white"
          cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
        />
      </div>

      {/* Controls & Table Container */}
      <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-[#EDF2F0] pb-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91A09B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search ticket # or subject..."
                className="h-10 w-full rounded-2xl border border-[#DFE8E5] bg-white pl-10 pr-3 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E] shadow-xs"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none font-medium shadow-xs"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => {
                setSelectedPriority(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none font-medium shadow-xs"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Urgent">Urgent</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-2xl border border-[#DFE8E5] bg-white px-3 text-xs text-[#596964] outline-none font-medium shadow-xs"
            >
              <option value="All">All Categories</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Account">Account</option>
              <option value="Billing">Billing</option>
              <option value="Configuration">Configuration</option>
              <option value="Notifications">Notifications</option>
            </select>
          </div>

          <button
            onClick={loadData}
            className="p-2.5 rounded-2xl border border-[#DFE8E5] bg-white hover:bg-[#EAF5F2] hover:text-[#0F766E] text-[#596964] transition cursor-pointer shadow-xs self-end md:self-auto"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0F766E]" : ""}`} />
          </button>
        </div>

        {/* Data Table */}
        {isLoading ? (
          <div className="p-16 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0F766E] mb-3" />
            <p className="font-bold text-[#172522]">Loading support tickets...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-700 bg-rose-50 rounded-2xl border border-rose-200">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-bold">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center">
            <Ticket className="w-10 h-10 mx-auto text-[#0F766E] mb-3 opacity-60" />
            <h3 className="font-black text-lg text-[#172522]">No Support Tickets Found</h3>
            <p className="text-xs text-[#63827a] mt-1 max-w-sm mx-auto">
              Click &quot;Create Support Ticket&quot; to request assistance from SuperAdmin.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#EDF2F0]">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB] text-[10px] font-bold uppercase tracking-wider text-[#8A9995]">
                  <th className="py-3.5 px-5">Ticket #</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3F2]">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FBFA] transition-colors">
                    <td className="py-3.5 px-5 font-bold font-mono text-[#0F766E]">
                      {item.ticket_number}
                    </td>

                    <td className="py-3.5 px-4 max-w-[280px]">
                      <p className="font-bold text-[#172522] truncate">{item.subject}</p>
                      <p className="text-[10px] text-[#8A9995] truncate">{item.description}</p>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#596964]">
                      {item.category}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold ${
                          item.priority === "High" || item.priority === "Urgent"
                            ? "bg-rose-100 text-rose-700"
                            : item.priority === "Medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold ${
                          item.status === "Open"
                            ? "bg-rose-100 text-rose-700"
                            : item.status === "In Progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#71807B] text-[11px]">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowViewModal(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] font-bold text-xs transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-[#8A9995]">
            Showing <span className="font-bold text-[#263833]">{items.length}</span> of{" "}
            <span className="font-bold text-[#263833]">{totalCount}</span> tickets
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#52615D] font-mono font-bold px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E1E9E6] text-xs text-[#52615D] hover:bg-teal-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CREATE TICKET MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-5 my-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-lg font-black text-[#132a26] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0F766E]" />
                  Submit Support Ticket
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#263833] mb-1">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of the issue..."
                    required
                    className="h-10 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium text-[#132a26] outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="h-10 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium text-[#132a26] outline-none focus:border-[#0F766E]"
                    >
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Account">Account</option>
                      <option value="Billing">Billing</option>
                      <option value="Configuration">Configuration</option>
                      <option value="Notifications">Notifications</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="h-10 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium text-[#132a26] outline-none focus:border-[#0F766E]"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#263833] mb-1">Description *</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide full details of your request or issue..."
                    required
                    className="w-full rounded-xl border border-[#DFE8E5] p-3 font-medium text-[#132a26] outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0B625C] text-white font-bold transition shadow-md disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Submitting..." : "Submit Ticket"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW TICKET MODAL */}
      <AnimatePresence>
        {showViewModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#0F766E] font-mono">
                    {selectedItem.ticket_number}
                  </span>
                  <h2 className="text-base font-black text-[#132a26]">{selectedItem.subject}</h2>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                    <span className="font-bold text-[#0F766E]">{selectedItem.status}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Priority</span>
                    <span className="font-bold text-amber-700">{selectedItem.priority}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Category</span>
                    <span className="font-bold text-slate-700">{selectedItem.category}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Issue Description</span>
                  <p className="text-slate-700 font-medium whitespace-pre-wrap">{selectedItem.description}</p>
                </div>

                {selectedItem.resolution_notes && (
                  <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 text-emerald-900">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-1">SuperAdmin Resolution Notes</span>
                    <p className="font-medium whitespace-pre-wrap">{selectedItem.resolution_notes}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlassCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  cardBg,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  badge: string;
  cardBg: string;
}) {
  return (
    <div className={`rounded-3xl border-2 ${cardBg} p-5 backdrop-blur-2xl shadow-xs transition hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#63827a]">{title}</p>
          <p className="mt-2 text-2xl font-black tracking-tight text-[#172522]">{value}</p>
          <p className="mt-0.5 text-[10px] text-[#7A8581] font-medium">{subtitle}</p>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-2xl text-[14px] font-black shadow-md ${badge}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
