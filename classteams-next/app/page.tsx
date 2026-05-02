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

function loadTasks(): Task[] {
  if (typeof window === "undefined") return DEFAULT_TASKS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored) as Task[];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
    return DEFAULT_TASKS;
  } catch {
    return DEFAULT_TASKS;
  }
}

function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  // ✅ LOGIN PROTECTION + LOAD DATA
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      router.replace("/login"); // ⛔ kalau belum login
      return;
    }

    const data = loadTasks();
    setTasks(data);
    setMounted(true);
  }, [router]);

  function handleCreate(taskData: Omit<Task, "id">) {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
    };

    const updated = [newTask, ...tasks];

    setTasks(updated);
    saveTasks(updated);
  }

  function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const updated = tasks.filter((t) => t.id !== id);

    setTasks(updated);
    saveTasks(updated);
  }

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

          {/* GRID */}
          <div className="grid grid-cols-12 gap-8">

            {/* TASK LIST */}
            <section className="col-span-8 flex flex-col gap-6">
              <NewPostBox onCreateTask={handleCreate} />

              {!mounted ? (
                <div className="text-slate-500 text-center py-8 text-sm font-mono uppercase tracking-widest">
                  Loading...
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-white border border-dashed border-outline/40 p-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">
                    inbox
                  </span>
                  <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">
                    No tasks. Create a new entry above.
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