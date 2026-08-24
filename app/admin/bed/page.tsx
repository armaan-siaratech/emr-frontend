"use client";

import { useState } from "react";

const beds = [
  {
    id: 1,
    bedNumber: "A-101",
    room: "101",
    floor: "1st Floor",
    ward: "General Ward",
    type: "Standard",
    patient: "Robert Johnson",
    admissionId: "ADM-10245",
    gender: "Male",
    status: "Occupied",
    facility: "Sunrise Healthcare Center",
  },
  {
    id: 2,
    bedNumber: "A-102",
    room: "101",
    floor: "1st Floor",
    ward: "General Ward",
    type: "Standard",
    patient: "",
    admissionId: "",
    gender: "",
    status: "Available",
    facility: "Sunrise Healthcare Center",
  },
  {
    id: 3,
    bedNumber: "A-103",
    room: "102",
    floor: "1st Floor",
    ward: "General Ward",
    type: "Standard",
    patient: "William Anderson",
    admissionId: "ADM-10251",
    gender: "Male",
    status: "Occupied",
    facility: "Sunrise Healthcare Center",
  },
  {
    id: 4,
    bedNumber: "A-104",
    room: "102",
    floor: "1st Floor",
    ward: "General Ward",
    type: "Standard",
    patient: "",
    admissionId: "",
    gender: "",
    status: "Reserved",
    facility: "Sunrise Healthcare Center",
  },
  {
    id: 5,
    bedNumber: "B-201",
    room: "201",
    floor: "2nd Floor",
    ward: "Private Ward",
    type: "Private",
    patient: "Emily Davis",
    admissionId: "ADM-10260",
    gender: "Female",
    status: "Occupied",
    facility: "Sunrise Healthcare Center",
  },
  {
    id: 6,
    bedNumber: "B-202",
    room: "202",
    floor: "2nd Floor",
    ward: "Private Ward",
    type: "Private",
    patient: "",
    admissionId: "",
    gender: "",
    status: "Available",
    facility: "Sunrise Healthcare Center",
  },
  {
    id: 7,
    bedNumber: "ICU-01",
    room: "ICU-01",
    floor: "3rd Floor",
    ward: "ICU",
    type: "ICU",
    patient: "Michael Brown",
    admissionId: "ADM-10274",
    gender: "Male",
    status: "Occupied",
    facility: "Green Valley Medical Center",
  },
  {
    id: 8,
    bedNumber: "ICU-02",
    room: "ICU-02",
    floor: "3rd Floor",
    ward: "ICU",
    type: "ICU",
    patient: "",
    admissionId: "",
    gender: "",
    status: "Available",
    facility: "Green Valley Medical Center",
  },
  {
    id: 9,
    bedNumber: "ER-01",
    room: "ER-01",
    floor: "Ground Floor",
    ward: "Emergency",
    type: "Emergency",
    patient: "James Wilson",
    admissionId: "ADM-10281",
    gender: "Male",
    status: "Occupied",
    facility: "Green Valley Medical Center",
  },
  {
    id: 10,
    bedNumber: "ER-02",
    room: "ER-02",
    floor: "Ground Floor",
    ward: "Emergency",
    type: "Emergency",
    patient: "",
    admissionId: "",
    gender: "",
    status: "Cleaning",
    facility: "Green Valley Medical Center",
  },
  {
    id: 11,
    bedNumber: "R-301",
    room: "301",
    floor: "3rd Floor",
    ward: "Rehabilitation",
    type: "Rehabilitation",
    patient: "",
    admissionId: "",
    gender: "",
    status: "Available",
    facility: "Westside Rehabilitation",
  },
  {
    id: 12,
    bedNumber: "R-302",
    room: "302",
    floor: "3rd Floor",
    ward: "Rehabilitation",
    type: "Rehabilitation",
    patient: "Linda Thompson",
    admissionId: "ADM-10294",
    gender: "Female",
    status: "Occupied",
    facility: "Westside Rehabilitation",
  },
];

