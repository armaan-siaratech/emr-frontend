import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppShell from "@/components/layout/AppShell";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MediCare HMS",
  description: "MediCare Hospital Management System & Clinical EHR Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen antialiased bg-[#c7d9d6] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d8ece7] via-[#c7d9d6] to-[#b8cdca] text-[#132a26] selection:bg-[#a34e36] selection:text-white relative`}
      >
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}