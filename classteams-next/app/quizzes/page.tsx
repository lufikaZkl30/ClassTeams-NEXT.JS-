import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Quizzes",
};

export default function QuizzesPage() {
  return (
    <>
      <Header searchPlaceholder="SEARCH QUIZZES..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Quizzes" },
            ]}
          />

          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Quizzes & Exams
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Evaluations // Fall 2024
            </p>
          </header>

          <div className="bg-surface border border-dashed border-outline-variant p-24 text-center rounded-xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-6 block">
              quiz
            </span>
            <h3 className="text-2xl font-bold text-on-background mb-2">No Active Quizzes</h3>
            <p className="text-on-surface-variant max-w-md mx-auto">
              You&apos;re all caught up! There are currently no quizzes or exams scheduled for your enrolled courses.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
