"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Building,
  Layers,
  Grid,
  DoorOpen,
  BedDouble,
  Plus,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Edit2,
  Edit3,
  Trash2,
  ShieldCheck,
  Activity,
  User,
  Zap,
  Check,
  Phone,
  Mail,
  Wifi,
  Server,
  Monitor,
  Cpu,
  FileText,
  Award,
  BookOpen,
  Share2,
  Key,
  Stethoscope,
  Radio,
  FileSpreadsheet,
  Globe,
  Sliders,
  Database,
  Hash,
  Briefcase,
  Copy,
  Clock,
  Filter,
  CheckSquare,
  ArrowRight,
  Shield,
  Eye,
  Settings,
  ArrowLeft,
  LayoutGrid,
  List,
  ListFilter,
  RefreshCw,
  AlertCircle,
  Loader2,
  Pencil
} from "lucide-react";
import { getFacilitiesApi, createFacilityApi, updateFacilityApi, deleteFacilityApi, restoreFacilityApi, getFacilityTypesApi, FacilityRecordItem, FacilityTypeItem } from "@/lib/api/facilityApi";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import {
  getFacilityHierarchyApi,
  createBlockApi,
  updateBlockApi,
  deleteBlockApi,
  restoreBlockApi,
  createFloorApi,
  updateFloorApi,
  deleteFloorApi,
  restoreFloorApi,
  createDeptApi,
  updateDeptApi,
  deleteDeptApi,
  restoreDeptApi,
  createRoomApi,
  updateRoomApi,
  deleteRoomApi,
  restoreRoomApi,
  createBedApi,
  updateBedApi,
  deleteBedApi,
  restoreBedApi,
} from "@/lib/api/hierarchyApi";

// ==========================================
// DATA TYPES & INTERFACES FOR ALL 8 SECTIONS
// ==========================================

export interface BedItem {
  id: string;
  code: string;
  type: string;
  status: "Available" | "Occupied" | "Maintenance" | "Cleaning";
  patientInfo?: string;
  isDeleted?: boolean;
}

export interface RoomItem {
  id: string;
  number: string;
  name: string;
  type: string;
  isDeleted?: boolean;
  beds: BedItem[];
}

export interface DepartmentItem {
  id: string;
  name: string;
  code: string;
  head: string;
  isDeleted?: boolean;
  rooms: RoomItem[];
}

export interface FloorItem {
  id: string;
  number: number;
  name: string;
  code: string;
  isDeleted?: boolean;
  departments: DepartmentItem[];
}

export interface CampusBlockItem {
  id: string;
  name: string;
  code: string;
  isDeleted?: boolean;
  floors: FloorItem[];
}

export interface KeyContact {
  id: string;
  role: "Director of Nursing" | "Administrator" | "Medical Director" | "Safety Officer" | "Operations Lead" | "Custom";
  customRoleName?: string;
  name: string;
  email: string;
  phone: string;
  officeLocation: string;
  licenseNumber?: string;
}

export interface PartnerItem {
  id: string;
  category: "Pharmacy" | "Laboratory" | "Imaging Center";
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  type: "In-House" | "External Partner" | "Contracted";
  status: "Active" | "Pending Contract" | "Inactive";
  licenseOrNpi?: string;
}

export interface NetworkConfig {
  subnet: string;
  gateway: string;
  vlanId: string;
  dnsPrimary: string;
  dnsSecondary: string;
  firewallProfile: string;
}

export interface WifiNetwork {
  id: string;
  ssid: string;
  securityType: "WPA3 Enterprise" | "WPA2 Enterprise" | "WPA2 Personal";
  vlanMapping: string;
  bandwidthLimitMbps: number;
  isGuestNetwork: boolean;
}

export interface WorkstationItem {
  id: string;
  stationId: string;
  locationRoom: string;
  ipAddress: string;
  osVersion: string;
  status: "Online" | "Offline" | "Maintenance";
}

export interface DeviceInventoryItem {
  id: string;
  deviceName: string;
  deviceType: "Medical Cart" | "Telemetry Monitor" | "Diagnostic Tablet" | "Barcode Scanner" | "Vital Signs Monitor";
  serialNumber: string;
  assignedRoomOrDept: string;
  status: "Operational" | "In-Service" | "Decommissioned";
}

export interface FHIRConfig {
  baseUrl: string;
  version: "R4" | "STU3" | "R5";
  authType: "OAuth2 SMART-on-FHIR" | "API Key" | "mTLS";
  tenantIdentifier: string;
  status: "Active" | "Inactive" | "Testing";
}

export interface HL7Config {
  mllpPort: number;
  hostIp: string;
  encoding: "UTF-8" | "ASCII" | "ISO-8859-1";
  supportedMessageTypes: string;
  ackFormat: "AL" | "NE" | "ER";
}

export interface DocumentExchangeConfig {
  ccdaEndpoint: string;
  xdsRepositoryId: string;
  directAddress: string;
  encryptionKeyFingerprint: string;
}

export interface HIEConfig {
  id: string;
  networkName: string;
  nodeId: string;
  optInPolicy: "Opt-In" | "Opt-Out" | "Explicit Consent";
  status: "Connected" | "Disconnected" | "Pending Gateway";
}

export interface OrganizationIdentifier {
  npi: string;
  cliaNumber: string;
  oid: string;
  stateOrgId: string;
  taxId: string;
}

export interface RegulatoryLicense {
  id: string;
  licenseType: "State Licensing" | "Federal Certification" | "Accreditation";
  title: string;
  issuingAuthority: string;
  licenseNumber: string;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Pending Renewal" | "Expired";
}

export interface CodingStandardItem {
  id: string;
  category: "Diagnosis" | "Procedure" | "Laboratory" | "Allergy";
  standardName: string;
  version: string;
  isActive: boolean;
  notes: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  status: "Active" | "Maintenance" | "Inactive";
  blocks: CampusBlockItem[];
  keyContacts: KeyContact[];
  partners: PartnerItem[];
  networkConfig: NetworkConfig;
  wifiNetworks: WifiNetwork[];
  workstations: WorkstationItem[];
  deviceInventory: DeviceInventoryItem[];
  fhirConfig: FHIRConfig;
  hl7Config: HL7Config;
  documentExchange: DocumentExchangeConfig;
  hieConfigs: HIEConfig[];
  orgIdentifiers: OrganizationIdentifier;
  regulatoryLicenses: RegulatoryLicense[];
  codingStandards: CodingStandardItem[];
}

