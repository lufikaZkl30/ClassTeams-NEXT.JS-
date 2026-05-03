import type { Metadata } from "next";
import "@/app/globals.css";
import LayoutClient from "./LayoutClient";

export const metadata: Metadata = {
  title: {
    template: "%s | ClassTeams",
    default: "ClassTeams",
  },
  description: "Academic Ledger — Structural Assignment Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>

      <body className="bg-background text-on-background min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}