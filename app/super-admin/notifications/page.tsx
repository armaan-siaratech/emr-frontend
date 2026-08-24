"use client";

import { useState } from "react";
import Link from "next/link";

type Notification = {
  id: number;
  type: "support" | "admin" | "system" | "security" | "report";
  title: string;
  message: string;
  time: string;
  read: boolean;
  reference?: string;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "support",
    title: "New Support Ticket",
    message:
      "John Anderson raised a high priority support ticket regarding patient records.",
    time: "5 min ago",
    read: false,
    reference: "TKT-10482",
  },
  {
    id: 2,
    type: "admin",
    title: "New Administrator Created",
    message:
      "Sarah Williams has been successfully added as a new administrator.",
    time: "24 min ago",
    read: false,
    reference: "ADM-00249",
  },
  {
    id: 3,
    type: "security",
    title: "Security Alert",
    message:
      "Multiple unsuccessful login attempts were detected on an administrator account.",
    time: "42 min ago",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "System Update Completed",
    message:
      "The scheduled healthcare platform system update has been completed successfully.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 5,
    type: "support",
    title: "Support Ticket Resolved",
    message:
      "Ticket TKT-10478 has been marked as resolved by the support team.",
    time: "2 hours ago",
    read: true,
    reference: "TKT-10478",
  },
  {
    id: 6,
    type: "report",
    title: "Monthly Report Available",
    message:
      "The July 2026 system activity report is now available for review.",
    time: "4 hours ago",
    read: true,
  },
  {
    id: 7,
    type: "admin",
    title: "Administrator Updated",
    message:
      "Administrator permissions for Michael Brown were successfully updated.",
    time: "Yesterday",
    read: true,
    reference: "ADM-00241",
  },
  {
    id: 8,
    type: "system",
    title: "Database Backup Completed",
    message:
      "The scheduled database backup was completed successfully.",
    time: "Yesterday",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [activeTab, setActiveTab] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "Unread") return !notification.read;
    if (activeTab === "System")
      return notification.type === "system";
    if (activeTab === "Admin")
      return notification.type === "admin";
    if (activeTab === "Support")
      return notification.type === "support";

    return true;
  });

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  return (
    <div className="w-full">

      {/* HEADER */}

      <div className="mb-6 flex items-end justify-between">

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

            <span className="text-[10px] text-[#596964]">
              Notifications
            </span>

          </div>

          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
            Notifications
          </h1>

          <p className="mt-1 text-[11px] text-[#8A9995]">
            Stay updated with important system activities and alerts.
          </p>

        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 rounded-[9px] border border-[#DDE7E4] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#596964] transition hover:bg-[#F5F9F8]"
        >
          <CheckDoubleIcon />
          Mark all as read
        </button>

      </div>


      {/* SUMMARY */}

      <div className="mb-5 grid grid-cols-3 gap-4">

        <NotificationSummary
          title="Total Notifications"
          value={notifications.length.toString()}
          description="All system notifications"
          icon={<BellIcon />}
        />

        <NotificationSummary
          title="Unread"
          value={unreadCount.toString()}
          description="Require your attention"
          icon={<AlertIcon />}
        />

        <NotificationSummary
          title="Today"
          value="6"
          description="Notifications received today"
          icon={<ClockIcon />}
        />

      </div>


      {/* MAIN CARD */}

      <div className="overflow-hidden rounded-[16px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.04)]">

        {/* TABS */}

        <div className="flex items-center justify-between border-b border-[#EDF2F0] px-6">

          <div className="flex items-center gap-6">

            {[
              ["All", notifications.length],
              ["Unread", unreadCount],
              ["System", notifications.filter((n) => n.type === "system").length],
              ["Admin", notifications.filter((n) => n.type === "admin").length],
              ["Support", notifications.filter((n) => n.type === "support").length],
            ].map(([tab, count]) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab as string)}
                className={`relative flex items-center gap-2 py-4 text-[10px] font-semibold transition ${
                  activeTab === tab
                    ? "text-[#0F766E]"
                    : "text-[#8A9995] hover:text-[#596964]"
                }`}
              >

                {tab}

                <span
                  className={`rounded-full px-1.5 py-0.5 text-[8px] ${
                    activeTab === tab
                      ? "bg-[#E6F4F1] text-[#0F766E]"
                      : "bg-[#F1F4F3] text-[#8E9995]"
                  }`}
                >
                  {count}
                </span>

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#0F766E]" />
                )}

              </button>

            ))}

          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-[7px] text-[#8A9995] hover:bg-[#F3F7F6]">
            <FilterIcon />
          </button>

        </div>


        {/* NOTIFICATION LIST */}

        <div>

          {filteredNotifications.map((notification) => (

            <NotificationRow
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id)}
            />

          ))}

          {filteredNotifications.length === 0 && (

            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF5F3] text-[#0F766E]">
                <BellIcon />
              </div>

              <p className="mt-4 text-[12px] font-semibold text-[#596964]">
                No notifications
              </p>

              <p className="mt-1 text-[9px] text-[#9AA5A1]">
                You don&apos;t have any notifications in this category.
              </p>


            </div>

          )}

        </div>


        {/* FOOTER */}

        <div className="flex items-center justify-between border-t border-[#EDF2F0] px-6 py-4">

          <p className="text-[9px] text-[#98A49F]">
            Showing{" "}
            <span className="font-semibold text-[#596964]">
              {filteredNotifications.length}
            </span>{" "}
            notifications
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
              →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   NOTIFICATION ROW
