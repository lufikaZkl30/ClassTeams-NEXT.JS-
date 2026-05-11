"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function DetailTeams() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  return (
    <>
      <Header searchPlaceholder="SEARCH ANNOUNCEMENTS..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Announcements" },
            ]}
          />

          {/* HEADER */}
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold tracking-tighter mb-2 text-on-background">
              CS301: Advanced Algorithms
            </h1>
            <p className="text-on-surface-variant">
              Latest updates and announcements from your instructors.
            </p>
          </header>

          {/* ================= CARDS ================= */}
          <section className="flex flex-col gap-6">

            {/* CARD 1 */}
            <div className="bg-surface rounded-xl p-6 border border-outline relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-primary" />

              <div className="flex justify-between mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBatZYxDzGOD2CHk_3FWZmQ45Cx-ZUsBCLUkSapMsX22MngJvyI2m0BXPsjo2jqT6f6alVcZCgr_7Z1YvnchGw_g9q6M7Uv2-zvLwVoH3ZeXgrKQ7SVL32PeUSj2StNNo_HozjPQsE0OlNTZZYqAYUqRUnSDGojawhIP-jl0iwApmlkNgXLdaaBDiV1Yq72TZhMtlnYlEqLnKHG0mA9Xnyl2r9s17nTdMbL7JcKjsmhbp7ls5My-2q9RhCv8LT-m9lKQtz2IwFWOihF"
                      alt="prof"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-background">Dr. Alan Turing</h3>
                    <p className="text-xs text-on-surface-variant font-mono uppercase">
                      Today, 09:00 AM
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary-container text-primary px-3 py-1 rounded-full flex items-center">
                  Important
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2 text-on-background">
                Midterm Exam Format Change
              </h2>
              <p className="text-on-surface-variant">
                Format ujian diubah menjadi fokus pada design algoritma. Pastikan Anda telah membaca bab 4 dan 5 sebagai persiapan utama.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-surface rounded-xl p-6 border border-outline">
              <h2 className="text-xl font-bold mb-2 text-on-background">
                Assignment 3 Grades Posted
              </h2>

              <p className="text-on-surface-variant mb-6">
                Nilai sudah dirilis, silakan cek dashboard nilai masing-masing. Jika ada sanggahan, harap hubungi asisten dosen sebelum hari Jumat.
              </p>

              <button className="px-6 py-2 border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-colors rounded-full">
                View Grades
              </button>
            </div>

            {/* CARD 3 */}
            <div className="bg-surface rounded-xl p-6 border border-outline">
              <h2 className="text-xl font-bold mb-2 text-on-background">
                Recommended Reading: NP-Completeness
              </h2>

              <p className="text-on-surface-variant mb-6">
                Silakan unduh dan baca chapter 8 dan 9 untuk materi pertemuan minggu depan. Fokus pada reduksi polynomial-time.
              </p>

              <div className="flex items-center gap-4 bg-surface-container p-4 border border-outline/30 rounded-lg">
                <div className="w-12 h-12 bg-error text-white flex items-center justify-center rounded-lg shadow-sm">
                  <span className="text-xs font-bold">PDF</span>
                </div>

                <div className="flex-1">
                  <p className="font-bold text-sm text-on-background">TSP_Modern_Approaches.pdf</p>
                  <p className="text-xs text-on-surface-variant font-mono">2.4 MB</p>
                </div>

                <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg">download</span>
                  Download
                </button>
              </div>
            </div>

          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}