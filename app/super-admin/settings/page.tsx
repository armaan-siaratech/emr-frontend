"use client";

import { useState, useEffect, useCallback } from "react";
import {
  setUserPinApi,
  togglePinSecurityApi,
  toggleGlobalPinSecurityApi,
  getSecurityPolicyApi,
  getCurrentUserApi,
  setup2FAApi,
  enable2FAApi,
  disable2FAApi,
  regenerateRecoveryCodesApi,
  getAuditLogsApi,
  AuditLogItem,
} from "@/lib/api/authApi";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Check,
  Zap,
  ShieldAlert,
  Clock,
  QrCode,
  Copy,
  Download,
  RefreshCw,
  X,
  Shield,
  FileText,
  Activity,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";




const menuItems = [
  {
    id: "general",
    label: "General",
    description: "Platform information",
  },
  {
    id: "security",
    label: "Security",
    description: "Authentication & access",
  },
  {
    id: "audit",
    label: "HIPAA Audit Logs",
    description: "System compliance audit trail",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Notification preferences",
  },
  {
    id: "system",
    label: "System",
    description: "Platform configuration",
  },
  {
    id: "profile",
    label: "My Profile",
    description: "Personal information",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="w-full">

      {/* HEADER */}

      <div className="mb-6">

        <div className="mb-1 flex items-center gap-2">

          <span className="text-[10px] text-[#8A9995]">
            Super Admin
          </span>

          <span className="text-[10px] text-[#B3BCB8]">
            /
          </span>

          <span className="text-[10px] text-[#596964]">
            Settings
          </span>

        </div>

        <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#172522]">
          Settings
        </h1>

        <p className="mt-1 text-[11px] text-[#8A9995]">
          Manage platform preferences, security and system configuration.
        </p>

      </div>


      {/* SETTINGS LAYOUT */}

      <div className="grid grid-cols-[245px_1fr] gap-5">


        {/* SIDEBAR */}

        <div className="h-fit rounded-[15px] border border-[#E4ECE9] bg-white p-3 shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

          {menuItems.map((item) => (

            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`mb-1 flex w-full items-start gap-3 rounded-[9px] px-3 py-3 text-left transition ${
                activeSection === item.id
                  ? "bg-[#E7F4F1]"
                  : "hover:bg-[#F7FAF9]"
              }`}
            >

              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] ${
                  activeSection === item.id
                    ? "bg-white text-[#0F766E]"
                    : "bg-[#F2F5F4] text-[#87938F]"
                }`}
              >
                {getSettingIcon(item.id)}
              </div>

              <div>

                <p
                  className={`text-[10px] font-semibold ${
                    activeSection === item.id
                      ? "text-[#0F766E]"
                      : "text-[#596964]"
                  }`}
                >
                  {item.label}
                </p>

                <p className="mt-0.5 text-[8px] text-[#9AA5A1]">
                  {item.description}
                </p>

              </div>

            </button>

          ))}

        </div>


        {/* CONTENT */}

        <div>

          {activeSection === "general" && <GeneralSettings />}

          {activeSection === "security" && <SecuritySettings />}

          {activeSection === "audit" && <AuditLogSettings />}

          {activeSection === "notifications" && (
            <NotificationSettings />
          )}

          {activeSection === "system" && <SystemSettings />}

          {activeSection === "profile" && <ProfileSettings />}

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   GENERAL SETTINGS
============================================================ */

function GeneralSettings() {

  return (

    <SettingsCard
      title="General Settings"
      description="Basic information about your healthcare platform."
    >

      <div className="grid grid-cols-2 gap-5">

        <InputField
          label="Platform Name"
          value="Healthcare Management Platform"
        />

        <InputField
          label="Platform Email"
          value="admin@healthcare.com"
        />

        <InputField
          label="Support Email"
          value="support@healthcare.com"
        />

        <SelectField
          label="Timezone"
          value="Asia/Kolkata"
          options={[
            "Asia/Kolkata",
            "America/New_York",
            "America/Chicago",
            "Europe/London",
          ]}
        />

        <SelectField
          label="Date Format"
          value="DD/MM/YYYY"
          options={[
            "DD/MM/YYYY",
            "MM/DD/YYYY",
            "YYYY-MM-DD",
          ]}
        />

        <SelectField
          label="Time Format"
          value="12 Hours"
          options={[
            "12 Hours",
            "24 Hours",
          ]}
        />

      </div>


      <div className="mt-6 border-t border-[#EDF2F0] pt-5">

        <SettingRow
          title="Maintenance Mode"
          description="Temporarily disable access to the platform for maintenance."
          enabled={false}
        />

      </div>


      <SaveButton />

    </SettingsCard>
  );
}


/* ============================================================
   SECURITY
============================================================ */

function SecuritySettings() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [devicePin, setDevicePin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activePin, setActivePin] = useState<string | null>(null);
  const [isPinSecurityEnabled, setIsPinSecurityEnabled] = useState(true);
  const [isGlobalPinEnabled, setIsGlobalPinEnabled] = useState(true);
  const [pinMessage, setPinMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // ================= GOOGLE AUTHENTICATOR 2FA & RECOVERY CODES STATE =================
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FASetupModal, setShow2FASetupModal] = useState(false);
  const [totpSecret, setTotpSecret] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [disableCodeOrPassword, setDisableCodeOrPassword] = useState("");
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [savedCodesChecked, setSavedCodesChecked] = useState(false);
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [twoFaMsg, setTwoFaMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("medicare-device-pin");
      if (saved) setActivePin(saved);
      const enabledSaved = localStorage.getItem("medicare-pin-enabled");
      if (enabledSaved !== null) setIsPinSecurityEnabled(enabledSaved === "true");

      getSecurityPolicyApi()
        .then((res) => {
          if (res) {
            setIsGlobalPinEnabled(res.global_pin_enabled);
            setIsPinSecurityEnabled(res.is_user_pin_enabled);
          }
        })
        .catch(() => {});

      getCurrentUserApi()
        .then((res) => {
          if (res && res.user) {
            setIs2FAEnabled(!!res.user.is_totp_enabled);
          }
        })
        .catch(() => {});
    } catch (_) {}
  }, []);

  const handleStart2FASetup = async () => {
    setTwoFaLoading(true);
    setTwoFaMsg(null);
    setVerificationCode("");
    try {
      const res = await setup2FAApi();
      setTotpSecret(res.totp_secret);
      setOtpauthUrl(res.otpauth_url);
      setShow2FASetupModal(true);
    } catch (err: any) {
      setTwoFaMsg({ text: err?.message || "Failed to initialize 2FA setup.", type: "error" });
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleEnable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      setTwoFaMsg({ text: "Please enter a valid 6-digit Google Authenticator code.", type: "error" });
      return;
    }
    setTwoFaLoading(true);
    setTwoFaMsg(null);
    try {
      const res = await enable2FAApi(totpSecret, verificationCode);
      setRecoveryCodes(res.recovery_codes);
      setIs2FAEnabled(true);
      setShow2FASetupModal(false);
      setShowRecoveryModal(true);
      setSavedCodesChecked(false);
      setTwoFaMsg({ text: res.message, type: "success" });
    } catch (err: any) {
      setTwoFaMsg({ text: err?.message || "Invalid 6-digit authenticator code.", type: "error" });
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleDisable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disableCodeOrPassword) {
      setTwoFaMsg({ text: "Please enter your 6-digit authenticator code or account password.", type: "error" });
      return;
    }
    setTwoFaLoading(true);
    setTwoFaMsg(null);
    try {
      await disable2FAApi(disableCodeOrPassword);
      setIs2FAEnabled(false);
      setShowDisableModal(false);
      setDisableCodeOrPassword("");
      setTwoFaMsg({ text: "Two-Factor Authentication has been disabled for your account.", type: "success" });
      setTimeout(() => setTwoFaMsg(null), 5000);
    } catch (err: any) {
      setTwoFaMsg({ text: err?.message || "Failed to disable 2FA.", type: "error" });
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleRegenerateCodes = async () => {
    const codeInput = prompt("Enter your 6-digit Google Authenticator code or password to generate new recovery codes:");
    if (!codeInput) return;
    setTwoFaLoading(true);
    setTwoFaMsg(null);
    try {
      const res = await regenerateRecoveryCodesApi(codeInput);
      setRecoveryCodes(res.recovery_codes);
      setShowRecoveryModal(true);
      setSavedCodesChecked(false);
      setTwoFaMsg({ text: "New 2FA Recovery Codes generated successfully!", type: "success" });
    } catch (err: any) {
      setTwoFaMsg({ text: err?.message || "Failed to regenerate recovery codes.", type: "error" });
    } finally {
      setTwoFaLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: "secret" | "codes") => {
    navigator.clipboard.writeText(text);
    if (type === "secret") {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 3000);
    } else {
      setCopiedCodes(true);
      setTimeout(() => setCopiedCodes(false), 3000);
    }
  };

  const downloadRecoveryCodes = () => {
    const textContent = `MEDICARE HMS - TWO-FACTOR AUTHENTICATION RECOVERY CODES\n` +
      `Account Email: User Account\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `--------------------------------------------------\n\n` +
      recoveryCodes.map((code, idx) => `${idx + 1}. ${code}`).join("\n") +
      `\n\nIMPORTANT: Keep these recovery codes in a safe, offline location.\nEach code can only be used ONCE if you lose access to Google Authenticator.`;
    
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "medicare_2fa_recovery_codes.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleToggleGlobalPin = async (enabled: boolean) => {
    try {
      await toggleGlobalPinSecurityApi(enabled);
      setIsGlobalPinEnabled(enabled);
      localStorage.setItem("medicare-global-pin-enabled", enabled ? "true" : "false");
      setPinMessage({
        text: `Global EMR Platform PIN Policy is now ${enabled ? "ENABLED" : "DISABLED"} for all hospital users.`,
        type: "success",
      });
      setTimeout(() => setPinMessage(null), 5000);
    } catch (err: any) {
      setPinMessage({ text: err?.message || "Failed to update global PIN policy.", type: "error" });
    }
  };

  const handleTogglePinSecurity = async (enabled: boolean) => {
    try {
      await togglePinSecurityApi(enabled);
      setIsPinSecurityEnabled(enabled);
      localStorage.setItem("medicare-pin-enabled", enabled ? "true" : "false");
      setPinMessage({
        text: `Personal Device PIN Security Mode has been ${enabled ? "ENABLED" : "DISABLED"}.`,
        type: "success",
      });
      setTimeout(() => setPinMessage(null), 4000);
    } catch (err: any) {
      setPinMessage({ text: err?.message || "Failed to update PIN security status.", type: "error" });
    }
  };

  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devicePin || devicePin.length < 4 || devicePin.length > 6 || !/^\d{4,6}$/.exec(devicePin)) {
      setPinMessage({ text: "PIN must be between 4 and 6 numeric digits (0-9).", type: "error" });
      return;
    }
    if (devicePin !== confirmPin) {
      setPinMessage({ text: "PIN entries do not match. Please verify.", type: "error" });
      return;
    }
    try {
      await setUserPinApi(devicePin);
      localStorage.setItem("medicare-device-pin", devicePin);
      setActivePin(devicePin);
      setDevicePin("");
      setConfirmPin("");
      setPinMessage({ text: `${devicePin.length}-Digit Device PIN hashed & saved securely in Database! Use PIN Unlock mode on next login.`, type: "success" });
      setTimeout(() => setPinMessage(null), 5000);
    } catch (err: any) {
      setPinMessage({ text: err?.message || "Failed to save device PIN in backend database.", type: "error" });
    }
  };


  const handleRemovePin = () => {
    try {
      localStorage.removeItem("medicare-device-pin");
      setActivePin(null);
      setPinMessage({ text: "Device PIN removed. Login will require password.", type: "success" });
      setTimeout(() => setPinMessage(null), 4000);
    } catch (_) {}
  };

  return (
    <SettingsCard
      title="Security & Authentication Configuration"
      description="Manage multi-step authentication pipelines, MFA enforcement, and Device Quick PIN Unlock."
    >
      {/* ================= VISUAL AUTHENTICATION WORKFLOW PIPELINE ================= */}
      <div className="mb-6 rounded-2xl border border-[#0f766e]/20 bg-[#081c19] p-5 text-white shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-teal-300">
            <ShieldCheck className="h-4 w-4 text-[#2dd4bf]" />
            Multi-Step Security Architecture Pipeline
          </div>
          <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[9px] font-extrabold text-teal-300 uppercase">
            Active Security Standard
          </span>
        </div>

        {/* Workflow Steps Horizontal Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
          {/* Step 1 */}
          <div className="rounded-xl border border-teal-500/30 bg-teal-950/60 p-2.5 text-center space-y-1">
            <div className="flex items-center justify-center text-teal-400">
              <Lock className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase text-teal-300">Step 1: Primary</p>
            <p className="text-[10px] font-bold text-white">Email + Password</p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-teal-500/30 bg-teal-950/60 p-2.5 text-center space-y-1">
            <div className="flex items-center justify-center text-teal-400">
              <Smartphone className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase text-teal-300">Step 2: Verification</p>
            <p className="text-[10px] font-bold text-white">MFA (TOTP / SMS)</p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-teal-500/30 bg-teal-950/60 p-2.5 text-center space-y-1">
            <div className="flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase text-teal-300">Step 3: Validated</p>
            <p className="text-[10px] font-bold text-emerald-300">HttpOnly Session</p>
          </div>

          {/* Step 4 */}
          <div className="rounded-xl border border-teal-500/30 bg-teal-950/60 p-2.5 text-center space-y-1">
            <div className="flex items-center justify-center text-[#2dd4bf]">
              <KeyRound className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase text-teal-300">Step 4: Device PIN</p>
            <p className="text-[10px] font-bold text-white">Set 4-Digit PIN</p>
          </div>

          {/* Step 5 */}
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/80 p-2.5 text-center space-y-1">
            <div className="flex items-center justify-center text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase text-emerald-300">Next Login</p>
            <p className="text-[10px] font-black text-white">PIN Quick Unlock</p>
          </div>
        </div>
      </div>

      {/* ================= GLOBAL SUPERADMIN POLICY OVERRIDE ================= */}
      <div className="mb-6 rounded-2xl border border-teal-500/30 bg-teal-950/20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#0f766e] dark:text-teal-300">
            <ShieldCheck className="h-4 w-4 text-[#0284c7]" />
            SuperAdmin Global EMR PIN Security Policy (Platform-Wide)
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase ${
              isGlobalPinEnabled
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30"
            }`}
          >
            {isGlobalPinEnabled ? "Global PIN Allowed" : "Global PIN Disabled"}
          </span>
        </div>
        <p className="text-[11px] text-[#596964] dark:text-slate-300">
          SuperAdmin Master Switch: Enable or disable PIN login functionality for <strong>all hospital staff across the entire platform</strong>.
        </p>
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold">Enforce Global Platform PIN Security</span>
          <button
            type="button"
            onClick={() => handleToggleGlobalPin(!isGlobalPinEnabled)}
            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
              isGlobalPinEnabled ? "bg-[#0f766e] justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
          </button>
        </div>
      </div>

      {/* ================= SECTION: DEVICE 4-DIGIT PIN SETUP ================= */}
      <div className="mb-6 rounded-2xl border border-[#DDE7E4] bg-[#F7FAF9] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E3EBE8] pb-3">
          <div>
            <h3 className="text-xs font-black text-[#172522] flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#0f766e]" />
              Configure My Personal 4-Digit Device Quick Unlock PIN
            </h3>
            <p className="text-[10px] text-[#82918D] mt-0.5">
              Set your personal 4-digit PIN for fast shift unlock on this workstation.
            </p>
          </div>

          {isPinSecurityEnabled ? (
            activePin ? (
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[10px] font-extrabold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Active & Enabled
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[10px] font-extrabold text-amber-700">
                Enabled (No PIN Set)
              </span>
            )
          ) : (
            <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-[10px] font-extrabold text-rose-700">
              Personal PIN Disabled
            </span>
          )}
        </div>

        {/* PIN Security Toggle Bar */}
        <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-[#E3EBE8]">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-4 w-4 text-[#0f766e]" />
            <div>
              <p className="text-xs font-bold text-[#172522]">Personal Account PIN Security Status</p>
              <p className="text-[10px] text-[#82918D]">Enable or disable PIN login for your personal account only.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleTogglePinSecurity(!isPinSecurityEnabled)}
            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
              isPinSecurityEnabled ? "bg-[#0f766e] justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
          </button>
        </div>

        {pinMessage && (
          <div
            className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              pinMessage.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {pinMessage.type === "success" ? (
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            )}
            <span>{pinMessage.text}</span>
          </div>
        )}

        {isPinSecurityEnabled && (
          <form onSubmit={handleSavePin} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-extrabold text-[#172522] mb-1">
                Enter New Device PIN (4 to 6 Digits)
              </label>
              <input
                type="password"
                maxLength={6}
                value={devicePin}
                onChange={(e) => setDevicePin(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 123456"
                className="h-10 w-full px-3 rounded-xl border border-[#DDE7E4] bg-white text-xs font-mono font-bold tracking-widest text-[#172522] outline-none focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#172522] mb-1">
                Confirm Device PIN
              </label>
              <input
                type="password"
                maxLength={6}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                placeholder="Confirm PIN..."
                className="h-10 w-full px-3 rounded-xl border border-[#DDE7E4] bg-white text-xs font-mono font-bold tracking-widest text-[#172522] outline-none focus:border-[#0f766e]"
              />
            </div>

          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Save & Set Device PIN</span>
            </button>

            {activePin && (
              <button
                type="button"
                onClick={handleRemovePin}
                className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all cursor-pointer"
              >
                Remove PIN
              </button>
            )}
          </div>
        </form>
        )}
      </div>


      {/* ================= SECTION: GOOGLE AUTHENTICATOR 2FA & RECOVERY CODES ================= */}
      <div className="mb-6 rounded-2xl border border-teal-500/30 bg-[#061815] p-5 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-teal-500/20 pb-3">
          <div>
            <h3 className="text-xs font-black text-white flex items-center gap-2">
              <QrCode className="h-4 w-4 text-[#2dd4bf]" />
              Google Authenticator Two-Factor Security (TOTP + Recovery Codes)
            </h3>
            <p className="text-[10px] text-teal-200/70 mt-0.5">
              Secure your account using Google Authenticator, Authy, or Microsoft Authenticator apps and 8-character backup recovery codes.
            </p>
          </div>

          {is2FAEnabled ? (
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[10px] font-extrabold text-emerald-300 flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              2FA Active & Enforced
            </span>
          ) : (
            <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-[10px] font-extrabold text-amber-300 flex items-center gap-1.5 shadow-xs">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
              2FA Not Enabled
            </span>
          )}
        </div>

        {twoFaMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              twoFaMsg.type === "success"
                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-200"
                : "bg-rose-950/80 border border-rose-500/40 text-rose-200"
            }`}
          >
            {twoFaMsg.type === "success" ? (
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            )}
            <span>{twoFaMsg.text}</span>
          </div>
        )}

        {/* Action Controls for 2FA */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-teal-950/40 p-4 rounded-xl border border-teal-500/20">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white">Google Authenticator (RFC 6238 TOTP)</p>
            <p className="text-[10px] text-teal-200/70">
              {is2FAEnabled
                ? "Your account is protected by 2FA. Every login will require a 6-digit TOTP code or backup recovery code."
                : "Add an extra layer of security. Requires 6-digit verification code from Google Authenticator on login."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!is2FAEnabled ? (
              <button
                type="button"
                onClick={handleStart2FASetup}
                disabled={twoFaLoading}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#0f766e] hover:from-[#115e59] hover:to-[#0f766e] text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <QrCode className="h-4 w-4" />
                <span>Setup Google Authenticator 2FA</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleRegenerateCodes}
                  disabled={twoFaLoading}
                  className="px-3.5 py-2 rounded-xl bg-teal-900/60 border border-teal-500/30 hover:bg-teal-800/80 text-teal-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Regenerate Recovery Codes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDisableModal(true)}
                  disabled={twoFaLoading}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 hover:bg-rose-900/80 text-rose-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Disable 2FA</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL 1: SETUP GOOGLE AUTHENTICATOR ================= */}
      {show2FASetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-teal-500/30 bg-[#081c19] text-white p-6 shadow-2xl space-y-5 relative animate-fade-in">
            <button
              type="button"
              onClick={() => setShow2FASetupModal(false)}
              className="absolute top-4 right-4 text-teal-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-base font-black text-teal-300 flex items-center gap-2">
                <QrCode className="h-5 w-5 text-[#2dd4bf]" />
                Setup Google Authenticator 2FA
              </h3>
              <p className="text-xs text-teal-100/70 mt-1">
                Scan QR code with your Google Authenticator app, or enter secret key manually.
              </p>
            </div>

            {/* Step 1: QR Code & Secret */}
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/60 p-4 flex flex-col items-center justify-center text-center space-y-3">
              <div className="bg-white p-2 rounded-xl border-2 border-teal-400 shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(otpauthUrl)}`}
                  alt="Google Authenticator QR Code"
                  className="h-36 w-36 rounded-lg object-contain"
                />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 block mb-1">
                  Manual Entry Secret Key:
                </span>
                <div className="flex items-center justify-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-teal-500/30 font-mono text-xs font-bold text-teal-200">
                  <span>{totpSecret}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(totpSecret, "secret")}
                    className="text-teal-400 hover:text-white p-1"
                    title="Copy Secret Key"
                  >
                    {copiedSecret ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Verification Input */}
            <form onSubmit={handleEnable2FA} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-teal-200 mb-1">
                  Enter 6-Digit Google Authenticator Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 123456"
                  className="h-11 w-full text-center tracking-[0.4em] font-mono text-lg font-black rounded-xl border border-teal-500/40 bg-teal-950 text-white outline-none focus:border-[#2dd4bf]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShow2FASetupModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-teal-500/30 text-teal-200 hover:bg-teal-900 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={twoFaLoading || verificationCode.length !== 6}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {twoFaLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Verify & Activate 2FA</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: RECOVERY CODES DISPLAY ================= */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-emerald-500/40 bg-[#071d18] text-white p-6 shadow-2xl space-y-5 relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
              <div>
                <h3 className="text-base font-black text-emerald-300 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Save 2FA Backup Recovery Codes
                </h3>
                <p className="text-xs text-emerald-100/80 mt-0.5">
                  Save these 8 recovery codes in a secure offline location. Each code can be used ONCE if you lose your authenticator app.
                </p>
              </div>
            </div>

            {/* Recovery Codes Grid */}
            <div className="grid grid-cols-2 gap-2.5 bg-black/50 p-4 rounded-xl border border-emerald-500/30 font-mono text-sm font-black tracking-widest text-emerald-300">
              {recoveryCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-500/20 text-center flex items-center justify-between"
                >
                  <span className="text-[10px] font-sans text-emerald-500">{idx + 1}.</span>
                  <span>{code}</span>
                </div>
              ))}
            </div>

            {/* Copy & Download Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(recoveryCodes.join("\n"), "codes")}
                className="flex-1 py-2 rounded-xl bg-teal-900/60 border border-teal-500/30 hover:bg-teal-800 text-teal-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {copiedCodes ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedCodes ? "Copied All Codes!" : "Copy All Codes"}</span>
              </button>

              <button
                type="button"
                onClick={downloadRecoveryCodes}
                className="flex-1 py-2 rounded-xl bg-teal-900/60 border border-teal-500/30 hover:bg-teal-800 text-teal-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Download .TXT File</span>
              </button>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-center gap-2.5 pt-2">
              <input
                type="checkbox"
                id="saved-codes-checkbox"
                checked={savedCodesChecked}
                onChange={(e) => setSavedCodesChecked(e.target.checked)}
                className="h-4 w-4 rounded border-teal-500 text-[#0f766e] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="saved-codes-checkbox" className="text-xs font-bold text-emerald-100 cursor-pointer">
                I have securely saved these 8 recovery codes in a safe place.
              </label>
            </div>

            <button
              type="button"
              disabled={!savedCodesChecked}
              onClick={() => setShowRecoveryModal(false)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              <span>Finish & Complete 2FA Setup</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: DISABLE 2FA PROMPT ================= */}
      {showDisableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/40 bg-[#1c0808] text-white p-6 shadow-2xl space-y-4 relative animate-fade-in">
            <button
              type="button"
              onClick={() => setShowDisableModal(false)}
              className="absolute top-4 right-4 text-rose-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-base font-black text-rose-300 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-400" />
                Disable Two-Factor Authentication?
              </h3>
              <p className="text-xs text-rose-100/70 mt-1">
                Disabling 2FA reduces account security. Enter your 6-digit authenticator code or password to confirm.
              </p>
            </div>

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-rose-200 mb-1">
                  6-Digit Authenticator Code or Account Password
                </label>
                <input
                  type="password"
                  value={disableCodeOrPassword}
                  onChange={(e) => setDisableCodeOrPassword(e.target.value)}
                  placeholder="Authenticator code or password..."
                  className="h-10 w-full px-3 rounded-xl border border-rose-500/40 bg-rose-950 text-white text-xs font-bold outline-none focus:border-rose-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDisableModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-rose-500/30 text-rose-200 hover:bg-rose-900 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={twoFaLoading || !disableCodeOrPassword}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {twoFaLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <span>Disable 2FA</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= STANDARD SECURITY TOGGLES ================= */}
      <div className="space-y-1">
        <SettingRow
          title="Shift Auto-Lock Protection"
          description="Automatically lock the workspace after inactivity, requiring PIN unlock."
          enabled={true}
        />

        <SettingRow
          title="Login Security Alerts"
          description="Receive instant notifications when a new login IP or device is detected."
          enabled={true}
        />

        <SettingRow
          title="Password Expiration Policy"
          description="Force password updates every 90 days for HIPAA compliance."
          enabled={false}
        />
      </div>

      <div className="mt-6 border-t border-[#EDF2F0] pt-5">
        <h3 className="text-[11px] font-semibold text-[#596964]">
          Session Inactivity Timeout
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <select className="h-10 w-[180px] rounded-[8px] border border-[#DDE7E4] bg-white px-3 text-[10px] text-[#596964] outline-none">
            <option>15 Minutes</option>
            <option>30 Minutes</option>
            <option>1 Hour</option>
            <option>2 Hours</option>
          </select>

          <span className="text-[9px] text-[#9AA5A1]">
            Automatically lock active session after inactivity.
          </span>
        </div>
      </div>

      <SaveButton />
    </SettingsCard>
  );
}