============================================================ */

function NotificationRow({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: () => void;
}) {

  return (

    <div
      className={`group flex items-start gap-4 border-b border-[#F0F3F2] px-6 py-5 transition hover:bg-[#FAFCFB] ${
        !notification.read ? "bg-[#FBFDFC]" : "bg-white"
      }`}
    >

      {/* ICON */}

      <div
        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${getTypeStyle(
          notification.type
        )}`}
      >
        {getTypeIcon(notification.type)}
      </div>


      {/* CONTENT */}

      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-2">

          <h3
            className={`text-[10px] ${
              notification.read
                ? "font-semibold text-[#596964]"
                : "font-bold text-[#263833]"
            }`}
          >
            {notification.title}
          </h3>

          {!notification.read && (
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E]" />
          )}

        </div>

        <p className="mt-1 max-w-[760px] text-[10px] leading-5 text-[#8A9995]">
          {notification.message}
        </p>


        <div className="mt-2 flex items-center gap-3">

          <span className="text-[8px] text-[#A1ABA7]">
            {notification.time}
          </span>

          {notification.reference && (
            <>
              <span className="h-1 w-1 rounded-full bg-[#C4CDCA]" />

              <span className="text-[8px] font-semibold text-[#0F766E]">
                {notification.reference}
              </span>
            </>
          )}

        </div>

      </div>


      {/* ACTION */}

      <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">

        {!notification.read && (

          <button
            onClick={onRead}
            className="rounded-[7px] px-2.5 py-1.5 text-[8px] font-semibold text-[#0F766E] hover:bg-[#EAF5F2]"
          >
            Mark as read
          </button>

        )}

        <button className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[#9AA5A1] hover:bg-[#F0F4F3]">
          <MoreIcon />
        </button>

      </div>

    </div>
  );
}


/* ============================================================
   SUMMARY
============================================================ */

function NotificationSummary({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {

  return (

    <div className="rounded-[14px] border border-[#E4ECE9] bg-white p-5 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8B9893]">
            {title}
          </p>

          <p className="mt-3 text-[24px] font-semibold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-[#98A49F]">
            {description}
          </p>

        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#E7F4F1] text-[#0F766E]">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   TYPE STYLES
============================================================ */

function getTypeStyle(type: Notification["type"]) {

  const styles = {
    support: "bg-[#FFF0EE] text-[#C75A50]",
    admin: "bg-[#E7F4F1] text-[#0F766E]",
    system: "bg-[#EEF4F8] text-[#527B99]",
    security: "bg-[#FFF3E5] text-[#BD7730]",
    report: "bg-[#F0ECF8] text-[#79629A]",
  };

  return styles[type];
}


function getTypeIcon(type: Notification["type"]) {

  if (type === "support") return <TicketIcon />;
  if (type === "admin") return <UserIcon />;
  if (type === "system") return <SystemIcon />;
  if (type === "security") return <ShieldIcon />;

  return <ReportIcon />;
}


/* ============================================================
   ICONS
============================================================ */

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M10.3 3.4 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.4a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckDoubleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m2 12 5 5L18 6" />
      <path d="m9 17 2 2L22 8" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 6h16v12H4z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}