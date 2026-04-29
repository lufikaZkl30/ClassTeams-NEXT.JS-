"use client";

import Image from "next/image";
import Link from "next/link";

export default function DetailTeams() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex">

      {/* ================= NAVBAR ================= */}
      <nav className="hidden md:flex justify-between items-center w-full px-6 py-3 bg-white/80 backdrop-blur-xl fixed top-0 z-50 shadow-sm">
        <div className="text-2xl font-bold text-primary">
          ClassTeams
        </div>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search..."
            className="px-4 py-2 rounded-full bg-gray-100 outline-none"
          />

          <button>🔔</button>
          <button>⚙️</button>

          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqVbTi9Cj429kHz7NSiDkQ7U-JnO1Z-wo78pojleqdudBz6JxRltvTdomtT43IL1KQ3S6dFsK4je0FI4TRCvyplGime47x22ovxHyM7iDF9d_bGVTtvTMdweH6EF-zDd_vRa02QD5s6vNhEncaJHiFERyUVQ31mMjlPIbgw99e9HucPG8Hj25bZyQGM5HaETf4X9M-cowOp8V92n_OqIttp6ZumqPMN4BJ92NyrbxzZjKTHqqAEJLcUYrNToZcfdCAJM-9HEnxTi8p"
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-surface-container-low border-r pt-20 p-4">

        <div className="mb-6">
          <h2 className="font-bold text-primary">Academic Portal</h2>
          <p className="text-sm text-gray-500">Fall Semester 2024</p>
        </div>

        <button className="mb-6 py-3 bg-blue-600 text-white rounded-full">
          + New Entry
        </button>

        <nav className="flex flex-col gap-2">
          <Link href="/" className="p-3 hover:bg-gray-100 rounded">
            Dashboard
          </Link>

          <Link href="/detail-teams" className="p-3 bg-white text-primary rounded shadow">
            Announcements
          </Link>

          <Link href="#" className="p-3 hover:bg-gray-100 rounded">
            Assignments
          </Link>

          <Link href="#" className="p-3 hover:bg-gray-100 rounded">
            Quizzes
          </Link>

          <Link href="#" className="p-3 hover:bg-gray-100 rounded">
            Directory
          </Link>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 md:ml-64 pt-24 px-6 pb-10">

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            CS301: Advanced Algorithms
          </h1>
          <p className="text-gray-500">
            Latest updates and announcements from your instructors.
          </p>
        </header>

        {/* ================= CARDS ================= */}
        <section className="flex flex-col gap-8">

          {/* CARD 1 */}
          <div className="bg-white rounded-xl p-6 shadow relative">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-orange-500" />

            <div className="flex justify-between mb-4">
              <div className="flex gap-3 items-center">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBatZYxDzGOD2CHk_3FWZmQ45Cx-ZUsBCLUkSapMsX22MngJvyI2m0BXPsjo2jqT6f6alVcZCgr_7Z1YvnchGw_g9q6M7Uv2-zvLwVoH3ZeXgrKQ7SVL32PeUSj2StNNo_HozjPQsE0OlNTZZYqAYUqRUnSDGojawhIP-jl0iwApmlkNgXLdaaBDiV1Yq72TZhMtlnYlEqLnKHG0mA9Xnyl2r9s17nTdMbL7JcKjsmhbp7ls5My-2q9RhCv8LT-m9lKQtz2IwFWOihF"
                  alt="prof"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div>
                  <h3 className="font-bold">Dr. Alan Turing</h3>
                  <p className="text-sm text-gray-500">
                    Today, 09:00 AM
                  </p>
                </div>
              </div>

              <span className="text-xs bg-blue-100 px-3 py-1 rounded-full">
                Important
              </span>
            </div>

            <h2 className="text-xl font-bold mb-2">
              Midterm Exam Format Change
            </h2>

            <p className="text-gray-600">
              Format ujian diubah menjadi fokus pada design algoritma.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-2">
              Assignment 3 Grades Posted
            </h2>

            <p className="text-gray-600 mb-4">
              Nilai sudah dirilis, silakan cek.
            </p>

            <button className="px-4 py-2 border rounded-full text-blue-600">
              View Grades
            </button>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-2">
              Recommended Reading: NP-Completeness
            </h2>

            <p className="text-gray-600 mb-4">
              Silakan baca chapter 8 dan 9 untuk materi selanjutnya.
            </p>

            <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded">
                PDF
              </div>

              <div>
                <p className="font-bold">TSP_Modern_Approaches.pdf</p>
                <p className="text-sm text-gray-500">2.4 MB</p>
              </div>

              <button className="ml-auto text-blue-600">
                Download
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}