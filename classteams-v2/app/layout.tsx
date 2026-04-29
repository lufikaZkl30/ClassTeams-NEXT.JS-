import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: { template: "%s | ClassTeams", default: "ClassTeams" },
  description: "Academic Ledger — Structural Assignment Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Material Symbols — loaded once for all pages */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen flex">
        {/* ── Fixed left sidebar (present on ALL pages) ── */}
        <Sidebar />

        {/* ── Page content (offset by sidebar width) ── */}
        <div className="flex-grow ml-64 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
