import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickQR — Dynamische QR-Codes, günstiger als Bitly",
  description:
    "Dynamische QR-Codes mit Branding und Scan-Tracking. Ziel-URL jederzeit änderbar, ohne den gedruckten Code neu zu drucken. 40–70% günstiger als Bitly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <SessionProvider>
          <NavBar />
          <div className="flex-1 flex flex-col">{children}</div>
          <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            QuickQR · MVP · {new Date().getFullYear()}
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
