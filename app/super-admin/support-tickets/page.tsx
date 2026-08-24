"use client";

import Link from "next/link";
import { useState } from "react";

const tickets = [
  {
    id: "TKT-10482",
    subject: "Unable to access patient records",
    raisedBy: "John Anderson",
    role: "Admin",
    category: "Technical Issue",
    priority: "High",
    status: "Open",
    created: "Aug 10, 2026",
    updated: "10 min ago",
  },
  {
    id: "TKT-10481",
    subject: "Provider account activation issue",
    raisedBy: "Sarah Williams",
    role: "Admin",
    category: "Account",
    priority: "Medium",
    status: "In Progress",
    created: "Aug 10, 2026",
    updated: "32 min ago",
  },
  {
    id: "TKT-10480",
    subject: "Appointment data not showing",
    raisedBy: "Michael Brown",
    role: "Admin",
    category: "Technical Issue",
    priority: "High",
    status: "In Progress",
    created: "Aug 09, 2026",
    updated: "1 hour ago",
  },
  {
    id: "TKT-10479",
    subject: "Need help with billing configuration",
    raisedBy: "Emily Davis",
    role: "Admin",
    category: "Billing",
    priority: "Low",
    status: "Resolved",
    created: "Aug 09, 2026",
    updated: "3 hours ago",
  },
  {
    id: "TKT-10478",
    subject: "Unable to upload clinical document",
    raisedBy: "Robert Wilson",
    role: "Admin",
    category: "Technical Issue",
    priority: "Medium",
    status: "Open",
    created: "Aug 09, 2026",
    updated: "4 hours ago",
  },
  {
    id: "TKT-10477",
    subject: "Facility settings need correction",
    raisedBy: "Jessica Taylor",
    role: "Admin",
    category: "Configuration",
    priority: "Medium",
    status: "Resolved",
    created: "Aug 08, 2026",
    updated: "Yesterday",
  },
  {
    id: "TKT-10476",
    subject: "Notification not being received",
    raisedBy: "Daniel Martinez",
    role: "Admin",
    category: "Notifications",
    priority: "High",
    status: "Open",
    created: "Aug 08, 2026",
    updated: "Yesterday",
  },
  {
    id: "TKT-10475",
    subject: "Password reset request",
    raisedBy: "Olivia Moore",
    role: "Admin",
    category: "Account",
    priority: "Low",
    status: "Resolved",
    created: "Aug 07, 2026",
    updated: "2 days ago",
  },
];