/* ============================================================
   NOTIFICATION SETTINGS
============================================================ */

function NotificationSettings() {

  return (

    <SettingsCard
      title="Notification Settings"
      description="Choose which events should generate notifications."
    >

      <div className="space-y-1">

        <SettingRow
          title="New Support Tickets"
          description="Notify Super Admin when an administrator creates a ticket."
          enabled={true}
        />

        <SettingRow
          title="High Priority Tickets"
          description="Immediately notify when a high priority ticket is created."
          enabled={true}
        />

        <SettingRow
          title="New Administrator"
          description="Notify when a new administrator account is created."
          enabled={true}
        />

        <SettingRow
          title="Security Alerts"
          description="Receive alerts for suspicious security activity."
          enabled={true}
        />

        <SettingRow
          title="System Updates"
          description="Receive notifications about system maintenance and updates."
          enabled={true}
        />

        <SettingRow
          title="Reports"
          description="Notify when scheduled reports are generated."
          enabled={false}
        />

      </div>


      <div className="mt-6 border-t border-[#EDF2F0] pt-5">

        <h3 className="text-[11px] font-semibold text-[#596964]">
          Notification Channels
        </h3>

        <div className="mt-3 space-y-1">

          <SettingRow
            title="In-App Notifications"
            description="Show notifications inside the platform."
            enabled={true}
          />

          <SettingRow
            title="Email Notifications"
            description="Send important notifications through email."
            enabled={true}
          />

        </div>

      </div>


      <SaveButton />

    </SettingsCard>
  );
}


