import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Directory",
};

export default function DirectoryPage() {
  return (
    <>
      <Header searchPlaceholder="SEARCH DIRECTORY..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Directory" },
            ]}
          />

          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Directory
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Contacts & Faculty // Fall 2024
            </p>
          </header>

          <div className="bg-surface border border-dashed border-outline-variant p-24 text-center rounded-xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-6 block">
              contacts
            </span>
            <h3 className="text-2xl font-bold text-on-background mb-2">Directory Coming Soon</h3>
            <p className="text-on-surface-variant max-w-md mx-auto">
              The university directory is currently being synced. Check back later to find contact information for your peers and instructors.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