export default function SupportTicketsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(searchText) ||
      ticket.subject.toLowerCase().includes(searchText) ||
      ticket.raisedBy.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || ticket.status === status;

    const matchesPriority =
      priority === "All" || ticket.priority === priority;

    const matchesCategory =
      category === "All" || ticket.category === category;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory
    );
  });

  return (
    <div className="w-full">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <div className="mb-1 flex items-center gap-2">

            <Link
              href="/super-admin"
              className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
            >
              Super Admin
            </Link>

            <span className="text-[10px] text-[#B3BCB8]">
              /
            </span>

            <span className="text-[10px] text-[#5F6F6A]">
              Support Tickets
            </span>

          </div>

          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
            Support Tickets
          </h1>

          <p className="mt-1 text-[11px] text-[#8A9995]">
            Manage and resolve support requests submitted by administrators.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button
            className="flex items-center gap-2 rounded-[9px] border border-[#DDE7E4] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#596964] hover:bg-[#F7FAF9]"
          >
            <DownloadIcon />
            Export
          </button>

        </div>

      </div>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="mb-5 grid grid-cols-4 gap-4">

        <SummaryCard
          label="Total Tickets"
          value="1,248"
          description="All support requests"
          icon="◫"
          tone="mint"
        />

        <SummaryCard
          label="Open"
          value="186"
          description="Waiting for response"
          icon="!"
          tone="orange"
        />

        <SummaryCard
          label="In Progress"
          value="94"
          description="Currently being handled"
          icon="↻"
          tone="blue"
        />

        <SummaryCard
          label="Resolved"
          value="968"
          description="Successfully resolved"
          icon="✓"
          tone="green"
        />

      </div>


      {/* =====================================================
          TICKETS TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-[16px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.04)]">

        {/* Filters */}

        <div className="flex items-center justify-between gap-4 border-b border-[#EDF2F0] px-6 py-4">

          <div className="flex flex-1 items-center gap-3">

            {/* Search */}

            <div className="relative w-[290px]">

              <SearchIcon />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket, subject or user..."
                className="h-10 w-full rounded-[9px] border border-[#DFE8E5] bg-[#FAFCFB] pl-9 pr-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A3AEAA] focus:border-[#77BDB4] focus:ring-2 focus:ring-[#0F766E]/10"
              />

            </div>


            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-[9px] border border-[#DFE8E5] bg-white px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >

              <option value="All">
                All Status
              </option>

              <option value="Open">
                Open
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>


            {/* Priority */}

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-10 rounded-[9px] border border-[#DFE8E5] bg-white px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >

              <option value="All">
                All Priority
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>


            {/* Category */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 rounded-[9px] border border-[#DFE8E5] bg-white px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >

              <option value="All">
                All Categories
              </option>

              <option value="Technical Issue">
                Technical Issue
              </option>

              <option value="Account">
                Account
              </option>

              <option value="Billing">
                Billing
              </option>

              <option value="Configuration">
                Configuration
              </option>

              <option value="Notifications">
                Notifications
              </option>

            </select>

          </div>


          <p className="whitespace-nowrap text-[10px] text-[#8A9995]">

            <span className="font-semibold text-[#53625E]">
              {filteredTickets.length}
            </span>{" "}
            results

          </p>

        </div>


        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1250px]">

            <thead>

              <tr className="border-b border-[#EDF2F0] bg-[#FAFCFB]">

                <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Ticket
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Subject
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Raised By
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Priority
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Created
                </th>

                <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Updated
                </th>

                <th className="px-6 py-3 text-right text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredTickets.length > 0 ? (

                filteredTickets.map((ticket) => (

                  <tr
                    key={ticket.id}
                    className="border-b border-[#F0F3F2] transition hover:bg-[#F8FBFA]"
                  >

                    {/* Ticket */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#E7F4F1] text-[#0F766E]">
                          <TicketIcon />
                        </div>

                        <div>

                          <p className="text-[10px] font-bold text-[#263833]">
                            {ticket.id}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#9AA5A1]">
                            Support Request
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Subject */}

                    <td className="max-w-[270px] px-4 py-4">

                      <p className="truncate text-[10px] font-semibold text-[#465550]">
                        {ticket.subject}
                      </p>

                    </td>


                    {/* Raised By */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9F1EF] text-[8px] font-bold text-[#0F766E]">
                          {getInitials(ticket.raisedBy)}
                        </div>

                        <div>

                          <p className="text-[9px] font-semibold text-[#53625E]">
                            {ticket.raisedBy}
                          </p>

                          <p className="text-[8px] text-[#A0AAA6]">
                            {ticket.role}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Category */}

                    <td className="px-4 py-4">

                      <span className="rounded-[6px] bg-[#F1F5F4] px-2 py-1 text-[8px] font-medium text-[#667570]">
                        {ticket.category}
                      </span>

                    </td>


                    {/* Priority */}

                    <td className="px-4 py-4">
                      <PriorityBadge priority={ticket.priority} />
                    </td>


                    {/* Status */}

                    <td className="px-4 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>


                    {/* Created */}

                    <td className="px-4 py-4">

                      <p className="text-[9px] text-[#6D7A75]">
                        {ticket.created}
                      </p>

                    </td>


                    {/* Updated */}

                    <td className="px-4 py-4">

                      <p className="text-[9px] text-[#6D7A75]">
                        {ticket.updated}
                      </p>

                    </td>


                    {/* Action */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <Link
                          href={`/super-admin/support-tickets/${ticket.id}`}
                          className="flex h-8 items-center gap-1.5 rounded-[7px] px-2.5 text-[9px] font-semibold text-[#0F766E] hover:bg-[#EAF5F2]"
                        >
                          View
                          <ArrowIcon />
                        </Link>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={9}
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-[12px] font-semibold text-[#596964]">
                      No tickets found
                    </p>

                    <p className="mt-1 text-[9px] text-[#9AA5A1]">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Footer */}

        <div className="flex items-center justify-between border-t border-[#EDF2F0] px-6 py-3.5">

          <p className="text-[9px] text-[#98A49F]">

            Showing{" "}

            <span className="font-semibold text-[#52615D]">
              1–{filteredTickets.length}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-[#52615D]">
              1,248
            </span>{" "}

            tickets

          </p>


          <div className="flex items-center gap-1">

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#A4AEAA]">
              ←
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0F766E] text-[10px] font-semibold text-white">
              1
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#63716D]">
              2
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#63716D]">
              3
            </button>

            <span className="px-1 text-[9px] text-[#A0AAA6]">
              ...
            </span>

            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#E1E9E6] text-[10px] text-[#63716D]">
              →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  label,
  value,
  description,
  icon,
  tone,
}: {
  label: string;
  value: string;
  description: string;
  icon: string;
  tone: string;
}) {
  const tones: Record<string, string> = {
    mint: "bg-[#E5F5F1] text-[#0F766E]",
    green: "bg-[#E8F6EF] text-[#2B8A67]",
    blue: "bg-[#EAF3F7] text-[#527B99]",
    orange: "bg-[#FFF0DF] text-[#BD7730]",
  };

  return (
    <div className="rounded-[14px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8B9893]">
            {label}
          </p>

          <p className="mt-3 text-[24px] font-semibold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-[#98A49F]">
            {description}
          </p>

        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-[9px] text-[13px] ${tones[tone]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   PRIORITY
============================================================ */

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<string, string> = {
    High: "bg-[#FFF0EE] text-[#C75A50]",
    Medium: "bg-[#FFF5E7] text-[#B8792E]",
    Low: "bg-[#EAF5F2] text-[#328274]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold ${styles[priority]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}


/* ============================================================
   STATUS
============================================================ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    Open: "bg-[#FFF0EE] text-[#C75A50]",
    "In Progress": "bg-[#EEF4F8] text-[#527B99]",
    Resolved: "bg-[#E7F6EF] text-[#278260]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}


/* ============================================================
   HELPERS
============================================================ */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


/* ============================================================
   ICONS
============================================================ */

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A09B]"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 6h16v12H4z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}