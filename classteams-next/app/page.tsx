"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PostCard from "@/components/PostCard";
import NewPostBox from "@/components/NewPostBox";
import RightSidebar from "@/components/RightSidebar";
import { Task, DEFAULT_TASKS } from "@/lib/types";

const STORAGE_KEY = "classteams_tasks";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);

  // 🔐 LOGIN + TEAM CHECK + LOAD DATA
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      router.replace("/auth/login");
      return;
    }

    const team = localStorage.getItem("team");
    if (team) setHasTeam(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
        setTasks(DEFAULT_TASKS);
      }
    } catch {
      setTasks(DEFAULT_TASKS);
    }

    setMounted(true);
  }, [router]);

  // 💾 SAVE
  function saveTasks(updated: Task[]) {
    setTasks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // ➕ CREATE
  function handleCreate(taskData: Omit<Task, "id">) {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
    };

    saveTasks([newTask, ...tasks]);
  }

  // ❌ DELETE
  function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;

    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  }

  // 📊 STATS
  const openTasks = tasks.filter(
    (t) => t.status === "PENDING" || t.status === "REVISED"
  ).length;

  const completedTasks = tasks.filter(
    (t) => t.status === "COMPLETED" || t.status === "SUBMITTED"
  ).length;

  const complianceRate =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  return (
    <>
      <Header searchPlaceholder="SEARCH DASHBOARD..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">

          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Academic Ledger" },
            ]}
          />

          {/* HEADER */}
          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Academic Ledger
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Structural Assignment Management // Fall 2026
            </p>
          </header>

          {/* 🚫 BELUM PUNYA TEAM */}
          {!hasTeam && (
            <div className="bg-white border border-dashed p-12 text-center rounded-xl mb-8">
              <p className="text-gray-500 mb-4">
                Kamu belum join / create team
              </p>

              <button
                onClick={() => {
                  localStorage.setItem("team", "dummy");
                  setHasTeam(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-full"
              >
                Create / Join Team (Test)
              </button>
            </div>
          )}

          {/* GRID */}
          <div className="grid grid-cols-12 gap-8">

            {/* TASK */}
            <section className="col-span-8 flex flex-col gap-6">

              {hasTeam && (
                <NewPostBox onCreateTask={handleCreate} />
              )}

              {!mounted ? (
                <div className="text-center py-8 text-sm">
                  Loading...
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-white border border-dashed p-12 text-center rounded-xl">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">
                    inbox
                  </span>
                  <p className="text-gray-500 text-sm">
                    No tasks yet
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <PostCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              )}

              {/* 🔓 LOGOUT */}
              <button
                onClick={() => {
                  localStorage.removeItem("isLogin");
                  router.push("/auth/login");
                }}
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full"
              >
                Logout
              </button>

            </section>

            {/* SIDEBAR */}
            <RightSidebar
              openTasks={openTasks}
              completedTasks={completedTasks}
              complianceRate={complianceRate}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}