"use client";

import { useState } from "react";

const medicines = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    form: "Capsule",
    strength: "500 mg",
    stock: 248,
    reorderLevel: 50,
    supplier: "MedCare Pharmaceuticals",
    expiry: "Nov 2027",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Metformin 500mg",
    genericName: "Metformin HCl",
    category: "Diabetes",
    form: "Tablet",
    strength: "500 mg",
    stock: 420,
    reorderLevel: 100,
    supplier: "HealthPlus Pharma",
    expiry: "Aug 2027",
    status: "In Stock",
  },
  {
    id: 3,
    name: "Atorvastatin 20mg",
    genericName: "Atorvastatin",
    category: "Cardiovascular",
    form: "Tablet",
    strength: "20 mg",
    stock: 185,
    reorderLevel: 60,
    supplier: "MedCare Pharmaceuticals",
    expiry: "Jan 2028",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    category: "Pain Relief",
    form: "Tablet",
    strength: "500 mg",
    stock: 42,
    reorderLevel: 100,
    supplier: "Global Medical Supplies",
    expiry: "Mar 2027",
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    category: "Diabetes",
    form: "Injection",
    strength: "100 Units/ml",
    stock: 18,
    reorderLevel: 25,
    supplier: "HealthPlus Pharma",
    expiry: "Dec 2026",
    status: "Low Stock",
  },
  {
    id: 6,
    name: "Ceftriaxone 1g",
    genericName: "Ceftriaxone",
    category: "Antibiotic",
    form: "Injection",
    strength: "1 g",
    stock: 76,
    reorderLevel: 30,
    supplier: "MedCare Pharmaceuticals",
    expiry: "Oct 2027",
    status: "In Stock",
  },
  {
    id: 7,
    name: "Amlodipine 5mg",
    genericName: "Amlodipine",
    category: "Cardiovascular",
    form: "Tablet",
    strength: "5 mg",
    stock: 12,
    reorderLevel: 40,
    supplier: "Global Medical Supplies",
    expiry: "Jun 2027",
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Omeprazole 20mg",
    genericName: "Omeprazole",
    category: "Gastrointestinal",
    form: "Capsule",
    strength: "20 mg",
    stock: 310,
    reorderLevel: 80,
    supplier: "HealthPlus Pharma",
    expiry: "Feb 2028",
    status: "In Stock",
  },
  {
    id: 9,
    name: "Azithromycin 500mg",
    genericName: "Azithromycin",
    category: "Antibiotic",
    form: "Tablet",
    strength: "500 mg",
    stock: 0,
    reorderLevel: 40,
    supplier: "MedCare Pharmaceuticals",
    expiry: "Sep 2027",
    status: "Out of Stock",
  },
  {
    id: 10,
    name: "Lisinopril 10mg",
    genericName: "Lisinopril",
    category: "Cardiovascular",
    form: "Tablet",
    strength: "10 mg",
    stock: 96,
    reorderLevel: 30,
    supplier: "Global Medical Supplies",
    expiry: "May 2028",
    status: "In Stock",
  },
];

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [formFilter, setFormFilter] = useState("All Forms");

  const filteredMedicines = medicines.filter((medicine) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      medicine.name.toLowerCase().includes(searchValue) ||
      medicine.genericName.toLowerCase().includes(searchValue) ||
      medicine.category.toLowerCase().includes(searchValue) ||
      medicine.supplier.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All Status" ||
      medicine.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All Categories" ||
      medicine.category === categoryFilter;

    const matchesForm =
      formFilter === "All Forms" ||
      medicine.form === formFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesForm
    );
  });

  const totalMedicines = medicines.length;

  const totalUnits = medicines.reduce(
    (total, medicine) => total + medicine.stock,
    0
  );

  const lowStock = medicines.filter(
    (medicine) => medicine.status === "Low Stock"
  ).length;

  const outOfStock = medicines.filter(
    (medicine) => medicine.status === "Out of Stock"
  ).length;

  const inStock = medicines.filter(
    (medicine) => medicine.status === "In Stock"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* HEADER */}
      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Pharmacy
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Manage medicines, inventory and pharmacy stock
            </p>

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#53645f] transition hover:bg-[#f5f9f7]"
            >
              Stock Adjustment
            </button>

            <button
              type="button"
              className="rounded-[8px] bg-[#0d9b91] px-4 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.16)] transition hover:bg-[#078a81]"
            >
              + Add Medicine
            </button>

          </div>

        </div>

      </div>


      {/* CONTENT */}
      <div className="px-6 py-6">

        {/* STAT CARDS */}
        <div className="grid grid-cols-5 gap-4">

          <StatCard
            title="Medicines"
            value={totalMedicines.toString()}
            subtitle="Total medicine items"
            icon="▦"
          />

          <StatCard
            title="Total Units"
            value={totalUnits.toLocaleString()}
            subtitle="Available inventory"
            icon="◈"
          />

          <StatCard
            title="In Stock"
            value={inStock.toString()}
            subtitle="Healthy inventory"
            icon="✓"
          />

          <StatCard
            title="Low Stock"
            value={lowStock.toString()}
            subtitle="Needs replenishment"
            icon="!"
          />

          <StatCard
            title="Out of Stock"
            value={outOfStock.toString()}
            subtitle="Currently unavailable"
            icon="×"
          />

        </div>


        {/* INVENTORY ALERT */}
        <div className="mt-6 rounded-[14px] border border-[#f0dfc5] bg-[#fffaf2] p-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#fff0d8] text-[15px] font-bold text-[#b47725]">
                !
              </div>

              <div>

                <p className="text-[11px] font-semibold text-[#765523]">
                  Inventory Attention Required
                </p>

                <p className="mt-1 text-[9px] text-[#9a7c51]">
                  {lowStock} medicines are below their reorder level and{" "}
                  {outOfStock} medicine is currently out of stock.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="rounded-[7px] border border-[#ead5b4] bg-white px-3 py-2 text-[9px] font-semibold text-[#9a6b2c] transition hover:bg-[#fff6e9]"
            >
              View Low Stock
            </button>

          </div>

        </div>


        {/* MEDICINE TABLE */}
        <div className="mt-6 overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white">

          {/* TOOLBAR */}
          <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-4">

            <div>

              <h2 className="text-[14px] font-semibold text-[#172522]">
                Medicine Inventory
              </h2>

              <p className="mt-1 text-[10px] text-[#8a9692]">
                View and manage all medicines in your pharmacy
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
                  placeholder="Search medicines..."
                  className="h-9 w-[205px] rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] pl-8 pr-3 text-[10px] outline-none transition focus:border-[#0d9b91] focus:bg-white"
                />

              </div>


              {/* STATUS */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>


              {/* CATEGORY */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Categories</option>
                <option>Antibiotic</option>
                <option>Diabetes</option>
                <option>Cardiovascular</option>
                <option>Pain Relief</option>
                <option>Gastrointestinal</option>
              </select>


              {/* FORM */}
              <select
                value={formFilter}
                onChange={(e) => setFormFilter(e.target.value)}
                className="h-9 rounded-[8px] border border-[#dce8e5] bg-[#f8fbfa] px-3 text-[10px] text-[#53645f] outline-none focus:border-[#0d9b91]"
              >
                <option>All Forms</option>
                <option>Tablet</option>
                <option>Capsule</option>
                <option>Injection</option>
                <option>Syrup</option>
              </select>

            </div>

          </div>


          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-[#f7faf9]">

                  <TableHead text="MEDICINE" />
                  <TableHead text="CATEGORY" />
                  <TableHead text="FORM" />
                  <TableHead text="STOCK" />
                  <TableHead text="REORDER LEVEL" />
                  <TableHead text="SUPPLIER" />
                  <TableHead text="EXPIRY" />
                  <TableHead text="STATUS" />
                  <TableHead text="ACTION" />

                </tr>

              </thead>


              <tbody>

                {filteredMedicines.map((medicine) => (
                  <MedicineRow
                    key={medicine.id}
                    medicine={medicine}
                  />
                ))}

              </tbody>

            </table>


            {/* EMPTY STATE */}
            {filteredMedicines.length === 0 && (
              <div className="flex min-h-[280px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#eaf7f4] text-[20px] text-[#0d9b91]">
                    ⌕
                  </div>

                  <h3 className="mt-3 text-[13px] font-semibold text-[#53645f]">
                    No medicines found
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
                {filteredMedicines.length}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-[#53645f]">
                {totalMedicines}
              </span>

              {" "}medicines

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
                3
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

        <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[16px] font-bold text-[#0d9b91]">
          {icon}
        </div>

      </div>

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
   MEDICINE ROW
========================================================= */

function MedicineRow({
  medicine,
}: {
  medicine: {
    id: number;
    name: string;
    genericName: string;
    category: string;
    form: string;
    strength: string;
    stock: number;
    reorderLevel: number;
    supplier: string;
    expiry: string;
    status: string;
  };
}) {
  return (
    <tr className="border-t border-[#edf2f0] transition hover:bg-[#fbfdfc]">

      {/* MEDICINE */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#e8f6f3] text-[14px] text-[#0d9b91]">
            +
          </div>

          <div>

            <p className="text-[11px] font-semibold text-[#273732]">
              {medicine.name}
            </p>

            <p className="mt-1 text-[9px] text-[#929e99]">
              {medicine.genericName}
            </p>

          </div>

        </div>

      </td>


      {/* CATEGORY */}
      <td className="px-4 py-4">

        <span className="rounded-full bg-[#edf5f3] px-2.5 py-1 text-[8px] font-semibold text-[#536f68]">
          {medicine.category}
        </span>

      </td>


      {/* FORM */}
      <td className="px-4 py-4">

        <p className="text-[10px] font-semibold text-[#53645f]">
          {medicine.form}
        </p>

        <p className="mt-1 text-[8px] text-[#929e99]">
          {medicine.strength}
        </p>

      </td>


      {/* STOCK */}
      <td className="px-4 py-4">

        <div className="min-w-[75px]">

          <div className="flex items-center justify-between">

            <span className="text-[11px] font-semibold text-[#53645f]">
              {medicine.stock}
            </span>

            <span className="text-[8px] text-[#929e99]">
              units
            </span>

          </div>

          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#edf2f0]">

            <div
              className={`h-full rounded-full ${
                medicine.status === "Out of Stock"
                  ? "bg-[#c96d6d]"
                  : medicine.status === "Low Stock"
                  ? "bg-[#d6a75d]"
                  : "bg-[#4ca88f]"
              }`}
              style={{
                width: `${Math.min(
                  (medicine.stock /
                    Math.max(medicine.reorderLevel * 4, 1)) *
                    100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </td>


      {/* REORDER */}
      <td className="px-4 py-4">

        <span className="text-[10px] text-[#687771]">
          {medicine.reorderLevel}
        </span>

      </td>


      {/* SUPPLIER */}
      <td className="px-4 py-4">

        <span className="text-[9px] text-[#687771]">
          {medicine.supplier}
        </span>

      </td>


      {/* EXPIRY */}
      <td className="px-4 py-4">

        <span
          className={`text-[9px] ${
            medicine.status === "Out of Stock"
              ? "text-[#929e99]"
              : "text-[#687771]"
          }`}
        >
          {medicine.expiry}
        </span>

      </td>


      {/* STATUS */}
      <td className="px-4 py-4">

        <MedicineStatus status={medicine.status} />

      </td>


      {/* ACTION */}
      <td className="px-4 py-4">

        <div className="flex items-center gap-1">

          <button
            type="button"
            title="View Medicine"
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] text-[#687771] transition hover:bg-[#eaf7f4] hover:text-[#0d9b91]"
          >
            ◉
          </button>

          <button
            type="button"
            title="Edit Medicine"
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
   MEDICINE STATUS
========================================================= */

function MedicineStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In Stock": "bg-[#e8f6f0] text-[#278460]",
    "Low Stock": "bg-[#fff4e4] text-[#b47725]",
    "Out of Stock": "bg-[#fbeaea] text-[#b75d5d]",
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