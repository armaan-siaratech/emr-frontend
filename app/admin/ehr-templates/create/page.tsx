"use client";

import { useState } from "react";

type FieldType =
  | "Text"
  | "Textarea"
  | "Number"
  | "Date"
  | "Time"
  | "Dropdown"
  | "Radio"
  | "Checkbox"
  | "Yes / No"
  | "Vitals"
  | "Diagnosis"
  | "Medication"
  | "Lab Result";

type TemplateField = {
  id: number;
  name: string;
  type: FieldType;
  required: boolean;
  placeholder: string;
};

type TemplateSection = {
  id: number;
  title: string;
  description: string;
  fields: TemplateField[];
};

const fieldTypes: FieldType[] = [
  "Text",
  "Textarea",
  "Number",
  "Date",
  "Time",
  "Dropdown",
  "Radio",
  "Checkbox",
  "Yes / No",
  "Vitals",
  "Diagnosis",
  "Medication",
  "Lab Result",
];

const initialSections: TemplateSection[] = [
  {
    id: 1,
    title: "Chief Complaint",
    description: "Patient's primary reason for the visit",
    fields: [
      {
        id: 1,
        name: "Chief Complaint",
        type: "Textarea",
        required: true,
        placeholder: "Enter patient's chief complaint",
      },
    ],
  },
  {
    id: 2,
    title: "Vital Signs",
    description: "Patient vital signs recorded during the encounter",
    fields: [
      {
        id: 2,
        name: "Blood Pressure",
        type: "Vitals",
        required: false,
        placeholder: "",
      },
      {
        id: 3,
        name: "Heart Rate",
        type: "Vitals",
        required: false,
        placeholder: "",
      },
      {
        id: 4,
        name: "Temperature",
        type: "Vitals",
        required: false,
        placeholder: "",
      },
    ],
  },
  {
    id: 3,
    title: "Assessment",
    description: "Clinical assessment and diagnosis",
    fields: [
      {
        id: 5,
        name: "Diagnosis",
        type: "Diagnosis",
        required: true,
        placeholder: "",
      },
      {
        id: 6,
        name: "Clinical Notes",
        type: "Textarea",
        required: false,
        placeholder: "Enter clinical assessment notes",
      },
    ],
  },
];