export default function TenantFacilityUnitsPage() {
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>("");

  // View Mode: 'list' (Facility Master Table/Grid) or 'studio' (8-Section Deep Studio)
  const [pageViewMode, setPageViewMode] = useState<"list" | "studio">("list");
  // Facility List Display Mode: 'grid' (3D Glass Cards) or 'table' (3D Elevated Glass Table)
  const [facilityViewMode, setFacilityViewMode] = useState<"grid" | "table">("grid");

  const [activeTab, setActiveTab] = useState<
    "hierarchy" | "contacts" | "partners" | "it_workstations" | "interoperability" | "regulatory" | "standards"
  >("hierarchy");

  // Filters & Search
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [partnerCategoryFilter, setPartnerCategoryFilter] = useState<"All" | "Pharmacy" | "Laboratory" | "Imaging Center">("All");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Backend API Life Cycle States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Active Modals
  const [activeModal, setActiveModal] = useState<
    | "facility"
    | "block"
    | "floor"
    | "department"
    | "room"
    | "bed"
    | "contact"
    | "partner"
    | "workstation"
    | "device"
    | "regulatory"
    | "standard"
    | null
  >(null);

  // Active View & Edit Inspection Modals
  const [viewModalItem, setViewModalItem] = useState<{ type: string; title: string; details: Record<string, string> } | null>(null);
  const [deleteConfirmFacility, setDeleteConfirmFacility] = useState<FacilityItem | null>(null);

  // FORM STATES
  const [liveFacilityTypes, setLiveFacilityTypes] = useState<FacilityTypeItem[]>([]);
  const [facilityForm, setFacilityForm] = useState({ name: "", code: "", facilityTypeId: "", address: "", phone: "", email: "" });

  // EDIT FACILITY MODAL STATES
  const [editingFacility, setEditingFacility] = useState<FacilityRecordItem | null>(null);
  const [showEditFacilityModal, setShowEditFacilityModal] = useState<boolean>(false);
  const [editFacilityForm, setEditFacilityForm] = useState({
    name: "",
    code: "",
    facilityTypeId: "",
    address: "",
    phone: "",
    email: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });
  const [isUpdatingFacility, setIsUpdatingFacility] = useState<boolean>(false);

  const handleOpenEditModal = (fac: any) => {
    setEditingFacility(fac);
    setEditFacilityForm({
      name: fac.name || "",
      code: fac.code || "",
      facilityTypeId: fac.facility_type_id || (liveFacilityTypes.length > 0 ? liveFacilityTypes[0].id : ""),
      address: fac.address || "",
      phone: fac.phone || "",
      email: fac.email || "",
      status: fac.status === "Inactive" ? "INACTIVE" : "ACTIVE",
    });
    setShowEditFacilityModal(true);
  };

  const handleSaveEditFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;
    setIsUpdatingFacility(true);
    try {
      await updateFacilityApi(editingFacility.id, {
        name: editFacilityForm.name,
        code: editFacilityForm.code,
        facility_type_id: editFacilityForm.facilityTypeId || undefined,
        address_line1: editFacilityForm.address,
        phone: editFacilityForm.phone,
        email: editFacilityForm.email,
        status: editFacilityForm.status,
      });
      setShowEditFacilityModal(false);
      setEditingFacility(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      alert(err?.message || "Failed to update facility details.");
    } finally {
      setIsUpdatingFacility(false);
    }
  };

  // EDIT & DELETED HIERARCHY STATES
  const [showDeletedHierarchy, setShowDeletedHierarchy] = useState<boolean>(false);
  const [editingBlock, setEditingBlock] = useState<{ id: string; name: string; code: string } | null>(null);
  const [editingFloor, setEditingFloor] = useState<{ id: string; name: string; number: number; code: string } | null>(null);
  const [editingDept, setEditingDept] = useState<{ id: string; name: string; code: string; head?: string } | null>(null);
  const [editingRoom, setEditingRoom] = useState<{ id: string; number: string; name: string; type: string } | null>(null);
  const [editingBed, setEditingBed] = useState<{ id: string; code: string; type: string; status: "Available" | "Occupied" | "Maintenance" | "Cleaning"; patientInfo?: string } | null>(null);

  const [deleteConfirmHierarchy, setDeleteConfirmHierarchy] = useState<{ type: "Block" | "Floor" | "Department" | "Room" | "Bed"; id: string; name: string } | null>(null);
  const [isUpdatingHierarchy, setIsUpdatingHierarchy] = useState<boolean>(false);

  const handleRestoreHierarchyItem = async (type: "Block" | "Floor" | "Department" | "Room" | "Bed", id: string, name: string) => {
    setIsUpdatingHierarchy(true);
    try {
      if (type === "Block") await restoreBlockApi(id);
      else if (type === "Floor") await restoreFloorApi(id);
      else if (type === "Department") await restoreDeptApi(id);
      else if (type === "Room") await restoreRoomApi(id);
      else if (type === "Bed") await restoreBedApi(id);

      showToast(`${type} '${name}' restored to Active status!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || `Failed to restore ${type}.`);
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  const handleSaveEditBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlock) return;
    setIsUpdatingHierarchy(true);
    try {
      await updateBlockApi(editingBlock.id, { name: editingBlock.name, code: editingBlock.code });
      showToast(`Campus Block '${editingBlock.name}' updated & logged to Audit Log.`);
      setEditingBlock(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to update Block.");
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  const handleSaveEditFloor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFloor) return;
    setIsUpdatingHierarchy(true);
    try {
      await updateFloorApi(editingFloor.id, { name: editingFloor.name, number: editingFloor.number, code: editingFloor.code });
      showToast(`Floor '${editingFloor.name}' updated & logged to Audit Log.`);
      setEditingFloor(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to update Floor.");
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  const handleSaveEditDept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    setIsUpdatingHierarchy(true);
    try {
      await updateDeptApi(editingDept.id, { name: editingDept.name, code: editingDept.code, head: editingDept.head });
      showToast(`Clinical Department '${editingDept.name}' updated & logged to Audit Log.`);
      setEditingDept(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to update Department.");
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  const handleSaveEditRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;
    setIsUpdatingHierarchy(true);
    try {
      await updateRoomApi(editingRoom.id, { number: editingRoom.number, name: editingRoom.name, type: editingRoom.type });
      showToast(`Room '${editingRoom.number}' updated & logged to Audit Log.`);
      setEditingRoom(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to update Room.");
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  const handleSaveEditBed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBed) return;
    setIsUpdatingHierarchy(true);
    try {
      await updateBedApi(editingBed.id, { code: editingBed.code, type: editingBed.type, status: editingBed.status, patient_info: editingBed.patientInfo });
      showToast(`Bed '${editingBed.code}' updated & logged to Audit Log.`);
      setEditingBed(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to update Bed.");
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  const handleConfirmSoftDeleteHierarchy = async () => {
    if (!deleteConfirmHierarchy) return;
    const { type, id, name } = deleteConfirmHierarchy;
    setIsUpdatingHierarchy(true);
    try {
      if (type === "Block") await deleteBlockApi(id);
      else if (type === "Floor") await deleteFloorApi(id);
      else if (type === "Department") await deleteDeptApi(id);
      else if (type === "Room") await deleteRoomApi(id);
      else if (type === "Bed") await deleteBedApi(id);

      showToast(`${type} '${name}' soft-deleted & logged to Audit Log.`);
      setDeleteConfirmHierarchy(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || `Failed to soft-delete ${type}.`);
    } finally {
      setIsUpdatingHierarchy(false);
    }
  };

  // STATUS FILTER & PAGINATION STATES
  const [facilityStatusFilter, setFacilityStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  useEffect(() => {
    setCurrentPage(1);
  }, [globalSearch, facilityStatusFilter]);

  // ACCORDION EXPANSION STATES
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});
  const [expandedFloors, setExpandedFloors] = useState<Record<string, boolean>>({});
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});
  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>({});
  const [expandedBlockBreakdowns, setExpandedBlockBreakdowns] = useState<Record<string, boolean>>({});

  const toggleBlockBreakdown = (facId: string) => {
    setExpandedBlockBreakdowns((prev) => ({
      ...prev,
      [facId]: !prev[facId],
    }));
  };

  const toggleBlockExpand = (id: string) => {
    setExpandedBlocks((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  const toggleFloorExpand = (id: string) => {
    setExpandedFloors((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  const toggleDeptExpand = (id: string) => {
    setExpandedDepts((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  const toggleRoomExpand = (id: string) => {
    setExpandedRooms((prev) => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };

  const isBlockOpen = (id: string, index: number) => {
    return expandedBlocks[id] !== undefined ? expandedBlocks[id] : index === 0;
  };

  const isFloorOpen = (id: string, index: number) => {
    return expandedFloors[id] !== undefined ? expandedFloors[id] : index === 0;
  };

  const isDeptOpen = (id: string, index: number) => {
    return expandedDepts[id] !== undefined ? expandedDepts[id] : true;
  };

  const isRoomOpen = (id: string) => {
    return expandedRooms[id] !== undefined ? expandedRooms[id] : true;
  };

  const expandAllHierarchy = () => {
    if (!activeFacility) return;
    const bMap: Record<string, boolean> = {};
    const flMap: Record<string, boolean> = {};
    const dMap: Record<string, boolean> = {};
    const rMap: Record<string, boolean> = {};

    activeFacility.blocks.forEach((b) => {
      bMap[b.id] = true;
      b.floors.forEach((fl) => {
        flMap[fl.id] = true;
        fl.departments.forEach((dp) => {
          dMap[dp.id] = true;
          dp.rooms.forEach((rm) => {
            rMap[rm.id] = true;
          });
        });
      });
    });

    setExpandedBlocks(bMap);
    setExpandedFloors(flMap);
    setExpandedDepts(dMap);
    setExpandedRooms(rMap);
  };

  const collapseAllHierarchy = () => {
    if (!activeFacility) return;
    const bMap: Record<string, boolean> = {};
    const flMap: Record<string, boolean> = {};
    const dMap: Record<string, boolean> = {};
    const rMap: Record<string, boolean> = {};

    activeFacility.blocks.forEach((b) => {
      bMap[b.id] = false;
      b.floors.forEach((fl) => {
        flMap[fl.id] = false;
        fl.departments.forEach((dp) => {
          dMap[dp.id] = false;
          dp.rooms.forEach((rm) => {
            rMap[rm.id] = false;
          });
        });
      });
    });

    setExpandedBlocks(bMap);
    setExpandedFloors(flMap);
    setExpandedDepts(dMap);
    setExpandedRooms(rMap);
  };
  const [blockForm, setBlockForm] = useState({ name: "", code: "" });
  const [floorForm, setFloorForm] = useState({ name: "", number: 1, code: "", blockId: "" });
  const [deptForm, setDeptForm] = useState({ name: "", code: "", head: "", floorId: "" });
  const [roomForm, setRoomForm] = useState({ number: "", name: "", type: "ICU Bay", deptId: "" });
  const [bedForm, setBedForm] = useState({ code: "", type: "ICU Electric", status: "Available" as const, roomId: "" });

  const [contactForm, setContactForm] = useState<Partial<KeyContact>>({
    role: "Director of Nursing",
    name: "",
    email: "",
    phone: "",
    officeLocation: "",
    licenseNumber: "",
  });

  const [partnerForm, setPartnerForm] = useState<Partial<PartnerItem>>({
    category: "Pharmacy",
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    type: "In-House",
    status: "Active",
    licenseOrNpi: "",
  });

  const [workstationForm, setWorkstationForm] = useState<Partial<WorkstationItem>>({
    stationId: "",
    locationRoom: "",
    ipAddress: "",
    osVersion: "Windows 11 Medical Enterprise",
    status: "Online",
  });

  const [deviceForm, setDeviceForm] = useState<Partial<DeviceInventoryItem>>({
    deviceName: "",
    deviceType: "Medical Cart",
    serialNumber: "",
    assignedRoomOrDept: "",
    status: "Operational",
  });

  const [regulatoryForm, setRegulatoryForm] = useState<Partial<RegulatoryLicense>>({
    licenseType: "State Licensing",
    title: "",
    issuingAuthority: "",
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",
    status: "Active",
  });

  const [standardForm, setStandardForm] = useState<Partial<CodingStandardItem>>({
    category: "Diagnosis",
    standardName: "ICD-10-CM",
    version: "2026 Release",
    isActive: true,
    notes: "",
  });

  const activeFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label}: ${text}`);
  };

  // Helper filter functions for Archive Mode vs Active Mode
  const hasSoftDeletedInBed = (bd: BedItem) => !!bd.isDeleted;

  const hasSoftDeletedInRoom = (rm: RoomItem) => {
    if (rm.isDeleted) return true;
    return (rm.beds || []).some(hasSoftDeletedInBed);
  };

  const hasSoftDeletedInDept = (dp: DepartmentItem) => {
    if (dp.isDeleted) return true;
    return (dp.rooms || []).some(hasSoftDeletedInRoom);
  };

  const hasSoftDeletedInFloor = (fl: FloorItem) => {
    if (fl.isDeleted) return true;
    return (fl.departments || []).some(hasSoftDeletedInDept);
  };

  const hasSoftDeletedInBlock = (block: CampusBlockItem) => {
    if (block.isDeleted) return true;
    return (block.floors || []).some(hasSoftDeletedInFloor);
  };

  // Fetch live facilities and their campus infrastructure hierarchy from backend database
  const fetchFacilitiesFromBackend = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const liveFacilities = await getFacilitiesApi();
      if (liveFacilities && Array.isArray(liveFacilities)) {
        const mappedFacilities: FacilityItem[] = await Promise.all(
          liveFacilities.map(async (f, idx) => {
            let blocks: CampusBlockItem[] = [];
            try {
              if (f.id && !f.id.startsWith("fac-api-")) {
                const liveBlocks = await getFacilityHierarchyApi(f.id, showDeletedHierarchy);
                if (liveBlocks && Array.isArray(liveBlocks)) {
                  blocks = liveBlocks.map((b) => ({
                    id: b.id,
                    name: b.name,
                    code: b.code,
                    isDeleted: b.is_deleted,
                    floors: (b.floors || []).map((fl) => ({
                      id: fl.id,
                      number: fl.number,
                      name: fl.name,
                      code: fl.code,
                      isDeleted: fl.is_deleted,
                      departments: (fl.departments || []).map((dp) => ({
                        id: dp.id,
                        name: dp.name,
                        code: dp.code,
                        head: dp.head || "Unassigned Head",
                        isDeleted: dp.is_deleted,
                        rooms: (dp.rooms || []).map((rm) => ({
                          id: rm.id,
                          number: rm.number,
                          name: rm.name,
                          type: rm.type,
                          isDeleted: rm.is_deleted,
                          beds: (rm.beds || []).map((bd) => ({
                            id: bd.id,
                            code: bd.code,
                            type: bd.type,
                            status: bd.status,
                            patientInfo: bd.patient_info || undefined,
                            isDeleted: bd.is_deleted,
                          })),
                        })),
                      })),
                    })),
                  }));
                }
              }
            } catch (_) {}

            return {
              id: f.id || `fac-api-${idx}`,
              name: f.name || `Facility ${idx + 1}`,
              code: f.code || `FAC-0${idx + 1}`,
              address: f.address_line1 ? `${f.address_line1}${f.city ? `, ${f.city}` : ""}` : "Address not specified",
              phone: f.phone || "N/A",
              email: f.email || "N/A",
              status: f.status === "INACTIVE" ? "Inactive" : "Active",
              blocks: blocks,
              keyContacts: [],
              partners: [],
              networkConfig: { subnet: "", gateway: "", vlanId: "", dnsPrimary: "", dnsSecondary: "", firewallProfile: "" },
              wifiNetworks: [],
              workstations: [],
              deviceInventory: [],
              fhirConfig: { baseUrl: f.code ? `https://fhir.${f.code.toLowerCase()}.ethizo.com/r4` : "", version: "R4", authType: "OAuth2 SMART-on-FHIR", tenantIdentifier: f.code ? `FAC-${f.code}` : "", status: "Active" },
              hl7Config: { mllpPort: 0, hostIp: "", encoding: "UTF-8", supportedMessageTypes: "", ackFormat: "AL" },
              documentExchange: { ccdaEndpoint: "", xdsRepositoryId: "", directAddress: f.email || "", encryptionKeyFingerprint: "" },
              hieConfigs: [],
              orgIdentifiers: { npi: "", cliaNumber: "", oid: "", stateOrgId: "", taxId: "" },
              regulatoryLicenses: [],
              codingStandards: [],
            };
          })
        );

        setFacilities(mappedFacilities);
        if (mappedFacilities.length > 0) {
          setSelectedFacilityId((prev) => (prev && mappedFacilities.some((f) => f.id === prev) ? prev : mappedFacilities[0].id));
        } else {
          setSelectedFacilityId("");
        }
      } else {
        setFacilities([]);
        setSelectedFacilityId("");
      }
    } catch (err: any) {
      console.warn("Backend API fetch warning:", err);
      setApiError(err?.message || "Failed to fetch facilities from backend.");
      setFacilities([]);
      setSelectedFacilityId("");
    } finally {
      setIsLoading(false);
    }
  }, [showDeletedHierarchy]);

  // Fetch live facility types from database 'facility_types' table
  useEffect(() => {
    getFacilityTypesApi()
      .then((types) => {
        if (types && types.length > 0) {
          setLiveFacilityTypes(types);
          setFacilityForm((prev) => ({ ...prev, facilityTypeId: prev.facilityTypeId || types[0].id }));
        }
      })
      .catch((err) => console.warn("Facility types fetch error:", err));
  }, []);

  useEffect(() => {
    fetchFacilitiesFromBackend();
  }, [fetchFacilitiesFromBackend, showDeletedHierarchy]);

  // Confirm & Soft-Delete Facility (with Confirmation Dialog Modal)
  const handleConfirmSoftDeleteFacility = async () => {
    if (!deleteConfirmFacility) return;
    try {
      await deleteFacilityApi(deleteConfirmFacility.id);
      showToast(`Facility '${deleteConfirmFacility.name}' soft-deleted (deactivated).`);
      setDeleteConfirmFacility(null);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to soft-delete facility.");
    }
  };

  // Restore Soft-Deleted Facility
  const handleRestoreFacility = async (facId: string, facName: string) => {
    try {
      await restoreFacilityApi(facId);
      showToast(`Facility '${facName}' restored to Active status!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to restore facility.");
    }
  };

  // Helper to open studio for a facility
  const openFacilityStudio = (facId: string) => {
    setSelectedFacilityId(facId);
    setPageViewMode("studio");
  };

  // Handlers for Form Submissions & Item Mutations
  const handleAddFacilitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityForm.name.trim()) {
      showToast("Facility name is required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const generatedCode = facilityForm.code.trim().toUpperCase() || `FAC-${Math.floor(100 + Math.random() * 900)}`;

      const createdFromApi = await createFacilityApi({
        name: facilityForm.name.trim(),
        code: generatedCode,
        address_line1: facilityForm.address.trim() || "Main Campus Address",
        phone: facilityForm.phone.trim() || undefined,
        email: facilityForm.email.trim() || undefined,
        facility_type_id: facilityForm.facilityTypeId || undefined,
      });

      setActiveModal(null);
      setFacilityForm({ name: "", code: "", facilityTypeId: liveFacilityTypes[0]?.id || "", address: "", phone: "", email: "" });
      showToast(`Facility '${createdFromApi.name || facilityForm.name.trim()}' saved to 'facilities' table under your Tenant!`);
      await fetchFacilitiesFromBackend();
      if (createdFromApi.id) {
        setSelectedFacilityId(createdFromApi.id);
      }
    } catch (err: any) {
      showToast(err?.message || "Failed to create facility on backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacilityId || selectedFacilityId.startsWith("fac-api-")) {
      showToast("Please create or select a valid saved facility first.");
      return;
    }
    if (!blockForm.name.trim()) return;
    try {
      const generatedCode = blockForm.code.trim() || `BLK-${Math.floor(10 + Math.random() * 90)}`;
      await createBlockApi({
        facility_id: selectedFacilityId,
        name: blockForm.name.trim(),
        code: generatedCode,
      });
      setActiveModal(null);
      setBlockForm({ name: "", code: "" });
      showToast(`Campus Block '${blockForm.name.trim()}' saved to database!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to add block.");
    }
  };

  const handleAddFloorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!floorForm.name.trim()) return;
    const targetBlockId = floorForm.blockId || activeFacility?.blocks[0]?.id;
    if (!targetBlockId) {
      showToast("Please select a valid Campus Block first.");
      return;
    }
    try {
      const generatedCode = floorForm.code.trim() || `FL-0${floorForm.number || 1}`;
      await createFloorApi({
        block_id: targetBlockId,
        name: floorForm.name.trim(),
        number: floorForm.number || 1,
        code: generatedCode,
      });
      setActiveModal(null);
      setFloorForm({ name: "", number: 1, code: "", blockId: "" });
      showToast(`Floor '${floorForm.name.trim()}' saved to database!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to add floor.");
    }
  };

  const handleAddDeptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptForm.name.trim() || !deptForm.floorId) {
      showToast("Department Name and Floor selection are required.");
      return;
    }
    try {
      const generatedCode = deptForm.code.trim() || `DEPT-${Math.floor(100 + Math.random() * 900)}`;
      await createDeptApi({
        floor_id: deptForm.floorId,
        name: deptForm.name.trim(),
        code: generatedCode,
        head: deptForm.head.trim() || undefined,
      });
      setActiveModal(null);
      setDeptForm({ name: "", code: "", head: "", floorId: "" });
      showToast(`Clinical Department '${deptForm.name.trim()}' saved to database!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to add department.");
    }
  };

  const handleAddRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomForm.number.trim() || !roomForm.deptId) {
      showToast("Room Number and Department selection are required.");
      return;
    }
    try {
      await createRoomApi({
        department_id: roomForm.deptId,
        number: roomForm.number.trim(),
        name: roomForm.name.trim() || `Room ${roomForm.number.trim()}`,
        type: roomForm.type || "ICU Bay",
      });
      setActiveModal(null);
      setRoomForm({ number: "", name: "", type: "ICU Bay", deptId: "" });
      showToast(`Room '${roomForm.number.trim()}' saved to database!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to add room.");
    }
  };

  const handleAddBedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedForm.code.trim() || !bedForm.roomId) {
      showToast("Bed Code and Room selection are required.");
      return;
    }
    try {
      await createBedApi({
        room_id: bedForm.roomId,
        code: bedForm.code.trim(),
        type: bedForm.type || "ICU Electric",
        status: bedForm.status || "Available",
      });
      setActiveModal(null);
      setBedForm({ code: "", type: "ICU Electric", status: "Available", roomId: "" });
      showToast(`Bed '${bedForm.code.trim()}' saved to database!`);
      await fetchFacilitiesFromBackend();
    } catch (err: any) {
      showToast(err?.message || "Failed to add bed.");
    }
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name?.trim()) return;
    const newContact: KeyContact = {
      id: `kc-${Date.now()}`,
      role: contactForm.role || "Administrator",
      customRoleName: contactForm.customRoleName,
      name: contactForm.name.trim(),
      email: contactForm.email?.trim() || "admin@facility.org",
      phone: contactForm.phone?.trim() || "+1 (555) 000-0000",
      officeLocation: contactForm.officeLocation?.trim() || "Executive Wing",
      licenseNumber: contactForm.licenseNumber?.trim(),
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId ? { ...f, keyContacts: [...f.keyContacts, newContact] } : f
      )
    );
    setActiveModal(null);
    setContactForm({
      role: "Director of Nursing",
      name: "",
      email: "",
      phone: "",
      officeLocation: "",
      licenseNumber: "",
    });
    showToast(`Leadership contact '${newContact.name}' added.`);
  };

  const handleAddPartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name?.trim()) return;
    const newPartner: PartnerItem = {
      id: `part-${Date.now()}`,
      category: partnerForm.category || "Pharmacy",
      name: partnerForm.name.trim(),
      contactPerson: partnerForm.contactPerson?.trim() || "Lead Contact",
      email: partnerForm.email?.trim() || "contact@partner.org",
      phone: partnerForm.phone?.trim() || "+1 (555) 000-0000",
      type: partnerForm.type || "In-House",
      status: partnerForm.status || "Active",
      licenseOrNpi: partnerForm.licenseOrNpi?.trim(),
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId ? { ...f, partners: [...f.partners, newPartner] } : f
      )
    );
    setActiveModal(null);
    setPartnerForm({
      category: "Pharmacy",
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      type: "In-House",
      status: "Active",
      licenseOrNpi: "",
    });
    showToast(`Partner '${newPartner.name}' added.`);
  };

  const handleAddWorkstationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workstationForm.stationId?.trim()) return;
    const newStation: WorkstationItem = {
      id: `ws-${Date.now()}`,
      stationId: workstationForm.stationId.trim(),
      locationRoom: workstationForm.locationRoom?.trim() || "General Location",
      ipAddress: workstationForm.ipAddress?.trim() || "192.168.10.100",
      osVersion: workstationForm.osVersion || "Windows 11 Medical Enterprise",
      status: workstationForm.status || "Online",
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId
          ? { ...f, workstations: [...f.workstations, newStation] }
          : f
      )
    );
    setActiveModal(null);
    setWorkstationForm({
      stationId: "",
      locationRoom: "",
      ipAddress: "",
      osVersion: "Windows 11 Medical Enterprise",
      status: "Online",
    });
    showToast(`Workstation '${newStation.stationId}' registered.`);
  };

  const handleAddDeviceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceForm.deviceName?.trim()) return;
    const newDevice: DeviceInventoryItem = {
      id: `dev-${Date.now()}`,
      deviceName: deviceForm.deviceName.trim(),
      deviceType: deviceForm.deviceType || "Medical Cart",
      serialNumber: deviceForm.serialNumber?.trim() || `SN-${Date.now().toString().slice(-7)}`,
      assignedRoomOrDept: deviceForm.assignedRoomOrDept?.trim() || "General Ward",
      status: deviceForm.status || "Operational",
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId
          ? { ...f, deviceInventory: [...f.deviceInventory, newDevice] }
          : f
      )
    );
    setActiveModal(null);
    setDeviceForm({
      deviceName: "",
      deviceType: "Medical Cart",
      serialNumber: "",
      assignedRoomOrDept: "",
      status: "Operational",
    });
    showToast(`Device '${newDevice.deviceName}' added.`);
  };

  const handleAddRegulatorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regulatoryForm.title?.trim()) return;
    const newLicense: RegulatoryLicense = {
      id: `reg-${Date.now()}`,
      licenseType: regulatoryForm.licenseType || "State Licensing",
      title: regulatoryForm.title.trim(),
      issuingAuthority: regulatoryForm.issuingAuthority?.trim() || "Department of Health",
      licenseNumber: regulatoryForm.licenseNumber?.trim() || `LIC-${Math.floor(10000 + Math.random() * 90000)}`,
      issueDate: regulatoryForm.issueDate || "2026-01-01",
      expiryDate: regulatoryForm.expiryDate || "2028-12-31",
      status: regulatoryForm.status || "Active",
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId
          ? { ...f, regulatoryLicenses: [...f.regulatoryLicenses, newLicense] }
          : f
      )
    );
    setActiveModal(null);
    setRegulatoryForm({
      licenseType: "State Licensing",
      title: "",
      issuingAuthority: "",
      licenseNumber: "",
      issueDate: "",
      expiryDate: "",
      status: "Active",
    });
    showToast(`Regulatory License '${newLicense.title}' registered.`);
  };

  const handleAddStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!standardForm.standardName?.trim()) return;
    const newStandard: CodingStandardItem = {
      id: `cs-${Date.now()}`,
      category: standardForm.category || "Diagnosis",
      standardName: standardForm.standardName.trim(),
      version: standardForm.version?.trim() || "2026 Release",
      isActive: standardForm.isActive !== false,
      notes: standardForm.notes?.trim() || "Default clinical standard",
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId
          ? { ...f, codingStandards: [...f.codingStandards, newStandard] }
          : f
      )
    );
    setActiveModal(null);
    setStandardForm({
      category: "Diagnosis",
      standardName: "ICD-10-CM",
      version: "2026 Release",
      isActive: true,
      notes: "",
    });
    showToast(`Coding standard '${newStandard.standardName}' added.`);
  };

  const deleteKeyContact = (contactId: string) => {
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId
          ? { ...f, keyContacts: f.keyContacts.filter((c) => c.id !== contactId) }
          : f
      )
    );
    showToast("Contact removed.");
  };

  const deletePartner = (partnerId: string) => {
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacilityId
          ? { ...f, partners: f.partners.filter((p) => p.id !== partnerId) }
          : f
      )
    );
    showToast("Partner removed.");
  };

  const toggleBedStatus = (
    blockId: string,
    floorId: string,
    deptId: string,
    roomId: string,
    bedId: string
  ) => {
    const statuses: Array<"Available" | "Occupied" | "Maintenance" | "Cleaning"> = [
      "Available",
      "Occupied",
      "Maintenance",
      "Cleaning",
    ];
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== selectedFacilityId) return f;
        return {
          ...f,
          blocks: f.blocks.map((b) => {
            if (b.id !== blockId) return b;
            return {
              ...b,
              floors: b.floors.map((fl) => {
                if (fl.id !== floorId) return fl;
                return {
                  ...fl,
                  departments: fl.departments.map((dp) => {
                    if (dp.id !== deptId) return dp;
                    return {
                      ...dp,
                      rooms: dp.rooms.map((rm) => {
                        if (rm.id !== roomId) return rm;
                        return {
                          ...rm,
                          beds: rm.beds.map((bd) => {
                            if (bd.id !== bedId) return bd;
                            const idx = statuses.indexOf(bd.status);
                            const nextStatus = statuses[(idx + 1) % statuses.length];
                            return { ...bd, status: nextStatus };
                          }),
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          }),
        };
      })
    );
    showToast("Bed status updated.");
  };

  const toggleCodingStandard = (standardId: string) => {
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== selectedFacilityId) return f;
        return {
          ...f,
          codingStandards: f.codingStandards.map((cs) =>
            cs.id === standardId ? { ...cs, isActive: !cs.isActive } : cs
          ),
        };
      })
    );
    showToast("Coding standard status toggled.");
  };

  // Hierarchy Metrics Calculation
  let totalBlocks = activeFacility?.blocks.length || 0;
  let totalFloors = 0;
  let totalDepts = 0;
  let totalRooms = 0;
  let totalBeds = 0;
  let occupiedBeds = 0;
  let availableBeds = 0;

  activeFacility?.blocks.forEach((blk) => {
    totalFloors += blk.floors.length;
    blk.floors.forEach((fl) => {
      totalDepts += fl.departments.length;
      fl.departments.forEach((dp) => {
        totalRooms += dp.rooms.length;
        dp.rooms.forEach((rm) => {
          totalBeds += rm.beds.length;
          rm.beds.forEach((b) => {
            if (b.status === "Occupied") occupiedBeds++;
            if (b.status === "Available") availableBeds++;
          });
        });
      });
    });
  });

  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Filtered Facilities List (with Search & Status Filter)
  const filteredFacilitiesList = useMemo(() => {
    return facilities.filter((f) => {
      const matchesStatus =
        facilityStatusFilter === "All" ||
        (facilityStatusFilter === "Active" && f.status === "Active") ||
        (facilityStatusFilter === "Inactive" && f.status === "Inactive");

      if (!globalSearch) return matchesStatus;
      const q = globalSearch.toLowerCase();
      const matchesSearch =
        f.name.toLowerCase().includes(q) ||
        f.code.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [facilities, globalSearch, facilityStatusFilter]);

  // Paginated Facilities List
  const totalPages = Math.max(1, Math.ceil(filteredFacilitiesList.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const paginatedFacilitiesList = useMemo(() => {
    return filteredFacilitiesList.slice(startIndex, startIndex + pageSize);
  }, [filteredFacilitiesList, startIndex, pageSize]);

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    if (!activeFacility) return [];
    return activeFacility.partners.filter((p) => {
      const matchesCategory = partnerCategoryFilter === "All" || p.category === partnerCategoryFilter;
      const matchesQuery =
        !globalSearch ||
        p.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        p.contactPerson.toLowerCase().includes(globalSearch.toLowerCase()) ||
        p.email.toLowerCase().includes(globalSearch.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeFacility, partnerCategoryFilter, globalSearch]);

  return (
    <div className="w-full space-y-6 font-sans pb-16 text-[#172522]">
      {/* Toast Notification (3D Glass Translucent Pill) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-[#7ee8d5]/80 bg-[#0c2420]/95 px-5 py-3.5 text-xs font-bold text-teal-200 shadow-[0_15px_40px_rgba(15,118,110,0.4)] backdrop-blur-xl animate-bounce">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}



      {/* ======================================================== */}
      {/* VIEW MODE 1: FACILITY MASTER LIST VIEW (TABLE / CARD GRID) */}
      {/* ======================================================== */}
      {pageViewMode === "list" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard3D
              title="Registered Facilities"
              value={`${facilities.length} Facilities`}
              subtitle="Active network healthcare centers"
              icon={<Building className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
              badge="bg-teal-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(15,118,110,0.15)]"
            />
            <GlassCard3D
              title="Total Campus Capacity"
              value={`${facilities.reduce((acc, f) => acc + f.blocks.reduce((bAcc, blk) => bAcc + blk.floors.reduce((flAcc, fl) => flAcc + fl.departments.reduce((dAcc, dp) => dAcc + dp.rooms.reduce((rAcc, rm) => rAcc + rm.beds.length, 0), 0), 0), 0), 0)} Total Beds`}
              subtitle="Across all campus blocks"
              icon={<BedDouble className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-indigo-50/60 border-sky-300/60"
              badge="bg-sky-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(14,165,233,0.15)]"
            />
            <GlassCard3D
              title="Operational Status"
              value="100% Online"
              subtitle="All unit systems active"
              icon={<Activity className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
              badge="bg-emerald-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
            />
            <GlassCard3D
              title="FHIR & HL7 Gateways"
              value="Active Nodes"
              subtitle="Interoperability ready"
              icon={<Share2 className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-purple-50/90 via-purple-100/40 to-indigo-50/60 border-purple-300/60"
              badge="bg-purple-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(168,85,247,0.15)]"
            />
          </div>

          {/* Search, Status Filter & 3D Glass View Switcher Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-1">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600" />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Filter facility name, code, address..."
                  className="h-10 w-full rounded-2xl border border-teal-200 bg-white pl-10 pr-3 text-xs text-[#172522] placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 shadow-xs"
                />
              </div>

              {/* Status Filter Dropdown (All, Active, Inactive) */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select
                  value={facilityStatusFilter}
                  onChange={(e) => setFacilityStatusFilter(e.target.value as "All" | "Active" | "Inactive")}
                  className="h-10 rounded-2xl border border-teal-200 bg-white px-3 font-bold text-xs text-[#0F766E] outline-none shadow-xs cursor-pointer focus:border-[#0F766E]"
                >
                  <option value="All">All ({facilities.length})</option>
                  <option value="Active">Active ({facilities.filter((f) => f.status === "Active").length})</option>
                  <option value="Inactive">Inactive ({facilities.filter((f) => f.status === "Inactive").length})</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* View Mode Switcher (Cards View vs Table View) */}
              <div className="flex items-center rounded-2xl border border-teal-200 bg-teal-50/60 p-1 shadow-inner">
                <button
                  onClick={() => setFacilityViewMode("grid")}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    facilityViewMode === "grid"
                      ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                      : "text-slate-600 hover:text-[#0F766E]"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Cards View</span>
                </button>

                <button
                  onClick={() => setFacilityViewMode("table")}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    facilityViewMode === "table"
                      ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                      : "text-slate-600 hover:text-[#0F766E]"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Table View</span>
                </button>
              </div>

              {/* Refresh Data Button */}
              <button
                onClick={fetchFacilitiesFromBackend}
                className="p-2.5 rounded-2xl border border-teal-200 bg-white hover:bg-teal-50 text-[#0F766E] transition cursor-pointer shadow-xs"
                title="Sync & Refresh Backend Data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#0F766E]" : ""}`} />
              </button>

              <button
                onClick={() => setActiveModal("facility")}
                className="px-4 py-2 rounded-2xl bg-[#0F766E] hover:bg-[#0B625C] text-white font-black text-xs shadow-md transition cursor-pointer active:scale-95 shrink-0"
              >
                + Add Facility
              </button>
            </div>
          </div>

          {/* FACILITY MASTER DISPLAY (GRID OR TABLE WITH REUSABLE SKELETON LOADER) */}
          {isLoading ? (
            <SkeletonLoader type={facilityViewMode === "table" ? "table" : "card"} count={4} />
          ) : filteredFacilitiesList.length === 0 ? (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/40 bg-white/90 p-12 text-center shadow-lg backdrop-blur-xl space-y-3">
              <Building2 className="w-10 h-10 mx-auto text-[#0F766E] opacity-60" />
              <h3 className="font-black text-slate-800 text-sm">No Facilities Found</h3>
              <p className="text-xs text-slate-500">No facilities match your active search query.</p>
            </div>
          ) : facilityViewMode === "grid" ? (
            /* ============================================================
               3D COLORIZED GLASS CARDS GRID VIEW
            ============================================================ */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paginatedFacilitiesList.map((fac) => {
                let fBlocks = fac.blocks.length;
                let fFloors = 0;
                let fRooms = 0;
                let fBeds = 0;
                const blockStats = fac.blocks.map((blk) => {
                  let bFloors = blk.floors.length;
                  let bRooms = 0;
                  let bBeds = 0;
                  blk.floors.forEach((fl) => {
                    fl.departments.forEach((dp) => {
                      bRooms += dp.rooms.length;
                      dp.rooms.forEach((rm) => {
                        bBeds += rm.beds.length;
                      });
                    });
                  });
                  return {
                    id: blk.id,
                    name: blk.name,
                    code: blk.code,
                    floors: bFloors,
                    rooms: bRooms,
                    beds: bBeds,
                  };
                });

                fac.blocks.forEach((b) => {
                  fFloors += b.floors.length;
                  b.floors.forEach((fl) => {
                    fl.departments.forEach((dp) => {
                      fRooms += dp.rooms.length;
                      dp.rooms.forEach((rm) => (fBeds += rm.beds.length));
                    });
                  });
                });

                return (
                  <motion.div
                    key={fac.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border-2 border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-emerald-50/30 to-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 relative group overflow-hidden"
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7ee8d5]/30 blur-2xl group-hover:bg-[#0f766e]/20 transition-all duration-300" />

                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white flex items-center justify-center font-black text-lg shadow-md">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-[#0F766E] bg-white px-2 py-0.5 rounded border border-teal-200 shadow-xs">
                              {fac.code}
                            </span>
                            {fac.status === "Inactive" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[9px] font-extrabold text-rose-800 border border-rose-300 shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                                Inactive
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-extrabold text-emerald-800 border border-emerald-300 shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                Active
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-black text-slate-900 mt-1">{fac.name}</h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            setViewModalItem({
                              type: "Facility Master Overview",
                              title: fac.name,
                              details: {
                                Code: fac.code,
                                Status: fac.status,
                                Address: fac.address,
                                Phone: fac.phone,
                                Email: fac.email,
                                "Total Capacity": `${fBlocks} Blocks • ${fFloors} Floors • ${fRooms} Rooms • ${fBeds} Beds`,
                                "Per-Block Breakdown": blockStats.map((b) => `${b.name} (${b.code}): ${b.floors} Floors, ${b.rooms} Rooms, ${b.beds} Beds`).join(" | ") || "No blocks configured",
                                "FHIR Endpoint": fac.fhirConfig.baseUrl,
                              },
                            })
                          }
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition cursor-pointer shadow-xs"
                          title="Quick View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(fac)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition cursor-pointer shadow-xs"
                          title="Edit Facility Details"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {fac.status === "Inactive" ? (
                          <button
                            onClick={() => handleRestoreFacility(fac.id, fac.name)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] shadow-xs transition cursor-pointer active:scale-95"
                            title="Restore Soft-Deleted Facility"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Restore</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmFacility(fac)}
                            className="p-2 rounded-xl bg-white border border-rose-200 text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer shadow-xs"
                            title="Soft Delete Facility"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-white/80 p-3 rounded-2xl border border-teal-100/70 backdrop-blur-xs relative z-10">
                      <p className="flex items-center gap-2 truncate">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{fac.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{fac.phone}</span>
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{fac.email}</span>
                      </p>
                    </div>

                    {/* Quick Capacity Bar (4 Columns including Total Rooms) */}
                    <div className="grid grid-cols-4 gap-2 text-center text-xs relative z-10">
                      <div className="p-2 rounded-xl bg-white/90 border border-teal-200 shadow-xs">
                        <span className="text-[10px] text-slate-500 block font-bold">Blocks</span>
                        <span className="font-black text-[#0F766E]">{fBlocks}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/90 border border-sky-200 shadow-xs">
                        <span className="text-[10px] text-slate-500 block font-bold">Floors</span>
                        <span className="font-black text-sky-800">{fFloors}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/90 border border-purple-200 shadow-xs">
                        <span className="text-[10px] text-slate-500 block font-bold">Rooms</span>
                        <span className="font-black text-purple-800">{fRooms}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/90 border border-emerald-200 shadow-xs">
                        <span className="text-[10px] text-slate-500 block font-bold">Beds</span>
                        <span className="font-black text-emerald-900">{fBeds}</span>
                      </div>
                    </div>

                    {/* Per-Block Infrastructure Breakdown Drawer */}
                    <div className="space-y-1.5 pt-1 relative z-10">
                      <button
                        type="button"
                        onClick={() => toggleBlockBreakdown(fac.id)}
                        className="w-full flex items-center justify-between text-[11px] font-black text-[#0F766E] bg-teal-50/80 hover:bg-teal-100/70 px-3 py-2 rounded-xl border border-teal-200/80 transition cursor-pointer shadow-xs"
                      >
                        <span className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-[#0F766E]" />
                          <span>Block-by-Block Breakdown ({fac.blocks.length})</span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedBlockBreakdowns[fac.id] ? "rotate-180" : ""}`} />
                      </button>

                      {expandedBlockBreakdowns[fac.id] && (
                        <div className="space-y-1.5 p-2 rounded-2xl bg-white/95 border border-teal-200/90 shadow-sm animate-fade-in">
                          {blockStats.length === 0 ? (
                            <p className="text-[10px] text-slate-400 text-center py-1 font-bold">No campus blocks registered yet.</p>
                          ) : (
                            blockStats.map((bs) => (
                              <div key={bs.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-[10px] font-bold">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded text-[9px] font-black">{bs.code}</span>
                                  <span className="text-slate-800 font-extrabold truncate max-w-[130px]">{bs.name}</span>
                                </div>
                                <div className="flex items-center gap-1 font-mono text-[9px]">
                                  <span className="bg-sky-50 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200">{bs.floors} Floors</span>
                                  <span className="bg-purple-50 text-purple-800 px-1.5 py-0.5 rounded border border-purple-200">{bs.rooms} Rooms</span>
                                  <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">{bs.beds} Beds</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Button: Manage Studio */}
                    <button
                      onClick={() => openFacilityStudio(fac.id)}
                      className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#115e59] hover:from-[#0B625C] hover:to-[#094c48] text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 relative z-10"
                    >
                      <span>Open 8-Section Studio View</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
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
                      <th className="py-3.5 px-6">Facility & Code</th>
                      <th className="py-3.5 px-4">Contact Info & Location</th>
                      <th className="py-3.5 px-4">Capacity Breakdown</th>
                      <th className="py-3.5 px-4">FHIR & HL7 Config</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#F0F3F2]">
                    {paginatedFacilitiesList.map((fac) => {
                      let fBlocks = fac.blocks.length;
                      let fFloors = 0;
                      let fRooms = 0;
                      let fBeds = 0;
                      const blockStats = fac.blocks.map((blk) => {
                        let bFloors = blk.floors.length;
                        let bRooms = 0;
                        let bBeds = 0;
                        blk.floors.forEach((fl) => {
                          fl.departments.forEach((dp) => {
                            bRooms += dp.rooms.length;
                            dp.rooms.forEach((rm) => {
                              bBeds += rm.beds.length;
                            });
                          });
                        });
                        return {
                          id: blk.id,
                          name: blk.name,
                          code: blk.code,
                          floors: bFloors,
                          rooms: bRooms,
                          beds: bBeds,
                        };
                      });

                      fac.blocks.forEach((b) => {
                        fFloors += b.floors.length;
                        b.floors.forEach((fl) => {
                          fl.departments.forEach((dp) => {
                            fRooms += dp.rooms.length;
                            dp.rooms.forEach((rm) => (fBeds += rm.beds.length));
                          });
                        });
                      });

                      return (
                        <tr key={fac.id} className="hover:bg-[#F8FBFA] transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115e59] text-white font-bold text-xs shadow-md">
                                <Building className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-black text-[#172522] text-sm">{fac.name}</p>
                                <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                  {fac.code}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 max-w-xs">
                            <p className="font-medium text-slate-800 text-xs truncate">{fac.address}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{fac.phone} • {fac.email}</p>
                          </td>

                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                                <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">{fBlocks} Blocks</span>
                                <span className="bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200">{fFloors} Floors</span>
                                <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200">{fRooms} Rooms</span>
                                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">{fBeds} Beds</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleBlockBreakdown(fac.id)}
                                className="text-[10px] font-bold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer mt-1"
                              >
                                <span>See {fac.blocks.length} Blocks Breakdown</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${expandedBlockBreakdowns[fac.id] ? "rotate-180" : ""}`} />
                              </button>

                              {expandedBlockBreakdowns[fac.id] && (
                                <div className="space-y-1.5 mt-1.5 p-2 rounded-xl bg-teal-50/90 border border-teal-200 shadow-sm max-w-xs animate-fade-in">
                                  {blockStats.length === 0 ? (
                                    <p className="text-[9px] text-slate-400 font-bold">No blocks configured.</p>
                                  ) : (
                                    blockStats.map((bs) => (
                                      <div key={bs.id} className="flex items-center justify-between text-[9px] font-bold text-slate-700 pb-1 border-b border-teal-100/70 last:border-0 last:pb-0">
                                        <span className="truncate max-w-[90px] font-extrabold">{bs.name} ({bs.code}):</span>
                                        <span className="font-mono text-teal-800">{bs.floors} Fl • {bs.rooms} Rm • {bs.beds} Bed</span>
                                      </div>
                                    ))
                                  )}
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 font-mono text-[10px]">
                            <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200 block truncate max-w-[180px]">
                              {fac.fhirConfig?.baseUrl || "FHIR R4"}
                            </span>
                            <span className="text-slate-500 mt-0.5 block">MLLP Port: {fac.hl7Config?.mllpPort || 2575}</span>
                          </td>

                          <td className="py-4 px-4">
                            {fac.status === "Inactive" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-extrabold text-rose-800 border border-rose-300 shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                                Inactive
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F6EF] px-2.5 py-1 text-[10px] font-bold text-[#278260] border border-[#a3e4c9]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#278260] animate-pulse" />
                                Active
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  setViewModalItem({
                                    type: "Facility Overview",
                                    title: fac.name,
                                    details: {
                                      Code: fac.code,
                                      Status: fac.status,
                                      Address: fac.address,
                                      Phone: fac.phone,
                                      Email: fac.email,
                                      "Total Capacity": `${fBlocks} Blocks • ${fFloors} Floors • ${fRooms} Rooms • ${fBeds} Beds`,
                                      "Per-Block Breakdown": blockStats.map((b) => `${b.name} (${b.code}): ${b.floors} Floors, ${b.rooms} Rooms, ${b.beds} Beds`).join(" | ") || "No blocks configured",
                                      "FHIR Endpoint": fac.fhirConfig.baseUrl,
                                    },
                                  })
                                }
                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition cursor-pointer shadow-xs"
                                title="Quick View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(fac)}
                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition cursor-pointer shadow-xs"
                                title="Edit Facility Details"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              {fac.status === "Inactive" ? (
                                <button
                                  onClick={() => handleRestoreFacility(fac.id, fac.name)}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer active:scale-95"
                                  title="Restore Soft-Deleted Facility"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Restore</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmFacility(fac)}
                                  className="p-2 rounded-xl bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer shadow-xs"
                                  title="Soft Delete Facility"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => openFacilityStudio(fac.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F766E] hover:bg-[#0B625C] text-white text-xs font-bold shadow-sm transition cursor-pointer active:scale-95"
                              >
                                <span>Studio</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3D GLASS PAGINATION CONTROLS BAR */}
          {filteredFacilitiesList.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-teal-200/80 bg-white/95 p-4 shadow-sm backdrop-blur-2xl text-xs font-bold text-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span>
                  Showing{" "}
                  <strong className="text-[#0F766E]">
                    {startIndex + 1}
                  </strong>{" "}
                  to{" "}
                  <strong className="text-[#0F766E]">
                    {Math.min(startIndex + pageSize, filteredFacilitiesList.length)}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-slate-900 font-black">
                    {filteredFacilitiesList.length}
                  </strong>{" "}
                  Facilities
                </span>

                <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
                  <span className="text-[11px] text-slate-500 font-medium">Per Page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-8 rounded-xl border border-teal-200 bg-teal-50/50 px-2 font-bold text-[#0F766E] outline-none cursor-pointer"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={validCurrentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-50 hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isCurrent = pageNum === validCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 rounded-xl font-black transition cursor-pointer ${
                          isCurrent
                            ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-teal-50 hover:text-[#0F766E]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={validCurrentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-50 hover:text-[#0F766E] transition cursor-pointer shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW MODE 2: ACTIVE FACILITY 8-SECTION STUDIO VIEW        */}
      {/* ======================================================== */}
      {pageViewMode === "studio" && (
        <div className="space-y-6">
          {/* Prominent Back to Facilities List Navigation Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl border-2 border-[#7ee8d5]/80 bg-gradient-to-r from-[#0F766E] via-[#115e59] to-[#0d4f4b] p-4 text-white shadow-xl backdrop-blur-2xl">
            <button
              onClick={() => setPageViewMode("list")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#0F766E] font-black text-xs shadow-md hover:bg-teal-50 transition cursor-pointer active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#0F766E]" />
              <span>← Back to Facilities Master List</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-teal-200">Active Studio:</span>
              <span className="font-black text-white bg-white/20 px-3 py-1 rounded-xl border border-white/30 backdrop-blur-md">
                {activeFacility?.name} ({activeFacility?.code})
              </span>
            </div>
          </div>

          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard3D
              title="Infrastructure Hierarchy"
              value={`${totalBeds} Total Beds`}
              subtitle={`${totalBlocks} Blocks • ${totalFloors} Floors • ${totalRooms} Rooms`}
              icon={<Layers className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-teal-50/90 via-teal-100/40 to-emerald-50/60 border-teal-300/60"
              badge="bg-teal-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(15,118,110,0.15)]"
            />
            <GlassCard3D
              title="Bed Occupancy"
              value={`${occupancyRate}% Occupied`}
              subtitle={`${occupiedBeds} Occupied / ${availableBeds} Available`}
              icon={<BedDouble className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-indigo-50/60 border-sky-300/60"
              badge="bg-sky-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(14,165,233,0.15)]"
            />
            <GlassCard3D
              title="Interoperability Status"
              value="FHIR R4 & HL7 Active"
              subtitle={`MLLP Port ${activeFacility?.hl7Config.mllpPort} • ${activeFacility?.hieConfigs.length || 0} HIE Nodes`}
              icon={<Share2 className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-purple-50/90 via-purple-100/40 to-indigo-50/60 border-purple-300/60"
              badge="bg-purple-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(168,85,247,0.15)]"
            />
            <GlassCard3D
              title="Regulatory & Licensing"
              value={`${activeFacility?.regulatoryLicenses.length || 0} Active Licenses`}
              subtitle="CMS Certified • State Board Approved"
              icon={<Award className="w-5 h-5" />}
              cardBg="bg-gradient-to-br from-emerald-50/90 via-emerald-100/40 to-teal-50/60 border-emerald-300/60"
              badge="bg-emerald-700 text-white"
              shadow="shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
            />
          </div>

          {/* NEW ULTRA-MODERN 3D GLASS SECTION NAVIGATION TABS */}
          <div className="rounded-3xl border-2 border-[#7ee8d5]/80 bg-white/95 p-4 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#0F766E] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                Facility Operational Modules (8 Sections Studio)
              </span>
              <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg border border-teal-200">
                Click tab to configure module
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { id: "hierarchy", label: "1. Hierarchy", sub: `${totalBeds} Beds`, icon: Building },
                { id: "contacts", label: "2. Leadership", sub: `${activeFacility?.keyContacts.length || 0} Contacts`, icon: User },
                { id: "partners", label: "3. Partners", sub: `${activeFacility?.partners.length || 0} Partners`, icon: Briefcase },
                { id: "it_workstations", label: "4. IT & Devices", sub: `${activeFacility?.workstations.length || 0} Stations`, icon: Server },
                { id: "interoperability", label: "5. Interop", sub: "FHIR / HL7", icon: Share2 },
                { id: "regulatory", label: "6. Regulatory", sub: `${activeFacility?.regulatoryLicenses.length || 0} Licenses`, icon: ShieldCheck },
                { id: "standards", label: "7. Standards", sub: `${activeFacility?.codingStandards.length || 0} Standards`, icon: BookOpen },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer overflow-hidden border-2 active:scale-95 ${
                      isActive
                        ? "bg-gradient-to-br from-[#0F766E] to-[#0d4f4b] text-white border-teal-300 shadow-lg shadow-teal-900/30 -translate-y-0.5"
                        : "bg-gradient-to-br from-white to-teal-50/30 text-slate-700 border-teal-100 hover:border-teal-300 hover:bg-teal-50/60 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className={`p-1.5 rounded-xl ${isActive ? "bg-white/20 text-white" : "bg-teal-100 text-[#0F766E]"}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20 text-teal-100" : "bg-slate-100 text-slate-600"}`}>
                        {tab.sub}
                      </span>
                    </div>
                    <p className="text-xs font-black truncate">{tab.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: INFRASTRUCTURE HIERARCHY (3D GLASS ACCORDION TREE) */}
          {activeTab === "hierarchy" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/80 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-teal-100/80 pb-5">
                <div>
                  <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                    <Building className="w-5 h-5 text-[#0F766E]" />
                    Facility Infrastructure Hierarchy (Accordion Tree)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Click headers to expand or collapse Campus Blocks ➔ Floors ➔ Departments ➔ Rooms ➔ Beds
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-teal-50/80 border border-teal-200 p-1 shadow-inner mr-2">
                    <button
                      onClick={expandAllHierarchy}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold text-[#0F766E] hover:bg-white hover:shadow-xs transition cursor-pointer"
                    >
                      Expand All
                    </button>
                    <span className="text-teal-300">|</span>
                    <button
                      onClick={collapseAllHierarchy}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold text-slate-600 hover:bg-white hover:shadow-xs transition cursor-pointer"
                    >
                      Collapse All
                    </button>
                    <span className="text-teal-300">|</span>
                    <button
                      onClick={() => setShowDeletedHierarchy((prev) => !prev)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition cursor-pointer flex items-center gap-1 ${
                        showDeletedHierarchy
                          ? "bg-rose-600 text-white shadow-xs"
                          : "text-rose-700 hover:bg-white hover:shadow-xs"
                      }`}
                      title="Toggle soft-deleted hierarchy archive items"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{showDeletedHierarchy ? "Archive Mode Active" : "Show Soft-Deleted Archive"}</span>
                    </button>
                  </div>

                  {!showDeletedHierarchy && (
                    <>
                      <button
                        onClick={() => setActiveModal("block")}
                        className="px-3 py-1.5 rounded-xl bg-[#0F766E] text-white font-black text-xs hover:bg-[#0B625C] shadow-md transition cursor-pointer active:scale-95"
                      >
                        + Add Campus Block
                      </button>
                      <button
                        onClick={() => setActiveModal("floor")}
                        className="px-3 py-1.5 rounded-xl bg-sky-600 text-white font-black text-xs hover:bg-sky-700 shadow-md transition cursor-pointer active:scale-95"
                      >
                        + Add Floor
                      </button>
                      <button
                        onClick={() => setActiveModal("department")}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-black text-xs hover:bg-indigo-700 shadow-md transition cursor-pointer active:scale-95"
                      >
                        + Add Dept
                      </button>
                      <button
                        onClick={() => setActiveModal("room")}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 shadow-md transition cursor-pointer active:scale-95"
                      >
                        + Add Room
                      </button>
                      <button
                        onClick={() => setActiveModal("bed")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 shadow-md transition cursor-pointer active:scale-95"
                      >
                        + Add Bed
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* ARCHIVE BANNER WHEN IN DELETED ARCHIVE MODE */}
              {showDeletedHierarchy && (
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold shadow-sm">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      <strong>📦 Soft-Deleted Hierarchy Archive Mode Active:</strong> Showing deactivated items for {activeFacility.name}. Click <strong>Restore</strong> to reactivate any item.
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDeletedHierarchy(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs hover:bg-rose-700 transition cursor-pointer shrink-0 shadow-xs"
                  >
                    ← Back to Active Infrastructure
                  </button>
                </div>
              )}

              {/* 3D GLASS ACCORDION TREE DISPLAY */}
              <div className="space-y-4">
                {(() => {
                  const displayedBlocks = activeFacility.blocks.filter((b) =>
                    showDeletedHierarchy ? hasSoftDeletedInBlock(b) : !b.isDeleted
                  );

                  if (displayedBlocks.length === 0) {
                    return (
                      <div className="rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/30 p-8 text-center space-y-2">
                        {showDeletedHierarchy ? (
                          <>
                            <RefreshCw className="w-8 h-8 text-rose-500 mx-auto opacity-60" />
                            <p className="text-xs font-black text-rose-900">No Soft-Deleted Hierarchy Items Found in Archive!</p>
                            <p className="text-[11px] font-medium text-slate-500">All campus blocks, floors, departments, rooms, and beds for {activeFacility.name} are currently active.</p>
                          </>
                        ) : (
                          <>
                            <Building className="w-8 h-8 text-[#0F766E] mx-auto opacity-60" />
                            <p className="text-xs font-bold text-slate-700">No active Campus Blocks configured yet for {activeFacility.name}.</p>
                            <button
                              onClick={() => setActiveModal("block")}
                              className="px-4 py-2 rounded-xl bg-[#0F766E] text-white font-bold text-xs shadow-md"
                            >
                              + Create First Block
                            </button>
                          </>
                        )}
                      </div>
                    );
                  }

                  return displayedBlocks.map((block, bIdx) => {
                    const blockOpen = isBlockOpen(block.id, bIdx);
                    const displayedFloors = block.floors.filter((fl) =>
                      showDeletedHierarchy ? hasSoftDeletedInFloor(fl) : !fl.isDeleted
                    );

                    let bRooms = 0;
                    let bBeds = 0;
                    displayedFloors.forEach((fl) => {
                      const dDepts = fl.departments.filter((dp) =>
                        showDeletedHierarchy ? hasSoftDeletedInDept(dp) : !dp.isDeleted
                      );
                      dDepts.forEach((dp) => {
                        const dRooms = dp.rooms.filter((rm) =>
                          showDeletedHierarchy ? hasSoftDeletedInRoom(rm) : !rm.isDeleted
                        );
                        bRooms += dRooms.length;
                        dRooms.forEach((rm) => {
                          const dBeds = rm.beds.filter((bd) =>
                            showDeletedHierarchy ? bd.isDeleted : !bd.isDeleted
                          );
                          bBeds += dBeds.length;
                        });
                      });
                    });

                    return (
                      <div key={block.id} className="rounded-3xl border-2 border-teal-300/80 bg-white shadow-[0_10px_30px_rgba(15,118,110,0.06)] overflow-hidden transition-all duration-300">
                        {/* 1. CAMPUS BLOCK ACCORDION HEADER */}
                        <div
                          onClick={() => toggleBlockExpand(block.id)}
                          className="p-4 bg-gradient-to-r from-teal-50 via-emerald-50/50 to-white flex items-center justify-between cursor-pointer border-b border-teal-100 hover:bg-teal-100/40 transition select-none"
                        >
                          <div className="flex items-center gap-3">
                            <button className="h-7 w-7 rounded-xl bg-white border border-teal-200 text-[#0F766E] flex items-center justify-center font-bold shadow-xs">
                              {blockOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                            <Building className="w-5 h-5 text-[#0F766E]" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-black text-slate-900">{block.name}</h4>
                                <span className="font-mono text-[10px] bg-teal-100 text-[#0F766E] px-2 py-0.5 rounded font-black border border-teal-200">
                                  {block.code}
                                </span>
                                {block.isDeleted && (
                                  <span className="text-[9px] font-extrabold bg-rose-100 text-rose-800 px-2 py-0.5 rounded border border-rose-300">
                                    [Soft-Deleted]
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mt-0.5">
                                <span className="text-teal-800">{displayedFloors.length} Floors</span>
                                <span>•</span>
                                <span className="text-purple-800">{bRooms} Rooms</span>
                                <span>•</span>
                                <span className="text-emerald-800">{bBeds} Beds Total</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {showDeletedHierarchy ? (
                              block.isDeleted ? (
                                <button
                                  onClick={() => handleRestoreHierarchyItem("Block", block.id, block.name)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
                                  title="Restore Soft-Deleted Block"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Restore Block</span>
                                </button>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-400 italic">Active Container</span>
                              )
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditingBlock({ id: block.id, name: block.name, code: block.code })}
                                  className="p-1.5 rounded-xl bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 shadow-xs transition cursor-pointer"
                                  title="Edit Campus Block"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmHierarchy({ type: "Block", id: block.id, name: block.name })}
                                  className="p-1.5 rounded-xl bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 shadow-xs transition cursor-pointer"
                                  title="Soft-Delete Campus Block"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setFloorForm((prev) => ({ ...prev, blockId: block.id }));
                                    setActiveModal("floor");
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-white border border-teal-300 text-[#0F766E] font-extrabold text-xs hover:bg-teal-50 shadow-xs transition cursor-pointer"
                                >
                                  + Add Floor to Block
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* BLOCK BODY (FLOORS) */}
                        <AnimatePresence initial={false}>
                          {blockOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="p-4 space-y-3 bg-gradient-to-b from-[#FAFCFB] to-white"
                            >
                              {displayedFloors.length === 0 ? (
                                <p className="text-xs text-slate-400 italic py-2 px-2">No floors found in this view.</p>
                              ) : (
                                displayedFloors.map((floor, flIdx) => {
                                  const floorOpen = isFloorOpen(floor.id, flIdx);
                                  const displayedDepts = floor.departments.filter((dp) =>
                                    showDeletedHierarchy ? hasSoftDeletedInDept(dp) : !dp.isDeleted
                                  );

                                  let flRooms = 0;
                                  let flBeds = 0;
                                  displayedDepts.forEach((dp) => {
                                    const dRooms = dp.rooms.filter((rm) =>
                                      showDeletedHierarchy ? hasSoftDeletedInRoom(rm) : !rm.isDeleted
                                    );
                                    flRooms += dRooms.length;
                                    dRooms.forEach((rm) => {
                                      const dBeds = rm.beds.filter((bd) =>
                                        showDeletedHierarchy ? bd.isDeleted : !bd.isDeleted
                                      );
                                      flBeds += dBeds.length;
                                    });
                                  });

                                  return (
                                    <div key={floor.id} className="rounded-2xl border-2 border-sky-200/80 bg-white overflow-hidden shadow-xs">
                                      {/* 2. FLOOR ACCORDION HEADER */}
                                      <div
                                        onClick={() => toggleFloorExpand(floor.id)}
                                        className="p-3 bg-gradient-to-r from-sky-50 via-indigo-50/30 to-white flex items-center justify-between border-b border-sky-100 cursor-pointer hover:bg-sky-100/50 transition select-none"
                                      >
                                        <div className="flex items-center gap-3">
                                          <button className="h-6 w-6 rounded-lg bg-white border border-sky-200 text-sky-700 flex items-center justify-center font-bold shadow-xs">
                                            {floorOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                          </button>
                                          <span className="h-6 w-6 rounded-lg bg-sky-700 text-white flex items-center justify-center font-black text-xs shadow-xs">
                                            {floor.number}
                                          </span>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <h5 className="text-xs font-black text-slate-800">{floor.name}</h5>
                                              <span className="font-mono text-[9px] text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded font-bold">{floor.code}</span>
                                              {floor.isDeleted && (
                                                <span className="text-[9px] font-extrabold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-300">
                                                  [Soft-Deleted]
                                                </span>
                                              )}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                                              <span>{floor.departments.length} Depts</span>
                                              <span>•</span>
                                              <span className="text-purple-700">{flRooms} Rooms</span>
                                              <span>•</span>
                                              <span className="text-emerald-700">{flBeds} Beds</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                          {showDeletedHierarchy ? (
                                            floor.isDeleted ? (
                                              <button
                                                onClick={() => handleRestoreHierarchyItem("Floor", floor.id, floor.name)}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] shadow-xs transition cursor-pointer"
                                                title="Restore Soft-Deleted Floor"
                                              >
                                                <RefreshCw className="w-3.5 h-3.5" />
                                                <span>Restore Floor</span>
                                              </button>
                                            ) : (
                                              <span className="text-[10px] font-bold text-slate-400 italic">Active Container</span>
                                            )
                                          ) : (
                                            <>
                                              <button
                                                onClick={() => setEditingFloor({ id: floor.id, name: floor.name, number: floor.number, code: floor.code })}
                                                className="p-1 rounded-lg bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 shadow-xs transition cursor-pointer"
                                                title="Edit Floor"
                                              >
                                                <Pencil className="w-3 h-3" />
                                              </button>
                                              <button
                                                onClick={() => setDeleteConfirmHierarchy({ type: "Floor", id: floor.id, name: floor.name })}
                                                className="p-1 rounded-lg bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 shadow-xs transition cursor-pointer"
                                                title="Soft-Delete Floor"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                              <button
                                                onClick={() => {
                                                  setDeptForm((prev) => ({ ...prev, floorId: floor.id }));
                                                  setActiveModal("department");
                                                }}
                                                className="px-2.5 py-1 rounded-xl bg-white border border-sky-300 text-sky-800 font-bold text-[11px] hover:bg-sky-50 shadow-xs transition cursor-pointer"
                                              >
                                                + Add Dept
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      {/* FLOOR BODY (DEPARTMENTS) */}
                                      <AnimatePresence initial={false}>
                                        {floorOpen && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="p-3 space-y-3 bg-[#FAFBFD]"
                                          >
                                            {displayedDepts.length === 0 ? (
                                              <p className="text-[11px] text-slate-400 italic py-1 px-1">No departments found on this floor in this view.</p>
                                            ) : (
                                              displayedDepts.map((dept, dIdx) => {
                                                const deptOpen = isDeptOpen(dept.id, dIdx);
                                                const displayedRooms = dept.rooms.filter((rm) =>
                                                  showDeletedHierarchy ? hasSoftDeletedInRoom(rm) : !rm.isDeleted
                                                );

                                                let dBeds = 0;
                                                displayedRooms.forEach((rm) => {
                                                  const dBedsList = rm.beds.filter((bd) =>
                                                    showDeletedHierarchy ? bd.isDeleted : !bd.isDeleted
                                                  );
                                                  dBeds += dBedsList.length;
                                                });

                                                return (
                                                  <div key={dept.id} className="rounded-xl border-2 border-indigo-200/80 bg-white overflow-hidden shadow-xs">
                                                    {/* 3. DEPARTMENT ACCORDION HEADER */}
                                                    <div
                                                      onClick={() => toggleDeptExpand(dept.id)}
                                                      className="p-3 bg-gradient-to-r from-indigo-50 via-purple-50/20 to-white flex items-center justify-between border-b border-indigo-100 cursor-pointer hover:bg-indigo-100/40 transition select-none"
                                                    >
                                                      <div className="flex items-center gap-2.5">
                                                        <button className="h-5 w-5 rounded bg-white border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
                                                          {deptOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                                        </button>
                                                        <Grid className="w-4 h-4 text-indigo-600" />
                                                        <div>
                                                          <h6 className="text-xs font-black text-slate-800 flex items-center gap-2">
                                                            <span>{dept.name}</span>
                                                            <span className="font-mono text-[9px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">
                                                              {dept.code}
                                                            </span>
                                                            {dept.isDeleted && (
                                                              <span className="text-[9px] font-extrabold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-300">
                                                                [Soft-Deleted]
                                                              </span>
                                                            )}
                                                          </h6>
                                                          <p className="text-[10px] text-slate-500 font-medium">Head: {dept.head} • {dept.rooms.length} Rooms • {dBeds} Beds</p>
                                                        </div>
                                                      </div>

                                                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                                        {showDeletedHierarchy ? (
                                                          dept.isDeleted ? (
                                                            <button
                                                              onClick={() => handleRestoreHierarchyItem("Department", dept.id, dept.name)}
                                                              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] shadow-xs transition cursor-pointer"
                                                              title="Restore Soft-Deleted Department"
                                                            >
                                                              <RefreshCw className="w-3 h-3" />
                                                              <span>Restore Dept</span>
                                                            </button>
                                                          ) : (
                                                            <span className="text-[10px] font-bold text-slate-400 italic">Active Container</span>
                                                          )
                                                        ) : (
                                                          <>
                                                            <button
                                                              onClick={() => setEditingDept({ id: dept.id, name: dept.name, code: dept.code, head: dept.head })}
                                                              className="p-1 rounded bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 shadow-xs transition cursor-pointer"
                                                              title="Edit Department"
                                                            >
                                                              <Pencil className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                              onClick={() => setDeleteConfirmHierarchy({ type: "Department", id: dept.id, name: dept.name })}
                                                              className="p-1 rounded bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 shadow-xs transition cursor-pointer"
                                                              title="Soft-Delete Department"
                                                            >
                                                              <Trash2 className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                              onClick={() => {
                                                                setRoomForm((prev) => ({ ...prev, deptId: dept.id }));
                                                                setActiveModal("room");
                                                              }}
                                                              className="px-2.5 py-1 rounded-xl bg-white border border-indigo-300 text-indigo-800 font-bold text-[10px] hover:bg-indigo-50 shadow-xs transition cursor-pointer"
                                                            >
                                                              + Add Room
                                                            </button>
                                                          </>
                                                        )}
                                                      </div>
                                                    </div>

                                                    {/* DEPARTMENT BODY (ROOMS) */}
                                                    <AnimatePresence initial={false}>
                                                      {deptOpen && (
                                                        <motion.div
                                                          initial={{ opacity: 0, height: 0 }}
                                                          animate={{ opacity: 1, height: "auto" }}
                                                          exit={{ opacity: 0, height: 0 }}
                                                          className="p-3 space-y-2.5 bg-gradient-to-b from-[#FAF5FF]/30 to-white"
                                                        >
                                                          {displayedRooms.length === 0 ? (
                                                            <p className="text-[10px] text-slate-400 italic py-1">No rooms found in this department in this view.</p>
                                                          ) : (
                                                            displayedRooms.map((room) => {
                                                              const roomOpen = isRoomOpen(room.id);
                                                              const displayedBeds = room.beds.filter((bd) =>
                                                                showDeletedHierarchy ? bd.isDeleted : !bd.isDeleted
                                                              );
                                                              return (
                                                                <div key={room.id} className="rounded-xl border border-purple-200 bg-white overflow-hidden shadow-xs">
                                                                  {/* 4. ROOM ACCORDION HEADER */}
                                                                  <div
                                                                    onClick={() => toggleRoomExpand(room.id)}
                                                                    className="p-2.5 bg-purple-50/60 flex items-center justify-between border-b border-purple-100 cursor-pointer hover:bg-purple-100/50 transition select-none"
                                                                  >
                                                                    <div className="flex items-center gap-2">
                                                                      <button className="h-5 w-5 rounded bg-white border border-purple-200 text-purple-700 flex items-center justify-center font-bold">
                                                                        {roomOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                                                      </button>
                                                                      <DoorOpen className="w-3.5 h-3.5 text-purple-600" />
                                                                      <span className="text-xs font-black text-slate-900">{room.number} - {room.name}</span>
                                                                      <span className="text-[9px] bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded font-extrabold border border-purple-200">
                                                                        {room.type}
                                                                      </span>
                                                                      {room.isDeleted && (
                                                                        <span className="text-[9px] font-extrabold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-300">
                                                                          [Soft-Deleted]
                                                                        </span>
                                                                      )}
                                                                      <span className="text-[9px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-extrabold">
                                                                        {room.beds.length} Beds
                                                                      </span>
                                                                    </div>

                                                                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                                                      {showDeletedHierarchy ? (
                                                                        room.isDeleted ? (
                                                                          <button
                                                                            onClick={() => handleRestoreHierarchyItem("Room", room.id, room.number)}
                                                                            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] shadow-xs transition cursor-pointer"
                                                                            title="Restore Soft-Deleted Room"
                                                                          >
                                                                            <RefreshCw className="w-3 h-3" />
                                                                            <span>Restore Room</span>
                                                                          </button>
                                                                        ) : (
                                                                          <span className="text-[10px] font-bold text-slate-400 italic">Active Container</span>
                                                                        )
                                                                      ) : (
                                                                        <>
                                                                          <button
                                                                            onClick={() => setEditingRoom({ id: room.id, number: room.number, name: room.name, type: room.type })}
                                                                            className="p-1 rounded bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 shadow-xs transition cursor-pointer"
                                                                            title="Edit Room"
                                                                          >
                                                                            <Pencil className="w-3 h-3" />
                                                                          </button>
                                                                          <button
                                                                            onClick={() => setDeleteConfirmHierarchy({ type: "Room", id: room.id, name: room.number })}
                                                                            className="p-1 rounded bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 shadow-xs transition cursor-pointer"
                                                                            title="Soft-Delete Room"
                                                                          >
                                                                            <Trash2 className="w-3 h-3" />
                                                                          </button>
                                                                          <button
                                                                            onClick={() => {
                                                                              setBedForm((prev) => ({ ...prev, roomId: room.id }));
                                                                              setActiveModal("bed");
                                                                            }}
                                                                            className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px] hover:bg-emerald-700 shadow-xs transition cursor-pointer"
                                                                          >
                                                                            + Add Bed
                                                                          </button>
                                                                        </>
                                                                      )}
                                                                    </div>
                                                                  </div>

                                                                  {/* ROOM BODY (BEDS GRID) */}
                                                                  <AnimatePresence initial={false}>
                                                                    {roomOpen && (
                                                                      <motion.div
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: "auto" }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        className="p-3 bg-white"
                                                                      >
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                                                                          {displayedBeds.length === 0 ? (
                                                                            <p className="text-[10px] text-slate-400 italic col-span-4 py-1">No beds found in this room in this view.</p>
                                                                          ) : (
                                                                            displayedBeds.map((bed) => (
                                                                              <div
                                                                                key={bed.id}
                                                                                onClick={() => toggleBedStatus(block.id, floor.id, dept.id, room.id, bed.id)}
                                                                                title="Click to toggle status (Available -> Occupied -> Maintenance -> Cleaning)"
                                                                                className={`p-2.5 rounded-xl border-2 text-xs font-bold cursor-pointer transition transform hover:-translate-y-0.5 active:scale-95 shadow-xs ${
                                                                                  bed.status === "Available"
                                                                                    ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-300 text-emerald-950"
                                                                                    : bed.status === "Occupied"
                                                                                    ? "bg-gradient-to-br from-rose-50 to-pink-50/50 border-rose-300 text-rose-950"
                                                                                    : bed.status === "Maintenance"
                                                                                    ? "bg-gradient-to-br from-amber-50 to-yellow-50/50 border-amber-300 text-amber-950"
                                                                                    : "bg-gradient-to-br from-sky-50 to-blue-50/50 border-sky-300 text-sky-950"
                                                                                }`}
                                                                              >
                                                                                <div className="flex items-center justify-between mb-1">
                                                                                  <span className="font-mono flex items-center gap-1 font-black">
                                                                                    <BedDouble className="w-3.5 h-3.5 text-slate-700" />
                                                                                    {bed.code}
                                                                                  </span>
                                                                                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                                                    {bed.isDeleted ? (
                                                                                      <button
                                                                                        onClick={() => handleRestoreHierarchyItem("Bed", bed.id, bed.code)}
                                                                                        className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] shadow-xs cursor-pointer"
                                                                                        title="Restore Soft-Deleted Bed"
                                                                                      >
                                                                                        <RefreshCw className="w-2.5 h-2.5" />
                                                                                        <span>Restore</span>
                                                                                      </button>
                                                                                    ) : (
                                                                                      <>
                                                                                        <button
                                                                                          onClick={() => setEditingBed({ id: bed.id, code: bed.code, type: bed.type, status: bed.status, patientInfo: bed.patientInfo })}
                                                                                          className="p-0.5 rounded bg-white border text-slate-600 hover:text-teal-700 hover:bg-teal-50"
                                                                                          title="Edit Bed"
                                                                                        >
                                                                                          <Pencil className="w-3 h-3" />
                                                                                        </button>
                                                                                        <button
                                                                                          onClick={() => setDeleteConfirmHierarchy({ type: "Bed", id: bed.id, name: bed.code })}
                                                                                          className="p-0.5 rounded bg-white border text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                                                                                          title="Soft-Delete Bed"
                                                                                        >
                                                                                          <Trash2 className="w-3 h-3" />
                                                                                        </button>
                                                                                      </>
                                                                                    )}
                                                                                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-black bg-white/95 border shadow-xs">
                                                                                      {bed.isDeleted ? "DELETED" : bed.status}
                                                                                    </span>
                                                                                  </div>
                                                                                </div>
                                                                                <p className="text-[9px] text-slate-600 font-medium">{bed.type}</p>
                                                                                {bed.patientInfo && (
                                                                                  <p className="text-[9px] font-black text-rose-700 truncate mt-0.5">{bed.patientInfo}</p>
                                                                                )}
                                                                              </div>
                                                                            ))
                                                                          )}
                                                                        </div>
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
                                })
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* TAB 2 & 3: KEY CONTACTS */}
          {activeTab === "contacts" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#0F766E]" />
                    Key Leadership Contacts Directory
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Director of Nursing, Administrator, Chief Medical Officer, Compliance Officer
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal("contact")}
                  className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0B625C] text-white font-bold text-xs shadow-md transition cursor-pointer active:scale-95"
                >
                  + Add Key Contact
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeFacility.keyContacts.map((contact) => (
                  <div key={contact.id} className="rounded-2xl border-2 border-teal-100 bg-white p-4 shadow-xs hover:shadow-md transition space-y-3 relative group">
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <button
                        onClick={() =>
                          setViewModalItem({
                            type: "Key Contact",
                            title: contact.name,
                            details: {
                              Role: contact.role,
                              Email: contact.email,
                              Phone: contact.phone,
                              Office: contact.officeLocation,
                              "License #": contact.licenseNumber || "N/A",
                            },
                          })
                        }
                        className="p-1 text-slate-400 hover:text-teal-700 transition"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteKeyContact(contact.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                        title="Delete Contact"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-teal-100 text-[#0F766E] flex items-center justify-center font-black text-sm shadow-inner">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {contact.role === "Custom" ? contact.customRoleName : contact.role}
                        </span>
                        <h4 className="text-xs font-black text-slate-800 mt-1">{contact.name}</h4>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {contact.email}
                        </span>
                        <button onClick={() => copyToClipboard(contact.email, "Email")} className="text-slate-400 hover:text-teal-700">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {contact.phone}
                        </span>
                        <button onClick={() => copyToClipboard(contact.phone, "Phone")} className="text-slate-400 hover:text-teal-700">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.officeLocation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXTERNAL PARTNERS */}
          {activeTab === "partners" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#0F766E]" />
                    Facility Partners (Pharmacies, Laboratories & Imaging Centers)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Diagnostic partners, in-house dispensaries, and radiology centers
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    {(["All", "Pharmacy", "Laboratory", "Imaging Center"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setPartnerCategoryFilter(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                          partnerCategoryFilter === cat ? "bg-white text-[#0F766E] shadow-xs" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModal("partner")}
                    className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0B625C] text-white font-bold text-xs shadow-md transition cursor-pointer active:scale-95"
                  >
                    + Add Partner
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPartners.map((partner) => (
                  <div key={partner.id} className="rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-xs hover:shadow-md transition space-y-3 relative">
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <button
                        onClick={() =>
                          setViewModalItem({
                            type: "Partner Institution",
                            title: partner.name,
                            details: {
                              Category: partner.category,
                              Contact: partner.contactPerson,
                              Email: partner.email,
                              Phone: partner.phone,
                              Type: partner.type,
                              Status: partner.status,
                              "NPI / License": partner.licenseOrNpi || "N/A",
                            },
                          })
                        }
                        className="p-1 text-slate-400 hover:text-sky-700 transition"
                        title="View Partner Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePartner(partner.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                        {partner.category}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        partner.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {partner.type}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-800">{partner.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Contact: {partner.contactPerson}</p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <p className="truncate">Email: {partner.email}</p>
                      <p>Phone: {partner.phone}</p>
                      {partner.licenseOrNpi && <p className="font-mono text-[10px] text-slate-500">NPI/License: {partner.licenseOrNpi}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: IT & WORKSTATIONS */}
          {activeTab === "it_workstations" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#0F766E]" />
                  IT Infrastructure, WiFi & Workstation Dashboard
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Network subnet settings, secure hospital SSIDs, workstation health, and mobile carts
                </p>
              </div>

              {/* NETWORK CONFIGURATION */}
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-3">
                <h4 className="text-xs font-black text-[#0F766E] uppercase tracking-wider flex items-center gap-2">
                  <Wifi className="w-4 h-4" /> Facility Network Subnet
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Subnet</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.networkConfig.subnet}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Gateway</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.networkConfig.gateway}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">VLAN ID</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.networkConfig.vlanId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Primary DNS</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.networkConfig.dnsPrimary}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Secondary DNS</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.networkConfig.dnsSecondary}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Firewall</span>
                    <span className="font-bold text-emerald-800 truncate block">{activeFacility.networkConfig.firewallProfile}</span>
                  </div>
                </div>
              </div>

              {/* WORKSTATIONS & DEVICES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Workstations */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-sky-600" /> Workstations ({activeFacility.workstations.length})
                    </h4>
                    <button onClick={() => setActiveModal("workstation")} className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold cursor-pointer">
                      + Add Station
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activeFacility.workstations.map((ws) => (
                      <div key={ws.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <div>
                            <span className="font-mono font-bold text-slate-800">{ws.stationId}</span>
                            <p className="text-[10px] text-slate-500">Location: {ws.locationRoom}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">{ws.ipAddress}</span>
                          <button onClick={() => copyToClipboard(ws.ipAddress, "IP Address")} className="text-slate-400 hover:text-sky-700">
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Inventory */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-600" /> Device Inventory ({activeFacility.deviceInventory.length})
                    </h4>
                    <button onClick={() => setActiveModal("device")} className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold cursor-pointer">
                      + Add Device
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activeFacility.deviceInventory.map((dev) => (
                      <div key={dev.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800">{dev.deviceName}</span>
                          <p className="text-[10px] text-slate-500">S/N: {dev.serialNumber}</p>
                        </div>
                        <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-medium">{dev.deviceType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INTEROPERABILITY */}
          {activeTab === "interoperability" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#0F766E]" />
                  Interoperability Developer Hub & Integration Endpoints
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  FHIR R4 server endpoints, HL7 V2 MLLP listener parameters, and National Org Identifiers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* FHIR CONFIG */}
                <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                    <h4 className="text-xs font-black text-purple-900 flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-700" /> FHIR R4 Endpoint URL
                    </h4>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-purple-200 text-purple-900 rounded">
                      {activeFacility.fhirConfig.version}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-purple-200">
                      <span className="font-mono text-purple-900 font-bold truncate">{activeFacility.fhirConfig.baseUrl}</span>
                      <button onClick={() => copyToClipboard(activeFacility.fhirConfig.baseUrl, "FHIR URL")} className="ml-2 text-purple-700 hover:text-purple-900">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block">Auth Scope</span>
                        <span className="font-bold text-slate-800">{activeFacility.fhirConfig.authType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block">Tenant ID</span>
                        <span className="font-mono font-bold text-slate-800">{activeFacility.fhirConfig.tenantIdentifier}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HL7 CONFIG */}
                <div className="p-4 rounded-2xl border-2 border-sky-200 bg-sky-50/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                    <h4 className="text-xs font-black text-sky-900 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-sky-700" /> HL7 V2 MLLP Listener
                    </h4>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-sky-200 text-sky-900 rounded">
                      Port {activeFacility.hl7Config.mllpPort}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sky-200">
                      <span className="font-mono text-sky-900 font-bold">mllp://{activeFacility.hl7Config.hostIp}:{activeFacility.hl7Config.mllpPort}</span>
                      <button onClick={() => copyToClipboard(`mllp://${activeFacility.hl7Config.hostIp}:${activeFacility.hl7Config.mllpPort}`, "HL7 MLLP Address")} className="ml-2 text-sky-700 hover:text-sky-900">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block">Supported Messages</span>
                      <span className="font-mono text-[11px] font-bold text-slate-700">{activeFacility.hl7Config.supportedMessageTypes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ORGANIZATION IDENTIFIERS */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-[#0F766E]" /> National Healthcare Identifiers
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">NPI Number</span>
                    <span className="font-mono font-bold text-[#0F766E]">{activeFacility.orgIdentifiers.npi}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">CLIA Number</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.orgIdentifiers.cliaNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Root OID</span>
                    <span className="font-mono text-[10px] font-bold text-slate-700 truncate block">{activeFacility.orgIdentifiers.oid}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">State Org ID</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.orgIdentifiers.stateOrgId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Tax ID</span>
                    <span className="font-mono font-bold text-slate-800">{activeFacility.orgIdentifiers.taxId}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REGULATORY & COMPLIANCE */}
          {activeTab === "regulatory" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                    Facility Licensing & Accreditation Expiry Tracker
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    State Health Department licensing, CMS Federal Certification, and Joint Commission accreditations
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal("regulatory")}
                  className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0B625C] text-white font-bold text-xs shadow-md transition cursor-pointer active:scale-95"
                >
                  + Add License
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeFacility.regulatoryLicenses.map((lic) => (
                  <div key={lic.id} className="rounded-2xl border-2 border-emerald-100 bg-white p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                        {lic.licenseType}
                      </span>
                      <span className="text-[9px] font-bold bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-full">
                        {lic.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-800">{lic.title}</h4>
                      <p className="text-[10px] text-slate-500">Issuer: {lic.issuingAuthority}</p>
                    </div>

                    {/* Expiry Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-600">
                        <span>Validity Status</span>
                        <span>Valid until {lic.expiryDate}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-4/5 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="font-mono font-bold text-[#0F766E]">Lic #: {lic.licenseNumber}</span>
                      <span className="text-[10px] text-slate-500">Issued: {lic.issueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CLINICAL DATA STANDARDS */}
          {activeTab === "standards" && (
            <div className="rounded-3xl border-2 border-[#7ee8d5]/60 bg-white/95 p-6 shadow-[0_15px_40px_rgba(15,118,110,0.08)] backdrop-blur-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-[#172522] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#0F766E]" />
                    Clinical Terminology & Coding Standards
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    ICD-10/ICD-11 Diagnosis, CPT-4/HCPCS Procedure codes, LOINC Laboratory, SNOMED-CT & RxNorm Allergy standards (Toggle active status below)
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal("standard")}
                  className="px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0B625C] text-white font-bold text-xs shadow-md transition cursor-pointer active:scale-95"
                >
                  + Add Standard
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeFacility.codingStandards.map((std) => (
                  <div key={std.id} className="rounded-2xl border-2 border-teal-100 bg-white p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded">
                        {std.category} Standard
                      </span>

                      <button
                        onClick={() => toggleCodingStandard(std.id)}
                        className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full cursor-pointer transition ${
                          std.isActive ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-slate-100 text-slate-600 border border-slate-300"
                        }`}
                      >
                        {std.isActive ? "✓ Active in EMR" : "Inactive"}
                      </button>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-800">{std.standardName}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Version: {std.version}</p>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {std.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODAL FOR INSPECTING ITEM DETAILS */}
      <AnimatePresence>
        {viewModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#0F766E]" />
                  <h3 className="text-base font-black text-slate-900">View {viewModalItem.type}</h3>
                </div>
                <button onClick={() => setViewModalItem(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black text-[#0F766E]">{viewModalItem.title}</h4>
                <div className="space-y-2 bg-teal-50/50 p-4 rounded-2xl border border-teal-100 text-xs">
                  {Object.entries(viewModalItem.details).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-teal-100/50 pb-1.5 last:border-0 last:pb-0">
                      <span className="font-bold text-slate-500">{key}:</span>
                      <span className="font-mono font-bold text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setViewModalItem(null)} className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold text-xs shadow-md">
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL (ICD-10 Style Prompt) */}
      <AnimatePresence>
        {deleteConfirmFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md"
              onClick={() => setDeleteConfirmFacility(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-md w-full rounded-3xl border-2 border-rose-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(244,63,94,0.25)] backdrop-blur-3xl space-y-5 my-auto"
            >
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  Confirm Soft Delete
                </h3>
                <button
                  onClick={() => setDeleteConfirmFacility(null)}
                  className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p className="font-medium text-sm text-slate-800">
                  Are you sure you want to soft-delete facility{" "}
                  <span className="font-black text-rose-700">"{deleteConfirmFacility.name}"</span> (
                  <span className="font-mono font-bold text-rose-800">{deleteConfirmFacility.code}</span>)?
                </p>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px] font-semibold space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                    Production Data Safety Guarantee:
                  </p>
                  <p>
                    This facility will be marked as <strong>INACTIVE / Soft-Deleted</strong>. No database records will be permanently lost or purged. You can restore this facility back to Active status anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmFacility(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSoftDeleteFacility}
                  className="px-5 py-2 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-md transition cursor-pointer"
                >
                  Yes, Soft-Delete Facility
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ALL CREATION MODALS */}

      {/* 1. NEW FACILITY MODAL */}
      <AnimatePresence>
        {activeModal === "facility" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-lg w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,118,110,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-black text-[#132a26] flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#0F766E]" /> Create New Healthcare Facility
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddFacilitySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facility Name *</label>
                  <input type="text" value={facilityForm.name} onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })} placeholder="e.g. St. Jude Regional Medical Center" required className="h-9 w-full rounded-xl border border-slate-200 px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Facility Type * (DB Live)</label>
                    <select
                      value={facilityForm.facilityTypeId}
                      onChange={(e) => setFacilityForm({ ...facilityForm, facilityTypeId: e.target.value })}
                      className="h-9 w-full rounded-xl border border-slate-200 px-3 font-bold text-slate-800 outline-none focus:border-[#0F766E]"
                    >
                      {liveFacilityTypes.length > 0 ? (
                        liveFacilityTypes.map((ft) => (
                          <option key={ft.id} value={ft.id}>
                            {ft.name}
                          </option>
                        ))
                      ) : (
                        <option value="">Loading Facility Types from DB...</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Facility Code</label>
                    <input type="text" value={facilityForm.code} onChange={(e) => setFacilityForm({ ...facilityForm, code: e.target.value })} placeholder="FAC-MAIN-01" className="h-9 w-full rounded-xl border border-slate-200 px-3 font-mono font-bold text-[#0F766E] outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="text" value={facilityForm.phone} onChange={(e) => setFacilityForm({ ...facilityForm, phone: e.target.value })} placeholder="+1 (555) 019-2831" className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input type="email" value={facilityForm.email} onChange={(e) => setFacilityForm({ ...facilityForm, email: e.target.value })} placeholder="contact@facility.org" className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Address / Location</label>
                  <input type="text" value={facilityForm.address} onChange={(e) => setFacilityForm({ ...facilityForm, address: e.target.value })} placeholder="100 Healthcare Boulevard, Suite 400" className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold hover:bg-[#0B625C] shadow-md">Initialize Facility</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CAMPUS BLOCK MODAL */}
      <AnimatePresence>
        {activeModal === "block" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,118,110,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-teal-600" /> Add Campus Block
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddBlockSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Block Name *</label>
                  <input type="text" value={blockForm.name} onChange={(e) => setBlockForm({ ...blockForm, name: e.target.value })} placeholder="e.g. Block A - Surgical Tower" required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-900 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Block Code</label>
                  <input type="text" value={blockForm.code} onChange={(e) => setBlockForm({ ...blockForm, code: e.target.value })} placeholder="BLK-A" className="h-9 w-full rounded-xl border px-3 font-mono font-bold text-teal-700 outline-none" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold shadow-md">Create Block</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. FLOOR MODAL */}
      <AnimatePresence>
        {activeModal === "floor" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-sky-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(14,165,233,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-600" /> Add Floor
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddFloorSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Campus Block</label>
                  <select value={floorForm.blockId} onChange={(e) => setFloorForm({ ...floorForm, blockId: e.target.value })} className="h-9 w-full rounded-xl border px-3 font-bold text-slate-800 outline-none">
                    {activeFacility?.blocks.map((b) => (
                      <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Floor Name *</label>
                  <input type="text" value={floorForm.name} onChange={(e) => setFloorForm({ ...floorForm, name: e.target.value })} placeholder="First Floor - Trauma & ER" required className="h-9 w-full rounded-xl border px-3 font-medium outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Floor Number</label>
                    <input type="number" value={floorForm.number} onChange={(e) => setFloorForm({ ...floorForm, number: parseInt(e.target.value) || 1 })} required className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Floor Code</label>
                    <input type="text" value={floorForm.code} onChange={(e) => setFloorForm({ ...floorForm, code: e.target.value })} placeholder="FL-01" className="h-9 w-full rounded-xl border px-3 font-mono outline-none" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold shadow-md">Create Floor</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. DEPARTMENT MODAL */}
      <AnimatePresence>
        {activeModal === "department" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-indigo-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(99,102,241,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-indigo-600" /> Add Clinical Department
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddDeptSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Floor *</label>
                  <select value={deptForm.floorId} onChange={(e) => setDeptForm({ ...deptForm, floorId: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-800 outline-none">
                    <option value="">Select Floor...</option>
                    {activeFacility?.blocks.flatMap((blk) =>
                      blk.floors.map((fl) => (
                        <option key={fl.id} value={fl.id}>{blk.name} ➔ {fl.name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department Name *</label>
                  <input type="text" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} placeholder="e.g. Cardiology & Critical Care" required className="h-9 w-full rounded-xl border px-3 font-medium outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Dept Code</label>
                    <input type="text" value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} placeholder="DEPT-CARD" className="h-9 w-full rounded-xl border px-3 font-mono outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Head of Dept</label>
                    <input type="text" value={deptForm.head} onChange={(e) => setDeptForm({ ...deptForm, head: e.target.value })} placeholder="Dr. Sarah Jenkins" className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold shadow-md">Create Department</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ROOM MODAL */}
      <AnimatePresence>
        {activeModal === "room" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-purple-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(168,85,247,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <DoorOpen className="w-5 h-5 text-purple-600" /> Add Room
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddRoomSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Department *</label>
                  <select value={roomForm.deptId} onChange={(e) => setRoomForm({ ...roomForm, deptId: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-800 outline-none">
                    <option value="">Select Department...</option>
                    {activeFacility?.blocks.flatMap((blk) =>
                      blk.floors.flatMap((fl) =>
                        fl.departments.map((dp) => (
                          <option key={dp.id} value={dp.id}>{fl.name} ➔ {dp.name}</option>
                        ))
                      )
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Room Number *</label>
                    <input type="text" value={roomForm.number} onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })} placeholder="Room 101" required className="h-9 w-full rounded-xl border px-3 font-medium outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Room Name</label>
                    <input type="text" value={roomForm.name} onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })} placeholder="Trauma Bay A" className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Room Type</label>
                  <select value={roomForm.type} onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })} className="h-9 w-full rounded-xl border px-3 outline-none">
                    <option value="ICU Bay">ICU Bay</option>
                    <option value="Private Ward">Private Ward</option>
                    <option value="General Ward">General Ward</option>
                    <option value="Operating Theater">Operating Theater</option>
                    <option value="Recovery Suite">Recovery Suite</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold shadow-md">Create Room</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. BED MODAL */}
      <AnimatePresence>
        {activeModal === "bed" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-emerald-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(16,185,129,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-emerald-700" /> Add Bed
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddBedSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Room *</label>
                  <select value={bedForm.roomId} onChange={(e) => setBedForm({ ...bedForm, roomId: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-800 outline-none">
                    <option value="">Select Room...</option>
                    {activeFacility?.blocks.flatMap((blk) =>
                      blk.floors.flatMap((fl) =>
                        fl.departments.flatMap((dp) =>
                          dp.rooms.map((rm) => (
                            <option key={rm.id} value={rm.id}>{dp.name} ➔ {rm.number}</option>
                          ))
                        )
                      )
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bed Code *</label>
                    <input type="text" value={bedForm.code} onChange={(e) => setBedForm({ ...bedForm, code: e.target.value })} placeholder="BED-101-A" required className="h-9 w-full rounded-xl border px-3 font-mono font-bold outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bed Type</label>
                    <select value={bedForm.type} onChange={(e) => setBedForm({ ...bedForm, type: e.target.value })} className="h-9 w-full rounded-xl border px-3 outline-none">
                      <option value="ICU Electric">ICU Electric</option>
                      <option value="Standard Ward">Standard Ward</option>
                      <option value="Pediatric">Pediatric Bed</option>
                      <option value="Deluxe Bariatric">Deluxe Bariatric</option>
                      <option value="Isolation Bed">Isolation Bed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Status</label>
                  <select value={bedForm.status} onChange={(e) => setBedForm({ ...bedForm, status: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 font-bold outline-none">
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Cleaning">Cleaning</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold shadow-md">Create Bed</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. CONTACT MODAL */}
      <AnimatePresence>
        {activeModal === "contact" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,118,110,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0F766E]" /> Add Leadership Contact
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddContactSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Executive Role *</label>
                  <select
                    value={contactForm.role}
                    onChange={(e) => setContactForm({ ...contactForm, role: e.target.value as any })}
                    className="h-9 w-full rounded-xl border px-3 font-bold text-slate-800 outline-none"
                  >
                    <option value="Director of Nursing">Director of Nursing</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Medical Director">Medical Director / CMO</option>
                    <option value="Safety Officer">Safety Officer</option>
                    <option value="Operations Lead">Operations Lead</option>
                    <option value="Custom">Custom Role Title</option>
                  </select>
                </div>

                {contactForm.role === "Custom" && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Custom Role Name *</label>
                    <input type="text" value={contactForm.customRoleName || ""} onChange={(e) => setContactForm({ ...contactForm, customRoleName: e.target.value })} placeholder="e.g. Chief Pharmacy Officer" className="h-9 w-full rounded-xl border px-3 font-medium outline-none" />
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Full Name *</label>
                  <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Dr. Administrator Name" required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-900 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="admin@facility.org" className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="text" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Office Location</label>
                  <input type="text" value={contactForm.officeLocation} onChange={(e) => setContactForm({ ...contactForm, officeLocation: e.target.value })} placeholder="Suite 101, Executive Wing" className="h-9 w-full rounded-xl border px-3 outline-none" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold shadow-md">Register Contact</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. PARTNER MODAL */}
      <AnimatePresence>
        {activeModal === "partner" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-sky-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(14,165,233,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sky-600" /> Add Partner Institution
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddPartnerSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Partner Category *</label>
                  <select value={partnerForm.category} onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 font-bold outline-none">
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Imaging Center">Imaging Center</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Partner Name *</label>
                  <input type="text" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} placeholder="e.g. Apex Diagnostics Lab" required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-900 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Person</label>
                    <input type="text" value={partnerForm.contactPerson} onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })} placeholder="Lead Manager" className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Integration Type</label>
                    <select value={partnerForm.type} onChange={(e) => setPartnerForm({ ...partnerForm, type: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 outline-none">
                      <option value="In-House">In-House Department</option>
                      <option value="External Partner">External Partner</option>
                      <option value="Contracted">Contracted Network</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold shadow-md">Add Partner</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. WORKSTATION MODAL */}
      <AnimatePresence>
        {activeModal === "workstation" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-sky-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(14,165,233,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-sky-600" /> Register Workstation
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddWorkstationSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Terminal Station ID *</label>
                  <input type="text" value={workstationForm.stationId} onChange={(e) => setWorkstationForm({ ...workstationForm, stationId: e.target.value })} placeholder="WS-ER-101" required className="h-9 w-full rounded-xl border px-3 font-mono font-bold outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Room</label>
                  <input type="text" value={workstationForm.locationRoom} onChange={(e) => setWorkstationForm({ ...workstationForm, locationRoom: e.target.value })} placeholder="Room 101 Trauma Bay" className="h-9 w-full rounded-xl border px-3 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">IP Address</label>
                  <input type="text" value={workstationForm.ipAddress} onChange={(e) => setWorkstationForm({ ...workstationForm, ipAddress: e.target.value })} placeholder="192.168.10.50" className="h-9 w-full rounded-xl border px-3 font-mono outline-none" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold shadow-md">Add Workstation</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. DEVICE MODAL */}
      <AnimatePresence>
        {activeModal === "device" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-purple-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(168,85,247,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" /> Register Medical Device
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddDeviceSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Device Name *</label>
                  <input type="text" value={deviceForm.deviceName} onChange={(e) => setDeviceForm({ ...deviceForm, deviceName: e.target.value })} placeholder="Mobile Telemetry Cart 01" required className="h-9 w-full rounded-xl border px-3 font-bold outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Device Type</label>
                  <select value={deviceForm.deviceType} onChange={(e) => setDeviceForm({ ...deviceForm, deviceType: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 outline-none">
                    <option value="Medical Cart">Medical Cart</option>
                    <option value="Telemetry Monitor">Telemetry Monitor</option>
                    <option value="Diagnostic Tablet">Diagnostic Tablet</option>
                    <option value="Barcode Scanner">Barcode Scanner</option>
                    <option value="Vital Signs Monitor">Vital Signs Monitor</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Serial Number</label>
                  <input type="text" value={deviceForm.serialNumber} onChange={(e) => setDeviceForm({ ...deviceForm, serialNumber: e.target.value })} placeholder="SN-9920192" className="h-9 w-full rounded-xl border px-3 font-mono outline-none" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold shadow-md">Register Device</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 11. REGULATORY MODAL */}
      <AnimatePresence>
        {activeModal === "regulatory" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-emerald-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(16,185,129,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> Add License / Accreditation
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddRegulatorySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type *</label>
                  <select value={regulatoryForm.licenseType} onChange={(e) => setRegulatoryForm({ ...regulatoryForm, licenseType: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 font-bold outline-none">
                    <option value="State Licensing">State Licensing</option>
                    <option value="Federal Certification">Federal Certification</option>
                    <option value="Accreditation">Accreditation (JCI, AAAHC)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title *</label>
                  <input type="text" value={regulatoryForm.title} onChange={(e) => setRegulatoryForm({ ...regulatoryForm, title: e.target.value })} placeholder="State Hospital Operating License" required className="h-9 w-full rounded-xl border px-3 font-bold outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issuing Authority</label>
                  <input type="text" value={regulatoryForm.issuingAuthority} onChange={(e) => setRegulatoryForm({ ...regulatoryForm, issuingAuthority: e.target.value })} placeholder="State Dept of Health" className="h-9 w-full rounded-xl border px-3 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">License Number</label>
                    <input type="text" value={regulatoryForm.licenseNumber} onChange={(e) => setRegulatoryForm({ ...regulatoryForm, licenseNumber: e.target.value })} placeholder="LIC-99201" className="h-9 w-full rounded-xl border px-3 font-mono outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                    <input type="date" value={regulatoryForm.expiryDate} onChange={(e) => setRegulatoryForm({ ...regulatoryForm, expiryDate: e.target.value })} className="h-9 w-full rounded-xl border px-3 outline-none" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md">Add License</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 12. CODING STANDARDS MODAL */}
      <AnimatePresence>
        {activeModal === "standard" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative max-w-md w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,118,110,0.25)] backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" /> Add Clinical Coding Standard
                </h3>
                <button onClick={() => setActiveModal(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddStandardSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Standard Category *</label>
                  <select value={standardForm.category} onChange={(e) => setStandardForm({ ...standardForm, category: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 font-bold outline-none">
                    <option value="Diagnosis">Diagnosis Coding Standard</option>
                    <option value="Procedure">Procedure Coding Standard</option>
                    <option value="Laboratory">Laboratory Coding Standard</option>
                    <option value="Allergy">Allergy Coding Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Standard Name *</label>
                  <input type="text" value={standardForm.standardName} onChange={(e) => setStandardForm({ ...standardForm, standardName: e.target.value })} placeholder="e.g. ICD-10-CM / LOINC" required className="h-9 w-full rounded-xl border px-3 font-bold outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Version / Release</label>
                  <input type="text" value={standardForm.version} onChange={(e) => setStandardForm({ ...standardForm, version: e.target.value })} placeholder="2026 Release" className="h-9 w-full rounded-xl border px-3 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Notes</label>
                  <textarea value={standardForm.notes} onChange={(e) => setStandardForm({ ...standardForm, notes: e.target.value })} placeholder="Clinical mapping details..." className="w-full rounded-xl border p-2 text-xs h-16 outline-none" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold shadow-md">Add Standard</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13. EDIT FACILITY MODAL */}
      <AnimatePresence>
        {showEditFacilityModal && editingFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md"
              onClick={() => {
                setShowEditFacilityModal(false);
                setEditingFacility(null);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-lg w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,118,110,0.25)] backdrop-blur-3xl space-y-4 my-auto z-10"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-teal-600" /> Edit Facility Details
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditFacilityModal(false);
                    setEditingFacility(null);
                  }}
                  className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditFacility} className="space-y-3.5 text-xs font-bold text-slate-700">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Facility Name *</label>
                    <input
                      type="text"
                      required
                      value={editFacilityForm.name}
                      onChange={(e) => setEditFacilityForm({ ...editFacilityForm, name: e.target.value })}
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Facility Code *</label>
                    <input
                      type="text"
                      required
                      value={editFacilityForm.code}
                      onChange={(e) => setEditFacilityForm({ ...editFacilityForm, code: e.target.value.toUpperCase() })}
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-mono font-black text-[#0F766E] uppercase outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Facility Type</label>
                    <select
                      value={editFacilityForm.facilityTypeId}
                      onChange={(e) => setEditFacilityForm({ ...editFacilityForm, facilityTypeId: e.target.value })}
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]"
                    >
                      {liveFacilityTypes.map((ft) => (
                        <option key={ft.id} value={ft.id}>
                          {ft.name} ({ft.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Status</label>
                    <select
                      value={editFacilityForm.status}
                      onChange={(e) => setEditFacilityForm({ ...editFacilityForm, status: e.target.value as "ACTIVE" | "INACTIVE" })}
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive (Soft Deleted)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Address</label>
                  <input
                    type="text"
                    value={editFacilityForm.address}
                    onChange={(e) => setEditFacilityForm({ ...editFacilityForm, address: e.target.value })}
                    placeholder="e.g. 100 Health Sciences Way, Suite 400"
                    className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Phone</label>
                    <input
                      type="text"
                      value={editFacilityForm.phone}
                      onChange={(e) => setEditFacilityForm({ ...editFacilityForm, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      value={editFacilityForm.email}
                      onChange={(e) => setEditFacilityForm({ ...editFacilityForm, email: e.target.value })}
                      placeholder="contact@facility.com"
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditFacilityModal(false);
                      setEditingFacility(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdatingFacility}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#115e59] text-white font-black shadow-md hover:from-[#0B625C] hover:to-[#094c48] transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {isUpdatingFacility && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Save Facility Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT BLOCK MODAL */}
      <AnimatePresence>
        {editingBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" onClick={() => setEditingBlock(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-teal-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-teal-600" /> Edit Campus Block
                </h3>
                <button onClick={() => setEditingBlock(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditBlock} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Block Name *</label>
                  <input type="text" value={editingBlock.name} onChange={(e) => setEditingBlock({ ...editingBlock, name: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-900 outline-none focus:border-[#0F766E]" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Block Code *</label>
                  <input type="text" value={editingBlock.code} onChange={(e) => setEditingBlock({ ...editingBlock, code: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-mono font-bold text-teal-700 outline-none focus:border-[#0F766E]" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setEditingBlock(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={isUpdatingHierarchy} className="px-5 py-2 rounded-xl bg-[#0F766E] text-white font-bold shadow-md hover:bg-[#0B625C] disabled:opacity-50 flex items-center gap-2">
                    {isUpdatingHierarchy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT FLOOR MODAL */}
      <AnimatePresence>
        {editingFloor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" onClick={() => setEditingFloor(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-sky-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-sky-600" /> Edit Floor
                </h3>
                <button onClick={() => setEditingFloor(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditFloor} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Floor Name *</label>
                  <input type="text" value={editingFloor.name} onChange={(e) => setEditingFloor({ ...editingFloor, name: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-900 outline-none focus:border-sky-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Floor Number *</label>
                    <input type="number" value={editingFloor.number} onChange={(e) => setEditingFloor({ ...editingFloor, number: parseInt(e.target.value) || 1 })} required className="h-9 w-full rounded-xl border px-3 font-bold outline-none focus:border-sky-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Floor Code *</label>
                    <input type="text" value={editingFloor.code} onChange={(e) => setEditingFloor({ ...editingFloor, code: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-mono font-bold text-sky-700 outline-none focus:border-sky-600" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setEditingFloor(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={isUpdatingHierarchy} className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold shadow-md hover:bg-sky-700 disabled:opacity-50 flex items-center gap-2">
                    {isUpdatingHierarchy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT DEPARTMENT MODAL */}
      <AnimatePresence>
        {editingDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" onClick={() => setEditingDept(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-indigo-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-indigo-600" /> Edit Clinical Department
                </h3>
                <button onClick={() => setEditingDept(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditDept} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department Name *</label>
                  <input type="text" value={editingDept.name} onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold text-slate-900 outline-none focus:border-indigo-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Dept Code *</label>
                    <input type="text" value={editingDept.code} onChange={(e) => setEditingDept({ ...editingDept, code: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-mono font-bold text-indigo-700 outline-none focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Head of Dept</label>
                    <input type="text" value={editingDept.head || ""} onChange={(e) => setEditingDept({ ...editingDept, head: e.target.value })} className="h-9 w-full rounded-xl border px-3 outline-none focus:border-indigo-600" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setEditingDept(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={isUpdatingHierarchy} className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">
                    {isUpdatingHierarchy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT ROOM MODAL */}
      <AnimatePresence>
        {editingRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" onClick={() => setEditingRoom(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-purple-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-purple-600" /> Edit Room
                </h3>
                <button onClick={() => setEditingRoom(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditRoom} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Room Number *</label>
                    <input type="text" value={editingRoom.number} onChange={(e) => setEditingRoom({ ...editingRoom, number: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-mono font-bold text-slate-900 outline-none focus:border-purple-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Room Name *</label>
                    <input type="text" value={editingRoom.name} onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-bold outline-none focus:border-purple-600" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Room Type</label>
                  <select value={editingRoom.type} onChange={(e) => setEditingRoom({ ...editingRoom, type: e.target.value })} className="h-9 w-full rounded-xl border px-3 outline-none focus:border-purple-600 font-bold">
                    <option value="ICU Bay">ICU Bay</option>
                    <option value="Private Ward">Private Ward</option>
                    <option value="General Ward">General Ward</option>
                    <option value="Operating Theater">Operating Theater</option>
                    <option value="Recovery Suite">Recovery Suite</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setEditingRoom(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={isUpdatingHierarchy} className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold shadow-md hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2">
                    {isUpdatingHierarchy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT BED MODAL */}
      <AnimatePresence>
        {editingBed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" onClick={() => setEditingBed(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-emerald-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-emerald-600" /> Edit Bed Details
                </h3>
                <button onClick={() => setEditingBed(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditBed} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bed Code *</label>
                    <input type="text" value={editingBed.code} onChange={(e) => setEditingBed({ ...editingBed, code: e.target.value })} required className="h-9 w-full rounded-xl border px-3 font-mono font-bold outline-none focus:border-emerald-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bed Type</label>
                    <select value={editingBed.type} onChange={(e) => setEditingBed({ ...editingBed, type: e.target.value })} className="h-9 w-full rounded-xl border px-3 outline-none focus:border-emerald-600">
                      <option value="ICU Electric">ICU Electric</option>
                      <option value="Standard Ward">Standard Ward</option>
                      <option value="Pediatric">Pediatric Bed</option>
                      <option value="Deluxe Bariatric">Deluxe Bariatric</option>
                      <option value="Isolation Bed">Isolation Bed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operational Status</label>
                  <select value={editingBed.status} onChange={(e) => setEditingBed({ ...editingBed, status: e.target.value as any })} className="h-9 w-full rounded-xl border px-3 font-bold outline-none focus:border-emerald-600">
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Cleaning">Cleaning</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Info (Optional)</label>
                  <input type="text" value={editingBed.patientInfo || ""} onChange={(e) => setEditingBed({ ...editingBed, patientInfo: e.target.value })} placeholder="Patient ID / Name" className="h-9 w-full rounded-xl border px-3 outline-none focus:border-emerald-600" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setEditingBed(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={isUpdatingHierarchy} className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2">
                    {isUpdatingHierarchy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SOFT DELETE HIERARCHY CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmHierarchy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0c2420]/45 backdrop-blur-md" onClick={() => setDeleteConfirmHierarchy(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative max-w-md w-full rounded-3xl border-2 border-rose-300 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl space-y-5 my-auto">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  Confirm Soft Delete ({deleteConfirmHierarchy.type})
                </h3>
                <button onClick={() => setDeleteConfirmHierarchy(null)} className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p className="font-medium text-sm text-slate-800">
                  Are you sure you want to soft-delete {deleteConfirmHierarchy.type}{" "}
                  <span className="font-black text-rose-700">"{deleteConfirmHierarchy.name}"</span>?
                </p>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px] font-semibold space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                    HIPAA Compliance & Data Safety:
                  </p>
                  <p>
                    This item will be marked as <strong>Soft-Deleted</strong> in the database and logged to the Audit Log. No records will be permanently purged.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setDeleteConfirmHierarchy(null)} className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer">
                  Cancel
                </button>
                <button type="button" onClick={handleConfirmSoftDeleteHierarchy} disabled={isUpdatingHierarchy} className="px-5 py-2 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-md transition cursor-pointer flex items-center gap-2 disabled:opacity-50">
                  {isUpdatingHierarchy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Yes, Soft-Delete {deleteConfirmHierarchy.type}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 3D Glass Card Component */
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
  icon: React.ReactNode;
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

function TabButton3D({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
        active
          ? "bg-gradient-to-r from-[#0F766E] to-[#115e59] text-white shadow-md shadow-teal-900/30"
          : "bg-slate-50/90 text-[#596964] hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span
          className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
            active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}