/* ============================================================
   SYSTEM SETTINGS
============================================================ */

function SystemSettings() {

  return (

    <SettingsCard
      title="System Settings"
      description="Manage platform-level system configuration."
    >

      <div className="grid grid-cols-2 gap-5">

        <InputField
          label="Application Version"
          value="v2.4.0"
          disabled
        />

        <InputField
          label="Environment"
          value="Production"
          disabled
        />

        <InputField
          label="API Version"
          value="v1"
          disabled
        />

        <SelectField
          label="Default Language"
          value="English"
          options={[
            "English",
            "Hindi",
          ]}
        />

      </div>


      <div className="mt-6 border-t border-[#EDF2F0] pt-5">

        <h3 className="text-[11px] font-semibold text-[#596964]">
          System Operations
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-3">

          <ActionCard
            title="Clear Cache"
            description="Clear temporary application cache."
            button="Clear Cache"
          />

          <ActionCard
            title="Database Backup"
            description="Create a manual system backup."
            button="Create Backup"
          />

          <ActionCard
            title="System Logs"
            description="Review recent application activity."
            button="View Logs"
          />

          <ActionCard
            title="Health Check"
            description="Check status of platform services."
            button="Run Check"
          />

        </div>

      </div>


      <SaveButton />

    </SettingsCard>
  );
}