export default function CreateEHRTemplatePage() {
  const [templateName, setTemplateName] = useState("");
  const [category, setCategory] = useState("Clinical");
  const [specialty, setSpecialty] = useState("General Medicine");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  const [sections, setSections] =
    useState<TemplateSection[]>(initialSections);

  const [openSection, setOpenSection] = useState<number | null>(1);

  const [showAddField, setShowAddField] =
    useState<number | null>(null);

  const [showFieldForm, setShowFieldForm] =
    useState<number | null>(null);

  const [newFieldName, setNewFieldName] = useState("");

  const [newFieldType, setNewFieldType] =
    useState<FieldType>("Text");

  const [newFieldRequired, setNewFieldRequired] =
    useState(false);

  const [showSectionForm, setShowSectionForm] =
    useState(false);

  const [newSectionTitle, setNewSectionTitle] =
    useState("");

  const [newSectionDescription, setNewSectionDescription] =
    useState("");


  const addSection = () => {
    if (!newSectionTitle.trim()) {
      return;
    }

    const newSection: TemplateSection = {
      id: Date.now(),
      title: newSectionTitle,
      description: newSectionDescription,
      fields: [],
    };

    setSections((current) => [
      ...current,
      newSection,
    ]);

    setOpenSection(newSection.id);

    setNewSectionTitle("");
    setNewSectionDescription("");
    setShowSectionForm(false);
  };


  const deleteSection = (sectionId: number) => {
    setSections((current) =>
      current.filter(
        (section) => section.id !== sectionId
      )
    );
  };


  const addField = (sectionId: number) => {
    if (!newFieldName.trim()) {
      return;
    }

    const newField: TemplateField = {
      id: Date.now(),
      name: newFieldName,
      type: newFieldType,
      required: newFieldRequired,
      placeholder: "",
    };

    setSections((current) =>
      current.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          fields: [
            ...section.fields,
            newField,
          ],
        };
      })
    );

    setNewFieldName("");
    setNewFieldType("Text");
    setNewFieldRequired(false);
    setShowFieldForm(null);
    setShowAddField(null);
  };


  const deleteField = (
    sectionId: number,
    fieldId: number
  ) => {
    setSections((current) =>
      current.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          fields: section.fields.filter(
            (field) => field.id !== fieldId
          ),
        };
      })
    );
  };


  const duplicateField = (
    sectionId: number,
    fieldId: number
  ) => {
    setSections((current) =>
      current.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        const field = section.fields.find(
          (item) => item.id === fieldId
        );

        if (!field) {
          return section;
        }

        const duplicate: TemplateField = {
          ...field,
          id: Date.now(),
          name: `${field.name} Copy`,
        };

        return {
          ...section,
          fields: [
            ...section.fields,
            duplicate,
          ],
        };
      })
    );
  };


  return (
    <div className="min-h-screen bg-[#f7faf9]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-[#dce8e5] bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2 text-[10px] text-[#899590]">

              <a
                href="/admin"
                className="hover:text-[#0d9b91]"
              >
                Admin
              </a>

              <span>›</span>

              <a
                href="/admin/ehr-templates"
                className="hover:text-[#0d9b91]"
              >
                EHR Templates
              </a>

              <span>›</span>

              <span className="text-[#0d9b91]">
                Create
              </span>

            </div>


            <h1 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#172522]">
              Create EHR Template
            </h1>

            <p className="mt-1 text-[12px] text-[#71807c]">
              Build a structured clinical documentation template
            </p>

          </div>


          <div className="flex items-center gap-2">

            <a
              href="/admin/ehr-templates"
              className="rounded-[8px] border border-[#dce8e5] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#687771] hover:bg-[#f5f9f7]"
            >
              Cancel
            </a>

            <button
              type="button"
              onClick={() => setStatus("Draft")}
              className="rounded-[8px] border border-[#b9dcd6] bg-[#f4fbf9] px-4 py-2.5 text-[10px] font-semibold text-[#0d9b91]"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => setStatus("Active")}
              className="rounded-[8px] bg-[#0d9b91] px-5 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(13,155,145,0.15)] hover:bg-[#078a81]"
            >
              Publish Template
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="grid grid-cols-[1fr_320px] gap-6 px-6 py-6">

        {/* ===================================================
            LEFT
        =================================================== */}

        <div>


          {/* =================================================
              TEMPLATE INFORMATION
          ================================================= */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

            <div className="mb-5">

              <h2 className="text-[13px] font-semibold text-[#172522]">
                Template Information
              </h2>

              <p className="mt-1 text-[9px] text-[#929e99]">
                Basic information about this EHR template
              </p>

            </div>


            <div className="grid grid-cols-2 gap-4">


              {/* Template Name */}

              <div className="col-span-2">

                <label className="mb-2 block text-[9px] font-semibold text-[#53645f]">
                  Template Name
                  <span className="ml-1 text-[#d65d5d]">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={templateName}
                  onChange={(event) =>
                    setTemplateName(event.target.value)
                  }
                  placeholder="e.g. General Consultation"
                  className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#53645f] outline-none placeholder:text-[#a8b1ae] focus:border-[#0d9b91]"
                />

              </div>


              {/* Category */}

              <div>

                <label className="mb-2 block text-[9px] font-semibold text-[#53645f]">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
                >

                  <option>Clinical</option>
                  <option>Behavioral Health</option>
                  <option>Administrative</option>

                </select>

              </div>


              {/* Specialty */}

              <div>

                <label className="mb-2 block text-[9px] font-semibold text-[#53645f]">
                  Specialty
                </label>

                <select
                  value={specialty}
                  onChange={(event) =>
                    setSpecialty(event.target.value)
                  }
                  className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 text-[10px] text-[#71807c] outline-none focus:border-[#0d9b91]"
                >

                  <option>General Medicine</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>Emergency Medicine</option>
                  <option>Psychiatry</option>

                </select>

              </div>


              {/* Description */}

              <div className="col-span-2">

                <label className="mb-2 block text-[9px] font-semibold text-[#53645f]">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={3}
                  placeholder="Describe when and how this template should be used..."
                  className="w-full resize-none rounded-[8px] border border-[#dce8e5] bg-[#fbfdfc] px-3 py-3 text-[10px] text-[#53645f] outline-none placeholder:text-[#a8b1ae] focus:border-[#0d9b91]"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              TEMPLATE BUILDER
          ================================================= */}

          <div className="mt-6">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="text-[14px] font-semibold text-[#172522]">
                  Template Sections
                </h2>

                <p className="mt-1 text-[9px] text-[#929e99]">
                  Organize your clinical documentation fields into sections
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowSectionForm(true)
                }
                className="rounded-[8px] bg-[#0d9b91] px-4 py-2.5 text-[9px] font-semibold text-white hover:bg-[#078a81]"
              >
                + Add Section
              </button>

            </div>


            {/* Add Section Form */}

            {showSectionForm && (

              <div className="mb-4 rounded-[12px] border border-[#b9dcd6] bg-[#f7fcfb] p-4">

                <div className="grid grid-cols-2 gap-3">

                  <div>

                    <label className="mb-2 block text-[9px] font-semibold text-[#53645f]">
                      Section Name
                    </label>

                    <input
                      type="text"
                      value={newSectionTitle}
                      onChange={(event) =>
                        setNewSectionTitle(
                          event.target.value
                        )
                      }
                      placeholder="e.g. Past Medical History"
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-white px-3 text-[10px] outline-none focus:border-[#0d9b91]"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-[9px] font-semibold text-[#53645f]">
                      Description
                    </label>

                    <input
                      type="text"
                      value={newSectionDescription}
                      onChange={(event) =>
                        setNewSectionDescription(
                          event.target.value
                        )
                      }
                      placeholder="Short description"
                      className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-white px-3 text-[10px] outline-none focus:border-[#0d9b91]"
                    />

                  </div>

                </div>


                <div className="mt-3 flex justify-end gap-2">

                  <button
                    type="button"
                    onClick={() => {
                      setShowSectionForm(false);
                      setNewSectionTitle("");
                      setNewSectionDescription("");
                    }}
                    className="rounded-[7px] border border-[#dce8e5] px-4 py-2 text-[9px] font-semibold text-[#687771]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={addSection}
                    className="rounded-[7px] bg-[#0d9b91] px-4 py-2 text-[9px] font-semibold text-white"
                  >
                    Add Section
                  </button>

                </div>

              </div>

            )}


            {/* Sections */}

            <div className="space-y-4">

              {sections.map((section, sectionIndex) => (

                <div
                  key={section.id}
                  className="overflow-hidden rounded-[14px] border border-[#dce8e5] bg-white"
                >

                  {/* Section Header */}

                  <div className="flex items-center justify-between border-b border-[#e7eeec] bg-[#fbfdfc] px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#e8f6f3] text-[10px] font-bold text-[#0d9b91]">
                        {sectionIndex + 1}
                      </div>


                      <div>

                        <h3 className="text-[11px] font-semibold text-[#53645f]">
                          {section.title}
                        </h3>

                        <p className="mt-1 text-[8px] text-[#929e99]">
                          {section.description ||
                            "No section description"}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-1">

                      <button
                        type="button"
                        title="Move Up"
                        className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[10px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        title="Move Down"
                        className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[10px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        title="Delete Section"
                        onClick={() =>
                          deleteSection(section.id)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#b65e5e] hover:bg-[#fdecec]"
                      >
                        ×
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenSection(
                            openSection === section.id
                              ? null
                              : section.id
                          )
                        }
                        className="ml-2 flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#687771] hover:bg-[#f1f5f3]"
                      >
                        {openSection === section.id
                          ? "⌃"
                          : "⌄"}
                      </button>

                    </div>

                  </div>


                  {/* Section Body */}

                  {openSection === section.id && (

                    <div className="p-5">

                      {/* Fields */}

                      <div className="space-y-3">

                        {section.fields.map(
                          (field, fieldIndex) => (

                            <div
                              key={field.id}
                              className="group flex items-center gap-3 rounded-[10px] border border-[#e1ebe8] bg-white p-3 transition hover:border-[#b9dcd6]"
                            >

                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#f1f6f4] text-[9px] font-semibold text-[#71807c]">
                                {fieldIndex + 1}
                              </div>


                              <div className="min-w-0 flex-1">

                                <div className="flex items-center gap-2">

                                  <p className="text-[10px] font-semibold text-[#53645f]">
                                    {field.name}
                                  </p>

                                  {field.required && (

                                    <span className="text-[9px] font-bold text-[#d65d5d]">
                                      *
                                    </span>

                                  )}

                                </div>


                                <div className="mt-1 flex items-center gap-2">

                                  <span className="rounded-full bg-[#edf5f3] px-2 py-0.5 text-[7px] font-semibold text-[#536f68]">
                                    {field.type}
                                  </span>

                                  {field.required && (

                                    <span className="text-[7px] text-[#929e99]">
                                      Required
                                    </span>

                                  )}

                                </div>

                              </div>


                              <div className="flex items-center gap-1 opacity-70 transition group-hover:opacity-100">

                                <button
                                  type="button"
                                  title="Move Up"
                                  className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[10px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                                >
                                  ↑
                                </button>

                                <button
                                  type="button"
                                  title="Move Down"
                                  className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[10px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                                >
                                  ↓
                                </button>

                                <button
                                  type="button"
                                  title="Duplicate"
                                  onClick={() =>
                                    duplicateField(
                                      section.id,
                                      field.id
                                    )
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[10px] text-[#687771] hover:bg-[#e8f6f3] hover:text-[#0d9b91]"
                                >
                                  ⧉
                                </button>

                                <button
                                  type="button"
                                  title="Delete"
                                  onClick={() =>
                                    deleteField(
                                      section.id,
                                      field.id
                                    )
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] text-[#b65e5e] hover:bg-[#fdecec]"
                                >
                                  ×
                                </button>

                              </div>

                            </div>

                          )
                        )}


                        {/* Empty */}

                        {section.fields.length === 0 && (

                          <div className="rounded-[10px] border border-dashed border-[#cfded9] bg-[#fbfdfc] px-5 py-8 text-center">

                            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f6f3] text-[13px] text-[#0d9b91]">
                              +
                            </div>

                            <p className="mt-3 text-[9px] font-semibold text-[#687771]">
                              No fields added
                            </p>

                            <p className="mt-1 text-[8px] text-[#9aa6a2]">
                              Add fields to this section
                            </p>

                          </div>

                        )}

                      </div>


                      {/* Add Field */}

                      <div className="mt-4">

                        {showAddField === section.id ? (

                          <div className="rounded-[10px] border border-[#b9dcd6] bg-[#f7fcfb] p-4">

                            <div className="flex items-center justify-between">

                              <div>

                                <p className="text-[10px] font-semibold text-[#53645f]">
                                  Add Field
                                </p>

                                <p className="mt-1 text-[8px] text-[#929e99]">
                                  Select a field type and configure it
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setShowAddField(null)
                                }
                                className="text-[13px] text-[#929e99]"
                              >
                                ×
                              </button>

                            </div>


                            <div className="mt-4 grid grid-cols-[1fr_180px] gap-3">

                              <div>

                                <label className="mb-2 block text-[8px] font-semibold text-[#53645f]">
                                  Field Name
                                </label>

                                <input
                                  type="text"
                                  value={newFieldName}
                                  onChange={(event) =>
                                    setNewFieldName(
                                      event.target.value
                                    )
                                  }
                                  placeholder="e.g. Past Medical History"
                                  className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-white px-3 text-[10px] outline-none focus:border-[#0d9b91]"
                                />

                              </div>


                              <div>

                                <label className="mb-2 block text-[8px] font-semibold text-[#53645f]">
                                  Field Type
                                </label>

                                <select
                                  value={newFieldType}
                                  onChange={(event) =>
                                    setNewFieldType(
                                      event.target.value as FieldType
                                    )
                                  }
                                  className="h-10 w-full rounded-[8px] border border-[#dce8e5] bg-white px-3 text-[10px] outline-none focus:border-[#0d9b91]"
                                >

                                  {fieldTypes.map(
                                    (type) => (
                                      <option
                                        key={type}
                                        value={type}
                                      >
                                        {type}
                                      </option>
                                    )
                                  )}

                                </select>

                              </div>

                            </div>


                            <div className="mt-3 flex items-center justify-between">

                              <label className="flex cursor-pointer items-center gap-2">

                                <input
                                  type="checkbox"
                                  checked={newFieldRequired}
                                  onChange={(event) =>
                                    setNewFieldRequired(
                                      event.target.checked
                                    )
                                  }
                                  className="h-3.5 w-3.5 accent-[#0d9b91]"
                                />

                                <span className="text-[9px] font-medium text-[#687771]">
                                  Required field
                                </span>

                              </label>


                              <div className="flex gap-2">

                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddField(null);
                                    setNewFieldName("");
                                    setNewFieldRequired(false);
                                  }}
                                  className="rounded-[7px] border border-[#dce8e5] px-4 py-2 text-[8px] font-semibold text-[#687771]"
                                >
                                  Cancel
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    addField(section.id)
                                  }
                                  className="rounded-[7px] bg-[#0d9b91] px-4 py-2 text-[8px] font-semibold text-white"
                                >
                                  Add Field
                                </button>

                              </div>

                            </div>

                          </div>

                        ) : (

                          <button
                            type="button"
                            onClick={() => {
                              setShowAddField(section.id);
                              setShowFieldForm(section.id);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#c9dcd7] bg-[#fbfdfc] py-3 text-[9px] font-semibold text-[#0d9b91] transition hover:border-[#0d9b91] hover:bg-[#f4fbf9]"
                          >
                            <span className="text-[13px]">
                              +
                            </span>

                            Add Field
                          </button>

                        )}

                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>


            {/* Bottom Add Section */}

            {sections.length > 0 && (

              <button
                type="button"
                onClick={() =>
                  setShowSectionForm(true)
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-[#c9dcd7] bg-white py-4 text-[9px] font-semibold text-[#0d9b91] hover:border-[#0d9b91] hover:bg-[#f8fcfb]"
              >
                <span className="text-[13px]">
                  +
                </span>

                Add Another Section
              </button>

            )}

          </div>

        </div>


        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}

        <div className="space-y-5">


          {/* Template Status */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

            <h3 className="text-[12px] font-semibold text-[#172522]">
              Template Status
            </h3>


            <div className="mt-4 flex items-center justify-between rounded-[9px] bg-[#f7faf9] p-3">

              <div className="flex items-center gap-2">

                <span
                  className={`h-2 w-2 rounded-full ${
                    status === "Active"
                      ? "bg-[#38a477]"
                      : "bg-[#e0a33b]"
                  }`}
                />

                <span className="text-[9px] font-semibold text-[#53645f]">
                  {status}
                </span>

              </div>

              <span className="text-[8px] text-[#929e99]">
                {status === "Active"
                  ? "Published"
                  : "Not published"}
              </span>

            </div>

          </div>


          {/* Template Summary */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

            <h3 className="text-[12px] font-semibold text-[#172522]">
              Template Summary
            </h3>


            <div className="mt-4 space-y-3">

              <SummaryRow
                label="Sections"
                value={sections.length.toString()}
              />

              <SummaryRow
                label="Total Fields"
                value={sections
                  .reduce(
                    (total, section) =>
                      total + section.fields.length,
                    0
                  )
                  .toString()}
              />

              <SummaryRow
                label="Required Fields"
                value={sections
                  .reduce(
                    (total, section) =>
                      total +
                      section.fields.filter(
                        (field) =>
                          field.required
                      ).length,
                    0
                  )
                  .toString()}
              />

              <SummaryRow
                label="Category"
                value={category}
              />

              <SummaryRow
                label="Specialty"
                value={specialty}
              />

            </div>

          </div>


          {/* Field Types */}

          <div className="rounded-[14px] border border-[#dce8e5] bg-white p-5">

            <h3 className="text-[12px] font-semibold text-[#172522]">
              Available Field Types
            </h3>

            <p className="mt-1 text-[8px] text-[#929e99]">
              Fields you can use in your template
            </p>


            <div className="mt-4 flex flex-wrap gap-2">

              {fieldTypes.map((type) => (

                <span
                  key={type}
                  className="rounded-full border border-[#dce8e5] bg-[#fbfdfc] px-2.5 py-1.5 text-[7px] font-medium text-[#687771]"
                >
                  {type}
                </span>

              ))}

            </div>

          </div>


          {/* Help */}

          <div className="rounded-[14px] border border-[#b9dcd6] bg-[#f4fbf9] p-5">

            <div className="flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#dff3ef] text-[12px] font-bold text-[#0d9b91]">
                i
              </div>

              <div>

                <h3 className="text-[10px] font-semibold text-[#53645f]">
                  Template Builder
                </h3>

                <p className="mt-2 text-[8px] leading-4 text-[#71807c]">
                  Create sections first, then add the
                  clinical fields that doctors will
                  complete during patient encounters.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#edf2f0] pb-3 last:border-0 last:pb-0">

      <span className="text-[9px] text-[#929e99]">
        {label}
      </span>

      <span className="max-w-[150px] truncate text-right text-[9px] font-semibold text-[#53645f]">
        {value}
      </span>

    </div>
  );
}