export default function BedManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [facilityFilter, setFacilityFilter] = useState("All Facilities");
  const [floorFilter, setFloorFilter] = useState("All Floors");

  const filteredBeds = beds.filter((bed) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      bed.bedNumber.toLowerCase().includes(searchValue) ||
      bed.room.toLowerCase().includes(searchValue) ||
      bed.ward.toLowerCase().includes(searchValue) ||
      bed.patient.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All Status" ||
      bed.status === statusFilter;

    const matchesFacility =
      facilityFilter === "All Facilities" ||
      bed.facility === facilityFilter;

    const matchesFloor =
      floorFilter === "All Floors" ||
      bed.floor === floorFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesFacility &&
      matchesFloor
    );
  });

  const totalBeds = beds.length;

  const occupiedBeds = beds.filter(
    (bed) => bed.status === "Occupied"
  ).length;

  const availableBeds = beds.filter(
    (bed) => bed.status === "Available"
  ).length;

  const reservedBeds = beds.filter(
    (bed) => bed.status === "Reserved"
  ).length;

  const cleaningBeds = beds.filter(
    (bed) => bed.status === "Cleaning"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* HEADER */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Bed Management
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Manage rooms, beds and patient occupancy across facilities
            </p>

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#53645f] transition hover:bg-[#f5f9f7]"
            >
              + Add Room
            </button>

            <button
              type="button"
              className="rounded-[8px] bg-[#0d9b91] px-4 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.16)] transition hover:bg-[#078a81]"
            >
              + Add Bed
            </button>

          </div>

        </div>

      </div>


      {/* CONTENT */}
      <div className="px-6 py-6">

        {/* STAT CARDS */}
        <div className="grid grid-cols-5 gap-4">

          <StatCard
            title="Total Beds"
            value={totalBeds.toString()}
            subtitle="Across all facilities"
            icon="▦"
          />

          <StatCard
            title="Occupied"
            value={occupiedBeds.toString()}
            subtitle="Currently occupied"
            icon="●"
          />

          <StatCard
            title="Available"
            value={availableBeds.toString()}
            subtitle="Ready for admission"
            icon="✓"
          />

          <StatCard
            title="Reserved"
            value={reservedBeds.toString()}
            subtitle="Reserved beds"
            icon="◷"
          />

          <StatCard
            title="Cleaning"
            value={cleaningBeds.toString()}
            subtitle="Under preparation"
            icon="◇"
          />

        </div>


        {/* OCCUPANCY OVERVIEW */}
        <div className="mt-6 rounded-[14px] border border-[#dce8e5] bg-white p-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Bed Occupancy
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                Current bed utilization across all facilities
              </p>

            </div>

            <div className="text-right">

              <p className="text-[20px] font-bold text-[#172522]">
                {Math.round((occupiedBeds / totalBeds) * 100)}%
              </p>

              <p className="text-[9px] text-[#929e99]">
                Occupancy Rate
              </p>

            </div>

          </div>


          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#edf2f0]">

            <div
              className="h-full rounded-full bg-[#0d9b91]"
              style={{
                width: `${(occupiedBeds / totalBeds) * 100}%`,
              }}
            />

          </div>


          <div className="mt-3 flex items-center gap-5">

            <Legend
              label="Occupied"
              value={occupiedBeds}
              type="occupied"
            />

            <Legend
              label="Available"
              value={availableBeds}
              type="available"
            />

            <Legend
              label="Reserved"
              value={reservedBeds}
              type="reserved"
            />

            <Legend
              label="Cleaning"
              value={cleaningBeds}
              type="cleaning"
            />

          </div>

        </div>


        {/* BED TABLE */}
        <div className="mt-6 overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white">

          {/* TOOLBAR */}
          <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

            <div>

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Bed Inventory
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                View rooms, beds and current occupancy
              </p>

            </div>


            <div className="flex items-center gap-2">

              {/* SEARCH */}
              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#8b9793]">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search beds..."
                  className="h-9 w-[200px] rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] pl-8 pr-3 text-[11px] outline-none transition focus:border-[#0d9b91] focus:bg-white"
                />

              </div>


              {/* STATUS */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Status</option>
                <option>Occupied</option>
                <option>Available</option>
                <option>Reserved</option>
                <option>Cleaning</option>
              </select>


              {/* FACILITY */}
              <select
                value={facilityFilter}
                onChange={(e) => setFacilityFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Facilities</option>
                <option>Sunrise Healthcare Center</option>
                <option>Green Valley Medical Center</option>
                <option>Westside Rehabilitation</option>
              </select>


              {/* FLOOR */}
              <select
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Floors</option>
                <option>Ground Floor</option>
                <option>1st Floor</option>
                <option>2nd Floor</option>
                <option>3rd Floor</option>
              </select>

            </div>

          </div>


          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-[#f7faf9]">

                  <TableHead text="BED" />
                  <TableHead text="ROOM / FLOOR" />
                  <TableHead text="WARD" />
                  <TableHead text="TYPE" />
                  <TableHead text="PATIENT" />
                  <TableHead text="FACILITY" />
                  <TableHead text="STATUS" />
                  <TableHead text="ACTION" />

                </tr>

              </thead>


              <tbody>

                {filteredBeds.map((bed) => (
                  <BedRow
                    key={bed.id}
                    bed={bed}
                  />
                ))}

              </tbody>

            </table>


            {/* EMPTY */}
            {filteredBeds.length === 0 && (
              <div className="flex min-h-[280px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#eaf7f4] text-[20px] text-[#0d9b91]">
                    ⌕
                  </div>

                  <h3 className="mt-3 text-[13px] font-semibold text-[#53645f]">
                    No beds found
                  </h3>

                  <p className="mt-1 text-[10px] text-[#929e99]">
                    Try changing your search or filters.
                  </p>

                </div>

              </div>
            )}

          </div>


          {/* FOOTER */}
          <div className="flex items-center justify-between border-t border-[#e4ece9] px-5 py-3">

            <p className="text-[10px] text-[#899590]">

              Showing{" "}

              <span className="font-semibold text-[#53645f]">
                {filteredBeds.length}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-[#53645f]">
                {totalBeds}
              </span>

              {" "}beds

            </p>


            <div className="flex items-center gap-1">

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#9aa5a1]"
              >
                ‹
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0d9b91] text-[10px] font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#53645f]"
              >
                2
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#dce8e5] text-[10px] text-[#53645f]"
              >
                ›
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-[13px] border border-[#dce8e5] bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] font-semibold text-[#71807c]">
            {title}
          </p>

          <p className="mt-2 text-[25px] font-bold tracking-[-0.04em] text-[#172522]">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-[#929e99]">
            {subtitle}
          </p>

        </div>


        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[16px] text-[#0d9b91]">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   LEGEND
========================================================= */

function Legend({
  label,
  value,
  type,
}: {
  label: string;
  value: number;
  type: string;
}) {
  const dotStyles: Record<string, string> = {
    occupied: "bg-[#0d9b91]",
    available: "bg-[#72b9a9]",
    reserved: "bg-[#d6a75d]",
    cleaning: "bg-[#9ba6a2]",
  };

  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2 w-2 rounded-full ${
          dotStyles[type] || "bg-[#9ba6a2]"
        }`}
      />

      <span className="text-[9px] text-[#899590]">
        {label}
      </span>

      <span className="text-[9px] font-semibold text-[#53645f]">
        {value}
      </span>

    </div>
  );
}


/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({ text }: { text: string }) {
  return (
    <th className="px-4 py-3 text-left">

      <span className="text-[8px] font-semibold tracking-[0.08em] text-[#929e99]">
        {text}
      </span>

    </th>
  );
}


/* =========================================================
   BED ROW
========================================================= */

function BedRow({
  bed,
}: {
  bed: {
    id: number;
    bedNumber: string;
    room: string;
    floor: string;
    ward: string;
    type: string;
    patient: string;
    admissionId: string;
    gender: string;
    status: string;
    facility: string;
  };
}) {
  return (
    <tr className="border-t border-[#edf2f0] transition hover:bg-[#fbfdfc]">

      {/* BED */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-[9px] text-[10px] font-bold ${
              bed.status === "Occupied"
                ? "bg-[#e8f6f3] text-[#0d9b91]"
                : bed.status === "Available"
                ? "bg-[#edf7f3] text-[#3f917d]"
                : bed.status === "Reserved"
                ? "bg-[#fff5e6] text-[#b47b2c]"
                : "bg-[#f1f3f2] text-[#7d8985]"
            }`}
          >
            ▦
          </div>

          <div>

            <p className="text-[11px] font-semibold text-[#273732]">
              {bed.bedNumber}
            </p>

            <p className="mt-1 text-[9px] text-[#929e99]">
              Bed ID: B-{bed.id.toString().padStart(4, "0")}
            </p>

          </div>

        </div>

      </td>


      {/* ROOM */}
      <td className="px-4 py-4">

        <p className="text-[10px] font-semibold text-[#53645f]">
          Room {bed.room}
        </p>

        <p className="mt-1 text-[9px] text-[#929e99]">
          {bed.floor}
        </p>

      </td>


      {/* WARD */}
      <td className="px-4 py-4">

        <span className="text-[10px] text-[#687771]">
          {bed.ward}
        </span>

      </td>


      {/* TYPE */}
      <td className="px-4 py-4">

        <span className="rounded-full bg-[#f1f5f3] px-2.5 py-1 text-[8px] font-semibold text-[#687771]">
          {bed.type}
        </span>

      </td>


      {/* PATIENT */}
      <td className="px-4 py-4">

        {bed.patient ? (
          <div>

            <p className="text-[10px] font-semibold text-[#53645f]">
              {bed.patient}
            </p>

            <p className="mt-1 text-[8px] text-[#929e99]">
              {bed.admissionId}
            </p>

          </div>
        ) : (
          <span className="text-[10px] text-[#a0aaa7]">
            No patient assigned
          </span>
        )}

      </td>


      {/* FACILITY */}
      <td className="px-4 py-4">

        <span className="text-[9px] text-[#687771]">
          {bed.facility}
        </span>

      </td>


      {/* STATUS */}
      <td className="px-4 py-4">

        <BedStatus status={bed.status} />

      </td>


      {/* ACTION */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-1">

          <button
            type="button"
            title="View Bed"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
          >
            ◉
          </button>

          <button
            type="button"
            title="Edit Bed"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
          >
            ✎
          </button>

          <button
            type="button"
            title="More"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[13px] text-[#687771] transition hover:bg-[#f1f5f3]"
          >
            ⋮
          </button>

        </div>

      </td>

    </tr>
  );
}


/* =========================================================
   BED STATUS
========================================================= */

function BedStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Occupied: "bg-[#e8f6f0] text-[#278460]",
    Available: "bg-[#e9f7f3] text-[#2e8b78]",
    Reserved: "bg-[#fff4e4] text-[#b47725]",
    Cleaning: "bg-[#f1f3f2] text-[#7c8783]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[8px] font-semibold ${
        styles[status] || "bg-[#f1f3f2] text-[#687771]"
      }`}
    >
      {status}
    </span>
  );
}