/* ============================================================
   PROFILE SETTINGS
============================================================ */

function ProfileSettings() {

  return (

    <SettingsCard
      title="My Profile"
      description="Manage your Super Admin account information."
    >

      <div className="mb-6 flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F4F1] text-[15px] font-bold text-[#0F766E]">
          SA
        </div>

        <div>

          <h3 className="text-[13px] font-semibold text-[#263833]">
            Super Admin
          </h3>

          <p className="mt-1 text-[9px] text-[#98A49F]">
            superadmin@healthcare.com
          </p>

          <button className="mt-2 text-[9px] font-semibold text-[#0F766E]">
            Change profile photo
          </button>

        </div>

      </div>


      <div className="grid grid-cols-2 gap-5">

        <InputField
          label="First Name"
          value="Super"
        />

        <InputField
          label="Last Name"
          value="Admin"
        />

        <InputField
          label="Email Address"
          value="superadmin@healthcare.com"
        />

        <InputField
          label="Phone Number"
          value="+91 98765 43210"
        />

      </div>


      <div className="mt-6 border-t border-[#EDF2F0] pt-5">

        <h3 className="text-[11px] font-semibold text-[#596964]">
          Change Password
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-5">

          <InputField
            label="Current Password"
            value="••••••••"
            type="password"
          />

          <InputField
            label="New Password"
            value=""
            type="password"
            placeholder="Enter new password"
          />

        </div>

      </div>


      <SaveButton />

    </SettingsCard>
  );
}


