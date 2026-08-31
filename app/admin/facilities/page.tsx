"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Layers,
  Grid,
  DoorOpen,
  BedDouble,
  Plus,
  Search,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Edit3,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  Building,
  ShieldCheck,
  Activity,
  User,
  Zap,
  Check,
} from "lucide-react";

// Mock Data structure modeling the full hierarchy:
// Facility ➔ Floor ➔ Department ➔ Room ➔ Bed
interface BedItem {
  id: string;
  code: string;
  type: string; // "ICU Electric", "Standard Ward", "Pediatric", "Deluxe"
  status: "Available" | "Occupied" | "Maintenance" | "Cleaning";
  patient?: string;
}

interface RoomItem {
  id: string;
  number: string;
  name: string;
  type: string; // "ICU Bay", "Private Ward", "Operating Theater", "General Ward"
  beds: BedItem[];
}

interface DepartmentItem {
  id: string;
  name: string;
  code: string;
  head: string;
  rooms: RoomItem[];
}

interface FloorItem {
  id: string;
  number: number;
  name: string;
  code: string;
  departments: DepartmentItem[];
}

interface FacilityItem {
  id: string;
  name: string;
  code: string;
  address: string;
  floors: FloorItem[];
}

const mockFacilities: FacilityItem[] = [
  {
    id: "fac-1",
    name: "Central Hospital - Main Campus",
    code: "FAC-MAIN-01",
    address: "100 Healthcare Boulevard, Boston, MA",
    floors: [
      {
        id: "fl-1",
        number: 1,
        name: "First Floor - Emergency & Trauma",
        code: "FL-01",
        departments: [
          {
            id: "dept-1",
            name: "Emergency & Critical Care",
            code: "DEPT-ER",
            head: "Dr. Sarah Jenkins",
            rooms: [
              {
                id: "rm-101",
                number: "Room 101",
                name: "Trauma Bay A",
                type: "ICU Bay",
                beds: [
                  { id: "b-101-a", code: "BED-101-A", type: "ICU Electric", status: "Occupied", patient: "John Doe (#P-10492)" },
                  { id: "b-101-b", code: "BED-101-B", type: "ICU Electric", status: "Available" },
                ],
              },
              {
                id: "rm-102",
                number: "Room 102",
                name: "Critical Observation Room",
                type: "Private Ward",
                beds: [
                  { id: "b-102-a", code: "BED-102-A", type: "Standard Ward", status: "Occupied", patient: "Emily Watson (#P-10498)" },
                  { id: "b-102-b", code: "BED-102-B", type: "Standard Ward", status: "Maintenance" },
                ],
              },
            ],
          },
          {
            id: "dept-2",
            name: "Radiology & Imaging",
            code: "DEPT-RAD",
            head: "Dr. Robert Vance",
            rooms: [
              {
                id: "rm-105",
                number: "Room 105",
                name: "CT Scan Recovery Suite",
                type: "Recovery Room",
                beds: [
                  { id: "b-105-a", code: "BED-105-A", type: "Standard Ward", status: "Available" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "fl-2",
        number: 2,
        name: "Second Floor - Cardiology & Surgery",
        code: "FL-02",
        departments: [
          {
            id: "dept-3",
            name: "Cardiovascular Surgery Unit",
            code: "DEPT-CARD",
            head: "Dr. Alan Mercer",
            rooms: [
              {
                id: "rm-201",
                number: "Room 201",
                name: "Cardiac ICU Suite",
                type: "ICU Bay",
                beds: [
                  { id: "b-201-a", code: "BED-201-A", type: "ICU Electric", status: "Occupied", patient: "Michael Chang (#P-10511)" },
                  { id: "b-201-b", code: "BED-201-B", type: "ICU Electric", status: "Available" },
                  { id: "b-201-c", code: "BED-201-C", type: "ICU Electric", status: "Available" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "fac-2",
    name: "St. Jude Specialized Surgery Pavilion",
    code: "FAC-STJUDE-02",
    address: "240 Medical Parkway, Boston, MA",
    floors: [
      {
        id: "fl-201",
        number: 1,
        name: "Ground Floor - Outpatient & Rehabilitation",
        code: "FL-G",
        departments: [
          {
            id: "dept-201",
            name: "Orthopedic Rehabilitation",
            code: "DEPT-ORTHO",
            head: "Dr. Michael Ross",
            rooms: [
              {
                id: "rm-G01",
                number: "Room G-01",
                name: "Post-Op Recovery Ward",
                type: "General Ward",
                beds: [
                  { id: "b-G01-a", code: "BED-G01-A", type: "Standard Ward", status: "Available" },
                  { id: "b-G01-b", code: "BED-G01-B", type: "Standard Ward", status: "Occupied", patient: "Alice Cooper (#P-10520)" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function TenantFacilityUnitsPage() {
  const [facilities, setFacilities] = useState<FacilityItem[]>(mockFacilities);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>("fac-1");
  const [search, setSearch] = useState<string>("");

  // Expanded Tree Nodes
  const [expandedFloors, setExpandedFloors] = useState<Record<string, boolean>>({ "fl-1": true });
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({ "dept-1": true });
  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>({ "rm-101": true });

  // Modals (Active modal control)
  const [activeModal, setActiveModal] = useState<"facility" | "floor" | "department" | "room" | "bed" | null>(null);

  // Facility Form with Nested Hierarchy Builder (Floors -> Depts -> Rooms -> Beds)
  const [facilityForm, setFacilityForm] = useState({ name: "", code: "", address: "" });
  const [nestedFloors, setNestedFloors] = useState<FloorItem[]>([
    {
      id: "nfl-1",
      number: 1,
      name: "First Floor - General Ward & ER",
      code: "FL-01",
      departments: [
        {
          id: "ndept-1",
          name: "Emergency Unit",
          code: "DEPT-ER",
          head: "Dr. Chief Physician",
          rooms: [
            {
              id: "nrm-1",
              number: "Room 101",
              name: "Emergency Bay 1",
              type: "ICU Bay",
              beds: [
                { id: "nb-1", code: "BED-101-A", type: "ICU Electric", status: "Available" },
                { id: "nb-2", code: "BED-101-B", type: "ICU Electric", status: "Available" },
              ],
            },
          ],
        },
      ],
    },
  ]);

  // Individual Form States for speed dial
  const [floorForm, setFloorForm] = useState({ name: "", number: 1, code: "" });
  const [deptForm, setDeptForm] = useState({ name: "", code: "", head: "", floorId: "" });
  const [roomForm, setRoomForm] = useState({ number: "", name: "", type: "ICU Bay", deptId: "" });
  const [bedForm, setBedForm] = useState({ code: "", type: "ICU Electric", status: "Available" as const, roomId: "" });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleFloor = (id: string) => {
    setExpandedFloors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDept = (id: string) => {
    setExpandedDepts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRoom = (id: string) => {
    setExpandedRooms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const fls: Record<string, boolean> = {};
    const dps: Record<string, boolean> = {};
    const rms: Record<string, boolean> = {};
    activeFacility.floors.forEach((fl) => {
      fls[fl.id] = true;
      fl.departments.forEach((dp) => {
        dps[dp.id] = true;
        dp.rooms.forEach((rm) => {
          rms[rm.id] = true;
        });
      });
    });
    setExpandedFloors(fls);
    setExpandedDepts(dps);
    setExpandedRooms(rms);
  };

  const collapseAll = () => {
    setExpandedFloors({});
    setExpandedDepts({});
    setExpandedRooms({});
  };

  // Nested Builder Helpers for All-in-One Facility Creation Form
  const addNestedFloor = () => {
    const nextNum = nestedFloors.length + 1;
    const newFl: FloorItem = {
      id: `nfl-${Date.now()}`,
      number: nextNum,
      name: `Floor ${nextNum} - General Department`,
      code: `FL-0${nextNum}`,
      departments: [],
    };
    setNestedFloors([...nestedFloors, newFl]);
  };

  const addNestedDepartment = (floorId: string) => {
    const newDept: DepartmentItem = {
      id: `ndept-${Date.now()}`,
      name: "New Clinical Specialty Department",
      code: "DEPT-CLINICAL",
      head: "Dr. Lead Specialist",
      rooms: [],
    };
    setNestedFloors((prev) =>
      prev.map((fl) => (fl.id === floorId ? { ...fl, departments: [...fl.departments, newDept] } : fl))
    );
  };

  const addNestedRoom = (floorId: string, deptId: string) => {
    const newRoom: RoomItem = {
      id: `nrm-${Date.now()}`,
      number: `Room ${Math.floor(100 + Math.random() * 800)}`,
      name: "Standard Patient Room",
      type: "ICU Bay",
      beds: [],
    };
    setNestedFloors((prev) =>
      prev.map((fl) => {
        if (fl.id !== floorId) return fl;
        return {
          ...fl,
          departments: fl.departments.map((dp) =>
            dp.id === deptId ? { ...dp, rooms: [...dp.rooms, newRoom] } : dp
          ),
        };
      })
    );
  };

  const addNestedBed = (floorId: string, deptId: string, roomId: string) => {
    const newBed: BedItem = {
      id: `nb-${Date.now()}`,
      code: `BED-${Math.floor(100 + Math.random() * 900)}-${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
      type: "ICU Electric",
      status: "Available",
    };
    setNestedFloors((prev) =>
      prev.map((fl) => {
        if (fl.id !== floorId) return fl;
        return {
          ...fl,
          departments: fl.departments.map((dp) => {
            if (dp.id !== deptId) return dp;
            return {
              ...dp,
              rooms: dp.rooms.map((rm) =>
                rm.id === roomId ? { ...rm, beds: [...rm.beds, newBed] } : rm
              ),
            };
          }),
        };
      })
    );
  };

  // Submit All-in-One Facility Master Form
  const handleAddFacilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityForm.name.trim()) return;

    const newFacility: FacilityItem = {
      id: `fac-${Date.now()}`,
      name: facilityForm.name.trim(),
      code: facilityForm.code.trim() || `FAC-${Math.floor(10 + Math.random() * 90)}`,
      address: facilityForm.address.trim() || "Main Campus Location",
      floors: nestedFloors,
    };

    setFacilities((prev) => [newFacility, ...prev]);
    setSelectedFacilityId(newFacility.id);

    // Calculate totals built inside single form
    let nFloors = newFacility.floors.length;
    let nBeds = 0;
    newFacility.floors.forEach((fl) =>
      fl.departments.forEach((dp) => dp.rooms.forEach((rm) => (nBeds += rm.beds.length)))
    );

    showToast(`Facility '${newFacility.name}' built with ${nFloors} Floors and ${nBeds} Beds in 1-Click!`);
    setActiveModal(null);
    setFacilityForm({ name: "", code: "", address: "" });
  };

  // Standalone Speed-Dial Creation Handlers
  const handleAddFloorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!floorForm.name.trim()) return;
    const newFloor: FloorItem = {
      id: `fl-${Date.now()}`,
      number: floorForm.number,
      name: floorForm.name.trim(),
      code: floorForm.code.trim() || `FL-0${floorForm.number}`,
      departments: [],
    };
    setFacilities((prev) =>
      prev.map((f) => (f.id === selectedFacilityId ? { ...f, floors: [...f.floors, newFloor] } : f))
    );
    showToast(`Floor '${newFloor.name}' added successfully!`);
    setActiveModal(null);
    setFloorForm({ name: "", number: 1, code: "" });
  };

  const handleAddDeptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptForm.name.trim() || !deptForm.floorId) return;
    const newDept: DepartmentItem = {
      id: `dept-${Date.now()}`,
      name: deptForm.name.trim(),
      code: deptForm.code.trim() || "DEPT-NEW",
      head: deptForm.head.trim() || "Dr. Unassigned",
      rooms: [],
    };

    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== selectedFacilityId) return f;
        return {
          ...f,
          floors: f.floors.map((fl) =>
            fl.id === deptForm.floorId ? { ...fl, departments: [...fl.departments, newDept] } : fl
          ),
        };
      })
    );
    showToast(`Department '${newDept.name}' added!`);
    setActiveModal(null);
    setDeptForm({ name: "", code: "", head: "", floorId: "" });
  };

  const handleAddRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomForm.number.trim() || !roomForm.deptId) return;
    const newRoom: RoomItem = {
      id: `rm-${Date.now()}`,
      number: roomForm.number.trim(),
      name: roomForm.name.trim() || "Standard Care Room",
      type: roomForm.type,
      beds: [],
    };

    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== selectedFacilityId) return f;
        return {
          ...f,
          floors: f.floors.map((fl) => ({
            ...fl,
            departments: fl.departments.map((dp) =>
              dp.id === roomForm.deptId ? { ...dp, rooms: [...dp.rooms, newRoom] } : dp
            ),
          })),
        };
      })
    );
    showToast(`Room '${newRoom.number}' added!`);
    setActiveModal(null);
    setRoomForm({ number: "", name: "", type: "ICU Bay", deptId: "" });
  };

  const handleAddBedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedForm.code.trim() || !bedForm.roomId) return;
    const newBed: BedItem = {
      id: `b-${Date.now()}`,
      code: bedForm.code.trim(),
      type: bedForm.type,
      status: bedForm.status,
    };

    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== selectedFacilityId) return f;
        return {
          ...f,
          floors: f.floors.map((fl) => ({
            ...fl,
            departments: fl.departments.map((dp) => ({
              ...dp,
              rooms: dp.rooms.map((rm) =>
                rm.id === bedForm.roomId ? { ...rm, beds: [...rm.beds, newBed] } : rm
              ),
            })),
          })),
        };
      })
    );
    showToast(`Bed '${newBed.code}' added!`);
    setActiveModal(null);
    setBedForm({ code: "", type: "ICU Electric", status: "Available", roomId: "" });
  };

  // Metrics Calculation across active facility
  let totalFloorsCount = activeFacility.floors.length;
  let totalDeptsCount = 0;
  let totalRoomsCount = 0;
  let totalBedsCount = 0;
  let occupiedBedsCount = 0;
  let availableBedsCount = 0;

  activeFacility.floors.forEach((fl) => {
    totalDeptsCount += fl.departments.length;
    fl.departments.forEach((dp) => {
      totalRoomsCount += dp.rooms.length;
      dp.rooms.forEach((rm) => {
        totalBedsCount += rm.beds.length;
        rm.beds.forEach((b) => {
          if (b.status === "Occupied") occupiedBedsCount++;
          if (b.status === "Available") availableBedsCount++;
        });
      });
    });
  });

  const occupancyPercentage = totalBedsCount > 0 ? Math.round((occupiedBedsCount / totalBedsCount) * 100) : 0;

  return (
    <div className="w-full space-y-6 font-sans pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#7ee8d5]/60 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] p-6 shadow-xl text-white backdrop-blur-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#7ee8d5]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-300 animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-200">
                Hospital Infrastructure Studio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Building2 className="w-7 h-7 text-teal-300" />
              Facility Units & Master Hierarchy
            </h1>
            <p className="mt-1 text-xs font-medium text-teal-100/90 max-w-2xl">
              Manage your entire hospital infrastructure hierarchy—Facility ➔ Floors ➔ Departments ➔ Rooms ➔ Beds—in a single unified studio interface without switching master pages.
            </p>
          </div>

          {/* Active Facility Selector & All-in-One Master Builder Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start lg:self-auto">
            <button
              onClick={() => setActiveModal("facility")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-black text-[#0F766E] shadow-md hover:bg-teal-50 transition cursor-pointer active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#0F766E]" />
              <span>All-in-One Facility Builder</span>
            </button>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-2 backdrop-blur-md">
              <label className="block text-[9px] font-bold text-teal-200 uppercase mb-0.5 px-2">Active Facility</label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="bg-transparent font-bold text-xs text-white outline-none cursor-pointer px-2 w-full"
              >
                {facilities.map((f) => (
                  <option key={f.id} value={f.id} className="text-slate-900 font-bold">
                    {f.name} ({f.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard
          title="Total Floors"
          value={totalFloorsCount.toString()}
          subtitle={`${totalDeptsCount} Active Departments`}
          icon={<Layers className="w-5 h-5" />}
          badge="bg-teal-700 text-white"
          cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
        />
        <GlassCard
          title="Total Rooms"
          value={totalRoomsCount.toString()}
          subtitle={`${totalBedsCount} Total Beds Capacity`}
          icon={<DoorOpen className="w-5 h-5" />}
          badge="bg-sky-700 text-white"
          cardBg="bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-indigo-50/60 border-sky-300/60"
        />
        <GlassCard
          title="Bed Occupancy"
          value={`${occupancyPercentage}%`}
          subtitle={`${occupiedBedsCount} Occupied / ${availableBedsCount} Available`}
          icon={<BedDouble className="w-5 h-5" />}
          badge="bg-amber-600 text-white"
          cardBg="bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-orange-50/60 border-amber-300/60"
        />
        <GlassCard
          title="Operational Status"
          value="100% Online"
          subtitle="All Units Fully Functional"
          icon={<Activity className="w-5 h-5" />}
          badge="bg-emerald-700 text-white"
          cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
        />
      </div>

      {/* ALL-IN-ONE MASTER STUDIO TOOLBAR & Hierarchy Action Speed-Dial */}
      <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-5 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EDF2F0] pb-4">
          {/* Quick All-in-One Creation Buttons */}
          <div>
            <span className="text-[10px] font-bold uppercase text-[#0F766E] block mb-1">
              All-in-One Master Speed-Dial (Create Infrastructure)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveModal("facility")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700 transition cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>+ Build Facility All-in-One</span>
              </button>

              <button
                onClick={() => setActiveModal("floor")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] font-bold text-xs border border-teal-200 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Floor</span>
              </button>

              <button
                onClick={() => setActiveModal("department")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0284c7] font-bold text-xs border border-sky-200 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Department</span>
              </button>

              <button
                onClick={() => setActiveModal("room")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Room</span>
              </button>

              <button
                onClick={() => setActiveModal("bed")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Bed</span>
              </button>
            </div>
          </div>

          {/* Tree Controls & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91A09B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search floor, room, bed code..."
                className="h-9 w-full rounded-xl border border-[#DFE8E5] bg-white pl-9 pr-3 text-xs text-[#263833] placeholder-[#A3AEAA] outline-none focus:border-[#0F766E]"
              />
            </div>

            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-xl border border-[#DFE8E5] text-xs font-bold text-[#596964] hover:bg-teal-50 hover:text-[#0F766E] transition cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-xl border border-[#DFE8E5] text-xs font-bold text-[#596964] hover:bg-teal-50 hover:text-[#0F766E] transition cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* UNIFIED HIERARCHY TREE EXPLORER VIEW */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E] flex items-center gap-2">
              <Building className="w-4 h-4" />
              Hierarchy Tree: {activeFacility.name}
            </h3>
            <span className="text-[11px] font-mono font-bold text-slate-500">
              Facility ➔ Floors ({activeFacility.floors.length}) ➔ Departments ➔ Rooms ➔ Beds
            </span>
          </div>

          {activeFacility.floors.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
              <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-bold text-slate-700">No Floors Registered Yet in {activeFacility.name}</p>
              <p className="text-xs text-slate-500 mt-1">Click &quot;+ Add Floor&quot; to begin building your facility units hierarchy.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeFacility.floors.map((floor) => {
                const isFloorOpen = !!expandedFloors[floor.id];
                return (
                  <div
                    key={floor.id}
                    className="rounded-2xl border-2 border-teal-100 bg-white/90 shadow-xs overflow-hidden transition"
                  >
                    {/* FLOOR LEVEL HEADER */}
                    <div
                      onClick={() => toggleFloor(floor.id)}
                      className="p-3.5 bg-gradient-to-r from-teal-50/80 via-emerald-50/40 to-white flex items-center justify-between cursor-pointer hover:bg-teal-100/50 transition border-b border-teal-100"
                    >
                      <div className="flex items-center gap-3">
                        <button className="h-6 w-6 rounded-lg bg-teal-100 text-[#0F766E] flex items-center justify-center font-bold">
                          {isFloorOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F766E] text-white text-xs font-black">
                            {floor.number}
                          </span>
                          <div>
                            <h4 className="text-xs font-black text-[#172522] flex items-center gap-2">
                              <span>{floor.name}</span>
                              <span className="font-mono text-[10px] text-[#0F766E] bg-teal-100 px-2 py-0.5 rounded-md font-bold">
                                {floor.code}
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                          {floor.departments.length} Departments
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeptForm((prev) => ({ ...prev, floorId: floor.id }));
                            setActiveModal("department");
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-teal-200 text-[#0F766E] font-bold text-[11px] hover:bg-teal-50 transition"
                        >
                          + Add Dept
                        </button>
                      </div>
                    </div>

                    {/* FLOOR DEPARTMENTS CONTAINER */}
                    <AnimatePresence>
                      {isFloorOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 space-y-3 bg-[#FAFCFB]"
                        >
                          {floor.departments.length === 0 ? (
                            <p className="text-xs text-slate-400 italic pl-6">No departments on this floor. Click &quot;+ Add Dept&quot; above.</p>
                          ) : (
                            floor.departments.map((dept) => {
                              const isDeptOpen = !!expandedDepts[dept.id];
                              return (
                                <div
                                  key={dept.id}
                                  className="ml-4 rounded-xl border border-sky-200 bg-white shadow-xs overflow-hidden"
                                >
                                  {/* DEPARTMENT LEVEL HEADER */}
                                  <div
                                    onClick={() => toggleDept(dept.id)}
                                    className="p-3 bg-sky-50/60 flex items-center justify-between cursor-pointer hover:bg-sky-100/50 transition border-b border-sky-100"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <button className="h-5 w-5 rounded-md bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
                                        {isDeptOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                      </button>
                                      <Grid className="w-4 h-4 text-[#0284c7]" />
                                      <div>
                                        <h5 className="text-xs font-extrabold text-[#172522] flex items-center gap-2">
                                          <span>{dept.name}</span>
                                          <span className="font-mono text-[9px] text-[#0284c7] bg-sky-100 px-1.5 py-0.5 rounded font-bold">
                                            {dept.code}
                                          </span>
                                        </h5>
                                        <p className="text-[10px] text-slate-500 font-medium">Head: {dept.head}</p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs">
                                      <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-lg">
                                        {dept.rooms.length} Rooms
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setRoomForm((prev) => ({ ...prev, deptId: dept.id }));
                                          setActiveModal("room");
                                        }}
                                        className="px-2 py-1 rounded-lg bg-white border border-sky-200 text-[#0284c7] font-bold text-[10px] hover:bg-sky-50 transition"
                                      >
                                        + Add Room
                                      </button>
                                    </div>
                                  </div>

                                  {/* DEPARTMENT ROOMS CONTAINER */}
                                  <AnimatePresence>
                                    {isDeptOpen && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-3 space-y-2.5 bg-white"
                                      >
                                        {dept.rooms.length === 0 ? (
                                          <p className="text-[11px] text-slate-400 italic pl-6">No rooms in this department. Click &quot;+ Add Room&quot;.</p>
                                        ) : (
                                          dept.rooms.map((room) => {
                                            const isRoomOpen = !!expandedRooms[room.id];
                                            return (
                                              <div
                                                key={room.id}
                                                className="ml-4 rounded-xl border border-indigo-100 bg-[#F9FAFB] overflow-hidden"
                                              >
                                                {/* ROOM LEVEL HEADER */}
                                                <div
                                                  onClick={() => toggleRoom(room.id)}
                                                  className="p-2.5 bg-indigo-50/50 flex items-center justify-between cursor-pointer hover:bg-indigo-100/50 transition"
                                                >
                                                  <div className="flex items-center gap-2">
                                                    <button className="h-5 w-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                                                      {isRoomOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                                    </button>
                                                    <DoorOpen className="w-4 h-4 text-indigo-600" />
                                                    <span className="text-xs font-black text-slate-800">{room.number} - {room.name}</span>
                                                    <span className="text-[9px] font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                                                      {room.type}
                                                    </span>
                                                  </div>

                                                  <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-500">
                                                      {room.beds.length} Beds
                                                    </span>
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setBedForm((prev) => ({ ...prev, roomId: room.id }));
                                                        setActiveModal("bed");
                                                      }}
                                                      className="px-2 py-0.5 rounded bg-white border border-indigo-200 text-indigo-700 font-bold text-[10px] hover:bg-indigo-50 transition"
                                                    >
                                                      + Add Bed
                                                    </button>
                                                  </div>
                                                </div>

                                                {/* ROOM BEDS GRID LEVEL */}
                                                <AnimatePresence>
                                                  {isRoomOpen && (
                                                    <motion.div
                                                      initial={{ opacity: 0, height: 0 }}
                                                      animate={{ opacity: 1, height: "auto" }}
                                                      exit={{ opacity: 0, height: 0 }}
                                                      className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 bg-white border-t border-indigo-100"
                                                    >
                                                      {room.beds.length === 0 ? (
                                                        <p className="text-[10px] text-slate-400 italic col-span-3">No beds created in this room.</p>
                                                      ) : (
                                                        room.beds.map((bed) => (
                                                          <div
                                                            key={bed.id}
                                                            className={`p-2.5 rounded-xl border-2 transition ${
                                                              bed.status === "Available"
                                                                ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                                                                : bed.status === "Occupied"
                                                                ? "bg-rose-50/60 border-rose-200 text-rose-950"
                                                                : "bg-amber-50/60 border-amber-200 text-amber-950"
                                                            }`}
                                                          >
                                                            <div className="flex items-center justify-between">
                                                              <span className="font-mono font-black text-xs flex items-center gap-1.5">
                                                                <BedDouble className="w-3.5 h-3.5" />
                                                                {bed.code}
                                                              </span>
                                                              <span
                                                                className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                                                  bed.status === "Available"
                                                                    ? "bg-emerald-200 text-emerald-900"
                                                                    : bed.status === "Occupied"
                                                                    ? "bg-rose-200 text-rose-900"
                                                                    : "bg-amber-200 text-amber-900"
                                                                }`}
                                                              >
                                                                {bed.status}
                                                              </span>
                                                            </div>
                                                            <p className="text-[10px] text-slate-500 mt-1 font-medium">{bed.type}</p>
                                                            {bed.patient && (
                                                              <p className="text-[10px] font-bold text-rose-700 mt-0.5 truncate">
                                                                Patient: {bed.patient}
                                                              </p>
                                                            )}
                                                          </div>
                                                        ))
                                                      )}
                                                    </motion.div>
                                                  )}
                                                </AnimatePresence>
                                              </div>
                                            );
                                          })
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ALL-IN-ONE MASTER CREATION MODALS */}
      {/* 0. ALL-IN-ONE FACILITY MASTER BUILDER WIZARD MODAL */}
      <AnimatePresence>
        {activeModal === "facility" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/50 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-purple-400 bg-white p-6 shadow-2xl backdrop-blur-3xl space-y-5 my-auto font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#132a26]">
                      All-in-One Facility Hierarchy Master Builder
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Configure your Facility + Floors + Departments + Rooms + Beds together in a single form submit!
                    </p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddFacilitySubmit} className="space-y-6 text-xs">
                {/* SECTION 1: FACILITY MAIN DETAILS */}
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                  <span className="text-[10px] font-black uppercase text-purple-800 tracking-wider block">
                    Step 1: Primary Facility Information
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#263833] mb-1">Facility Name *</label>
                      <input type="text" value={facilityForm.name} onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })} placeholder="e.g. St. Jude Specialized Surgery Pavilion" required className="h-9 w-full rounded-xl border border-purple-200 bg-white px-3 font-bold text-[#132a26] outline-none focus:border-purple-600" />
                    </div>
                    <div>
                      <label className="block font-bold text-[#263833] mb-1">Facility Code</label>
                      <input type="text" value={facilityForm.code} onChange={(e) => setFacilityForm({ ...facilityForm, code: e.target.value })} placeholder="FAC-STJUDE-03" className="h-9 w-full rounded-xl border border-purple-200 bg-white px-3 font-mono font-bold text-purple-800 outline-none focus:border-purple-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Address / Location</label>
                    <input type="text" value={facilityForm.address} onChange={(e) => setFacilityForm({ ...facilityForm, address: e.target.value })} placeholder="240 Medical Parkway, Boston, MA" className="h-9 w-full rounded-xl border border-purple-200 bg-white px-3 font-medium outline-none focus:border-purple-600" />
                  </div>
                </div>

                {/* SECTION 2: NESTED INLINE HIERARCHY BUILDER (FLOORS -> DEPTS -> ROOMS -> BEDS) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0F766E] tracking-wider block">
                        Step 2: Embedded Hierarchy Construction (Floors, Depts, Rooms & Beds)
                      </span>
                      <p className="text-[11px] text-slate-500">Build your facility architecture inline right inside this single form.</p>
                    </div>

                    <button
                      type="button"
                      onClick={addNestedFloor}
                      className="px-3 py-1.5 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#0B625C] transition flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Floor to Form</span>
                    </button>
                  </div>

                  {nestedFloors.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl">
                      <p className="text-slate-500 font-bold">No floors added to form yet.</p>
                      <button type="button" onClick={addNestedFloor} className="mt-2 text-[#0F766E] font-bold underline">Click here to add your first floor</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {nestedFloors.map((fl, flIdx) => (
                        <div key={fl.id} className="p-3.5 rounded-2xl border-2 border-teal-200 bg-white space-y-3">
                          <div className="flex items-center justify-between bg-teal-50 p-2.5 rounded-xl">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="h-6 w-6 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs">{fl.number}</span>
                              <input
                                type="text"
                                value={fl.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setNestedFloors((prev) => prev.map((f) => (f.id === fl.id ? { ...f, name: val } : f)));
                                }}
                                className="h-8 rounded-lg border border-teal-300 px-2 font-black text-xs text-[#132a26] flex-1 outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => addNestedDepartment(fl.id)}
                              className="ml-3 px-2.5 py-1 rounded-lg bg-sky-100 text-[#0284c7] font-bold text-[11px] hover:bg-sky-200 transition"
                            >
                              + Add Dept
                            </button>
                          </div>

                          {/* Nested Depts */}
                          <div className="pl-4 space-y-3">
                            {fl.departments.map((dp) => (
                              <div key={dp.id} className="p-3 rounded-xl border border-sky-200 bg-sky-50/40 space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1">
                                    <Grid className="w-4 h-4 text-[#0284c7]" />
                                    <input
                                      type="text"
                                      value={dp.name}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setNestedFloors((prev) =>
                                          prev.map((f) => ({
                                            ...f,
                                            departments: f.departments.map((d) => (d.id === dp.id ? { ...d, name: val } : d)),
                                          }))
                                        );
                                      }}
                                      className="h-7 rounded-lg border border-sky-300 px-2 font-bold text-xs text-[#132a26] flex-1 outline-none"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => addNestedRoom(fl.id, dp.id)}
                                    className="ml-2 px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-[10px] hover:bg-indigo-200 transition"
                                  >
                                    + Add Room
                                  </button>
                                </div>

                                {/* Nested Rooms */}
                                <div className="pl-4 space-y-2">
                                  {dp.rooms.map((rm) => (
                                    <div key={rm.id} className="p-2.5 rounded-xl border border-indigo-200 bg-white space-y-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <DoorOpen className="w-3.5 h-3.5 text-indigo-600" />
                                          <input
                                            type="text"
                                            value={rm.number}
                                            onChange={(e) => {
                                              const val = e.target.value;
                                              setNestedFloors((prev) =>
                                                prev.map((f) => ({
                                                  ...f,
                                                  departments: f.departments.map((d) => ({
                                                    ...d,
                                                    rooms: d.rooms.map((r) => (r.id === rm.id ? { ...r, number: val } : r)),
                                                  })),
                                                }))
                                              );
                                            }}
                                            className="h-7 w-28 rounded-lg border border-indigo-300 px-2 font-black text-xs text-slate-800 outline-none"
                                          />
                                        </div>

                                        <button
                                          type="button"
                                          onClick={() => addNestedBed(fl.id, dp.id, rm.id)}
                                          className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px] hover:bg-emerald-200 transition"
                                        >
                                          + Add Bed Code
                                        </button>
                                      </div>

                                      {/* Nested Beds */}
                                      {rm.beds.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                          {rm.beds.map((b) => (
                                            <span key={b.id} className="inline-flex items-center gap-1 bg-emerald-100 border border-emerald-300 text-emerald-900 px-2 py-0.5 rounded-lg font-mono font-bold text-[10px]">
                                              <BedDouble className="w-3 h-3 text-emerald-700" />
                                              {b.code}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-[11px] font-bold text-slate-500">
                    Ready to build complete hierarchy in 1-click!
                  </span>

                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-lg transition flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Save & Register Complete Facility Infrastructure</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. ADD FLOOR MODAL */}
      <AnimatePresence>
        {activeModal === "floor" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-black text-[#132a26] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#0F766E]" /> Add Floor to Facility
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddFloorSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#263833] mb-1">Floor Name *</label>
                  <input type="text" value={floorForm.name} onChange={(e) => setFloorForm({ ...floorForm, name: e.target.value })} placeholder="e.g. Third Floor - Oncology & ICU" required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-[#0F766E]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Floor Number *</label>
                    <input type="number" value={floorForm.number} onChange={(e) => setFloorForm({ ...floorForm, number: parseInt(e.target.value) || 1 })} required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-[#0F766E]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Floor Code</label>
                    <input type="text" value={floorForm.code} onChange={(e) => setFloorForm({ ...floorForm, code: e.target.value })} placeholder="FL-03" className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-mono font-medium outline-none focus:border-[#0F766E]" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold hover:bg-[#0B625C] transition shadow-md">Create Floor</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. ADD DEPARTMENT MODAL */}
      <AnimatePresence>
        {activeModal === "department" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-black text-[#132a26] flex items-center gap-2">
                  <Grid className="w-5 h-5 text-[#0284c7]" /> Add Department
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddDeptSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#263833] mb-1">Target Floor *</label>
                  <select value={deptForm.floorId} onChange={(e) => setDeptForm({ ...deptForm, floorId: e.target.value })} required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-bold text-slate-800 outline-none focus:border-[#0284c7]">
                    <option value="">Select Floor...</option>
                    {activeFacility.floors.map((fl) => (
                      <option key={fl.id} value={fl.id}>{fl.name} ({fl.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#263833] mb-1">Department Name *</label>
                  <input type="text" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} placeholder="e.g. Neurology & Neuroscience" required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-[#0284c7]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Dept Code</label>
                    <input type="text" value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} placeholder="DEPT-NEURO" className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-mono font-medium outline-none focus:border-[#0284c7]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Head of Dept</label>
                    <input type="text" value={deptForm.head} onChange={(e) => setDeptForm({ ...deptForm, head: e.target.value })} placeholder="Dr. John Smith" className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-[#0284c7]" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#0284c7] text-white font-bold hover:bg-[#0369a1] transition shadow-md">Create Department</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. ADD ROOM MODAL */}
      <AnimatePresence>
        {activeModal === "room" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-black text-[#132a26] flex items-center gap-2">
                  <DoorOpen className="w-5 h-5 text-indigo-600" /> Add Room to Department
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddRoomSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#263833] mb-1">Target Department *</label>
                  <select value={roomForm.deptId} onChange={(e) => setRoomForm({ ...roomForm, deptId: e.target.value })} required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-bold text-slate-800 outline-none focus:border-indigo-600">
                    <option value="">Select Department...</option>
                    {activeFacility.floors.flatMap((fl) =>
                      fl.departments.map((dp) => (
                        <option key={dp.id} value={dp.id}>{fl.name} ➔ {dp.name}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Room Number *</label>
                    <input type="text" value={roomForm.number} onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })} placeholder="Room 302" required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Room Name</label>
                    <input type="text" value={roomForm.name} onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })} placeholder="Isolation Suite" className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-indigo-600" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#263833] mb-1">Room Type</label>
                  <select value={roomForm.type} onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })} className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-indigo-600">
                    <option value="ICU Bay">ICU Bay</option>
                    <option value="Private Ward">Private Ward</option>
                    <option value="General Ward">General Ward</option>
                    <option value="Operating Theater">Operating Theater</option>
                    <option value="Recovery Room">Recovery Room</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-md">Create Room</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ADD BED MODAL */}
      <AnimatePresence>
        {activeModal === "bed" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md rounded-3xl border-2 border-[#7ee8d5]/70 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-black text-[#132a26] flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-emerald-700" /> Add Bed to Room
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddBedSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#263833] mb-1">Target Room *</label>
                  <select value={bedForm.roomId} onChange={(e) => setBedForm({ ...bedForm, roomId: e.target.value })} required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-bold text-slate-800 outline-none focus:border-emerald-700">
                    <option value="">Select Room...</option>
                    {activeFacility.floors.flatMap((fl) =>
                      fl.departments.flatMap((dp) =>
                        dp.rooms.map((rm) => (
                          <option key={rm.id} value={rm.id}>{fl.name} ➔ {dp.name} ➔ {rm.number}</option>
                        ))
                      )
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Bed Code *</label>
                    <input type="text" value={bedForm.code} onChange={(e) => setBedForm({ ...bedForm, code: e.target.value })} placeholder="BED-302-A" required className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-mono font-medium outline-none focus:border-emerald-700" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#263833] mb-1">Bed Type</label>
                    <select value={bedForm.type} onChange={(e) => setBedForm({ ...bedForm, type: e.target.value })} className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-medium outline-none focus:border-emerald-700">
                      <option value="ICU Electric">ICU Electric</option>
                      <option value="Standard Ward">Standard Ward</option>
                      <option value="Pediatric Bed">Pediatric Bed</option>
                      <option value="Deluxe Bariatric">Deluxe Bariatric</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#263833] mb-1">Initial Status</label>
                  <select value={bedForm.status} onChange={(e) => setBedForm({ ...bedForm, status: e.target.value as any })} className="h-9 w-full rounded-xl border border-[#DFE8E5] px-3 font-bold outline-none focus:border-emerald-700">
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition shadow-md">Create Bed</button>
                </div>
              </form>
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
  icon: React.ReactNode;
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