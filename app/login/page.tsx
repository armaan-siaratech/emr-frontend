"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  HeartPulse,
  Sparkles,
  UserCheck,
  Building2,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  Activity,
  AlertTriangle,
  Stethoscope,
  Cpu,
  Wifi,
  Zap,
  Check,
  X,
  ChevronRight,
  HelpCircle,
  Radio,
  Shield,
  Clock,
  Smartphone
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginByPin, verify2FALogin, logout, isAuthenticated, isSuperAdmin, isLoading: isAuthLoading } = useAuth();

  // Active role & Auth parameters
  const [selectedRole, setSelectedRole] = useState<"doctor" | "admin" | "superadmin" | "patient">("superadmin");
  const [authMethod, setAuthMethod] = useState<"password" | "pin" | "biometric" | "2fa">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [configuredPinLength, setConfiguredPinLength] = useState<number>(4);
  const [peekCharIndex, setPeekCharIndex] = useState<number | null>(null);
  const [showPinDigits, setShowPinDigits] = useState<boolean>(false);
  const [peekTimeoutId, setPeekTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // 2FA Challenge State
  const [is2FACardActive, setIs2FACardActive] = useState(false);
  const [mfaToken, setMfaToken] = useState("");
  const [mfaCodeInput, setMfaCodeInput] = useState("");
  const [isUsingRecoveryCode, setIsUsingRecoveryCode] = useState(false);

  useEffect(() => {
    try {
      const savedPin = localStorage.getItem("medicare-device-pin");
      if (savedPin && savedPin.length >= 4 && savedPin.length <= 6) {
        setConfiguredPinLength(savedPin.length);
      }
    } catch (_) { }
  }, []);

  // Strict Role Section Validator: Enforces that accounts log in strictly through their assigned role section
  const validateUserRoleForSection = (loggedUser: any, section: "doctor" | "admin" | "superadmin" | "patient"): boolean => {
    const roles: string[] = loggedUser?.roles || [];
    const isSuper = roles.some((r) => ["SUPER_ADMIN", "superadmin", "SuperAdmin"].includes(r));
    const hasAdminRole = roles.some((r) => ["ADMIN", "admin", "TENANT_ADMIN", "tenant_admin", "TenantAdmin", "facility_admin", "FacilityAdmin"].includes(r));
    const isTenantUser = !!loggedUser?.tenant_id;
    // Recognize explicit admin roles OR any tenant-linked user (not SuperAdmin) as a Tenant / Facility Administrator
    const isAdmin = hasAdminRole || (isTenantUser && !isSuper);
    const isDoctor = roles.some((r) => ["DOCTOR", "doctor", "NURSE", "nurse", "CLINICIAN", "clinician", "Doctor", "Nurse"].includes(r));
    const isPatient = roles.some((r) => ["PATIENT", "patient", "Patient"].includes(r));

    if (section === "superadmin") {
      if (!isSuper) {
        throw new Error("Access Denied: Your account does not have Super Admin privileges. Please select your correct Account Role section.");
      }
      return true;
    }

    if (section === "admin") {
      if (isSuper) {
        throw new Error("Access Denied: Super Admin accounts must log in through the Super Admin section.");
      }
      if (!isAdmin) {
        throw new Error("Access Denied: Your account is not a Facility / Tenant Administrator. Please select your correct Account Role section.");
      }
      return true;
    }

    if (section === "doctor") {
      if (isSuper) {
        throw new Error("Access Denied: Super Admin accounts must log in through the Super Admin section.");
      }
      if (isAdmin) {
        throw new Error("Access Denied: Facility / Tenant Admin accounts must log in through the Facility / Tenant Admin section.");
      }
      if (!isDoctor) {
        throw new Error("Access Denied: Your account is not authorized for the Clinician section. Please select your correct Account Role section.");
      }
      return true;
    }

    if (section === "patient") {
      if (isSuper || isAdmin || isDoctor) {
        throw new Error("Access Denied: Clinical & Admin accounts must log in through their respective role section.");
      }
      if (!isPatient) {
        throw new Error("Access Denied: Your account is not a Patient account. Please select your correct Account Role section.");
      }
      return true;
    }

    return true;
  };

  const handlePinInputChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, configuredPinLength);
    setFormError(null);

    // Trigger brief 850ms digit peek for newly typed character
    if (clean.length > pinInput.length) {
      const newIdx = clean.length - 1;
      setPeekCharIndex(newIdx);
      if (peekTimeoutId) clearTimeout(peekTimeoutId);
      const timer = setTimeout(() => {
        setPeekCharIndex(null);
      }, 850);
      setPeekTimeoutId(timer);
    } else {
      setPeekCharIndex(null);
    }

    setPinInput(clean);

    // Auto-submit when user reaches exact configured PIN length
    if (clean.length === configuredPinLength) {
      setTimeout(() => {
        submitPinAuth(clean);
      }, 200);
    }
  };

  // Numeric keypad press handler for PIN Mode (invokes backend loginByPin)
  const submitPinAuth = async (pinString: string) => {
    if (pinString.length < 4) return;
    setIsLoading(true);
    setFormError(null);
    try {
      const res = await loginByPin(pinString, email || undefined);
      if (res.mfa_required && res.mfa_token) {
        setMfaToken(res.mfa_token);
        setIs2FACardActive(true);
        setIsLoading(false);
        return;
      }
      const loggedUser = res.user;

      // Validate logged-in user role against current section
      try {
        validateUserRoleForSection(loggedUser, selectedRole);
      } catch (valErr: any) {
        await logout();
        throw valErr;
      }

      if (selectedRole === "superadmin") {
        router.push("/super-admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setIsLoading(false);
      setFormError(err?.message || "Invalid Device PIN. Please try again.");
      setPinInput("");
      setPeekCharIndex(null);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [breakGlassMode, setBreakGlassMode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto redirect if user is already logged in
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      if (isSuperAdmin) {
        router.replace("/super-admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthLoading, isAuthenticated, isSuperAdmin, router]);

  // Interactive Showcase Left Panel Tab
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"vitals" | "ai" | "security">("vitals");

  // Ambient Theme switcher (mint | cyan | dark)
  const [themeMode, setThemeMode] = useState<"mint" | "cyan" | "dark">("mint");

  // Biometric scanner state
  const [biometricStatus, setBiometricStatus] = useState<"idle" | "scanning" | "success">("idle");

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Role selection handler
  const handleRoleSelect = (role: "doctor" | "admin" | "superadmin" | "patient") => {
    setSelectedRole(role);
    setPinInput("");
    setFormError(null);
  };

  // Quick Preset Persona loader
  const loadPresetPersona = (persona: "dr_sarah" | "james_admin" | "elena_super") => {
    setFormError(null);
    if (persona === "dr_sarah") {
      handleRoleSelect("doctor");
      setEmail("dr.sarah@medicarehms.com");
      setPassword("Clinical#2026Doc");
    } else if (persona === "james_admin") {
      handleRoleSelect("admin");
      setEmail("admin.facility@medicarehms.com");
      setPassword("FacilityAdmin#99");
    } else {
      handleRoleSelect("superadmin");
      setEmail("superadmin@medicarehms.com");
      setPassword("SuperAdmin#Secure1");
    }
  };

  // Centralized authentication executor
  const performAuthentication = async (inputEmail?: string, inputPassword?: string) => {
    setFormError(null);

    let targetEmail = inputEmail || email;
    let targetPassword = inputPassword || password;

    if (!targetEmail || !targetPassword) {
      setFormError("Please enter your authorized Email and Password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login({ email: targetEmail, password: targetPassword });
      if (res.mfa_required && res.mfa_token) {
        setMfaToken(res.mfa_token);
        setIs2FACardActive(true);
        setIsLoading(false);
        return;
      }
      const loggedUser = res.user;

      // Validate logged-in user role against current section
      try {
        validateUserRoleForSection(loggedUser, selectedRole);
      } catch (valErr: any) {
        await logout();
        throw valErr;
      }

      if (selectedRole === "superadmin") {
        router.push("/super-admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setFormError(
        err?.message || "Invalid credentials or backend unreachable. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCodeInput) return;
    setIsLoading(true);
    setFormError(null);
    try {
      const loggedUser = await verify2FALogin(mfaCodeInput, mfaToken || undefined);

      // Validate logged-in user role against current section
      try {
        validateUserRoleForSection(loggedUser, selectedRole);
      } catch (valErr: any) {
        await logout();
        throw valErr;
      }

      if (selectedRole === "superadmin") {
        router.push("/super-admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setIsLoading(false);
      setFormError(err?.message || "Invalid 6-digit Authenticator code or Backup Recovery code.");
    }
  };




  // Biometric Scan Simulation
  const handleBiometricScan = () => {
    setBiometricStatus("scanning");
    setTimeout(async () => {
      setBiometricStatus("success");
      await performAuthentication();
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performAuthentication(email, password);
  };



  // Dynamic background styles based on themeMode
  const getThemeBackground = () => {
    if (themeMode === "dark") {
      return "bg-[#0b1317] text-white";
    }
    if (themeMode === "cyan") {
      return "bg-[#ccebf6] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e0f4fc] via-[#b8e4f5] to-[#a2d8ed]";
    }
    return "bg-[#c7d9d6] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d8ece7] via-[#c7d9d6] to-[#b8cdca]";
  };

  const getCardContainerStyle = () => {
    if (themeMode === "dark") {
      return "bg-slate-900/80 border-slate-700/80 text-white shadow-[0_25px_70px_rgba(0,0,0,0.5)]";
    }
    return "bg-white/40 border-white/80 shadow-[0_25px_70px_rgba(15,118,110,0.18)]";
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden font-sans ${getThemeBackground()}`}>

      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#14b8a6]/20 blur-[120px] animate-pulse-soft" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-[#0284c7]/20 blur-[120px] animate-pulse-soft stagger-3" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#72d4bd]/15 blur-[140px] animate-float-slow" />

      {/* Floating EKG Wave Grid Background Line */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Controls Bar: Theme Switcher & System Help */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2">
        {/* Theme Pills Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-full border border-white/60 bg-white/40 backdrop-blur-md shadow-xs">
          <button
            type="button"
            onClick={() => setThemeMode("mint")}
            title="Mint Clinical Theme"
            className={`h-7 px-2.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${themeMode === "mint"
                ? "bg-[#0f766e] text-white shadow-xs"
                : "text-[#2e4d46] hover:bg-white/50"
              }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#14b8a6]" />
            Mint
          </button>
          <button
            type="button"
            onClick={() => setThemeMode("cyan")}
            title="Cyan Oceanic Theme"
            className={`h-7 px-2.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${themeMode === "cyan"
                ? "bg-[#0284c7] text-white shadow-xs"
                : "text-[#2e4d46] hover:bg-white/50"
              }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
            Cyan
          </button>
          <button
            type="button"
            onClick={() => setThemeMode("dark")}
            title="Dark Clinical Theme"
            className={`h-7 px-2.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${themeMode === "dark"
                ? "bg-slate-800 text-teal-400 shadow-xs border border-teal-500/30"
                : "text-[#2e4d46] hover:bg-white/50"
              }`}
          >
            <span className="h-2 w-2 rounded-full bg-slate-900 border border-teal-400" />
            Dark
          </button>
        </div>

        {/* Emergency Help Button */}
        <button
          type="button"
          onClick={() => setShowForgotModal(true)}
          className="h-9 px-3 rounded-full border border-white/60 bg-white/40 backdrop-blur-md text-xs font-bold text-[#0f2d28] hover:bg-white/70 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <HelpCircle className="h-4 w-4 text-[#0f766e]" />
          <span className="hidden sm:inline">Helpdesk</span>
        </button>
      </div>

      {/* MAIN UNIFIED GLASS CARD CONTAINER */}
      <div className={`w-full max-w-6xl rounded-3xl border-2 backdrop-blur-3xl overflow-hidden relative z-10 transition-all duration-300 ${getCardContainerStyle()}`}>

        {/* Top Decorative Hospital Heartbeat Line Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0284c7] via-[#14b8a6] to-[#0f766e] relative overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-shimmer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

          {/* ==================== LEFT 5 COLS: INTERACTIVE CLINICAL SHOWCASE ==================== */}
          <div className={`lg:col-span-5 border-b lg:border-b-0 lg:border-r p-6 sm:p-8 flex flex-col justify-between space-y-6 ${themeMode === "dark" ? "border-slate-700/80 bg-slate-950/50" : "border-white/70 bg-white/35"
            }`}>
            <div className="space-y-6">

              {/* Brand Logo & HIPAA Status */}
              <div className="flex items-center justify-between border-b pb-4 border-white/40">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0284c7] via-[#0d9488] to-[#0f766e] flex items-center justify-center text-white shadow-lg shadow-teal-700/20 ring-4 ring-white/30 animate-pulse-soft">
                    <HeartPulse className="h-6 w-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-1.5">
                      <span>MediCare</span>
                      <span className="text-[#0284c7] bg-white/60 dark:bg-slate-800/80 px-2 py-0.5 rounded-lg text-lg">HMS</span>
                    </h1>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0f766e] dark:text-teal-400">
                      Next-Gen Clinical Workspace
                    </p>
                  </div>
                </div>

                {/* Live HIPAA Security Badge */}
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-black text-emerald-700 dark:text-emerald-300 shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    HIPAA Active
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                    <Shield className="h-3 w-3 text-emerald-600" />
                    256-Bit Encrypted
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f766e]/10 dark:bg-teal-500/20 text-[#0f766e] dark:text-teal-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
                  Authorized Clinical Terminal
                </div>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                  Intelligent Care, Instant Access
                </h2>
                <p className="mt-2 text-xs font-semibold leading-relaxed opacity-80">
                  Comprehensive hospital management suite integrating real-time Electronic Health Records, SOAP clinical notes, eRx pharmacy, and multi-tier security.
                </p>
              </div>

              {/* Interactive Showcase Tabs Header */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#0284c7]" />
                    Live Terminal Modules
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live Data Simulation
                  </span>
                </div>

                {/* Showcase Tab Pills */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-white/40 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveShowcaseTab("vitals")}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${activeShowcaseTab === "vitals"
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <HeartPulse className="h-3.5 w-3.5" />
                    Vitals
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveShowcaseTab("ai")}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${activeShowcaseTab === "ai"
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Cpu className="h-3.5 w-3.5" />
                    AI Copilot
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveShowcaseTab("security")}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${activeShowcaseTab === "security"
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Security
                  </button>
                </div>

                {/* Showcase Dynamic Content Panel */}
                <div className="rounded-2xl border border-white/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/90 p-4 shadow-sm min-h-[160px] flex flex-col justify-between transition-all">

                  {/* TAB 1: VITALS TELEMETRY MONITOR */}
                  {activeShowcaseTab === "vitals" && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-[#0284c7]" />
                          <span className="text-xs font-black">ICU Live Vitals Stream</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                          Bed #104 - Stable
                        </span>
                      </div>

                      {/* EKG Simulated Wave Visual */}
                      <div className="h-10 w-full bg-slate-900 rounded-lg p-1.5 flex items-center justify-between relative overflow-hidden border border-slate-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/20 to-transparent animate-shimmer" />
                        <div className="flex items-center justify-around w-full relative z-10">
                          <span className="text-[11px] font-mono font-bold text-emerald-400 animate-pulse">
                            ECG [LIVE WAVE]
                          </span>
                          <span className="text-xs font-mono font-black text-teal-300">
                            74 <span className="text-[9px] font-normal text-slate-400">BPM</span>
                          </span>
                          <span className="text-xs font-mono font-black text-cyan-300">
                            99% <span className="text-[9px] font-normal text-slate-400">SpO2</span>
                          </span>
                          <span className="text-xs font-mono font-black text-emerald-400">
                            120/80
                          </span>
                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Auto-synced with Chart</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg">
                          <Activity className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                          <span>Realtime Alert Ready</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: AI CLINICAL COPILOT */}
                  {activeShowcaseTab === "ai" && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-amber-500" />
                          <span className="text-xs font-black">AI Diagnosis & eRx Assistant</span>
                        </div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                          v3.2 Active
                        </span>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs">
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-amber-900 dark:text-amber-200">
                              Smart Prescription Safety Scan
                            </p>
                            <p className="text-[10px] opacity-80 leading-relaxed mt-0.5">
                              Auto-detects drug interaction conflicts & checks patient allergies against ICD-10 history in milliseconds.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>ICD-10 Code Auto-Complete</span>
                        <span className="text-teal-600 dark:text-teal-400 font-extrabold">99.4% Accuracy</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: HIPAA SECURITY MATRIX */}
                  {activeShowcaseTab === "security" && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-black">Security Audit Matrix</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                          SOC-2 Type II
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <div className="flex items-center justify-between bg-emerald-500/10 p-2 rounded-lg text-emerald-900 dark:text-emerald-200">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                            Connected Hospital Nodes
                          </span>
                          <span className="text-xs font-black">4 Nodes Active</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-[11px]">
                          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <Clock className="h-3.5 w-3.5 text-cyan-600" />
                            Audit Trail Logging
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400">Continuous</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Quick Persona Tester Bar */}
              <div className="pt-2">
                <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#0f766e] dark:text-teal-400 mb-2">
                  One-Tap Demo Credentials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => loadPresetPersona("dr_sarah")}
                    className="px-2.5 py-1.5 rounded-xl border border-white/80 bg-white/60 dark:bg-slate-800 dark:border-slate-700 text-[11px] font-bold text-[#0f2d28] dark:text-slate-200 hover:bg-white hover:border-[#0f766e] transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <UserCheck className="h-3.5 w-3.5 text-[#0f766e]" />
                    Dr. Sarah (Clinician)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetPersona("james_admin")}
                    className="px-2.5 py-1.5 rounded-xl border border-white/80 bg-white/60 dark:bg-slate-800 dark:border-slate-700 text-[11px] font-bold text-[#0f2d28] dark:text-slate-200 hover:bg-white hover:border-[#0f766e] transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Building2 className="h-3.5 w-3.5 text-[#0284c7]" />
                    Facility Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetPersona("elena_super")}
                    className="px-2.5 py-1.5 rounded-xl border border-white/80 bg-white/60 dark:bg-slate-800 dark:border-slate-700 text-[11px] font-bold text-[#0f2d28] dark:text-slate-200 hover:bg-white hover:border-[#a34e36] transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#a34e36]" />
                    Super Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Footer Status & Uptime */}
            <div className="pt-4 border-t border-white/40 dark:border-slate-800 text-[10px] font-extrabold text-[#527068] dark:text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Network: 100% Operational
              </span>
              <span className="text-[#0f766e] dark:text-teal-400">v4.8 Clinical System</span>
            </div>
          </div>


          {/* ==================== RIGHT 7 COLS: NEXT-GEN AUTHENTICATION CENTER ==================== */}
          <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between ${themeMode === "dark" ? "bg-slate-900/90" : "bg-white/60"
            }`}>

            <div className="space-y-6">

              {/* Header & Auth Method Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-white/60 dark:border-slate-800 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-[#a34e36]" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#a34e36]">
                      HIPAA Secure Terminal
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    {is2FACardActive || authMethod === "2fa" ? "2FA Security Verification" : "Sign In to Workspace"}
                  </h3>
                </div>

                {/* Auth Mode Toggle Pills (Password / Medical PIN / 2FA Code / Biometric) */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-slate-800 border border-white/80 dark:border-slate-700 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod("password");
                      setIs2FACardActive(false);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${authMethod === "password" && !is2FACardActive
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod("pin");
                      setIs2FACardActive(false);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${authMethod === "pin" && !is2FACardActive
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    <span>PIN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod("2fa");
                      setIs2FACardActive(true);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${authMethod === "2fa" || is2FACardActive
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>2FA Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod("biometric");
                      setIs2FACardActive(false);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${authMethod === "biometric" && !is2FACardActive
                        ? "bg-[#0f766e] text-white shadow-xs"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Fingerprint className="h-3.5 w-3.5" />
                    <span>Biometric</span>
                  </button>
                </div>
              </div>

              {is2FACardActive || authMethod === "2fa" ? (
                /* ==================== 2FA VERIFICATION CHALLENGE VIEW ==================== */
                <div className="space-y-5 animate-fade-in my-auto">
                  <div className="rounded-2xl border border-teal-500/30 bg-teal-950/20 p-4 space-y-1">
                    <div className="flex items-center gap-2 text-[#0f766e] dark:text-teal-400">
                      <ShieldCheck className="h-5 w-5 text-[#0d9488]" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        Google Authenticator / Backup Code Required
                      </span>
                    </div>
                    <p className="text-xs font-semibold opacity-80 pt-0.5">
                      Your account is protected by 2FA. Enter your 6-digit TOTP code from Google Authenticator or your 8-character backup recovery code below.
                    </p>
                  </div>

                  {/* 2FA Method Selector (Authenticator App vs Recovery Code) */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/5 dark:bg-slate-800 border border-white/80 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUsingRecoveryCode(false);
                        setMfaCodeInput("");
                        setFormError(null);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${!isUsingRecoveryCode
                          ? "bg-[#0f766e] text-white shadow-xs"
                          : "opacity-70 hover:opacity-100"
                        }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>Google Authenticator</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUsingRecoveryCode(true);
                        setMfaCodeInput("");
                        setFormError(null);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isUsingRecoveryCode
                          ? "bg-[#0f766e] text-white shadow-xs"
                          : "opacity-70 hover:opacity-100"
                        }`}
                    >
                      <KeyRound className="h-4 w-4" />
                      <span>Recovery Code</span>
                    </button>
                  </div>

                  {formError && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-fade-in">
                      <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-bold text-rose-800 dark:text-rose-200">Verification Failed</p>
                        <p className="text-[11px] font-medium opacity-90 mt-0.5">{formError}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleVerify2FASubmit} className="space-y-4">
                    {!isUsingRecoveryCode ? (
                      <div>
                        <label className="block text-xs font-extrabold mb-1.5">
                          Enter 6-Digit Authenticator Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          autoFocus
                          value={mfaCodeInput}
                          onChange={(e) => setMfaCodeInput(e.target.value.replace(/\D/g, ""))}
                          placeholder="e.g. 123456"
                          className="h-12 w-full text-center tracking-[0.5em] font-mono text-xl font-black rounded-2xl border border-white/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-[#172522] dark:text-white outline-none focus:border-[#0f766e] shadow-xs"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-extrabold mb-1.5">
                          Enter 8-Character Backup Recovery Code
                        </label>
                        <input
                          type="text"
                          autoFocus
                          value={mfaCodeInput}
                          onChange={(e) => setMfaCodeInput(e.target.value.toUpperCase())}
                          placeholder="e.g. A7B9-K2P4"
                          className="h-12 w-full text-center tracking-widest font-mono text-base font-black uppercase rounded-2xl border border-white/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-[#172522] dark:text-white outline-none focus:border-[#0f766e] shadow-xs"
                        />
                        <p className="text-[10px] opacity-75 mt-1 text-center">
                          Each recovery code can only be used once.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !mfaCodeInput}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0d9488] to-[#0f766e] hover:from-[#115e59] hover:to-[#0f766e] text-white text-xs font-black shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Verifying 2FA Code...
                        </span>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4 text-white" />
                          <span>Verify & Sign In</span>
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIs2FACardActive(false);
                          setAuthMethod("password");
                          setMfaCodeInput("");
                          setFormError(null);
                        }}
                        className="text-xs font-bold text-[#0f766e] dark:text-teal-400 hover:underline cursor-pointer"
                      >
                        ← Back to Standard Password Login
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">

                  {/* EMERGENCY ER BREAK-GLASS WARNING STATE BANNER */}
                  {breakGlassMode && (
                    <div className="rounded-2xl border-2 border-red-500/60 bg-red-500/10 p-3.5 flex items-start gap-3 animate-pulse-soft">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-red-900 dark:text-red-200">
                          EMERGENCY ACCESS (BREAK-GLASS MODE ACTIVE)
                        </p>
                        <p className="text-[10px] font-semibold text-red-700 dark:text-red-300 leading-relaxed mt-0.5">
                          Bypassing standard multi-factor verification for urgent care triage. All actions taken in this session are escalated directly to Hospital Compliance Officers.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Role Selection Grid */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase opacity-70 mb-2">
                      Select Account Role
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                      {/* Doctor Role */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect("doctor")}
                        className={`p-2.5 rounded-2xl border text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${selectedRole === "doctor"
                            ? "border-[#0f766e] bg-[#0f766e] text-white shadow-md scale-[1.02]"
                            : "border-white/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 opacity-80 hover:opacity-100 hover:bg-white"
                          }`}
                      >
                        <UserCheck className="h-4 w-4" />
                        <span>Clinician</span>
                        <span className="text-[9px] font-normal opacity-80">Doctor / Nurse</span>
                      </button>

                      {/* Admin / Tenant Role */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect("admin")}
                        className={`p-2.5 rounded-2xl border text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${selectedRole === "admin"
                            ? "border-[#0f766e] bg-[#0f766e] text-white shadow-md scale-[1.02]"
                            : "border-white/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 opacity-80 hover:opacity-100 hover:bg-white"
                          }`}
                      >
                        <Building2 className="h-4 w-4" />
                        <span>Facility / Tenant Admin</span>
                        <span className="text-[9px] font-normal opacity-80">Hospital & Tenant Admin</span>
                      </button>

                      {/* Super Admin Role */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect("superadmin")}
                        className={`p-2.5 rounded-2xl border text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${selectedRole === "superadmin"
                            ? "border-[#a34e36] bg-[#a34e36] text-white shadow-md scale-[1.02]"
                            : "border-white/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 opacity-80 hover:opacity-100 hover:bg-white"
                          }`}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Super Admin</span>
                        <span className="text-[9px] font-normal opacity-80">System Owner</span>
                      </button>

                      {/* Patient Portal */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect("patient")}
                        className={`p-2.5 rounded-2xl border text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${selectedRole === "patient"
                            ? "border-[#0284c7] bg-[#0284c7] text-white shadow-md scale-[1.02]"
                            : "border-white/80 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 opacity-80 hover:opacity-100 hover:bg-white"
                          }`}
                      >
                        <Stethoscope className="h-4 w-4" />
                        <span>Patient Care</span>
                        <span className="text-[9px] font-normal opacity-80">Self Portal</span>
                      </button>
                    </div>
                  </div>


                  {/* ==================== MODE 1: STANDARD PASSWORD FORM ==================== */}
                  {authMethod === "password" && (
                    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">

                      {/* Authentication Error Banner */}
                      {formError && (
                        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-fade-in">
                          <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-bold text-rose-800 dark:text-rose-200">Authentication Failed</p>
                            <p className="text-[11px] font-medium opacity-90 mt-0.5">{formError}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormError(null)}
                            className="text-rose-500 hover:text-rose-700 p-0.5"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}


                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold">
                            Authorized Work Email
                          </label>
                          <span className="text-[10px] font-bold text-[#0f766e] dark:text-teal-400">
                            {selectedRole === "doctor" && "Doctor Identity Verified"}
                            {selectedRole === "admin" && "Facility / Tenant Administrator"}
                            {selectedRole === "superadmin" && "Root Super Admin"}
                            {selectedRole === "patient" && "Patient Access Pass"}
                          </span>
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={
                              selectedRole === "superadmin"
                                ? "superadmin@medicarehms.com"
                                : selectedRole === "admin"
                                  ? "admin.facility@medicarehms.com"
                                  : selectedRole === "doctor"
                                    ? "dr.sarah@medicarehms.com"
                                    : "patient.care@medicarehms.com"
                            }
                            className="h-11 w-full rounded-2xl border border-white/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 pl-10 pr-4 text-xs font-bold outline-none transition-all placeholder:opacity-50 focus:border-[#0f766e] focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold">
                            Account Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowForgotModal(true)}
                            className="text-[11px] font-bold text-[#a34e36] hover:underline cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            className="h-11 w-full rounded-2xl border border-white/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800 pl-10 pr-12 text-xs font-bold outline-none transition-all placeholder:opacity-50 focus:border-[#0f766e] focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-[#0f766e]/20 shadow-xs"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowPassword((prev) => !prev);
                            }}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer z-20 touch-manipulation active:scale-95"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>


                      {/* Checkboxes: Remember Workstation & Break Glass */}
                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold opacity-90 select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                          />
                          <span>Keep workstation logged in (12h shift)</span>
                        </label>

                        <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-red-600 dark:text-red-400 select-none">
                          <input
                            type="checkbox"
                            checked={breakGlassMode}
                            onChange={(e) => setBreakGlassMode(e.target.checked)}
                            className="h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                          />
                          <span>Emergency ER Mode</span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full h-12 rounded-2xl text-xs font-black text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${selectedRole === "superadmin"
                            ? "bg-[#a34e36] hover:bg-[#8c3f2a] shadow-[#a34e36]/30"
                            : "bg-gradient-to-r from-[#0f766e] via-[#0d9488] to-[#0284c7] hover:opacity-95 shadow-[#0f766e]/30"
                          }`}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            AUTHENTICATING HIPAA SESSION...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <span>SIGN IN SECURELY TO WORKSPACE</span>
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </form>
                  )}


                  {/* ==================== MODE 2: MEDICAL PIN CODE MODE ==================== */}
                  {authMethod === "pin" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (pinInput.length >= 4) {
                          submitPinAuth(pinInput);
                        }
                      }}
                      className="space-y-5 animate-fade-in"
                    >
                      <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-[#172522] dark:text-white">
                          Enter {configuredPinLength}-Digit Medical PIN Code
                        </p>
                        <p className="text-[11px] opacity-70">
                          Quick shift unlock using your configured {configuredPinLength}-digit Device PIN
                        </p>
                      </div>

                      {formError && (
                        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-fade-in">
                          <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-bold text-rose-800 dark:text-rose-200 font-sans">PIN Verification Failed</p>
                            <p className="text-[11px] font-medium opacity-90 mt-0.5">{formError}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormError(null)}
                            className="text-rose-500 hover:text-rose-700 p-0.5"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}

                      {/* OTP-Style Segmented Box Input */}
                      <div className="space-y-3">
                        <div className="relative max-w-xs mx-auto">
                          {/* Hidden/Overlay Physical Keyboard Capture Input */}
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={configuredPinLength}
                            autoFocus
                            value={pinInput}
                            onChange={(e) => handlePinInputChange(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                          />

                          {/* Dynamic OTP Boxes Row (4 or 6 slots matching configured PIN length) */}
                          <div className="flex items-center justify-center gap-2.5">
                            {Array.from({ length: configuredPinLength }).map((_, idx) => {
                              const isFilled = idx < pinInput.length;
                              const isCurrent = idx === pinInput.length;
                              const digitValue = pinInput[idx] || "";
                              const isPeeking = idx === peekCharIndex;

                              return (
                                <div
                                  key={idx}
                                  className={`h-12 w-11 rounded-xl border-2 flex items-center justify-center text-lg font-mono font-black transition-all relative ${isFilled
                                      ? "border-[#0f766e] bg-[#0f766e]/15 text-[#0f766e] dark:text-teal-300 shadow-md scale-105"
                                      : isCurrent
                                        ? "border-[#0f766e] bg-white dark:bg-slate-900 shadow-sm ring-2 ring-[#0f766e]/30 animate-pulse"
                                        : "border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 opacity-60"
                                    }`}
                                >
                                  {isFilled ? (
                                    showPinDigits || isPeeking ? (
                                      <span className="text-[#0f766e] dark:text-teal-300 animate-fade-in font-bold">
                                        {digitValue}
                                      </span>
                                    ) : (
                                      <span className="text-xl">•</span>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* PIN Controls Bar: Peek Eye Toggle & Clear Button */}
                        <div className="flex items-center justify-between max-w-xs mx-auto px-1">
                          <button
                            type="button"
                            onClick={() => setShowPinDigits(!showPinDigits)}
                            className="text-[11px] font-extrabold text-slate-500 hover:text-[#0f766e] transition-colors flex items-center gap-1 cursor-pointer select-none"
                          >
                            {showPinDigits ? (
                              <>
                                <EyeOff className="h-3.5 w-3.5 text-[#0f766e]" />
                                <span>Hide Digits</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3.5 w-3.5" />
                                <span>Reveal Digits</span>
                              </>
                            )}
                          </button>

                          {pinInput.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setPinInput("");
                                setPeekCharIndex(null);
                              }}
                              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                            >
                              Clear Input
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading || pinInput.length < configuredPinLength}
                        className="w-full h-12 rounded-2xl bg-[#0f766e] hover:bg-[#115e59] disabled:opacity-40 text-white text-xs font-black shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            AUTHENTICATING PIN SESSION...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <span>UNLOCK SHIFT SESSION ({pinInput.length} / {configuredPinLength} DIGITS)</span>
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </form>
                  )}





                  {/* ==================== MODE 3: BIOMETRIC FINGERPRINT PASSKEY MODE ==================== */}
                  {authMethod === "biometric" && (
                    <div className="space-y-6 text-center animate-fade-in py-3">
                      <div>
                        <p className="text-xs font-bold">Hospital Smart Badge Biometric Scanner</p>
                        <p className="text-[11px] opacity-70">Touch the scanner target below to authenticate passkey</p>
                      </div>

                      {/* Animated Fingerprint Scanner Target */}
                      <div className="flex flex-col items-center justify-center">
                        <button
                          type="button"
                          onClick={handleBiometricScan}
                          disabled={biometricStatus === "scanning"}
                          className={`h-24 w-24 rounded-full border-4 flex items-center justify-center transition-all cursor-pointer relative group ${biometricStatus === "scanning"
                              ? "border-[#0284c7] bg-[#0284c7]/20 scale-110 animate-pulse"
                              : biometricStatus === "success"
                                ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                                : "border-[#0f766e] bg-[#0f766e]/10 text-[#0f766e] hover:scale-105 hover:bg-[#0f766e]/20"
                            }`}
                        >
                          {biometricStatus === "scanning" ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="h-8 w-8 animate-spin rounded-full border-3 border-teal-500 border-t-transparent" />
                              <span className="text-[8px] font-black text-[#0284c7]">SCANNING...</span>
                            </div>
                          ) : biometricStatus === "success" ? (
                            <Check className="h-10 w-10 text-emerald-500 animate-bounce" />
                          ) : (
                            <Fingerprint className="h-12 w-12 animate-pulse-soft group-hover:scale-110 transition-all" />
                          )}

                          {/* Pulse Ripple Rings */}
                          <span className="absolute inset-0 rounded-full border border-[#0f766e]/40 animate-ping pointer-events-none" />
                        </button>

                        <p className="text-[11px] font-extrabold text-[#0f766e] dark:text-teal-300 mt-3">
                          {biometricStatus === "idle" && "Click or Tap Scanner Target"}
                          {biometricStatus === "scanning" && "Verifying Security Token & Fingerprint..."}
                          {biometricStatus === "success" && "Biometric Identity Confirmed!"}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Bottom Security Notice Banner */}
            <div className="pt-4 mt-6 border-t border-white/60 dark:border-slate-800">
              <div className="rounded-2xl border border-white/80 dark:border-slate-800 bg-[#e4f2ee]/80 dark:bg-slate-800/80 p-3.5 flex items-start gap-3 shadow-xs">
                <ShieldCheck className="h-5 w-5 text-[#0f766e] dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-extrabold">HIPAA Security Notice</p>
                  <p className="text-[10px] font-medium opacity-80 leading-relaxed">
                    This platform processes Protected Health Information (PHI). Unauthorized access attempts are monitored, timestamped, and prosecuted under federal HIPAA regulations.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ==================== FORGOT PASSWORD / HELPDESK MODAL ==================== */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border-2 border-white/80 bg-white/95 dark:bg-slate-900 p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => { setShowForgotModal(false); setResetSent(false); }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#0f766e]/10 text-[#0f766e] dark:text-teal-400 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-black">Reset Workstation Password</h4>
                <p className="text-xs opacity-70">Enter your registered hospital email</p>
              </div>
            </div>

            {resetSent ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Password Reset Instructions Sent!
                </p>
                <p className="text-[11px] opacity-80">
                  Check your clinical inbox for <span className="font-bold">{resetEmail || email}</span> to complete secure identity verification.
                </p>
                <button
                  type="button"
                  onClick={() => { setShowForgotModal(false); setResetSent(false); }}
                  className="mt-2 w-full py-2 rounded-xl bg-[#0f766e] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetSent(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold mb-1">Clinical Email Address</label>
                  <input
                    type="email"
                    required
                    value={resetEmail || email}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="doctor@medicarehms.com"
                    className="h-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-bold outline-none focus:border-[#0f766e]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-[#0f766e] text-xs font-black text-white hover:bg-[#0d5c56] transition-all cursor-pointer"
                >
                  SEND SECURE RESET LINK
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}