/* ============================================================
   SETTINGS CARD
============================================================ */

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {

  return (

    <div className="overflow-hidden rounded-[15px] border border-[#E4ECE9] bg-white shadow-[0_5px_25px_rgba(31,56,51,0.03)]">

      <div className="border-b border-[#EDF2F0] px-6 py-5">

        <h2 className="text-[13px] font-semibold text-[#263833]">
          {title}
        </h2>

        <p className="mt-1 text-[9px] text-[#98A49F]">
          {description}
        </p>

      </div>

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}


/* ============================================================
   INPUT
============================================================ */

function InputField({
  label,
  value,
  type = "text",
  disabled = false,
  placeholder,
}: {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}) {

  return (

    <div>

      <label className="mb-2 block text-[9px] font-semibold text-[#687570]">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-10 w-full rounded-[8px] border border-[#DDE7E4] px-3 text-[10px] text-[#596964] outline-none placeholder:text-[#A7B0AD] focus:border-[#77BDB4] focus:ring-2 focus:ring-[#0F766E]/10 ${
          disabled
            ? "cursor-not-allowed bg-[#F5F7F6] text-[#9BA5A1]"
            : "bg-[#FCFDFC]"
        }`}
      />

    </div>
  );
}


/* ============================================================
   SELECT
============================================================ */

function SelectField({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) {

  return (

    <div>

      <label className="mb-2 block text-[9px] font-semibold text-[#687570]">
        {label}
      </label>

      <select
        defaultValue={value}
        className="h-10 w-full rounded-[8px] border border-[#DDE7E4] bg-[#FCFDFC] px-3 text-[10px] text-[#596964] outline-none focus:border-[#77BDB4]"
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


/* ============================================================
   SETTING ROW
============================================================ */

function SettingRow({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {

  const [active, setActive] = useState(enabled);

  return (

    <div className="flex items-center justify-between gap-6 rounded-[9px] px-3 py-4 transition hover:bg-[#FAFCFB]">

      <div>

        <p className="text-[10px] font-semibold text-[#596964]">
          {title}
        </p>

        <p className="mt-1 max-w-[580px] text-[8px] leading-4 text-[#9AA5A1]">
          {description}
        </p>

      </div>


      <button
        onClick={() => setActive(!active)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          active
            ? "bg-[#0F766E]"
            : "bg-[#D5DEDB]"
        }`}
      >

        <span
          className={`absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white shadow-sm transition ${
            active
              ? "left-[18px]"
              : "left-[3px]"
          }`}
        />

      </button>

    </div>
  );
}


