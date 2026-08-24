"use client";

import Link from "next/link";
import { useState } from "react";

export default function TicketDetailPage() {
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("High");
  const [message, setMessage] = useState("");

  return (
    <div className="w-full">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6">

        <div className="mb-2 flex items-center gap-2">

          <Link
            href="/super-admin"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            Super Admin
          </Link>

          <span className="text-[10px] text-[#B3BCB8]">
            /
          </span>

          <Link
            href="/super-admin/support-tickets"
            className="text-[10px] text-[#8A9995] hover:text-[#0F766E]"
          >
            Support Tickets
          </Link>

          <span className="text-[10px] text-[#B3BCB8]">
            /
          </span>

          <span className="text-[10px] text-[#596964]">
            TKT-10482
          </span>

        </div>


        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-[22px] font-semibold tracking-[-0.03em] text-[#172522]">
                Unable to access patient records
              </h1>

              <span className="rounded-full bg-[#FFF0EE] px-2.5 py-1 text-[8px] font-semibold text-[#C75A50]">
                High Priority
              </span>

            </div>

            <p className="mt-1 text-[10px] text-[#8A9995]">
              TKT-10482 · Created Aug 10, 2026 at 09:42 AM
            </p>

          </div>


          <Link
            href="/super-admin/support-tickets"
            className="rounded-[9px] border border-[#DDE7E4] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]"
          >
            ← Back to Tickets
          </Link>

        </div>

      </div>


      <div className="grid grid-cols-[1fr_310px] gap-5">


        {/* ===================================================
            LEFT - CONVERSATION
        =================================================== */}

        <div className="space-y-5">


          {/* Original Request */}

          <div className="rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

            <div className="flex items-center justify-between border-b border-[#EDF2F0] px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F4F1] text-[9px] font-bold text-[#0F766E]">
                  JA
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#465550]">
                    John Anderson
                  </p>

                  <p className="text-[8px] text-[#98A49F]">
                    Administrator · Aug 10, 2026 at 09:42 AM
                  </p>

                </div>

              </div>

              <span className="rounded-[6px] bg-[#F1F5F4] px-2 py-1 text-[8px] text-[#667570]">
                Original Request
              </span>

            </div>


            <div className="px-6 py-5">

              <p className="text-[11px] leading-6 text-[#596964]">
                I am unable to access patient records from the
                patient management section. Whenever I click on a
                patient, the system keeps loading and eventually
                shows an error message.
              </p>


              <div className="mt-5 rounded-[10px] border border-[#E8EEEC] bg-[#FAFCFB] p-4">

                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A9995]">
                  Error Details
                </p>

                <div className="rounded-[7px] bg-[#F4F6F5] p-3 font-mono text-[9px] text-[#687570]">
                  Failed to load patient record.
                  <br />
                  Error: REQUEST_TIMEOUT
                </div>

              </div>


              {/* Attachment */}

              <div className="mt-5">

                <p className="mb-2 text-[9px] font-semibold text-[#64736E]">
                  Attachments
                </p>

                <div className="flex items-center gap-3 rounded-[9px] border border-[#E2EAE7] p-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#F2F5F4] text-[10px] text-[#6E7B77]">
                    PDF
                  </div>

                  <div className="flex-1">

                    <p className="text-[9px] font-semibold text-[#53625E]">
                      error-screenshot.pdf
                    </p>

                    <p className="mt-0.5 text-[8px] text-[#9AA5A1]">
                      245 KB
                    </p>

                  </div>

                  <button className="text-[9px] font-semibold text-[#0F766E]">
                    Download
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* Admin Response */}

          <div className="rounded-[15px] border border-[#DDEAE7] bg-[#F7FBFA]">

            <div className="flex items-center justify-between border-b border-[#E4EEEB] px-6 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-[9px] font-bold text-white">
                  SA
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#465550]">
                    Super Admin
                  </p>

                  <p className="text-[8px] text-[#98A49F]">
                    Aug 10, 2026 at 10:05 AM
                  </p>

                </div>

              </div>

              <span className="rounded-[6px] bg-[#E7F4F1] px-2 py-1 text-[8px] font-medium text-[#0F766E]">
                Support Team
              </span>

            </div>


            <div className="px-6 py-5">

              <p className="text-[11px] leading-6 text-[#596964]">
                Thanks for reporting this issue. We have identified
                a temporary issue with the patient records service.
                Our technical team is currently investigating the
                problem.
              </p>

            </div>

          </div>


          {/* Reply */}

          <div className="rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

            <div className="border-b border-[#EDF2F0] px-6 py-4">

              <h2 className="text-[12px] font-semibold text-[#263833]">
                Reply to Ticket
              </h2>

              <p className="mt-1 text-[9px] text-[#98A49F]">
                Send a response to the administrator.
              </p>

            </div>


            <div className="p-6">

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Write your response..."
                className="w-full resize-none rounded-[10px] border border-[#DDE7E4] bg-[#FCFDFC] px-4 py-3 text-[11px] text-[#263833] outline-none placeholder:text-[#A6B0AC] focus:border-[#77BDB4] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
              />


              <div className="mt-4 flex items-center justify-between">

                <button className="flex items-center gap-2 rounded-[8px] border border-[#DDE7E4] px-3 py-2 text-[9px] font-semibold text-[#64736E] hover:bg-[#F7FAF9]">
                  <PaperclipIcon />
                  Attach File
                </button>


                <div className="flex gap-2">

                  <button
                    onClick={() => setMessage("")}
                    className="rounded-[8px] border border-[#DDE7E4] px-4 py-2 text-[9px] font-semibold text-[#64736E]"
                  >
                    Clear
                  </button>

                  <button className="rounded-[8px] bg-[#0F766E] px-5 py-2 text-[9px] font-semibold text-white hover:bg-[#0B625C]">
                    Send Reply
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT - TICKET INFORMATION
        =================================================== */}

        <div className="space-y-5">


          {/* Ticket Status */}

          <div className="rounded-[15px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

            <h2 className="mb-4 text-[12px] font-semibold text-[#263833]">
              Ticket Status
            </h2>


            <label className="mb-2 block text-[9px] font-semibold text-[#687570]">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mb-4 h-10 w-full rounded-[8px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >

              <option>
                Open
              </option>

              <option>
                In Progress
              </option>

              <option>
                Resolved
              </option>

              <option>
                Closed
              </option>

            </select>


            <label className="mb-2 block text-[9px] font-semibold text-[#687570]">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
            >

              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>

            </select>


            <button className="mt-4 w-full rounded-[8px] bg-[#0F766E] py-2.5 text-[9px] font-semibold text-white hover:bg-[#0B625C]">
              Update Ticket
            </button>

          </div>


          {/* Requester */}

          <div className="rounded-[15px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

            <h2 className="mb-4 text-[12px] font-semibold text-[#263833]">
              Requester
            </h2>


            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F4F1] text-[10px] font-bold text-[#0F766E]">
                JA
              </div>

              <div>

                <p className="text-[10px] font-semibold text-[#465550]">
                  John Anderson
                </p>

                <p className="mt-0.5 text-[8px] text-[#98A49F]">
                  Administrator
                </p>

              </div>

            </div>


            <div className="mt-5 space-y-3">

              <InfoRow
                label="Email"
                value="john.anderson@example.com"
              />

              <InfoRow
                label="Facility"
                value="Sunrise Medical Center"
              />

              <InfoRow
                label="User ID"
                value="ADM-00248"
              />

            </div>

          </div>


          {/* Ticket Details */}

          <div className="rounded-[15px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

            <h2 className="mb-4 text-[12px] font-semibold text-[#263833]">
              Ticket Details
            </h2>

            <div className="space-y-3">

              <InfoRow
                label="Ticket ID"
                value="TKT-10482"
              />

              <InfoRow
                label="Category"
                value="Technical Issue"
              />

              <InfoRow
                label="Created"
                value="Aug 10, 2026"
              />

              <InfoRow
                label="Last Updated"
                value="10 min ago"
              />

              <InfoRow
                label="Messages"
                value="4"
              />

            </div>

          </div>


          {/* Assigned To */}

          <div className="rounded-[15px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

            <h2 className="mb-4 text-[12px] font-semibold text-[#263833]">
              Assigned To
            </h2>

            <select className="h-10 w-full rounded-[8px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]">

              <option>
                Super Admin
              </option>

              <option>
                Support Team
              </option>

              <option>
                Technical Team
              </option>

            </select>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">

      <span className="text-[8px] font-medium text-[#9AA5A1]">
        {label}
      </span>

      <span className="text-right text-[9px] font-semibold text-[#596964]">
        {value}
      </span>

    </div>
  );
}


/* ============================================================
   ICON
============================================================ */

function PaperclipIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.5-9.5a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 1 1-2.8-2.8l8.8-8.8" />
    </svg>
  );
}