/* ============================================================
   ACTION CARD
============================================================ */

function ActionCard({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button: string;
}) {

  return (

    <div className="rounded-[10px] border border-[#E5ECEA] p-4">

      <p className="text-[10px] font-semibold text-[#596964]">
        {title}
      </p>

      <p className="mt-1 text-[8px] leading-4 text-[#9AA5A1]">
        {description}
      </p>

      <button className="mt-3 rounded-[7px] border border-[#DDE7E4] px-3 py-1.5 text-[8px] font-semibold text-[#0F766E] hover:bg-[#EAF5F2]">
        {button}
      </button>

    </div>
  );
}


/* ============================================================
   SAVE
============================================================ */

function SaveButton() {

  return (

    <div className="mt-7 flex justify-end border-t border-[#EDF2F0] pt-5">

      <button className="rounded-[8px] bg-[#0F766E] px-5 py-2.5 text-[9px] font-semibold text-white transition hover:bg-[#0B625C]">
        Save Changes
      </button>

    </div>
  );
}


/* ============================================================
   SETTING ICONS
============================================================ */

function getSettingIcon(id: string) {

  if (id === "general") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.4A1.7 1.7 0 0 0 8 10.3a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5H15v.3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.4V14h-.4a1.7 1.7 0 0 0-1.6 1Z" />
      </svg>
    );
  }

  if (id === "security") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (id === "notifications") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );
  }

  if (id === "system") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 18v3" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function AuditLogSettings() {
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // Debounce search input (300ms delay to prevent excessive API calls)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchLogs = useCallback(() => {
    setIsLoading(true);
    const offset = (page - 1) * pageSize;
    getAuditLogsApi(pageSize, offset, debouncedSearch || undefined)
      .then((res) => {
        if (res) {
          setAuditLogs(res.logs || []);
          setTotalRecords(res.total || 0);
        }
      })
      .catch((err) => console.error("Failed to load audit logs:", err))
      .finally(() => setIsLoading(false));
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startItem = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalRecords);

  const getActionBadge = (action: string) => {
    const actUpper = action.toUpperCase();
    if (actUpper.includes("SUCCESS")) {
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    }
    if (actUpper.includes("FAILED") || actUpper.includes("DISABLE")) {
      return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
    }
    if (actUpper.includes("2FA") || actUpper.includes("ENABLE")) {
      return "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30";
    }
    if (actUpper.includes("PIN")) {
      return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
    }
    return "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl border border-[#E3EBE8] bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[#E3EBE8] dark:border-slate-800 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-5 w-5 text-[#0f766e] dark:text-teal-400" />
              <h3 className="text-base font-black tracking-tight text-[#172522] dark:text-white">
                HIPAA Audit Logs & Security Matrix
              </h3>
            </div>
            <p className="text-xs font-semibold text-[#8A9995]">
              Real-time immutable security, 2FA, and authentication audit trail recorded in database.
            </p>
          </div>

          {/* Search & Page Size Select */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search event action..."
                className="h-9 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 pl-9 pr-3 text-xs font-bold outline-none focus:border-[#0f766e] shadow-xs"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 px-3 text-xs font-extrabold outline-none focus:border-[#0f766e] shadow-xs cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>

            <button
              type="button"
              onClick={fetchLogs}
              className="h-9 px-3 rounded-xl bg-[#0f766e] hover:bg-[#0d5c56] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium border-collapse">
            <thead>
              <tr className="border-b border-[#E3EBE8] dark:border-slate-800 text-[#82918D] uppercase tracking-wider text-[10px] font-black">
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Event Action</th>
                <th className="py-3 px-3">User Email</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EBE8] dark:divide-slate-800 text-[#172522] dark:text-slate-200">
              {isLoading ? (
                /* Shimmer Skeleton Rows */
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3.5 px-3">
                      <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="h-3.5 w-36 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="h-3.5 w-20 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="h-3.5 w-44 bg-slate-200 dark:bg-slate-700 rounded-md" />
                    </td>
                  </tr>
                ))
              ) : auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center space-y-2">
                    <ShieldAlert className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold opacity-80">No audit log records found matching search filter.</p>
                    <p className="text-[11px] opacity-60">Try clearing the search filter or performing actions like login or 2FA setup.</p>
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-teal-50/40 dark:hover:bg-slate-800/60 transition-all group">
                    <td className="py-3 px-3 font-mono text-[11px] whitespace-nowrap opacity-80">
                      {log.created_at ? new Date(log.created_at).toLocaleString() : "N/A"}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-xs">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-black ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-xs">
                      {log.user_email}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {log.user_role}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] opacity-75">
                      {log.ip_address}
                    </td>
                    <td className="py-3 px-3 text-[11px] font-medium opacity-90 max-w-xs truncate group-hover:whitespace-normal group-hover:max-w-none transition-all">
                      {log.details || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server-Side Pagination Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E3EBE8] dark:border-slate-800 pt-4 gap-3">
          <div className="text-xs font-bold opacity-75 text-center sm:text-left">
            Showing <span className="font-extrabold text-[#0f766e] dark:text-teal-400">{startItem}</span> to{" "}
            <span className="font-extrabold text-[#0f766e] dark:text-teal-400">{endItem}</span> of{" "}
            <span className="font-extrabold text-[#0f766e] dark:text-teal-400">{totalRecords}</span> HIPAA Audit Logs
          </div>

          <div className="flex items-center justify-center gap-1.5 self-center sm:self-auto">
            <button
              type="button"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </button>

            {/* Page number buttons */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              let pageNum = page;
              if (totalPages <= 5) pageNum = idx + 1;
              else if (page <= 3) pageNum = idx + 1;
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
              else pageNum = page - 2 + idx;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={`h-8 w-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    page === pageNum
                      ? "bg-[#0f766e] text-white shadow-xs"
                      : "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}